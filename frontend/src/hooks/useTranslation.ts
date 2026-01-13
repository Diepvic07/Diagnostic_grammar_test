import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const useTranslation = () => {
    const { language } = useLanguage();

    // Get translation function
    const t = (key: string, params?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let value: any = translations[language] || translations['en'];

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                console.warn(`Translation missing for key: ${key} in language: ${language}`);
                // Fallback to English
                let fallback: any = translations['en'];
                for (const fk of keys) {
                    fallback = fallback?.[fk];
                }
                value = fallback || key;
                break; // Exit loop found or not
            }
        }

        let result = (value || key) as string;

        // Interpolation
        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
            });
        }

        return result;
    };

    return { t, language };
};
