# Test Plan: Study Plan Google Sheet Integration

## Objective
Verify that the student's personalized study plan is correctly formatted and sent to the Google Apps Script backend upon quiz completion.

## Scope
- **Frontend**: `AnalyticsService` payload construction.
- **Data Point**: `studyPlan` string field in the payload.
- **Format**: The string should be a readable summary (e.g., "Topic: X | Book: Y | Video: Z").

## Test Strategy
Since the project lacks a dedicated test runner (Jest/Vitest) and the backend is a remote Google Script, we will perform an **In-Browser Integration Test**.

### Test Steps
1.  **Mock Fetch**: Override `window.fetch` to intercept outgoing requests.
2.  **Trigger Submission**: Call the submission logic with sample "Weak Topic" data.
3.  **Verify Payload**: Inspect the intercepted request body.
    -   Check if `studyPlan` field exists.
    -   Check if it contains the expected formatted string.
4.  **Output Results**: Display the test result (PASS/FAIL) and the captured payload on the screen for verification.

## Test Cases

| ID | Test Case | Expected Result |
| :--- | :--- | :--- |
| TC01 | Submit Quiz with Weak Topics | `studyPlan` field exists in payload and is a non-empty string. |
| TC02 | Verify Study Plan Format | `studyPlan` contains "Topic:", "Book:", and "Video:" indicators. |
| TC03 | Handle Empty Weak Topics | `studyPlan` is an empty string (or handle gracefully). |

## Execution
The test will be executed by an automated agent that injects the test script into the running application and reads the result.
