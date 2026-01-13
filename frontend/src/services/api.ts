// import type { QuizSubmitRequest, QuizStartRequest, QuizStartResponse, QuizResultsResponse } from '../types';

import { LocalQuizLogic } from './localQuizLogic';

export const api = {
    startQuiz: async (language: string) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return LocalQuizLogic.startQuiz();
    },

    submitQuiz: async (sessionId: string, answers: Array<{ questionId: string; selectedAnswerId: string }>) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return LocalQuizLogic.submitQuiz(sessionId, answers);
    },

    getResults: async (sessionId: string, language: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return LocalQuizLogic.getResults(sessionId);
    },

    getStudyPlan: async (sessionId: string, language: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return LocalQuizLogic.getStudyPlan(sessionId);
    }
};
