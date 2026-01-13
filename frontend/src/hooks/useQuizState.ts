import { useState } from 'react';

export interface UserAnswer {
    questionId: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timeTaken: number;
    grammarTopic: string;
}

export interface QuizState {
    currentQuestionIndex: number;
    answers: UserAnswer[];
    startTime: number;
    endTime: number | null;
}

export const useQuizState = () => {
    const [quizState, setQuizState] = useState<QuizState>({
        currentQuestionIndex: 0,
        answers: [],
        startTime: Date.now(),
        endTime: null
    });

    const submitAnswer = (
        questionId: string,
        selectedAnswer: string,
        correctAnswer: string,
        isCorrect: boolean,
        grammarTopic: string
    ) => {
        const timeTaken = Date.now() - quizState.startTime;

        const newAnswer: UserAnswer = {
            questionId,
            selectedAnswer,
            correctAnswer,
            isCorrect,
            timeTaken,
            grammarTopic
        };

        setQuizState(prev => ({
            ...prev,
            answers: [...prev.answers, newAnswer]
        }));
    };

    const nextQuestion = () => {
        setQuizState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
    };

    const completeQuiz = (finalAnswer?: UserAnswer) => {
        setQuizState(prev => {
            const upToDateAnswers = finalAnswer ? [...prev.answers, finalAnswer] : prev.answers;
            return {
                ...prev,
                answers: upToDateAnswers,
                endTime: Date.now()
            };
        });

        // Return constructed state immediately as setter is async
        return {
            ...quizState,
            answers: finalAnswer ? [...quizState.answers, finalAnswer] : quizState.answers,
            endTime: Date.now()
        };
    };

    const resetQuiz = () => {
        setQuizState({
            currentQuestionIndex: 0,
            answers: [],
            startTime: Date.now(),
            endTime: null
        });
    };

    return {
        quizState,
        submitAnswer,
        nextQuestion,
        completeQuiz,
        resetQuiz
    };
};
