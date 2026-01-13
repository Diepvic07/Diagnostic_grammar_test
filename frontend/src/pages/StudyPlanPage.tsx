import React from 'react';
import '../styles/StudyPlanPage.css';
import type { WeakTopic } from '../utils/scoring';
import { useTranslation } from '../hooks/useTranslation';
import { StudyPlanContent } from '../components/StudyPlanContent';
interface StudyPlanPageProps {
    weakTopics?: WeakTopic[];
    onContinue?: () => void;
}

export const StudyPlanPage: React.FC<StudyPlanPageProps> = ({ weakTopics, onContinue }) => {
    const { t } = useTranslation();

    return (
        <div className="study-plan-page">
            {/* Sticky Header with Blur */}
            <header className="study-plan-header">
                <button className="btn-icon" aria-label={t('common.back')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <div className="share-button-wrapper">
                    <button
                        className="btn-icon"
                        onClick={() => window.print()}
                        title="Download PDF"
                        style={{ marginRight: '8px' }}
                    >
                        <span className="material-symbols-outlined">print</span>
                    </button>
                </div>
            </header>

            <StudyPlanContent weakTopics={weakTopics} />

            {/* Fixed Bottom Button with Gradient */}
            <div className="study-plan-footer">
                <button className="btn btn-primary btn-primary--large" onClick={onContinue}>
                    {t('studyPlan.continue')}
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};
