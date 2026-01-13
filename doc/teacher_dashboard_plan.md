# Implementation Plan: Teacher Dashboard & Data Tracking Integration

## 1. Executive Summary
**Context:** We need a rapid, low-maintenance, and easy-to-adopt solution for tracking student grammar performance.
**Recommendation:** Implement a **Serverless Data Pipeline** using **Google Apps Script (GAS)** as an API middleware, **Google Sheets** as the database, and **Google Looker Studio** for visualization. 

**Why this stack?**
*   **Zero Infrastructure Cost:** No servers to manage or pay for.
*   **Teacher-Friendly:** Teachers already know Excel/Sheets.
*   **Rapid Development:** The backend can be deployed in < 30 minutes.
*   **Frontend Agnostic:** Our React app simply makes a standard HTTP POST request.

---

## 2. High-Level Architecture

```mermaid
graph LR
    A[React App (Student)] -->|POST Payload| B(Google Apps Script Webhook)
    B -->|Parse & Validate| C{Google Sheets Database}
    C -->|Store Summary| D[Sheet 1: Test Attempts]
    C -->|Store Details| E[Sheet 2: Question Responses]
    D -->|Data Source| F[Google Looker Studio]
    E -->|Data Source| F
    F -->|Visuals| G[Teacher Dashboard]
    B -->|Generate HTML| H[MailApp Service]
    H -->|Send Results| I[Student Email]
```

---

## 3. Data Strategy & Schema

To enable the specific insights requested (Topic Mastery, Error Patterns), we will track data at two levels of granularity.

### Sheet 1: `Test_Attempts` (High Level)
*Records the overall session.*
| Column | Description | Example |
| :--- | :--- | :--- |
| `attempt_id` | Unique UUID | `550e8400-e29b...` |
| `student_name` | Name or ID | `John Doe` |
| `timestamp` | ISO Date | `2024-03-20T10:00:00Z` |
| `total_score` | Raw score | `15/20` |
| `duration_seconds` | Total time | `320` |

### Sheet 2: `Question_Responses` (Granular Level)
*Records every single click. One row per question answered.*
| Column | Description | Example |
| :--- | :--- | :--- |
| `attempt_id` | Foreign Key | `550e8400-e29b...` |
| `question_id` | ID from Question Bank | `q_001` |
| `grammar_topic` | Granular Tag | `Past Perfect` |
| `is_correct` | Boolean | `FALSE` |
| `student_answer` | The distractor chosen | `had went` |
| `time_spent_ms` | Time on this specific q | `4500` |

---

## 4. Technical Implementation Steps

### Phase 1: The "Backend" (Google Apps Script)
Instead of a Google Form (which is hard to style and integrate seamlessly), we will create a **Custom Webhook**.

1.  Create a new Google Sheet.
2.  Open **Extensions > Apps Script**.
3.  Implement a `doPost(e)` function:
    ```javascript
    function doPost(e) {
      const data = JSON.parse(e.postData.contents);
      const sheet = SpreadsheetApp.getActiveSpreadsheet();
      // Logic to append rows to 'Test_Attempts' and 'Question_Responses'
      
      // Phase 4 Logic: Send Email
      if (data.student.email) {
        sendStudentReport(data.student, data.score, data.weakTopics);
      }

      return ContentService.createTextOutput("Success");
    }
    ```
4.  **Deploy as Web App**: Set access to "Anyone" (allows the React app to post without OAuth complexity for MVP).

### Phase 2: React Application Integration
We need to gather the data as the student takes the quiz.

1.  **State Management**: Ensure the `QuizContext` or state tracker records `timeSpent` per question and the specific `selectedAnswer` (not just correct/incorrect).
2.  **API Service**: Create `src/services/AnalyticsService.ts`.
3.  **Trigger**: On the "Results Page" load (or "Finish Quiz" click), send the payload.

**Payload Structure:**
```json
{
  "student": { "name": "Jane Doe", "email": "beta@example.com" },
  "attempt": { "duration": 300, "timestamp": "..." },
  "responses": [
    {
      "questionId": "101",
      "topic": "Modals",
      "correct": false,
      "selected": "can to",
      "time": 5000
    },
    ...
  ]
}
```

### Phase 3: The Dashboard (Looker Studio)
1.  Connect Looker Studio to the Google Sheet.
2.  **Create 3 Key Views**:
    *   **Class Heatmap**: Pivot table of Student vs. Topic (Colored by % Correct).
    *   **"Red Flag" List**: Filtered view showing students with <50% score or fast completion times (guessing).
    *   **Topic Drilldown**: Bar chart showing Class Average Score per Grammar Topic.

---

## 6. Student Reporting (Email Automation) (NEW)

### 6.1 Technical Feasibility & Constraints
*   **Rich HTML Support:** **YES**. Google Apps Script's `MailApp.sendEmail({ htmlBody: ... })` fully supports HTML5 and inline CSS. You can include:
    *   Colors, bold text, tables.
    *   Images (hosted publicly, e.g., your logo).
    *   Clickable "Review" buttons.
    *   *Note: Javascript inside the email (like alerts or dynamic forms) is NOT supported by email clients.*
    
*   **Spam Risk:** **LOW**, provided you follow these rules:
    *   **Sender:** The email is sent from the Google Account that "Runs" the script (the Teacher or School Admin account). It is a legitimate, high-trust sender (gmail.com or school.edu).
    *   **Context:** Since the user *just* finished the quiz and is expecting results, they are highly unlikely to mark it as spam.
    *   **Domain:** If you are in a Google Workspace (School) environment, internal emails (Teacher -> Student) almost never go to spam.

*   **Quotas (Daily Limits):**
    *   **Consumer (@gmail.com):** ~100 recipients / day.
    *   **Google Workspace (Education/Business):** ~1,500 recipients / day.
    *   *Assessment: Sufficient for most class sizes. If you have >1,500 students/day, we need a dedicated service like SendGrid.*

### 6.2 Workflow Implementation
1.  **Trigger:** Occurs inside the same `doPost(e)` function immediately after saving data.
2.  **Template Engine:** Use a Javascript Template Literal within the script to generate HTML.
3.  **Content Strategy:**
    *   **Header:** "Diagnostic Test Results - [Date]"
    *   **Score Badge:** Large visual score (e.g., "75% - B1 Intermediate").
    *   **Action Plan:** List of top 3 "Weak Topics" with improved messaging.
    *   **Call to Action:** "Review [Topic Name] in the App" (Deep link).

**Implementation Snippet:**
```javascript
function sendStudentReport(student, score, weakTopics) {
  const htmlBody = `
    <div style="font-family: sans-serif; color: #333;">
        <h1 style="color: #2563EB;">Hello, ${student.name}</h1>
        <p>You scored <strong>${score.total}/${score.max}</strong>.</p>
        
        <div style="background: #F3F4F6; padding: 15px; border-radius: 8px;">
            <h3 style="margin-top:0;">Focus Areas:</h3>
            <ul>
              ${weakTopics.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
        
        <br/>
        <a href="https://your-app-url.com/study-plan" style="background-color: #2563EB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Full Study Plan
        </a>
    </div>
  `;
  
  MailApp.sendEmail({
    to: student.email,
    subject: "Your Grammar Diagnostic Results",
    htmlBody: htmlBody
  });
}
```
