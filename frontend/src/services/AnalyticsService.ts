/**
 * AnalyticsService.ts
 * 
 * Service to send quiz results to the Google Apps Script Backend.
 * This triggers both data storage (Sheets) and email reporting.
 */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2sK5NUUTNH_IEps5eDc2-k6a0hKXqXDpCzMZI4EM633RgVJ17FAetqXCFJxu4KDQi0Q/exec";

export interface QuizResultPayload {
    attemptId: string;
    student: {
        name: string;
        email: string;
        phone?: string;
    };
    score: {
        total: number;
        max: number;
        cefr?: string;
    };
    attempt: {
        duration: number; // in seconds
    };
    weakTopics: any[]; // Now supports objects with rich data
    responses: Array<{
        questionId: string;
        topic: string;
        correct: boolean;
        selectedAnswer: string;
        timeSpent: number; // in ms
    }>;
    studyPlan?: string; // Formatted summary of weak toics and resources
}

export const AnalyticsService = {
    /**
     * Send results to the Google Backend
     */
    async submitResults(payload: QuizResultPayload): Promise<boolean> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        try {
            // We use 'no-cors' mode and 'text/plain' to avoid CORS preflight (OPTIONS) requests
            // which Google Apps Script does not handle.
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log("Analytics submitted successfully");
            return true;
        } catch (error) {
            clearTimeout(timeoutId);
            console.error("Failed to submit analytics:", error);
            return false;
        }
    }
};
