# Unsubscribe Functionality Test Plan

## 1. Objective
Verify that the Unsubscribe mechanism correctly:
1.  Accepts unsubscribe requests via HTTP GET.
2.  Creates the "Unsubscribes" sheet if missing.
3.  Records the user's email and timestamp.
4.  Suppresses future emails to that address.
5.  Displays a confirmation page to the user.

## 2. Test Environment
*   **Platform**: Google Apps Script (Backend) & Google Sheets (Database).
*   **Actor**: Anonymous User (simulating a student clicking the link).

## 3. Configuration Check (CRITICAL)
Before testing, the Deployment **MUST** match these settings for the "Unsubscribes" sheet to be created/written to by external users:
*   **Deployment Type**: Web App
*   **Execute as**: **Me** (The owner of the script)
    *   *Reason*: Anonymous users do not have permission to edit your spreadsheet. The script must execute with *your* permissions.
*   **Who has access**: **Anyone**

## 4. Test Cases

### TC-01: Internal Logic Verification (Unit Test)
*   **Method**: Run `testUnsubscribeFlow()` inside GAS Editor.
*   **Steps**:
    1.  Call `doGet` with a mock request object (`parameter: { action: 'unsubscribe', email: 'test_unsub@example.com' }`).
    2.  Check if "Unsubscribes" sheet exists.
    3.  Check if 'test_unsub@example.com' is in the last row.
    4.  Call `sendStudentReport` for 'test_unsub@example.com'.
*   **Expected**:
    *   Sheet is created.
    *   Row is present.
    *   Email sending is skipped (verified via logs).

### TC-02: External Link Verification (End-to-End)
*   **Method**: Browser Interaction.
*   **Prerequisite**: TC-01 Pass + **Top-level Deployment Update**.
*   **Steps**:
    1.  Get the **Current Web App URL**.
    2.  Construct URL: `[WebAppUrl]?action=unsubscribe&email=browser_test@example.com`.
    3.  Open in Incognito Window (to ensure no Google Auth interference).
    4.  Verify "Unsubscribed" HTML page is shown.
    5.  Check Google Sheet for 'browser_test@example.com'.
*   **Expected**:
    *   Page loads ("Unsubscribed").
    *   Row appears in Sheet.

## 5. Troubleshooting
*   **"Unable to open file"**: Indicates "Execute as" is set to "User accessing web app" instead of "Me".
*   **No Sheet Created**: Same as above, or script has triggered an error silently (check 'Executions' tab in GAS).
