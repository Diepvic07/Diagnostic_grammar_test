import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { WeakTopic } from '../utils/scoring';
import grammarResourcesRaw from '../data/grammar_resources.json';

// Type assertion for the imported JSON
const grammarResources = grammarResourcesRaw as Record<string, { bookDetails: string; videoUrl?: string; videoTitle?: string }>;

interface WeakTopicExtended {
    topicName: string;
    studyReference: string;
    practiceTitle: string;
    videoUrl?: string;
}

interface StudyPlanContentProps {
    weakTopics?: WeakTopic[];
}

export const StudyPlanContent: React.FC<StudyPlanContentProps> = ({ weakTopics }) => {
    const { t } = useTranslation();

    // Convert WeakTopic[] to WeakTopicExtended[] with real study references
    // If no weak topics (e.g. direct navigation), show some demo topics
    const topicsToDisplay = (weakTopics && weakTopics.length > 0)
        ? weakTopics
        : [
            { topicName: 'Present tenses', correct: 0, total: 0, accuracy: 0 },
            { topicName: 'Past tenses 1', correct: 0, total: 0, accuracy: 0 },
            { topicName: 'Future 1', correct: 0, total: 0, accuracy: 0 }
        ];

    const displayTopics: WeakTopicExtended[] = topicsToDisplay.map((topic) => {
        const resource = grammarResources[topic.topicName];
        return {
            topicName: topic.topicName,
            studyReference: resource?.bookDetails || t('studyPlan.studyReferenceDefault', { topic: topic.topicName }),
            practiceTitle: resource?.videoTitle || t('studyPlan.practiceButton', { topic: topic.topicName }),
            videoUrl: resource?.videoUrl
        };
    });

    return (
        <main className="study-plan-main">
            {/* Title Section */}
            <div className="content-section">
                <h2 className="plan-headline">
                    {t('studyPlan.personalizedTitle')}
                </h2>
                <p className="plan-subtitle">
                    {t('studyPlan.subtitle')}
                </p>
            </div>

            {/* Recommendation Cards */}
            <div className="recommendation-cards">
                {/* Book Card */}
                <a
                    href="https://books.google.com.vn/books?id=cFGKilTxYNEC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recommendation-card recommendation-card--book"
                >
                    <img
                        src="/grammar-ielts-cover.jpg"
                        alt="Grammar for IELTS Book Cover"
                        className="recommendation-card__image"
                    />
                    <div className="recommendation-card__overlay"></div>
                    <div className="recommendation-card__content">
                        <div className="recommendation-card__icon-badge recommendation-card__icon-badge--book">
                            <span className="material-symbols-outlined">menu_book</span>
                        </div>
                        <div className="recommendation-card__text">
                            <p className="recommendation-card__label">{t('studyPlan.ieltsLabel')}</p>
                            <h4 className="recommendation-card__title">{t('studyPlan.ieltsTitle')}</h4>
                        </div>
                    </div>
                </a>

                {/* eJOY Card */}
                <a
                    href="https://ejoy-english.com/epic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recommendation-card recommendation-card--ejoy"
                >
                    <img
                        src="/epic-ejoy.svg"
                        alt="eJOY Web Interface"
                        className="recommendation-card__image"
                    />
                    <div className="recommendation-card__overlay recommendation-card__overlay--ejoy"></div>
                    <div className="recommendation-card__content">
                        <div className="recommendation-card__icon-badge recommendation-card__icon-badge--ejoy">
                            <span className="material-symbols-outlined">smart_display</span>
                        </div>
                        <div className="recommendation-card__text">
                            <p className="recommendation-card__label">{t('studyPlan.ejoyLabel')}</p>
                            <h4 className="recommendation-card__title">{t('studyPlan.ejoyTitle')}</h4>
                        </div>
                    </div>
                </a>
            </div>

            {/* Section Header */}
            <h3 className="section-header">{t('studyPlan.weakTopics')}</h3>

            {/* Topic Cards */}
            <div className="topic-cards">
                {displayTopics.map((topic, index) => (
                    <div key={index} className="topic-card">
                        <div className="topic-card__header">
                            <h4 className="topic-card__name">{topic.topicName}</h4>
                        </div>

                        {/* Study Reference */}
                        <div className="topic-card__resource">
                            <div className="topic-card__icon-badge topic-card__icon-badge--book">
                                <span className="material-symbols-outlined">menu_book</span>
                            </div>
                            <div className="topic-card__resource-content">
                                <span className="topic-card__resource-label">{t('studyPlan.studyReference')}</span>
                                <p className="topic-card__resource-title">{topic.studyReference}</p>
                            </div>
                        </div>

                        {/* Practice */}
                        <div className="topic-card__resource">
                            <div className="topic-card__icon-badge topic-card__icon-badge--video">
                                <span className="material-symbols-outlined">smart_display</span>
                            </div>
                            <div className="topic-card__resource-content">
                                <span className="topic-card__resource-label">{t('studyPlan.practiceOnEjoy')}</span>
                                <a
                                    href={topic.videoUrl || "#"}
                                    target={topic.videoUrl ? "_blank" : undefined}
                                    rel={topic.videoUrl ? "noopener noreferrer" : undefined}
                                    className="topic-card__resource-link"
                                >
                                    {topic.practiceTitle}
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
