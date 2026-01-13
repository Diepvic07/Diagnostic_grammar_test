
import questionsData from '../data/questions.json';
import topicsData from '../data/topics.json';
// Import from types.ts in parent directory since src/types/index.ts doesn't exist
import type { Question, QuizResultsResponse } from '../types';

// Extended types for internal logic
interface ExtendedQuestion extends Question {
    explanations?: Array<{
        languageCode: string;
        explanationText: string;
    }>;
}

export interface GrammarTopic {
    topicNumber: number;
    topicName: string;
    studyReferenceEn: string;
    studyReferenceVi?: string;
    studyReferenceEs?: string;
    studyReferenceZh?: string;
    practiceLink?: string;
}

export interface QuizStartResponse {
    sessionId: string;
    questions: Array<{
        id: string;
        contentEn: string;
        grammarTopic: string;
        topicNumber: number;
        answers: Array<{ id: string; textEn: string }>;
    }>;
}

export interface QuizResult {
    score: number;
    totalQuestions: number;
    percentage: number;
    answersData: Array<{
        questionId: string;
        selectedAnswerId: string;
        isCorrect: boolean;
        grammarTopic: string;
        topicNumber: number;
    }>;
}

// In-memory session store
const sessions = new Map<string, any>();

export const LocalQuizLogic = {
    startQuiz: (): QuizStartResponse => {
        const sessionId = crypto.randomUUID();

        // Cast data to known type
        const allQuestions = questionsData as unknown as ExtendedQuestion[];
        const selectedIds: string[] = [];

        // Group by topic
        const byTopic: Record<number, string[]> = {};
        allQuestions.forEach(q => {
            if (!byTopic[q.topicNumber]) byTopic[q.topicNumber] = [];
            byTopic[q.topicNumber].push(q.id);
        });

        // Select 2 from each of top 25 topics
        for (let i = 1; i <= 25; i++) {
            const ids = byTopic[i] || [];
            const shuffled = [...ids].sort(() => 0.5 - Math.random());
            selectedIds.push(...shuffled.slice(0, 2));
        }

        const selectedQuestions = allQuestions
            .filter(q => selectedIds.includes(q.id))
            .sort((a, b) => a.topicNumber - b.topicNumber)
            .map(q => ({
                id: q.id,
                contentEn: q.contentEn,
                grammarTopic: q.grammarTopic,
                topicNumber: q.topicNumber,
                answers: [...(q.answers || [])].sort(() => 0.5 - Math.random()).map((a: any) => ({
                    id: a.id,
                    textEn: a.textEn
                }))
            }));

        sessions.set(sessionId, { startTime: new Date(), questions: selectedQuestions });

        return {
            sessionId,
            questions: selectedQuestions
        };
    },

    submitQuiz: (sessionId: string, answers: Array<{ questionId: string; selectedAnswerId: string }>): QuizResult => {
        const allQuestions = questionsData as unknown as ExtendedQuestion[];
        let correctCount = 0;
        const answersData = [];

        for (const answer of answers) {
            const question = allQuestions.find(q => q.id === answer.questionId);
            if (!question) continue;

            const correctAnswer = question.answers.find(a => a.isCorrect);
            const isCorrect = correctAnswer?.id === answer.selectedAnswerId;

            if (isCorrect) correctCount++;

            answersData.push({
                questionId: answer.questionId,
                selectedAnswerId: answer.selectedAnswerId,
                isCorrect,
                grammarTopic: question.grammarTopic || '',
                topicNumber: question.topicNumber || 0
            });
        }

        const result = {
            score: correctCount,
            totalQuestions: answers.length,
            percentage: Math.round((correctCount / answers.length) * 100),
            answersData
        };

        const session = sessions.get(sessionId) || {};
        sessions.set(sessionId, { ...session, result });

        return result;
    },

    getResults: (sessionId: string) => {
        const session = sessions.get(sessionId);
        if (!session || !session.result) throw new Error("Session not found");

        const answersData = session.result.answersData;
        const allQuestions = questionsData as unknown as ExtendedQuestion[];

        const detailedQuestions = answersData.map((ans: any) => {
            const q = allQuestions.find(i => i.id === ans.questionId);
            if (!q) return null;
            return {
                id: q.id,
                questionText: q.contentEn,
                userAnswer: q.answers.find(a => a.id === ans.selectedAnswerId)?.textEn || '',
                correctAnswer: q.answers.find(a => a.isCorrect)?.textEn || '',
                isCorrect: ans.isCorrect,
                explanation: q.explanations?.find(e => e.languageCode === 'en')?.explanationText || "Explanation not available.",
                grammarTopic: q.grammarTopic,
                topicNumber: q.topicNumber
            };
        }).filter(Boolean);

        return {
            ...session.result,
            questions: detailedQuestions
        };
    },

    getStudyPlan: (sessionId: string) => {
        const session = sessions.get(sessionId);
        if (!session || !session.result) throw new Error("Session not found");

        const answersData = session.result.answersData;
        const topicMap = new Map<number, { errors: number, total: number, name: string }>();

        answersData.forEach((ans: any) => {
            const current = topicMap.get(ans.topicNumber) || { errors: 0, total: 0, name: ans.grammarTopic };
            current.total++;
            if (!ans.isCorrect) current.errors++;
            topicMap.set(ans.topicNumber, current);
        });

        const weakTopics = Array.from(topicMap.values())
            .filter(t => t.errors > 0)
            .sort((a, b) => (b.errors / b.total) - (a.errors / a.total))
            .slice(0, 3)
            .map((t, index) => {
                const fullTopic = (topicsData as any[]).find(x => x.topicName === t.name) || {};

                return {
                    topicName: t.name,
                    errorCount: t.errors,
                    totalQuestions: t.total,
                    isPriority: index === 0,
                    studyReference: fullTopic.studyReferenceEn || "Review Grammar Unit",
                    practiceLink: fullTopic.practiceLink || "#"
                };
            });

        return {
            weakTopics,
            ieltsRecommendation: {
                title: 'Grammar for IELTS',
                description: 'Master grammar rules with our comprehensive textbook.',
                link: '#'
            },
            ejoyRecommendation: {
                title: 'Practice on eJOY',
                description: 'Immerse yourself in real-world English using movies and videos.',
                link: 'https://ejoy-english.com'
            }
        };
    }
};
