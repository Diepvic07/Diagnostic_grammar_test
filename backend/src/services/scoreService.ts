import { JsonStore } from '../utils/jsonStore';
import type { UserAnswer } from '../types';
import { getCorrectAnswer } from './questionService';

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
    const session = JsonStore.getSessionById(sessionId);
    if (!session) {
        throw new Error('Session not found');
    }

    const answersData: UserAnswer[] = [];
    let correctCount = 0;

    for (const answer of answers) {
        const correctAnswerId = await getCorrectAnswer(answer.questionId);
        const isCorrect = answer.selectedAnswerId === correctAnswerId;

        if (isCorrect) {
            correctCount++;
        }

        // Get topic info
        const question = JsonStore.getQuestionById(answer.questionId);

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
    session.score = correctCount;
    session.totalQuestions = totalQuestions;
    session.answersData = answersData;
    session.completedAt = new Date();

    JsonStore.saveSession(session);

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
    const session = JsonStore.getSessionById(sessionId);

    if (!session || !session.answersData) {
        throw new Error('Session not found or not completed');
    }

    // Handle both stringified and object data (for safety/compatibility)
    const answersData = typeof session.answersData === 'string'
        ? JSON.parse(session.answersData) as UserAnswer[]
        : session.answersData;

    const questionResults = [];

    for (const answer of answersData) {
        const question = JsonStore.getQuestionById(answer.questionId);

        if (!question) continue;

        const userAnswerObj = question.answers.find((a) => a.id === answer.selectedAnswerId);
        const correctAnswerObj = question.answers.find((a) => a.isCorrect);
        const explanation = question.explanations?.find((e) => e.languageCode === language);

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
