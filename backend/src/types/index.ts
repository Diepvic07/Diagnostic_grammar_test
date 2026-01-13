export interface Question {
    id: string;
    contentEn: string;
    grammarTopic: string;
    topicNumber: number;
    answers: AnswerOption[];
}

export interface AnswerOption {
    id: string;
    questionId: string;
    textEn: string;
    isCorrect: boolean;
}

export interface Explanation {
    id: string;
    questionId: string;
    languageCode: 'en' | 'vi' | 'es' | 'zh';
    explanationText: string;
}

export interface UserSession {
    id: string;
    selectedLanguage: 'en' | 'vi' | 'es' | 'zh';
    score?: number;
    totalQuestions: number;
    answersData?: UserAnswer[];
    createdAt: Date;
    completedAt?: Date;
}

export interface UserAnswer {
    questionId: string;
    selectedAnswerId: string;
    isCorrect: boolean;
    grammarTopic: string;
    topicNumber: number;
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

export interface QuizSubmitResponse {
    score: number;
    totalQuestions: number;
    percentage: number;
}

export interface QuizResultsResponse {
    score: number;
    totalQuestions: number;
    percentage: number;
    questions: QuestionResult[];
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

export interface WeakTopic {
    topicName: string;
    topicNumber: number;
    errorCount: number;
    totalQuestions: number;
    isPriority: boolean;
    studyReference: string;
    studyReferenceLink: string;
    practiceTitle: string;
    practiceLink: string;
}

export interface StudyPlanResponse {
    weakTopics: WeakTopic[];
    ieltsRecommendation: {
        title: string;
        description: string;
        link: string;
    };
    ejoyRecommendation: {
        title: string;
        description: string;
        link: string;
    };
}
