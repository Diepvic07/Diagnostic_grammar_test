import React, { useState } from 'react';
import '../styles/EmailRequestPage.css';
import '../styles/StudyPlanPage.css'; // Import styles for StudyPlanContent
import { useTranslation } from '../hooks/useTranslation';
import { StudyPlanContent } from '../components/StudyPlanContent';
import type { WeakTopic } from '../utils/scoring';

interface EmailRequestPageProps {
    onBack: () => void;
    onSubmit: (data: { name: string; email: string; phone?: string }) => void;
    isLoading: boolean;
    weakTopics?: WeakTopic[];
}

export const EmailRequestPage: React.FC<EmailRequestPageProps> = ({ onBack, onSubmit, isLoading, weakTopics }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Phone Validation (10-15 digits, allows +, -, space, brackets)
        const phoneRegex = /^[\d\+\-\s\(\)]{10,20}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            setError('Please enter a valid phone number');
            return;
        }

        setError(null);
        onSubmit(formData);
    };

    return (
        <div className="email-request-page">
            {/* Hidden Printable Content */}
            <div className="print-only">
                <div className="print-header">
                    <h1 className="print-title">{t('studyPlan.personalizedTitle')}</h1>
                </div>
                <StudyPlanContent weakTopics={weakTopics} />
            </div>

            {/* Screen Content */}
            <div className="screen-only">
                {/* Header */}
                <div className="email-header">
                    <button
                        onClick={onBack}
                        className="btn-icon"
                        aria-label="Back"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">
                        Get Your Plan & Gift Code
                    </h2>
                </div>

                <div className="w-full max-w-xl mx-auto px-5 pt-6 flex flex-col gap-8 pb-10">
                    {/* Immediate Access Card */}
                    <div className="w-full flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Immediate Access</h3>
                        <div className="access-card">
                            <div className="icon-container">
                                <span className="material-symbols-outlined">print</span>
                            </div>
                            <h4 className="text-lg font-bold text-[#111518]">Download Free PDF Plan</h4>
                            <p className="text-sm text-gray-500 mt-2 mb-5">Get your personalized grammar diagnostic results as a PDF instantly.</p>
                            <button
                                className="btn-pdf"
                                onClick={() => window.print()}
                            >
                                <span className="material-symbols-outlined text-xl">download</span>
                                Download PDF
                            </button>
                            <span className="text-[10px] font-bold text-green-600 mt-3 uppercase tracking-wider">Free & Ready Now</span>
                        </div>
                    </div>

                    {/* Email & Gift Card */}
                    <div className="w-full flex flex-col gap-3">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email & Special Gift</h3>
                            <div className="flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-red-600 uppercase">Only 100 left!</span>
                            </div>
                        </div>

                        <div className="gift-card">
                            <div className="ribbon">
                                LIMITED OFFER
                            </div>
                            <div className="gift-hero">
                                <div className="gift-icon-box">
                                    <span className="material-symbols-outlined">card_giftcard</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-[#111518]">Email Results & Get 7-Day Gift</h4>
                                    <p className="text-sm text-gray-500 mt-1">Receive your summary and a gift code for immersive video lessons.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1" htmlFor="fullname">Full Name</label>
                                    <input
                                        id="fullname"
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className="ios-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1" htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        className="ios-input"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1" htmlFor="phone">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className={`ios-input ${error ? 'border-red-500 focus:border-red-500 focus:shadow-none' : ''}`}
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, phone: e.target.value }));
                                            if (error) setError(null);
                                        }}
                                    />
                                    {error && <span className="text-[10px] text-red-500 ml-1">{error}</span>}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="submit-btn"
                                    >
                                        {isLoading ? 'Sending...' : 'Send My Gift Code'}
                                        <span className="material-symbols-outlined text-xl">send</span>
                                    </button>
                                    <p className="text-[10px] text-gray-400 text-center mt-4">We'll never share your details with third parties.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
