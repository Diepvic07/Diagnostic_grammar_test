/**
 * Code.js
 * 
 * Google Apps Script for Diagnostic Grammar Test Backend.
 * Handles:
 * 1. Receiving test results via HTTP POST.
 * 2. Storing results in Google Sheets ('Test_Attempts' and 'Question_Responses').
 * 3. Sending HTML email reports to students.
 */

// CONFIGURATION
const SHEET_ID = ""; // Leave empty to use the active spreadsheet
const EMAIL_SUBJECT = "Your grammar test & suggested learning plan";
const SENDER_NAME = "Diep Bui, eJOY Learning";

/**
 * Handle POST requests from the React App
 */
function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000); // 10 sec lock to prevent concurrency issues

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const contents = JSON.parse(e.postData.contents);

        // 1. Ensure Sheets Exist
        const attemptsSheet = ensureSheet(doc, "Test_Attempts", [
            "attempt_id", "timestamp", "student_name", "student_email", "student_phone",
            "total_score", "max_score", "percentage", "duration_seconds", "cefr_level"
        ]);

        const responsesSheet = ensureSheet(doc, "Question_Responses", [
            "attempt_id", "question_id", "grammar_topic",
            "is_correct", "student_answer", "time_spent_ms"
        ]);

        // 2. Store Data
        const attemptId = contents.attemptId || Utilities.getUuid();
        const timestamp = new Date();

        // Append to Test_Attempts
        attemptsSheet.appendRow([
            attemptId,
            timestamp,
            contents.student.name,
            contents.student.email || "",
            contents.student.phone ? "'" + contents.student.phone : "",
            contents.score.total,
            contents.score.max,
            (contents.score.total / contents.score.max) * 100,
            contents.attempt.duration,
            contents.score.cefr || "N/A"
        ]);

        // Append to Question_Responses
        const responseRows = contents.responses.map(r => [
            attemptId,
            r.questionId,
            r.topic,
            r.correct,
            r.selectedAnswer,
            r.timeSpent
        ]);

        if (responseRows.length > 0) {
            responsesSheet.getRange(
                responsesSheet.getLastRow() + 1,
                1,
                responseRows.length,
                responseRows[0].length
            ).setValues(responseRows);
        }

        // 3. Send Email Report (if email provided)
        if (contents.student.email) {
            sendStudentReport(contents.student, contents.score, contents.weakTopics, attemptId);
        }

        return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "Data saved and email sent (if provided).",
            attemptId: attemptId
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);

    } finally {
        lock.releaseLock();
    }
}

/**
 * Helper to create sheet if not exists
 */
function ensureSheet(doc, sheetName, headers) {
    let sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
        sheet = doc.insertSheet(sheetName);
        sheet.appendRow(headers);
        sheet.setFrozenRows(1); // Freeze header
    }
    return sheet;
}

/**
 * Handle GET requests (Unsubscribe actions)
 */
function doGet(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        if (e.parameter.action === 'unsubscribe' && e.parameter.email) {
            const email = e.parameter.email;
            const doc = SpreadsheetApp.getActiveSpreadsheet();
            const unsubSheet = ensureSheet(doc, "Unsubscribes", ["email", "timestamp"]);

            // Check if already unsubscribed to avoid duplicates
            if (!isEmailUnsubscribed(doc, email)) {
                unsubSheet.appendRow([email, new Date()]);
            }

            const htmlOutput = HtmlService.createHtmlOutput(
                `<html>
                    <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                        <h1 style="color: #1da1f2;">Unsubscribed</h1>
                        <p><strong>${email}</strong> has been removed from our mailing list.</p>
                        <p>You will no longer receive diagnostic reports.</p>
                    </body>
                </html>`
            );
            return htmlOutput;
        }

        // Default response for root URL
        return ContentService.createTextOutput("eJOY Diagnostic Tool Backend is Running.");

    } catch (error) {
        return ContentService.createTextOutput("Error: " + error.toString());
    } finally {
        lock.releaseLock();
    }
}

/**
 * Check if an email is in the Unsubscribes sheet
 */
function isEmailUnsubscribed(doc, email) {
    const sheet = doc.getSheetByName("Unsubscribes");
    if (!sheet) return false;

    const data = sheet.getDataRange().getValues();
    // Skip header, check column A (index 0)
    for (let i = 1; i < data.length; i++) {
        if (data[i][0].toString().toLowerCase() === email.toString().toLowerCase()) {
            return true;
        }
    }
    return false;
}

/**
 * Send HTML Email to Student
 */
function sendStudentReport(student, score, weakTopics, attemptId) {
    const doc = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Check Blacklist
    if (isEmailUnsubscribed(doc, student.email)) {
        console.log(`Skipping email for unsubscribed user: ${student.email}`);
        return;
    }

    const percentage = Math.round((score.total / score.max) * 100);

    // Limit to Top 5 for email display, show rest via link
    const displayTopics = weakTopics.slice(0, 5);

    // Generate Weak Topics Rows
    const weakTopicsHtml = displayTopics.map(t => {
        const name = typeof t === 'string' ? t : t.name;
        // bookRef usually comes as "Unit X: Topic - Page Y" from the frontend mapping
        const bookRef = (typeof t === 'object' && t.bookReference) ? t.bookReference : "Review this topic";
        const video = (typeof t === 'object' && t.video) ? t.video : null;

        let videoAction = '';
        if (video) {
            videoAction = `
                <a href="${video.url}" style="text-decoration: none; display: inline-block; margin-top: 12px;">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td valign="middle" style="padding-right: 8px;">
                                <img src="https://img.icons8.com/ios-filled/50/FF6B35/play-button-circled.png" width="24" height="24" alt="Play" style="display: block; border: 0;" />
                            </td>
                            <td valign="middle">
                                <span style="font-family: 'Lexend', sans-serif; font-size: 14px; color: #1da1f2; font-weight: bold;">${video.title}</span>
                            </td>
                        </tr>
                    </table>
                </a>
             `;
        }

        return `
        <!-- Topic Item -->
        <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #f1f5f9;">
                <h3 style="margin: 0 0 8px 0; font-family: 'Lexend', sans-serif; font-size: 18px; color: #111518;">${name}</h3>
                
                <!-- Book Ref -->
                <table cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 4px;">
                    <tr>
                        <td valign="top" style="padding-right: 8px; padding-top: 2px;">
                             <img src="https://img.icons8.com/ios-filled/50/64748b/open-book.png" width="16" height="16" alt="Book" style="display: block; border: 0;" />
                        </td>
                        <td valign="top">
                            <span style="font-family: 'Noto Sans', sans-serif; font-size: 14px; color: #64748b;">${bookRef}</span>
                        </td>
                    </tr>
                </table>

                ${videoAction}
            </td>
        </tr>
        <tr><td height="24"></td></tr>
        `;
    }).join('');

    // Check for remaining topics
    const totalWeak = weakTopics.length;
    const remaining = totalWeak - displayTopics.length;
    let remainingHtml = '';

    if (remaining > 0) {
        remainingHtml = `
         <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px dashed #cbd5e1;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #334155; font-family: 'Lexend', sans-serif;">
                    ⚠️ You have <strong>${remaining} more weak topics</strong> to review.
                </p>
                <!-- TODO: Replace with user's actual App URL -->
                <a href="http://localhost:5173/?planId=${attemptId}" style="color: #1da1f2; font-weight: bold; text-decoration: none; font-size: 16px;">View Full Study Plan &rarr;</a>
            </td>
        </tr>
        `;
    }

    // Unsubscribe Link Construction
    // ScriptApp.getService().getUrl() returns the URL of the published web app
    const scriptUrl = ScriptApp.getService().getUrl();
    const unsubUrl = `${scriptUrl}?action=unsubscribe&email=${encodeURIComponent(student.email)}`;

    // Main HTML Template
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Diagnostic Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Lexend', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111518;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff;">
        
        <!-- Header (Spec: #e8f5ff circle with #1da1f2 school icon) -->
        <tr>
            <td style="padding: 24px; border-bottom: 1px solid #f1f5f9;">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td align="left" valign="middle">
                            <table cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <!-- Logo Container -->
                                    <td width="40" height="40" align="center" valign="middle" bgcolor="#e8f5ff" style="border-radius: 50%;">
                                        <img src="https://img.icons8.com/ios-filled/50/1da1f2/student-center.png" width="24" height="24" alt="e" style="display: block; border: 0;" />
                                    </td>
                                    <!-- Brand Name -->
                                    <td style="padding-left: 12px;">
                                        <span style="font-family: 'Lexend', sans-serif; font-size: 20px; font-weight: bold; color: #111518; letter-spacing: -0.015em;">eJOY English</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                         <td align="right" valign="middle" style="font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                            Diagnostic Report
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Score Banner -->
        <tr>
            <td align="center" style="padding: 40px 20px; background-color: #f0f9ff;">
                <h1 style="margin: 0; font-size: 64px; font-weight: bold; color: #1da1f2; line-height: 1; font-family: 'Lexend', sans-serif;">${score.total}<span style="font-size: 32px; color: #94a3b8;">/${score.max}</span></h1>
                <p style="margin: 16px 0 0 0; font-size: 16px; font-weight: bold; color: #334155; text-transform: uppercase; letter-spacing: 1px;">Diagnostic Score</p>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">(${percentage}% Accuracy)</p>
            </td>
        </tr>

        <!-- Weak Topics Header -->
        <tr>
            <td style="padding: 32px 24px 8px 24px;">
                <h2 style="margin: 0; font-size: 20px; font-weight: bold; color: #111518; font-family: 'Lexend', sans-serif;">Weak Topics to Review</h2>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">Focus on these units to improve your score.</p>
            </td>
        </tr>

        <!-- Topics List -->
        <tr>
            <td style="padding: 24px;">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    ${weakTopicsHtml}
                     ${remainingHtml}
                </table>
            </td>
        </tr>

        <!-- Resources (Text Links Only to avoid broken images) -->
        <tr>
            <td style="padding: 0 24px 32px 24px;">
                <h2 style="margin: 0 0 24px 0; font-size: 14px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Recommended Resources</h2>
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td width="48%" valign="top">
                             <a href="https://books.google.com/books?vid=ISBN9780521604628" style="text-decoration: none; color: inherit; display: block; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center;">
                                <div style="font-size: 24px; margin-bottom: 8px;">📚</div>
                                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #111518; font-family: 'Lexend', sans-serif;">Grammar for IELTS</p>
                                <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Complete Guide</p>
                             </a>
                        </td>
                        <td width="4%"></td>
                         <td width="48%" valign="top">
                             <a href="https://ejoy-english.com/epic" style="text-decoration: none; color: inherit; display: block; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center;">
                                <div style="font-size: 24px; margin-bottom: 8px;">🎓</div>
                                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #111518; font-family: 'Lexend', sans-serif;">Master Grammar</p>
                                <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">on eJOY Web</p>
                             </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Footer -->
         <tr>
            <td align="center" style="padding: 32px; border-top: 1px solid #f1f5f9; background-color: #ffffff;">
                <p style="margin: 0 0 16px 0;">
                    <a href="http://localhost:5173/?planId=${attemptId}" style="background-color: #1da1f2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 24px; font-weight: bold; font-size: 16px; display: inline-block; font-family: 'Lexend', sans-serif; box-shadow: 0 4px 6px rgba(29, 161, 242, 0.2);">View Full Study Plan</a>
                </p>
                <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    © ${new Date().getFullYear()} eJOY English.<br/>
                    <a href="${unsubUrl}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a>
                </p>
            </td>
        </tr>

    </table>
</body>
</html>
    `;

    try {
        MailApp.sendEmail({
            to: student.email,
            subject: EMAIL_SUBJECT,
            htmlBody: htmlBody,
            name: SENDER_NAME
        });
    } catch (e) {
        console.error("Failed to send email: " + e.toString());
    }
}

/**
 * MANUAL TEST FUNCTION
 */
function testEmail() {
    const testStudent = {
        name: "Test User",
        email: "diepvic@gmail.com"
    };

    const testScore = {
        total: 38,
        max: 50
    };

    // Test with Object Structure
    const testTopics = [
        {
            name: "Future Perfect",
            priority: "High Priority",
            bookReference: "Grammar for IELTS - Unit 14",
            video: {
                title: "Watch: Future Perfect in Movies",
                url: "https://example.com"
            }
        },
        {
            name: "Passive Voice",
            priority: "Medium Priority",
            bookReference: "English Grammar in Use - Unit 42",
            video: null // Test no video case
        }
    ];

    Logger.log("Attempting to send email to: " + testStudent.email);
    // Use a dummy attempt ID for testing
    const dummyAttemptId = "test-attempt-id-12345";
    sendStudentReport(testStudent, testScore, testTopics, dummyAttemptId);
    Logger.log("Email function executed.");
}

/**
 * AUTOMATED TEST: Verify Unsubscribe Flow
 * Run this function in the GAS Editor to verify logic.
 */
function testUnsubscribeFlow() {
    Logger.log("=== STARTING UNSUBSCRIBE TEST ===");
    const testEmail = "test_auto_" + new Date().getTime() + "@example.com";

    // 1. Simulate Unsubscribe Request (doGet)
    Logger.log(`Test 1: Simulating unsubscribe request for ${testEmail}...`);
    const mockEvent = {
        parameter: {
            action: 'unsubscribe',
            email: testEmail
        }
    };

    try {
        const result = doGet(mockEvent);
        Logger.log("doGet executed successfully.");
    } catch (e) {
        Logger.log("FAIL: doGet threw an error: " + e.toString());
        return;
    }

    // 2. Verify Sheet Creation & Data
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName("Unsubscribes");

    if (!sheet) {
        Logger.log("FAIL: 'Unsubscribes' sheet was NOT created.");
        return;
    }
    Logger.log("PASS: 'Unsubscribes' sheet exists.");

    const lastRow = sheet.getLastRow();
    const lastEmail = sheet.getRange(lastRow, 1).getValue();

    if (lastEmail === testEmail) {
        Logger.log(`PASS: Email ${testEmail} found in the unsubscribe list.`);
    } else {
        Logger.log(`FAIL: Expected ${testEmail}, found ${lastEmail}`);
        return;
    }

    // 3. Verify Email Suppression
    Logger.log("Test 2: Verifying email suppression...");
    const student = { name: "Test Student", email: testEmail };
    const score = { total: 0, max: 50 };

    // We expect the function to return EARLY and NOT send email/throw error
    // check logs for "Skipping email..."
    try {
        sendStudentReport(student, score, [], "test-id");
        Logger.log("PASS: sendStudentReport executed without error (check logs for 'Skipping').");
    } catch (e) {
        Logger.log("FAIL: sendStudentReport failed: " + e.toString());
    }

    Logger.log("=== TEST COMPLETE ===");
}
