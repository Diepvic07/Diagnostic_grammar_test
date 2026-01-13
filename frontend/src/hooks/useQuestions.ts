import { useState, useEffect } from 'react';
import type { Question } from '../types';
import { questions as localQuestions } from '../data/questions';

export const useQuestions = (language: string) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadQuestions = async () => {
            // Simulate network delay for UX (optional, can be removed)
            await new Promise(resolve => setTimeout(resolve, 500));

            try {
                // Transform local questions if necessary to match expected type
                // The localQuestions export matches Question interface mostly,
                // but we might need to map it if types strictly mismatch or for multi-language.
                const mappedQuestions = localQuestions.map(q => ({
                    ...q,
                    topicNumber: 0 // Default or map if available
                })) as unknown as Question[];

                setQuestions(mappedQuestions);
                setSessionId(crypto.randomUUID());
                setLoading(false);
            } catch (err: unknown) {
                console.error(err);
                setError('Failed to load questions');
                setLoading(false);
            }
        };

        loadQuestions();
    }, [language]); // eslint-disable-next-line react-hooks/exhaustive-deps

    return { questions, sessionId, loading, error };
};
