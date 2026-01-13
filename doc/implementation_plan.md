# Implementation Plan - UI Design Compliance Fixes

**Goal:** Fix significant visual discrepancies identified in `doc/ui_test_report.md` to align the application with `doc/design_specification.md`.

## User Review Required
> [!IMPORTANT]
> This plan modifies global CSS variables and component styles. While intended to match the spec, these changes may slightly alter the look of other pages if they misuse these shared classes.
> *   `--color-bg-selected` will change from `rgba(28, 160, 242, 0.08)` to `#E0F2FE` (Solid Light Blue).
> *   Global card border-radius will change from `24px` to `16px`.

## Proposed Changes

### Global Styles (`frontend/src/styles/`)

#### [MODIFY] [variables.css](file:///Users/diep/Documents/Test%20project/Diagnostic_Grammar_Test/frontend/src/styles/variables.css)
*   Update `--color-bg-selected` to `#E0F2FE` (match spec).
*   Ensure `--color-border-selected` matches brand blue if needed.

#### [MODIFY] [components.css](file:///Users/diep/Documents/Test%20project/Diagnostic_Grammar_Test/frontend/src/styles/components.css)
*   Update `.card` class: Change `border-radius` from `24px` to `16px` (`var(--radius-lg)`).
*   Verify `.progress-bar` height is forced to `8px`.

### Component Specific Styles

#### [MODIFY] [LandingPage.css](file:///Users/diep/Documents/Test%20project/Diagnostic_Grammar_Test/frontend/src/styles/LandingPage.css)
*   Update `.logo-text` color to `var(--color-brand-blue)`.
*   Ensure `.landing-header` has `border-bottom: 1px solid var(--color-border)`.
*   Fix `h1` size to `32px` explicitly if overridden.

#### [MODIFY] [ResultsPage.css](file:///Users/diep/Documents/Test%20project/Diagnostic_Grammar_Test/frontend/src/styles/ResultsPage.css)
*   `.results-header`: Adjust height (reduce padding) to target `56px`.
*   `.results-title`: Change font-size to `16px`.
*   `.score-number`: Change font-size to `48px`.
*   `.answer-card-collapsed--correct`: Add `border-left: 4px solid var(--color-success-green)`.
*   `.btn-retake`: Change border width to `2px`.

#### [MODIFY] [StudyPlanPage.css](file:///Users/diep/Documents/Test%20project/Diagnostic_Grammar_Test/frontend/src/styles/StudyPlanPage.css)
*   `.recommendation-card__overlay--ejoy`: Ensure background resembles solid brand blue (or gradient starting opaque) to match spec.
*   `.action-icon`: Force color `var(--color-brand-orange)`.
*   `.recommendation-card__icon-badge--ejoy`: Ensure correct background.

## Verification Plan

### Automated Verification
*   Re-run the Browser Subagent with the **same validation scripts** used in the `ui_test_report.md`.
*   **Command:** I will use the `browser_subagent` tool to execute `Verify Landing Page`, `Verify Quiz UI`, `Verify Results UI`, `Verify Study Plan UI`.

### Success Criteria
*   **Landing Page:** Header border present, Logo is Blue.
*   **Quiz Page:** Card radius is 16px, Progress bar is 8px.
*   **Results Page:** Score is 48px, Correct cards have green border.
*   **Study Plan:** eJOY card is blue, Badges are correct colors.
