# Automation Sanity Test Plan

**Executor:** AI Agent (Browser Subagent)
**Target URL:** `http://localhost:5173`
**Date:** 2026-01-13

## Objective
Verify the critical "Happy Path" of the Diagnostic Grammar Test application, ensuring major components load, interact correctly, and navigation works as expected.

## Test Scenarios

### 1. Landing Page Sanity
*   **Action:** Load `http://localhost:5173`.
*   **Checks:**
    *   Common Header is present (eJOY Logo/Text).
    *   Main Headline is visible ("English Grammar Diagnostic Test").
    *   "Start Quiz" button is compliant (Blue Pill shape, text "Start Quiz").
    *   `DemoNav` is visible in bottom-right (for test control).

### 2. Quiz Interface Functionality
*   **Action:** Click "Start Quiz" button on Landing Page.
*   **Checks:**
    *   Navigation to Quiz view occurs.
    *   Question Card is visible.
    *   "Question 1 of 50" (or similar progress) is displayed.
    *   Answer options are selectable (Hover/Click styles).
    *   "Next Question" button becomes active/visible after selection.
*   **Action:** Select an answer and click "Next".
*   **Checks:**
    *   Progress updates to "Question 2 of 50".

### 3. Results Page Logic (Fast Track)
*   **Action:** context: Application provides `window.fastTrackQuiz()` to simulate completing the 50 questions. Execute this via console or use `DemoNav` -> `Results`.
    *   *Preferred Method:* Click `Results` in `DemoNav` or inject `window.fastTrackQuiz()`.
*   **Checks:**
    *   Navigation to Results view occurs.
    *   Header "Test Complete!" is visible.
    *   Total Score is displayed (Mock value: 42/50 or 84%).
    *   "Review Your Answers" section is present.
    *   "View Study Plan" button is present.

### 4. Study Plan & Recommendations
*   **Action:** Click "View Study Plan" (or `Continue`) button on Results Page.
*   **Checks:**
    *   Navigation to Study Plan view occurs.
    *   Header "Your Personalized Study Plan" is visible.
    *   Weak Topics are listed (based on mock results).
    *   Each topic card has:
        *   Topic Name.
        *   "Study Reference" (Book unit).
        *   "Practice" link/button.
    *   "Download PDF" button is present.
*   **Action:** Click "Download PDF".
*   **Checks:**
    *   Verify print dialog is triggered (or console log if mocked).
    *   Verify no visual crash or error.
*   **Action:** Click "Get Full Report" (or `Email & Special Gift` CTA).

### 5. Email Request Flow & Submission
*   **Action:** Navigate to Email Request form.
*   **Checks:**
    *   Input fields for Name, Email, and Phone number are present.
    *   Submit button exists.
*   **Action:** Enter valid Name (`Test User`), Email (`test@example.com`), and Phone (`0123456789`).
*   **Action:** Click Submit.
*   **Checks:**
    *   Loading state (spinner/button disable) appears.
    *   Success message is displayed ("Success" or "Thank you").
    *   Verify no console errors related to API calls.

## Execution Method
The AI Agent will launch a browser instance, perform these steps sequentially, and record observations.
