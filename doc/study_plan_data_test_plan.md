# Automation Test Plan: Study Plan Data Integration
**Date:** 2026-01-12
**Reference:** `doc/design_specification.md`, `frontend/src/data/grammar_resources.json`
**Executor:** AI Agent (Browser Interaction & DOM Inspection)

## 1. Objective
To verify that the Study Plan screen correctly displays specific Book Unit information and eJOY Video links for given grammar topics, replacing the previous mock data.

## 2. Test Environment
*   **URL:** Development Server (e.g., http://localhost:5173)
*   **Tools:** AI Agent with `browsing` capabilities.

## 3. Test Data (Sample)
Based on `grammar_resources.json`:
*   **Topic:** "Present tenses"
    *   **Expected Book Details:** "Unit 1: Present tenses - Page 1"
    *   **Expected Video URL:** "https://ejoy-english.com/epic/videoEpic/7199"
    *   **Expected Video Title:** "Feeling Blue"
*   **Topic:** "Future 1"
    *   **Expected Book details:** "Unit 5: Future 1 - Page 38"
    *   **Expected Video URL:** "https://ejoy-english.com/epic/videoEpic/59366"

## 4. Test Cases

| ID | Test Case Description | Steps | Expected Result |
|----|-----------------------|-------|-----------------|
| SP-01 | **Verify "Present tenses" Data** | 1. Navigate to Study Plan (ensure "Present tenses" is in weak topics).<br>2. Locate topic card for "Present tenses".<br>3. Inspect "Study Reference" text.<br>4. Inspect "Practice on eJOY" link `href`. | - Study Reference text contains "Unit 1: Present tenses - Page 1".<br>- Practice link `href` is `https://ejoy-english.com/epic/videoEpic/7199`. |
| SP-02 | **Verify "Future 1" Data** | 1. Navigate to Study Plan (ensure "Future 1" is in weak topics).<br>2. Locate topic card for "Future 1".<br>3. Inspect "Study Reference" text.<br>4. Inspect "Practice on eJOY" link `href`. | - Study Reference text contains "Unit 5: Future 1 - Page 38".<br>- Practice link `href` is `https://ejoy-english.com/epic/videoEpic/59366`. |
| SP-03 | **Verify Link Behavior** | 1. Click the "Practice on eJOY" link for any topic. | - Link opens in a new tab (`target="_blank"`). |
| SP-04 | **Verify Fallback (Constraint)** | 1. (Optional) If a topic has no data, verify it shows default text. | - Shows "Grammar Guide: [Topic Name]". |

## 5. Execution Instructions for AI Agent
1.  **Launch Browser**: Start browser at `http://localhost:5173`.
2.  **Generate Data**: 
    *   Since we need specific topics to appear in the "Weak Topics" list, we might need to rely on the mock data if the app is in demo mode, OR manually navigate/inject state if possible.
    *   *Assumption*: The current app state might randomly pick topics or use a fixed set for demo.
    *   *Strategy*: Check which topics are displayed. If "Present tenses" is present, verify it. If not, verify whatever is present against the JSON file.
3.  **Inspect**:
    *   Find all `.topic-card`.
    *   For each card, read the `.topic-card__name` text.
    *   Look up the expected data in `grammar_resources.json`.
    *   Verify the displayed `.topic-card__resource-title` and `.topic-card__resource-link` match the JSON data.

## 6. Success Criteria
*   At least 3 topics are verified against the JSON data.
*   No "undefined" or broken text is visible.
