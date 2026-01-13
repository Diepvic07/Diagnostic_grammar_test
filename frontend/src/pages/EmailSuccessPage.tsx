import React from 'react';

interface EmailSuccessPageProps {
    onClose: () => void;
    onRetake: () => void;
}

export const EmailSuccessPage: React.FC<EmailSuccessPageProps> = ({ onClose, onRetake }) => {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-white text-[#111518] font-['Lexend'] overflow-x-hidden antialiased selection:bg-[#1da1f2] selection:text-white">
            <div className="sticky top-0 z-50 flex items-center bg-white p-4 justify-end">
                <button
                    onClick={onClose}
                    className="text-[#111518] flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="flex flex-col items-center w-full max-w-md mx-auto px-8 pt-4 pb-32 flex-grow justify-center">
                <div className="mb-10 relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-50/50 rounded-full scale-100"></div>
                    <div className="absolute inset-4 bg-green-50/80 rounded-full scale-90"></div>
                    <div className="relative w-28 h-28 bg-[#22c55e] rounded-full shadow-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-5xl font-bold" style={{ fontVariationSettings: "'FILL' 0, 'wght' 700" }}>check</span>
                    </div>
                    <div className="absolute top-10 right-10 bg-[#facc15] w-3 h-3 rounded-full"></div>
                    <div className="absolute bottom-12 left-12 bg-[#86efac] w-2 h-2 rounded-full"></div>
                    <div className="absolute top-1/2 -left-2 bg-[#fbcfe8] w-4 h-4 rounded-full"></div>
                </div>

                <h1 className="text-[#111518] text-3xl font-bold text-center mb-4 leading-tight tracking-tight">
                    Study Plan Sent!
                </h1>

                <p className="text-[#4F5B67] text-center text-lg leading-relaxed mb-12">
                    We've sent your personalized results and study plan to your inbox. Please check your spam folder if you don't see it.
                </p>

                <div className="flex flex-col items-center gap-1 mt-4 py-6 border-t border-gray-100 w-full">
                    <p className="text-sm text-gray-500">Didn't receive it?</p>
                    <a className="text-[#1da1f2] font-semibold text-sm hover:underline flex items-center gap-1" href="mailto:support@ejoy-english.com">
                        Contact Support
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                    </a>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white bg-opacity-90 backdrop-blur-sm z-40 max-w-md mx-auto">
                <button
                    onClick={onRetake}
                    className="w-full h-16 bg-[#1da1f2] hover:bg-[#1a94df] active:scale-[0.98] transition-all text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200/50 flex items-center justify-center"
                >
                    Retake the test
                </button>
                <div className="h-4"></div>
            </div>
        </div>
    );
};
