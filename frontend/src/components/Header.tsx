import React from 'react';
import '../styles/LandingPage.css';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
    return (
        <header className="landing-header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon-container">
                            <img src={`${import.meta.env.BASE_URL}ejoy-logo.png`} alt="eJOY Logo" className="logo-icon-img" />
                        </div>
                        <span className="logo-text">eJOY English</span>
                    </div>
                    <LanguageSelector />
                </div>
            </div>
        </header>
    );
};
