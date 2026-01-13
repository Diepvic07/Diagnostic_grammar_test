# How to Deploy the Backend (Google Apps Script)

## IMPORTANT: If you are UPDATING the script:
1.  Copy the new code from `google_apps_script/Code.js` to your existing Google Script project.
2.  **YOU MUST CREATE A NEW DEPLOYMENT.** (Simply saving is not enough).
3.  Click **Deploy** > **Manage deployments**.
4.  Click the **Edit** (pencil icon) next to your existing deployment.
5.  In the "Version" dropdown, select **New version**.
6.  Click **Deploy**.
7.  The URL will stay the same (if you edited the existing deployment). If you created a *brand new* deployment, you will get a new URL (avoid this if possible to keep the React app working).

---

## Step 1: Create the Sheet (If new)
1.  Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2.  Name it: `Grammar_Diagnostic_DB`.

## Step 2: Add the Script
1.  In the spreadsheet, click **Extensions** > **Apps Script**.
2.  Delete any code in the `Code.gs` file.
3.  Copy the code from the file `google_apps_script/Code.js` in this project and paste it there.
4.  Press `Cmd + S` (Save). Name the project "Grammar Backend".

## Step 3: Deploy as Web App
1.  Click the blue **Deploy** button (top right) > **New deployment**.
2.  Click the **Select type** (gear icon) > **Web app**.
3.  Fill in these details:
    *   **Description:** `v2 - Added Sender Name`
    *   **Execute as:** `Me` (your email).
    *   **Who has access:** `Anyone` (This is critical so the React app can send data).
4.  Click **Deploy**.
5.  **Authorize Access:** It will ask for permission. Click `Review permissions` -> Choose your account -> `Advanced` -> `Go to Grammar Backend (unsafe)` -> `Allow`.

## Step 4: Get the URL
1.  Copy the **Web App URL** (it starts with `https://script.google.com/macros/s/...`).
2.  **Paste this URL** in the chat if it changed.
