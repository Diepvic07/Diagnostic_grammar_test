import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getQuizQuestions } from '../services/questionService';
import { calculateScore } from '../services/scoreService';
import type { QuizStartRequest, QuizSubmitRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/quiz/start
 * Initialize a new quiz session
 */
router.post('/start', async (req: Request, res: Response) => {
    try {
        const { language } = req.body as QuizStartRequest;

        if (!['en', 'vi', 'es', 'zh'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language code' });
        }

        // Create new session
        const session = await prisma.userSession.create({
            data: {
                selectedLanguage: language,
                totalQuestions: 50,
            },
        });

        // Get quiz questions
        const questions = await getQuizQuestions();

        res.json({
            sessionId: session.id,
            questions: questions.map((q) => ({
                id: q.id,
                contentEn: q.contentEn,
                grammarTopic: q.grammarTopic,
                topicNumber: q.topicNumber,
                answers: q.answers.map((a) => ({
                    id: a.id,
                    textEn: a.textEn,
                })),
            })),
        });
    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ error: 'Failed to start quiz' });
    }
});

/**
 * POST /api/quiz/submit
 * Submit quiz answers and get score
 */
router.post('/submit', async (req: Request, res: Response) => {
    try {
        const { sessionId, answers } = req.body as QuizSubmitRequest;

        if (!sessionId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const result = await calculateScore(sessionId, answers);

        res.json({
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: result.percentage,
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        if (error instanceof Error) {
            console.error(error.stack);
        }
        res.status(500).json({ error: 'Failed to submit quiz', details: String(error) });
    }
});

/**
 * GET /api/quiz/questions
 * Get all quiz questions (for testing)
 */
router.get('/questions', async (req: Request, res: Response) => {
    try {
        const questions = await getQuizQuestions();
        res.json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

export default router;
