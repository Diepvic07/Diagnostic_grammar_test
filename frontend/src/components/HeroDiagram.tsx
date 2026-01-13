import React from 'react';
import '../styles/HeroDiagram.css';

export const HeroDiagram: React.FC = () => {
    return (
        <div className="hero-diagram">
            {/* Decorative background icons */}
            <span className="material-symbols-outlined hero-bg-icon hero-bg-icon-1">spellcheck</span>
            <span className="material-symbols-outlined hero-bg-icon hero-bg-icon-2">translate</span>
            <span className="material-symbols-outlined hero-bg-icon hero-bg-icon-3">menu_book</span>
            <span className="material-symbols-outlined hero-bg-icon hero-bg-icon-4">rule</span>

            {/* Main content */}
            <div className="hero-content">
                {/* Grammar symbols row */}
                <div className="grammar-symbols">
                    <div className="symbol-circle">
                        <span className="symbol-letter">S</span>
                    </div>
                    <span className="symbol-plus">+</span>
                    <div className="symbol-circle">
                        <span className="symbol-letter">V</span>
                    </div>
                    <span className="symbol-plus">+</span>
                    <div className="symbol-circle">
                        <span className="symbol-letter">O</span>
                    </div>
                </div>

                {/* Badge row */}
                <div className="badge-row">
                    <span className="grammar-badge">SUBJECT</span>
                    <span className="grammar-badge">VERB</span>
                    <span className="grammar-badge">OBJECT</span>
                </div>
            </div>
        </div>
    );
};
