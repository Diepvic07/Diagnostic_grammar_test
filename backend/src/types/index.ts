export interface Question {
    id: string;
    contentEn: string;
    grammarTopic: string;
    topicNumber: number;
    answers: AnswerOption[];
    explanations: Explanation[];
}

export interface AnswerOption {
    id: string;
    questionId?: string; // Optional in JSON
    textEn: string;
    isCorrect: boolean;
}

export interface Explanation {
    id?: string; // Optional in JSON
    questionId?: string; // Optional in JSON
    languageCode: 'en' | 'vi' | 'es' | 'zh';
    explanationText: string;
}

export interface UserSession {
    id: string;
    selectedLanguage: 'en' | 'vi' | 'es' | 'zh';
    score?: number;
    totalQuestions: number;
    answersData?: UserAnswer[] | string; // Support both for backward comapt if needed, but we prefer object
    createdAt: Date | string; // JSON stores dates as strings
    completedAt?: Date | string;
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

export interface GrammarTopic {
    topicNumber: number;
    topicName: string;
    minimumQuestions?: number;
    studyReferenceEn: string;
    studyReferenceVi: string;
    studyReferenceEs: string;
    studyReferenceZh: string;
    practiceLink: string;
}
