import { Router, Request, Response } from 'express';
import { getSessionResults } from '../services/scoreService';
import { generateStudyPlan } from '../services/recommendationService';

const router = Router();

/**
 * GET /api/results/:sessionId
 * Get detailed quiz results with explanations
 */
router.get('/:sessionId', async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const language = (req.query.language as string) || 'en';

        if (!['en', 'vi', 'es', 'zh'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language code' });
        }

        const results = await getSessionResults(sessionId, language as any);
        res.json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

/**
 * GET /api/results/:sessionId/study-plan
 * Get personalized study plan based on results
 */
router.get('/:sessionId/study-plan', async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const language = (req.query.language as string) || 'en';

        if (!['en', 'vi', 'es', 'zh'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language code' });
        }

        const studyPlan = await generateStudyPlan(sessionId, language as any);
        res.json(studyPlan);
    } catch (error) {
        console.error('Error generating study plan:', error);
        res.status(500).json({ error: 'Failed to generate study plan' });
    }
});

export default router;
