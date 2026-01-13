# Collaborative Unsubscribe Test Plan

## Phase 1: Configuration & Deployment (User)
**Objective**: Ensure the backend is accessible and ready for external traffic.
1.  Open **Google Apps Script Editor**.
2.  Click **Deploy** > **Manage deployments**.
3.  Edit the active deployment (pencil icon):
    *   **Execute as**: Set to **"Me"** (your account).
    *   **Who has access**: Set to **"Anyone"**.
4.  Click **Deploy** (or "New Version" if editing isn't an option, then Deploy).
5.  **Copy the "Web App URL"** and paste it into the chat.

## Phase 2: Automated Execution (AI Agent)
**Objective**: Verify the public-facing unsubscribe interface.
1.  **AI Action**: Receive the Web App URL.
2.  **AI Action**: Launch a browser subagent.
3.  **AI Action**: Navigate to the unsubscribe link with a test email:
    *   `[WebAppUrl]?action=unsubscribe&email=ai_test_user@example.com`
4.  **AI Action**: Verify that the browser displays the confirmation message:
    *   "Unsubscribed" header.
    *   "test_user@example.com has been removed..." message.

## Phase 3: Data Verification (User)
**Objective**: Confirm backend data persistence.
1.  Open the **Google Spreadsheet**.
2.  Check for a new tab named **"Unsubscribes"**.
3.  Verify that `ai_test_user@example.com` has been added as a new row.
