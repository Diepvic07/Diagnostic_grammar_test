import React, { useState } from 'react';
import '../styles/QuizPage.css';
import { useQuestions } from '../hooks/useQuestions';
import { useQuizState } from '../hooks/useQuizState';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

interface QuizPageProps {
    onQuizComplete?: (sessionId: string, answers: any[]) => void | Promise<void>;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onQuizComplete }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const { questions, sessionId, loading, error } = useQuestions(language);
    const { quizState, submitAnswer, nextQuestion, completeQuiz } = useQuizState();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalQuestions = questions.length;
    const currentQuestionIndex = quizState.currentQuestionIndex;

    if (loading) {
        return (
            <div className="quiz-page quiz-page--loading">
                <div className="loading-message">{t('common.loading')}</div>
            </div>
        );
    }

    if (error || questions.length === 0) {
        return (
            <div className="quiz-page quiz-page--error">
                <div className="error-message">{t('common.error')}</div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

    const handleSelectAnswer = (answerId: string) => {
        if (isSubmitting) return;
        setSelectedAnswer(answerId);
    };

    const handleNext = async () => {
        if (selectedAnswer && currentQuestion && !isSubmitting) {
            // NOTE: We don't know correctness here anymore, backend handles it.
            // Passing placeholders for now as we transition.
            const isCorrect = false;
            const correctAnswer = '';

            // Submit answer
            if (currentQuestionIndex + 1 < totalQuestions) {
                submitAnswer(
                    currentQuestion.id,
                    selectedAnswer,
                    correctAnswer,
                    isCorrect,
                    currentQuestion.grammarTopic
                );
                nextQuestion();
                setSelectedAnswer(null);
            } else {
                // Quiz complete
                setIsSubmitting(true);
                try {
                    // Add final answer to state locally first
                    const finalAnswer = {
                        questionId: currentQuestion.id,
                        selectedAnswer,
                        correctAnswer,
                        isCorrect,
                        timeTaken: 0,
                        grammarTopic: currentQuestion.grammarTopic
                    };

                    // Get full list of answers including the last one
                    const finalState = completeQuiz(finalAnswer);

                    // Construct payload for backend
                    const payload = finalState.answers.map(a => ({
                        questionId: a.questionId,
                        selectedAnswerId: a.selectedAnswer
                    }));

                    if (onQuizComplete && sessionId) {
                        await onQuizComplete(sessionId, payload);
                    }
                } catch (error) {
                    console.error('Error completing quiz:', error);
                    setIsSubmitting(false);
                }
            }
        }
    };

    const handleClose = () => {
        if (window.confirm('Are you sure you want to exit the quiz?')) {
            // TODO: Navigate to home
            console.log('Exiting quiz...');
        }
    };

    const getButtonText = () => {
        if (isSubmitting) return t('common.loading');
        if (currentQuestionIndex + 1 === totalQuestions) return t('quiz.submit');
        return t('quiz.nextQuestion');
    };

    return (
        <div className="quiz-page">
            {/* Close Button */}
            <button className="quiz-close-btn btn-icon" onClick={handleClose} aria-label="Close quiz" disabled={isSubmitting}>
                <span className="material-symbols-outlined">close</span>
            </button>

            {/* Progress Header */}
            <div className="quiz-progress-header">
                <div className="container">
                    <div className="progress-labels">
                        <span className="progress-label-current">
                            {t('quiz.question')} {currentQuestionIndex + 1} {t('quiz.of')} {totalQuestions}
                        </span>
                        <span className="progress-label-percent caption">
                            {progress}% {t('quiz.completed')}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-bar__fill"
                            style={{ width: `${progress}%` }}
                            role="progressbar"
                            aria-valuenow={currentQuestionIndex + 1}
                            aria-valuemin={1}
                            aria-valuemax={totalQuestions}
                            aria-label="Quiz progress"
                        />
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <main className="quiz-main">
                <div className="container">
                    <div className="question-card card">
                        <h2 className="question-text">{currentQuestion.contentEn}</h2>

                        <div role="radiogroup" aria-label="Answer options" className="answer-options">
                            {currentQuestion.answers.map((answer) => (
                                <div
                                    key={answer.id}
                                    className={`radio-option ${selectedAnswer === answer.id ? 'selected' : ''} ${isSubmitting ? 'disabled' : ''}`}
                                    role="radio"
                                    aria-checked={selectedAnswer === answer.id}
                                    tabIndex={isSubmitting ? -1 : 0}
                                    onClick={() => handleSelectAnswer(answer.id)}
                                    style={{ pointerEvents: isSubmitting ? 'none' : 'auto', opacity: isSubmitting ? 0.7 : 1 }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleSelectAnswer(answer.id);
                                        }
                                    }}
                                >
                                    <div className="radio-button" />
                                    {/* Backend sends textEn, but checks for language might be needed later or backend sends correct content */}
                                    <span>{answer.textEn}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Next Button */}
            <div className="quiz-footer">
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!selectedAnswer || isSubmitting}
                >
                    {getButtonText()}
                </button>
            </div>
        </div>
    );
};
