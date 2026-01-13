import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import '../styles/LanguageSelector.css';

const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'vi' as Language, name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'es' as Language, name: 'Spanish', flag: '🇪🇸' },
    { code: 'zh' as Language, name: 'Chinese', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="lang-dropdown" ref={dropdownRef}>
            <button
                className="lang-dropdown__button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="material-symbols-outlined lang-dropdown__icon-globe">language</span>
                <span className="lang-dropdown__text">{currentLang.name}</span>
                <span className="material-symbols-outlined lang-dropdown__icon-chevron">expand_more</span>
            </button>

            {isOpen && (
                <div className="lang-dropdown__menu">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`lang-dropdown__option ${lang.code === language ? 'active' : ''}`}
                            onClick={() => handleSelect(lang.code)}
                        >
                            <span>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
