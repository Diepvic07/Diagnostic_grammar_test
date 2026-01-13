import React, { useState } from 'react';

type Page = 'landing' | 'quiz' | 'results' | 'study-plan';

interface DemoNavProps {
    onNavigate: (page: Page) => void;
}

export const DemoNav: React.FC<DemoNavProps> = ({ onNavigate }) => {
    const [isMinimized, setIsMinimized] = useState(false);

    if (isMinimized) {
        return (
            <div style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                background: 'white',
                padding: '8px',
                borderRadius: '50%',
                boxShadow: 'var(--shadow-elevated)',
                zIndex: 1000,
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} onClick={() => setIsMinimized(false)} title="Expand Demo Navigation">
                🧭
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: 'white',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-elevated)',
            zIndex: 1000,
            width: '200px'
        }}>
            <div style={{
                marginBottom: '8px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>Demo Navigation</span>
                <button
                    onClick={() => setIsMinimized(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '0 4px'
                    }}
                >
                    −
                </button>
            </div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginBottom: '8px' }} onClick={() => onNavigate('landing')}>
                Landing
            </button>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginBottom: '8px' }} onClick={() => onNavigate('quiz')}>
                Quiz
            </button>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginBottom: '8px' }} onClick={() => onNavigate('results')}>
                Results
            </button>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => onNavigate('study-plan')}>
                Study Plan
            </button>
        </div>
    );
};
