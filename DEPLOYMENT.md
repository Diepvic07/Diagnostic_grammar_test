# Deployment Guide for Diagnostic Grammar Test

This guide covers how to deploy the application to make it live for users. The application consists of two parts:
1.  **Frontend**: The React user interface (Vite).
2.  **Backend**: The Node.js server that handles quiz logic.
(Note: The Email/Analytics flow is handled separately by Google Apps Script and is already valid).

## Prerequisites
*   A GitHub account (you have this).
*   Accounts on **Vercel** (for Frontend) and **Render** (for Backend). Both have excellent free tiers.

---

## Part 1: Deploy Backend (Render.com)

We deploy the backend first because the frontend needs the backend's URL.

1.  **Sign up/Login** to [Render.com](https://render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository: `Diagnostic_Grammar_Test`.
4.  Configure the service:
    *   **Name**: `grammar-test-backend` (or similar).
    *   **Root Directory**: `backend` (Important!).
    *   **Environment**: `Node`.
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
    *   **Plan**: Free.
5.  Click **Create Web Service**.
6.  Wait for the deployment to finish.
7.  **Copy the Service URL** from the top left (e.g., `https://grammar-test-backend.onrender.com`).
    *   *Note: The free tier spins down after inactivity. The first request might take 50s.*

---

## Part 2: Deploy Frontend (GitHub Pages)

We use GitHub Actions to automatically deploy the frontend whenever you push to `main`.

1.  **Backend Warning**: GitHub Pages **ONLY** hosts the static frontend. It **CANNOT** run your Node.js backend. You **MUST** still deploy the backend to Render (Step 1) for the quiz to work.
2.  **Configuration**:
    *   I have already created `.github/workflows/deploy.yml` for you.
    *   I have updated `vite.config.ts` to use `/Diagnostic_grammar_test/` as the base path.
3.  **Activate GitHub Pages**:
    *   Go to your GitHub Repository Settings.
    *   Navigate to **Pages** (sidebar).
    *   Under "Build and deployment", select **Source**: `GitHub Actions`.
    *   (The workflow will run automatically on your next push).
4.  **Connect Backend**:
    *   You still need to tell the frontend where the Render backend is.
    *   In a typical Vite + GitHub Pages setup, you cannot use `.env` files dynamically at runtime without rebuilding.
    *   **Action**: You should hardcode the Render URL in `frontend/src/services/api.ts` OR setup a "Repository Variable" in GitHub Settings -> Secrets and Variables -> Actions -> Variables: `VITE_API_BASE_URL` = `https://grammar-test-backend.onrender.com/api`.
    *   (The Action uses `npm run build`, so it will bake this variable in if set in GitHub secrets/vars).

## Part 3: Verify

1.  Wait for the "Deploy Frontend to GitHub Pages" action to finish in the **Actions** tab.
2.  Visit the URL provided by GitHub (e.g., `https://diepvic07.github.io/Diagnostic_grammar_test/`).
3.  Test the quiz.
