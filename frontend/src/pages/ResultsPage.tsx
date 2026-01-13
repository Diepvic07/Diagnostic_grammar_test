import React, { useState } from 'react';
import '../styles/ResultsPage.css';
import { useTranslation } from '../hooks/useTranslation';
import type { QuizResultsResponse, QuestionResult } from '../types';

interface ResultsPageProps {
    results?: QuizResultsResponse | null;
    onRetakeQuiz?: () => void;
    onViewStudyPlan?: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
    results,
    onRetakeQuiz,
    onViewStudyPlan
}) => {
    const { t } = useTranslation();
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    // Use real data if available, otherwise fall back to mock data for demo
    const score = results?.score ?? 38;
    const totalQuestions = results?.totalQuestions ?? 50;
    const percentage = results?.percentage ?? 76;
    const backendQuestions = results?.questions ?? [];

    // backendQuestions matches QuestionResult structure mostly
    const displayResults: QuestionResult[] = backendQuestions.map(q => ({
        id: q.id,
        questionText: q.questionText,
        userAnswer: q.userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: q.isCorrect,
        explanation: q.explanation,
        grammarTopic: q.grammarTopic,
        topicNumber: q.topicNumber
    }));

    // Mock data for demo if no real results
    const mockResults: QuestionResult[] = [
        {
            id: 'q5',
            questionText: 'By this time next year, I ___ graduated.',
            userAnswer: 'will have',
            correctAnswer: 'will have been',
            isCorrect: false,
            explanation: 'We use the Future Perfect Simple for actions that will be finished by a certain time in the future. The passive voice requires "been".',
            grammarTopic: 'Future Perfect',
            topicNumber: 5
        },
        // ... (keeping other mocks same for brevity if prefered, but for replace tool I should keep them or just rely on 'results' being passed)
        {
            id: 'q6',
            questionText: 'She plays the piano every day.',
            userAnswer: 'plays',
            correctAnswer: 'plays',
            isCorrect: true,
            explanation: 'The Present Simple tense is used for habitual actions and routines. The adverb "every day" indicates a regular habit, so "plays" is the correct form.',
            grammarTopic: 'Present Simple',
            topicNumber: 6
        },
        {
            id: 'q7',
            questionText: 'They are going to the mall right now.',
            userAnswer: 'are going',
            correctAnswer: 'are going',
            isCorrect: true,
            explanation: 'The Present Continuous tense (am/is/are + verb-ing) is used for actions happening at the moment of speaking. "Right now" clearly indicates the action is in progress.',
            grammarTopic: 'Present Continuous',
            topicNumber: 7
        },
        {
            id: 'q8',
            questionText: 'If I were you, I would accept the offer.',
            userAnswer: 'will accept',
            correctAnswer: 'would accept',
            isCorrect: false,
            explanation: 'In conditional type 2, we use "would" + base verb in the main clause.',
            grammarTopic: 'Conditionals',
            topicNumber: 8
        },
    ];

    const finalDisplayResults = displayResults.length > 0 ? displayResults : mockResults;

    const toggleExpand = (questionId: string) => {
        setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
    };

    const handleRetake = () => {
        if (onRetakeQuiz) {
            onRetakeQuiz();
        }
    };

    const handleViewPlan = () => {
        if (onViewStudyPlan) {
            onViewStudyPlan();
        }
    };

    return (
        <div className="results-page">
            {/* Header */}
            <header className="results-header">
                <button className="btn-icon" aria-label={t('common.back')}>
                    ←
                </button>
                <h1 className="results-title">{t('results.title')}</h1>

            </header>

            <main className="results-main">
                {/* Celebration Section */}
                <div className="celebration-section">
                    <h2 className="celebration-title">{t('results.testComplete')}</h2>
                    <p className="celebration-subtitle">
                        {t('results.congratulations')}<br />
                        {t('results.pushStrong')}
                    </p>
                </div>

                {/* Score Card */}
                <div className="score-card">
                    {/* Score Display */}
                    <div className="score-display">
                        <div className="score-number-container">
                            <span className="score-number">{score}</span>
                            <span className="score-total">/{totalQuestions}</span>
                        </div>
                        <span className="score-total-label">{t('results.totalScore')}</span>
                    </div>

                    {/* Accuracy Section */}
                    <div className="accuracy-section">
                        <div className="accuracy-labels">
                            <span>{t('results.accuracy')}</span>
                            <span>{percentage}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: `${percentage}%` }} />
                        </div>
                    </div>



                    {/* Retake Button */}
                    <button className="btn-retake" onClick={handleRetake} style={{ marginTop: '10px' }}>
                        <span className="btn-retake-icon">↻</span>
                        <span>{t('results.retakeTest')}</span>
                    </button>
                </div>

                {/* Review Section */}
                <section className="review-section">
                    <h2 className="review-title">{t('results.reviewAnswers')}</h2>

                    {/* Iterate over finalDisplayResults */}
                    {finalDisplayResults.map((result, index) => {
                        const isExpanded = expandedQuestion === result.id;
                        const questionNumber = result.topicNumber || (index + 1);
                        const truncatedQuestion = result.questionText.length > 45
                            ? result.questionText.substring(0, 45) + '...'
                            : result.questionText;

                        // Helper to render question with filled answer for correct ones
                        const renderQuestionWithAnswer = () => {
                            // Regex to find underscores (3 or more)
                            const parts = result.questionText.split(/_{3,}/);
                            if (parts.length > 1) {
                                return (
                                    <span>
                                        {parts.map((part, i) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < parts.length - 1 && (
                                                    <span className="font-bold text-primary dark:text-primary-light">
                                                        {result.correctAnswer}
                                                    </span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                );
                            }
                            return result.questionText;
                        };

                        return (
                            <div key={result.id} className="answer-review-container">
                                {isExpanded ? (
                                    /* Expanded Answer Card */
                                    <div
                                        className={`answer-card-expanded ${result.isCorrect ? 'answer-card-expanded--correct' : 'answer-card-expanded--incorrect'}`}
                                        onClick={() => toggleExpand(result.id)}
                                    >
                                        {/* Header */}
                                        <div className="answer-card-header">
                                            <div className="answer-card-header-left">
                                                <div className={`answer-card-icon-container ${result.isCorrect ? 'answer-card-collapsed--correct' : 'answer-card-collapsed--incorrect'}`}>
                                                    <div className="answer-card-icon">
                                                        <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                            {result.isCorrect ? 'check' : 'close'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="answer-card-meta-row">
                                                    <span className="answer-card-question-number">
                                                        {t('results.questionLabel')} {questionNumber}
                                                    </span>
                                                    <span className="grammar-badge">
                                                        {result.grammarTopic}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-[#dbe2e6] cursor-pointer">expand_less</span>
                                        </div>

                                        {/* Content */}
                                        <div className="answer-card-expanded-content">
                                            <h3 className="answer-question">{result.questionText}</h3>

                                            {/* User Answer (only for incorrect) */}
                                            {!result.isCorrect && (
                                                <div className="answer-section answer-section--incorrect">
                                                    <span className="answer-label">
                                                        {t('results.yourAnswer')}
                                                    </span>
                                                    <div className="answer-box">
                                                        <span>{result.userAnswer}</span>
                                                        <span className="material-symbols-outlined answer-icon">cancel</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Correct Answer */}
                                            <div className="answer-section answer-section--correct">
                                                <span className="answer-label">
                                                    {t('results.correctAnswer')}
                                                </span>
                                                <div className="answer-box">
                                                    <span>{result.correctAnswer}</span>
                                                    <span className="material-symbols-outlined answer-icon">check_circle</span>
                                                </div>
                                            </div>

                                            {/* Explanation (if available) */}
                                            {result.explanation && (
                                                <div className="explanation-section">
                                                    <div className="explanation-icon-container">
                                                        <span className="explanation-icon">💡</span>
                                                    </div>
                                                    <div className="explanation-content">
                                                        <span className="explanation-label">
                                                            {result.isCorrect ? t('results.whyCorrect') : t('results.whyWrong')}
                                                        </span>
                                                        <div className="explanation-text">{result.explanation}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* Collapsed Answer Card */
                                    <div
                                        className={`answer-card-collapsed ${result.isCorrect ? 'answer-card-collapsed--correct' : 'answer-card-collapsed--incorrect'}`}
                                        onClick={() => toggleExpand(result.id)}
                                    >
                                        <div className="answer-card-left">
                                            <div className={`answer-card-icon-container ${result.isCorrect ? 'answer-card-collapsed--correct' : 'answer-card-collapsed--incorrect'}`}>
                                                <div className="answer-card-icon">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                        {result.isCorrect ? 'check' : 'close'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="answer-card-text-content">
                                                <div className="answer-card-meta-row">
                                                    <span className="answer-card-question-number">
                                                        {t('results.questionLabel')} {questionNumber}
                                                    </span>
                                                    <span className="grammar-badge">
                                                        {result.grammarTopic}
                                                    </span>
                                                </div>
                                                <div className="answer-card-preview">
                                                    {isExpanded ? result.questionText : (result.isCorrect ? renderQuestionWithAnswer() : truncatedQuestion)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-[#dbe2e6]">expand_more</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>
            </main>

            {/* Continue Button */}
            <div className="results-footer">
                <button className="btn" onClick={handleViewPlan}>
                    <span>{t('results.viewStudyPlan')}</span>
                    <span className="btn-arrow">→</span>
                </button>
            </div>
        </div>
    );
};
