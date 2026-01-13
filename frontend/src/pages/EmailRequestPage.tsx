import React, { useState } from 'react';

interface EmailRequestPageProps {
    onBack: () => void;
    onSubmit: (data: { name: string; email: string; phone?: string }) => void;
    isLoading: boolean;
}

export const EmailRequestPage: React.FC<EmailRequestPageProps> = ({ onBack, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col pb-24 bg-white text-[#111518] font-sans">
            <div className="sticky top-0 z-50 flex items-center bg-white p-4 justify-between">
                <button
                    onClick={onBack}
                    className="text-[#111518] flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                    Save Your Results
                </h2>
                <div className="size-12"></div>
            </div>

            <div className="flex flex-col items-center w-full max-w-md mx-auto px-6 pt-6">
                <div className="mb-8 relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-50 rounded-full scale-110 opacity-50"></div>
                    <div className="relative w-40 h-40 bg-[#f9f3e9] rounded-full shadow-soft flex items-center justify-center border-4 border-white">
                        <span className="material-symbols-outlined text-[#1da1f2] text-7xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}>forward_to_inbox</span>
                    </div>
                </div>

                <h1 className="text-[#111518] text-2xl font-bold text-center mb-8 leading-tight">
                    Where should we send<br />your plan?
                </h1>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1" htmlFor="fullname">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            required
                            placeholder="Ex: John Doe"
                            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-base text-[#111518] placeholder:text-gray-400 focus:border-[#1da1f2] focus:ring-[#1da1f2] focus:bg-white transition-all shadow-sm outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1" htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="Ex: john@example.com"
                            className="w-full h-14 rounded-2xl border border-gray-100 bg-gray-50 px-4 text-base text-[#111518] placeholder:text-gray-400 focus:border-[#1da1f2] focus:ring-[#1da1f2] focus:bg-white transition-all shadow-sm outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1" htmlFor="phone">
                            Phone Number <span className="text-gray-400 font-normal text-xs ml-0.5">(Optional)</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Ex: +1 (555) 000-0000"
                            className="w-full h-14 rounded-2xl border border-gray-100 bg-gray-50 px-4 text-base text-[#111518] placeholder:text-gray-400 focus:border-[#1da1f2] focus:ring-[#1da1f2] focus:bg-white transition-all shadow-sm outline-none"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-transparent z-40">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-[#1da1f2] hover:bg-[#1a94df] active:scale-[0.98] transition-all text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Sending...' : 'Send My Study Plan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
