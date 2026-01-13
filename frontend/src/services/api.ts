// import type { QuizSubmitRequest, QuizStartRequest, QuizStartResponse, QuizResultsResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
    startQuiz: async (language: string) => {
        const response = await fetch(`${API_BASE_URL}/quiz/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language }),
        });
        if (!response.ok) throw new Error('Failed to start quiz');
        return response.json();
    },

    submitQuiz: async (sessionId: string, answers: Array<{ questionId: string; selectedAnswerId: string }>) => {
        const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, answers }),
        });
        if (!response.ok) throw new Error('Failed to submit quiz');
        return response.json();
    },

    getResults: async (sessionId: string, language: string) => {
        const response = await fetch(`${API_BASE_URL}/results/${sessionId}?language=${language}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        return response.json();
    },

    getStudyPlan: async (sessionId: string, language: string) => {
        const response = await fetch(`${API_BASE_URL}/results/${sessionId}/study-plan?language=${language}`);
        if (!response.ok) throw new Error('Failed to fetch study plan');
        return response.json();
    }
};
