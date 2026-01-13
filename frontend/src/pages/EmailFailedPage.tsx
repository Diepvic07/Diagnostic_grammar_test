import React from 'react';

interface EmailFailedPageProps {
    onBack: () => void;
    onRetake: () => void;
}

export const EmailFailedPage: React.FC<EmailFailedPageProps> = ({ onBack, onRetake }) => {
    return (
        <div className="relative flex min-h-screen w-full flex-col pb-32 bg-white text-[#111518] font-['Lexend'] overflow-x-hidden antialiased selection:bg-[#1da1f2] selection:text-white">
            <div className="sticky top-0 z-50 flex items-center bg-white p-4">
                <button
                    onClick={onBack}
                    className="text-[#111518] flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="material-symbols-outlined font-bold">arrow_back</span>
                </button>
            </div>

            <div className="flex flex-col items-center w-full max-w-md mx-auto px-6">
                <div className="mb-10 relative flex items-center justify-center">
                    <div className="size-48 flex items-center justify-center bg-[#fff8e1] rounded-full">
                        <span className="material-symbols-outlined text-[#ffc107] text-[100px] leading-none select-none">error</span>
                    </div>
                </div>

                <h1 className="text-[#111518] text-[32px] font-bold text-center mb-4 leading-tight">
                    Oops! Something went wrong
                </h1>

                <p className="text-gray-500 text-center text-[16px] leading-relaxed mb-10 px-4">
                    We couldn't send your email right now. Please try again or reach out to our team for help.
                </p>

                <div className="w-full flex flex-col gap-4">
                    <a className="flex items-center gap-4 p-5 rounded-2xl border border-gray-50 bg-white shadow-soft hover:shadow-md transition-shadow group"
                        href="mailto:support@ejoy-english.com?subject=Issue%20Receiving%20Grammar%20Plan&body=Hello%20Support%2C%0A%0AI%20completed%20the%20test%20but%20encountered%20an%20error%20sending%20the%20results.%20Please%20help.">
                        <div className="size-12 flex items-center justify-center rounded-xl bg-[#e3f2fd] text-[#1da1f2]">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-gray-400">Email us</span>
                            <span className="text-[16px] font-bold text-[#111518]">support@ejoy-english.com</span>
                        </div>
                        <span className="material-symbols-outlined ml-auto text-gray-300 group-hover:text-[#1da1f2] transition-colors text-[20px]">chevron_right</span>
                    </a>

                    <a className="flex items-center gap-4 p-5 rounded-2xl border border-gray-50 bg-white shadow-soft hover:shadow-md transition-shadow group" href="#">
                        <div className="size-12 flex items-center justify-center rounded-xl bg-[#e3f2fd] text-[#1da1f2]">
                            <span className="material-symbols-outlined">forum</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-gray-400">Chat with us</span>
                            <span className="text-[16px] font-bold text-[#111518]">Chat on Facebook Fanpage</span>
                        </div>
                        <span className="material-symbols-outlined ml-auto text-gray-300 group-hover:text-[#1da1f2] transition-colors text-[20px]">chevron_right</span>
                    </a>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-md z-40">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={onRetake}
                        className="w-full h-16 bg-[#1da1f2] hover:bg-[#1a94df] active:scale-[0.98] transition-all text-white rounded-[32px] font-bold text-xl shadow-lg shadow-blue-200/50 flex items-center justify-center"
                    >
                        Retake the test
                    </button>
                </div>
            </div>
        </div>
    );
};
