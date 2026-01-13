export interface Question {
    id: string;
    contentEn: string;
    grammarTopic: string;
    topicNumber: number;
    answers: AnswerOption[];
    explanations?: Array<{
        languageCode: string;
        explanationText: string;
    }>;
}

export interface AnswerOption {
    id: string;
    questionId: string;
    textEn: string;
    isCorrect: boolean;
}

export interface QuizStartRequest {
    language: 'en' | 'vi' | 'es' | 'zh';
}

export interface QuizStartResponse {
    sessionId: string;
    questions: Question[];
}

export interface QuizSubmitRequest {
    sessionId: string;
    answers: Array<{
        questionId: string;
        selectedAnswerId: string;
    }>;
}

export interface QuestionResult {
    id: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
    grammarTopic: string;
    topicNumber: number;
}

export interface QuizResultsResponse {
    score: number;
    totalQuestions: number;
    percentage: number;
    questions: QuestionResult[];
}
