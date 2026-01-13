# Automation Test Plan: UI & Design Specification Compliance
**Date:** 2026-01-12
**Reference:** `doc/design_specification.md`
**Executor:** AI Agent (Browser Interaction & DOM Inspection)

## 1. Objective
To ensure the application's UI strictly adheres to the design specifications defined in `doc/design_specification.md`, focusing on visual accuracy, typography, color palettes, component states, and responsiveness.
**Special Focus:** Result Screen Logic & Strict Design Compliance.

---

## 2. Test Environment
*   **URL:** Development Server (e.g., http://localhost:5173)
*   **Tools:** AI Agent with `browsing` and `dom_inspection` capabilities.
*   **Window Size:**
    *   **Desktop:** 1280x800
    *   **Mobile:** 375x812 (iPhone X viewport)
    *   **Tablet:** 768x1024

---

## 3. General Design System Verification

### 3.1 Colors
*   **Primary Brand Blue**: Verify usage matches `#1da1f2`.
*   **eJOY Orange**: Verify usage matches `#FF6B35`.
*   **Success Green**: Verify usage matches `#00C853`.
*   **Error Red**: Verify usage matches `#FF1744`.
*   **Background**: Verify page background is `#F5F7FA` (Neutral).
*   **Surface**: Verify card backgrounds are `#FFFFFF`.

### 3.2 Typography
*   **Font Family**: Verify primary font is `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
*   **H1 Headers**: Verify `font-size: 32px`, `font-weight: 700`.
*   **H2 Headers**: Verify `font-size: 24px`, `font-weight: 700`.
*   **Body Text**: Verify `font-size: 16px` (Large) or `14px` (Regular).

---

## 4. Screen-Specific Test Cases

### 4.1 Landing Page
**Scenario:** User lands on the home page.
**View:** Desktop (1280px width)

| ID | Component | Selector / Element | Action | Expected Criteria |
|----|-----------|--------------------|--------|-------------------|
| L-01 | **Header** | `header` | Inspect Background | `rgb(255, 255, 255)` (`#FFFFFF`) |
| L-02 | **Header** | `header` | Inspect Border-Bottom | `1px solid rgb(229, 231, 235)` (`#E5E7EB`) |
| L-03 | **Logo** | Header Logo Text | Inspect Color | `#1da1f2` (Brand Blue) |
| L-04 | **Headline** | `h1` | Inspect Font Size | `32px` |
| L-05 | **Subheadline** | Subtext below H1 | Inspect Text Color | `#6B7280` (`rgb(107, 114, 128)`) |
| L-06 | **Start CTA** | Main "Start Quiz" Button | Inspect Background | `#1da1f2` |
| L-07 | **Start CTA** | Main "Start Quiz" Button | Inspect Border Radius | `9999px` (Full Pill) |
| L-08 | **Start CTA** | Main "Start Quiz" Button | Inspect Dimensions | Width `~260px`, Height `56px` |

### 4.2 Quiz Interface
**Scenario:** User starts the quiz.
**Pre-condition:** Click "Start Quiz" from Landing Page.

| ID | Component | Selector / Element | Action | Expected Criteria |
|----|-----------|--------------------|--------|-------------------|
| Q-01 | **Close Button** | Top-left `✕` button | Inspect Size | `40px` x `40px` |
| Q-02 | **Progress Label** | "Question X of Y" | Inspect Font Color | `#1A1A1A` |
| Q-03 | **Progress Bar** | Progress Container | Inspect Height | `8px` |
| Q-04 | **Progress Bar** | Progress Fill | Inspect Color | `#1da1f2` |
| Q-05 | **Question Card** | Main Card Container | Inspect Border Radius | `16px` |
| Q-06 | **Question Card** | Main Card Container | Inspect Padding | `24px` |
| Q-07 | **Option (Ideal)** | Unselected Option | Inspect Background | `#FFFFFF` |
| Q-08 | **Option (Ideal)** | Unselected Option | Inspect Border | `2px solid #E5E7EB` |
| Q-09 | **Interaction** | **HOVER** on Option | Inspect Background | `#F0F9FF` (Light Blue) |
| Q-10 | **Interaction** | **SELECT** an Option | Inspect Background | `#E0F2FE` |
| Q-11 | **Interaction** | **SELECT** an Option | Inspect Border | `2px solid #1da1f2` |
| Q-12 | **Next Button** | "Next Question" Button | Inspect Position | Centered at bottom |

### 4.3 Results & Analysis Page
**Scenario:** User completes the quiz or navigates via DemoNav to Results.
**Pre-condition:** Application has `results` data.

#### 4.3.1 Visual & Layout Verification (Strict Design Compliance)
| ID | Component | Selector / Element | Action | Expected Criteria |
|----|-----------|--------------------|--------|-------------------|
| R-01 | **Header Container** | `header.results-header` | Inspect Height | `56px` |
| R-02 | **Header Background** | `header.results-header` | Inspect Background | `#FFFFFF` (`rgb(255, 255, 255)`) |
| R-03 | **Results Title** | `h1.results-title` | Inspect Font Size | `16px` |
| R-04 | **Results Title** | `h1.results-title` | Inspect Weight | `600` (SemiBold) |
| R-05 | **Celebration Text** | `h2.celebration-title` | Inspect Content | "Test Complete!" (or localized equivalent) |
| R-06 | **Score Value** | `.score-number` | Inspect Color | `#1da1f2` (Brand Blue) |
| R-07 | **Score Value** | `.score-number` | Inspect Font Size | `48px` |
| R-08 | **Score Label** | `.score-total-label` | Inspect Text | "TOTAL SCORE" |
| R-09 | **Accuracy Bar** | `.progress-bar` | Inspect CSS | Height `8px`, Radius `4px` |
| R-10 | **Retake Button** | `.btn-retake` | Inspect Border | `2px solid #1da1f2` |
| R-11 | **Retake Button** | `.btn-retake` | Inspect Background | `#FFFFFF` (White) |
| R-12 | **Retake Button** | `.btn-retake` | Inspect Text Color | `#1da1f2` |
| R-13 | **Review Header** | `.review-title` | Inspect Text | "Review Your Answers" |
| R-14 | **Correct Card** | `.answer-card--correct` | Inspect Border-Left | `4px solid #00C853` (Success Green) |
| R-15 | **Incorrect Card** | `.answer-expanded.collapsed` | Inspect Border-Left | `4px solid #FF1744` (Error Red) |
| R-16 | **Incorrect Card** | `.answer-expanded.collapsed` | Inspect Height | Max-Height `80px` (or verify it looks collapsed) |
| R-17 | **Continue Button** | `.results-footer .btn-primary` | Inspect Background | `#1da1f2` |
| R-18 | **Continue Button** | `.results-footer .btn-primary` | Inspect Position | Centered |
| R-19 | **Your Answer** | `.answer-section--incorrect` | Inspect BG Color | `#FEE2E2` (Light Red) |
| R-20 | **Correct Answer** | `.answer-section--correct` | Inspect BG Color | `#D1FAE5` (Light Green) |

#### 4.3.2 Logic & Interaction Verification
| ID | Logic Scenario | Action Steps | Expected Outcome |
|----|----------------|--------------|------------------|
| L-R-01 | **Score Calculation** | 1. Read `score` variable (or UI text).<br>2. Read `totalQuestions`. | Displayed percentage matches `(score / total) * 100` (rounded). |
| L-R-02 | **Expand Logic** | 1. Locate a collapsed `.answer-expanded.collapsed`.<br>2. Click the card. | Class changes to `expanded`.<br>Max-height becomes `none` (or content becomes visible). |
| L-R-03 | **Collapse Logic** | 1. Click an already expanded card. | Class reverts to `collapsed`. |
| L-R-04 | **Retake Navigation** | 1. Click "Retake Test" button. | Page content updates to **Quiz Interface** (Question 1).<br>State reset usage (previous results cleared). |
| L-R-05 | **Study Plan Nav** | 1. Navigate back to Results.<br>2. Click "View Study Plan" (Continue) button. | Page content updates to **Study Plan Page**. |

### 4.4 Study Plan Page
**Scenario:** User navigates to Study Plan from Results.

| ID | Component | Selector / Element | Action | Expected Criteria |
|----|-----------|--------------------|--------|-------------------|
| S-01 | **Page Title** | `h1` (or equivalent) | Inspect Text | "Your Personalized Study Plan" |
| S-02 | **Hero Cards** | IELTS/eJOY Cards | Inspect Layout | Grid (2 columns on tablet/desktop) |
| S-03 | **IELTS Card** | IELTS Card Background | Inspect Computed Style | Linear gradient or `#9CA3AF` |
| S-04 | **eJOY Card** | eJOY Card Background | Inspect Color | `#1da1f2` |
| S-05 | **Priority Badge** | `.badge-priority` (if exists) | Inspect Background | `#FEE2E2` |
| S-06 | **Priority Badge** | `.badge-priority` | Inspect Text Color | `#FF1744` |
| S-07 | **Action Icons** | Book / Play Icons | Inspect Colors | Orange `#FF6B35` |
| S-08 | **Links** | Study Ref Text | Inspect Color | `#0EA5E9` |

---

## 5. Responsive verification
**Scenario:** Resize browser window to specific widths.

### 5.1 Mobile (Width: 375px)
| ID | Component | Description | Action | Expected Result |
|----|-----------|-------------|--------|-----------------|
| RES-01 | **Header** | Layout | Inspect | Single column, Logo left, Lang selector right (compact) |
| RES-02 | **Card Margins** | Landing/Quiz Cards | Inspect Margin | `16px` side margins |
| RES-03 | **H1 Font** | Headings | Inspect Font Size | Reduced to `28px` (from 32px) |
| RES-04 | **Study Grid** | Hero Cards | Inspect Display | Block/Stack (Single Column) |

### 5.2 Tablet (Width: 768px)
| ID | Component | Description | Action | Expected Result |
|----|-----------|-------------|--------|-----------------|
| RES-05 | **Study Grid** | Hero Cards | Inspect Display | Grid (2 Columns) |
| RES-06 | **Content Width** | Main Container | Inspect Max-Width | `720px` |

### 5.3 Desktop (Width: 1024px+)
| ID | Component | Description | Action | Expected Result |
|----|-----------|-------------|--------|-----------------|
| RES-07 | **Content Width** | Main Container | Inspect Max-Width | `800px` |
| RES-08 | **Padding** | Section Padding | Inspect Value | `32px` (increased from 24px) |

---

## 6. Execution Instructions for AI Agent

### 6.1 Setup
1.  **Launch Browser**: Start a headless or visible browser instance pointing to `http://localhost:5173`.
2.  **Ensure Data**: If starting fresh, quickly click through a quiz to generate result data, or use the DemoNav to jump to `/results`.

### 6.2 Execution Loop
**For Each ID in Sections 4.3.1 and 4.3.2 (Results Focus):**
1.  **Locate Element**: Use `document.querySelector` with the Selector provided.
2.  **Action**: Perform the 'Action' (Inspect, Click, Hover).
3.  **Assert**:
    *   For visual values: `getComputedStyle(element)[property]`.
    *   Compare against 'Expected Criteria'.
    *   *Note*: Color matching should be fuzzy for RGB rounding but strict for Hue.
4.  **Log**: Record `[PASS] ID` or `[FAIL] ID - Expected ... Got ...`.

### 6.3 Final Deliverable
*   A markdown report summarizing all checks.
*   Screenshots of any failed constraints.
