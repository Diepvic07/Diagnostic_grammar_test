import React from 'react';
import '../styles/LandingPage.css';
import { useTranslation } from '../hooks/useTranslation';
import { HeroDiagram } from '../components/HeroDiagram';

interface LandingPageProps {
    onStartQuiz: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
    const { t } = useTranslation();

    const handleStartQuiz = () => {
        onStartQuiz();
    };

    return (
        <div className="landing-page">
            {/* Main Content */}
            <main className="landing-main">
                <div className="container">
                    {/* Hero Diagram */}
                    <HeroDiagram />

                    {/* Headline */}
                    <h1 className="landing-headline">
                        {t('landing.headline')}
                    </h1>

                    {/* Subheadline */}
                    <p className="landing-subheadline">
                        {t('landing.subheadline')}
                    </p>

                    {/* Primary CTA */}
                    <button
                        className="btn btn-primary btn-cta"
                        onClick={handleStartQuiz}
                    >
                        {t('landing.startButton')}
                    </button>
                </div>
            </main>
        </div>
    );
};
