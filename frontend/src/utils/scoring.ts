import type { UserAnswer } from '../hooks/useQuizState';

export interface QuizResults {
    score: number;
    totalQuestions: number;
    percentage: number;
    passed: boolean;
    answers: UserAnswer[];
    weakTopics: WeakTopic[];
    totalTime: number;
}

export interface WeakTopic {
    topicName: string;
    correct: number;
    total: number;
    accuracy: number;
}

export const calculateScore = (answers: UserAnswer[]): QuizResults => {
    const correct = answers.filter(a => a.isCorrect).length;
    const answeredCount = answers.length;
    const totalQuestions = 50; // Always 50 questions in the quiz

    // Percentage based on answered questions
    const percentage = answeredCount > 0 ? Math.round((correct / answeredCount) * 100) : 0;
    const passed = percentage >= 70; // 70% passing threshold

    // Calculate weak topics
    const weakTopics = identifyWeakAreas(answers);

    // Calculate total time
    const totalTime = answers.reduce((sum, a) => sum + a.timeTaken, 0);

    return {
        score: correct,
        totalQuestions, // Always 50
        percentage,
        passed,
        answers,
        weakTopics,
        totalTime
    };
};

export const identifyWeakAreas = (answers: UserAnswer[]): WeakTopic[] => {
    // Group answers by grammar topic
    const topicMap: { [key: string]: UserAnswer[] } = {};

    answers.forEach(answer => {
        if (!topicMap[answer.grammarTopic]) {
            topicMap[answer.grammarTopic] = [];
        }
        topicMap[answer.grammarTopic].push(answer);
    });

    // Calculate accuracy for each topic
    const topics: WeakTopic[] = Object.entries(topicMap).map(([topicName, topicAnswers]) => {
        const correct = topicAnswers.filter(a => a.isCorrect).length;
        const total = topicAnswers.length;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

        return {
            topicName,
            correct,
            total,
            accuracy
        };
    });

    // Filter weak topics (< 70% accuracy) and sort by accuracy (weakest first)
    return topics
        .filter(t => t.accuracy < 70)
        .sort((a, b) => a.accuracy - b.accuracy);
};

export const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
