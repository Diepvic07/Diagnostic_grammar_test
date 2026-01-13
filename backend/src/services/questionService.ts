import { PrismaClient } from '@prisma/client';
import type { Question } from '../types';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

/**
 * Get all 50 questions for quiz (MVP version)
 * For future expansion with 200+ questions, implement randomization logic
 */
export async function getQuizQuestions(): Promise<Question[]> {
    // 1. Get all questions with minimal fields to perform selection
    const allQuestions = await prisma.question.findMany({
        select: {
            id: true,
            topicNumber: true,
        },
    });

    // 2. Group by topic
    const byTopic: Record<number, string[]> = {};
    for (const q of allQuestions) {
        if (!byTopic[q.topicNumber]) {
            byTopic[q.topicNumber] = [];
        }
        byTopic[q.topicNumber].push(q.id);
    }

    // 3. Select 2 random IDs from each topic
    const selectedIds: string[] = [];
    const TOPIC_COUNT = 25;

    for (let i = 1; i <= TOPIC_COUNT; i++) {
        const ids = byTopic[i] || [];
        if (ids.length < 2) {
            // If fewer than 2, take what we have
            selectedIds.push(...ids);
        } else {
            // Shuffle and take 2
            const shuffled = shuffleArray(ids);
            selectedIds.push(shuffled[0], shuffled[1]);
        }
    }

    // 4. Fetch full details for selected IDs
    const questions = await prisma.question.findMany({
        where: {
            id: { in: selectedIds },
        },
        include: {
            answers: true,
        },
        orderBy: {
            topicNumber: 'asc',
        },
    });

    // 5. Shuffle answer order for each question
    return questions.map((q) => ({
        ...q,
        answers: shuffleArray(q.answers),
    }));
}

/**
 * Get a single question by ID with answers
 */
export async function getQuestionById(questionId: string): Promise<Question | null> {
    const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
            answers: true,
        },
    });

    return question;
}

/**
 * Get explanation for a question in specified language
 */
export async function getExplanation(
    questionId: string,
    languageCode: 'en' | 'vi' | 'es' | 'zh'
): Promise<string | null> {
    const explanation = await prisma.explanation.findUnique({
        where: {
            questionId_languageCode: {
                questionId,
                languageCode,
            },
        },
    });

    return explanation?.explanationText || null;
}

/**
 * Get correct answer for a question
 */
export async function getCorrectAnswer(questionId: string): Promise<string | null> {
    const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
            answers: true,
        },
    });

    const correctAnswer = question?.answers.find((a) => a.isCorrect);
    return correctAnswer?.id || null;
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * For future expansion: Get random questions ensuring topic coverage
 */
export async function getRandomQuestions(count: number = 50): Promise<Question[]> {
    // TODO: Implement smart randomization when question bank > 50
    // Ensure at least 1 question from each of 25 topics
    // Fill remaining slots with random questions

    return getQuizQuestions(); // For now, return all 50
}
