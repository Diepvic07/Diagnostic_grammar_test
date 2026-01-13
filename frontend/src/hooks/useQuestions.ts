import { useState, useEffect } from 'react';
import type { Question } from '../types';
import { api } from '../services/api';

export const useQuestions = (language: string) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const data = await api.startQuiz(language);
                setQuestions(data.questions);
                setSessionId(data.sessionId);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load questions');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [language]);

    return { questions, sessionId, loading, error };
};
