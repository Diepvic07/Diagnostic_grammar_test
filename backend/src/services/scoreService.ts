import { PrismaClient } from '@prisma/client';
import type { UserAnswer, QuizSubmitRequest } from '../types';
import { getCorrectAnswer } from './questionService';

const prisma = new PrismaClient();

/**
 * Calculate quiz score from user answers
 */
export async function calculateScore(
    sessionId: string,
    answers: Array<{ questionId: string; selectedAnswerId: string }>
): Promise<{
    score: number;
    totalQuestions: number;
    percentage: number;
    answersData: UserAnswer[];
}> {
    const answersData: UserAnswer[] = [];
    let correctCount = 0;

    for (const answer of answers) {
        const correctAnswerId = await getCorrectAnswer(answer.questionId);
        const isCorrect = answer.selectedAnswerId === correctAnswerId;

        if (isCorrect) {
            correctCount++;
        }

        // Get topic info
        const question = await prisma.question.findUnique({
            where: { id: answer.questionId },
            select: { grammarTopic: true, topicNumber: true },
        });

        answersData.push({
            questionId: answer.questionId,
            selectedAnswerId: answer.selectedAnswerId,
            isCorrect,
            grammarTopic: question?.grammarTopic || '',
            topicNumber: question?.topicNumber || 0,
        });
    }

    const totalQuestions = answers.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Update session
    await prisma.userSession.update({
        where: { id: sessionId },
        data: {
            score: correctCount,
            totalQuestions,
            answersData: JSON.stringify(answersData),
            completedAt: new Date(),
        },
    });

    return {
        score: correctCount,
        totalQuestions,
        percentage,
        answersData,
    };
}

/**
 * Get detailed results for a quiz session
 */
export async function getSessionResults(
    sessionId: string,
    language: 'en' | 'vi' | 'es' | 'zh'
) {
    const session = await prisma.userSession.findUnique({
        where: { id: sessionId },
    });

    if (!session || !session.answersData) {
        throw new Error('Session not found or not completed');
    }

    const answersData = JSON.parse(session.answersData) as UserAnswer[];
    const questionResults = [];

    for (const answer of answersData) {
        const question = await prisma.question.findUnique({
            where: { id: answer.questionId },
            include: { answers: true, explanations: true },
        });

        if (!question) continue;

        const userAnswerObj = question.answers.find((a) => a.id === answer.selectedAnswerId);
        const correctAnswerObj = question.answers.find((a) => a.isCorrect);
        const explanation = question.explanations.find((e) => e.languageCode === language);

        questionResults.push({
            id: question.id,
            questionText: question.contentEn,
            userAnswer: userAnswerObj?.textEn || '',
            correctAnswer: correctAnswerObj?.textEn || '',
            isCorrect: answer.isCorrect,
            explanation: explanation?.explanationText || '',
            grammarTopic: question.grammarTopic,
            topicNumber: question.topicNumber,
        });
    }

    return {
        score: session.score || 0,
        totalQuestions: session.totalQuestions,
        percentage: Math.round(((session.score || 0) / session.totalQuestions) * 100),
        questions: questionResults,
    };
}
