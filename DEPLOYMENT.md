# Deployment Guide for Diagnostic Grammar Test (Static Version)

This guide covers how to deploy the application as a **fully static** web app using GitHub Pages.
No backend server is required. All quiz logic runs in the browser.

## Limitations (Static App)
*   **Security**: Since all quiz logic and answers are loaded in the browser, a technically savvy user could inspect the code to find correct answers. This is usually acceptable for a self-assessment/lead-gen tool.
*   **Session Persistence**: If a user refreshes the page mid-quiz, their progress will be lost (unlike the backend version which could persist sessions).
*   **Analytics**: We use Google Apps Script for analytics/email, so this **still works** perfectly even on a static site!

---

## Part 1: Deploy to GitHub Pages

We use GitHub Actions to automatically deploy the frontend whenever you push to `main`.

1.  **Configuration**:
    *   I have already created `.github/workflows/deploy.yml` for you.
    *   I have updated `vite.config.ts` to use `/Diagnostic_grammar_test/` as the base path.
    *   I have migrated the quiz logic to run locally in the browser (`localQuizLogic.ts`).

2.  **Activate GitHub Pages**:
    *   Go to your GitHub Repository Settings.
    *   Navigate to **Pages** (sidebar).
    *   Under "Build and deployment", select **Source**: `GitHub Actions`.
    *   (The workflow will run automatically on your next push).

## Part 2: Verify

1.  Wait for the "Deploy Frontend to GitHub Pages" action to finish in the **Actions** tab of your repo.
2.  Visit the URL provided by GitHub (e.g., `https://diepvic07.github.io/Diagnostic_grammar_test/`).
3.  Test the quiz flow.
