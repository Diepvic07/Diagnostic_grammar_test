-- CreateTable
CREATE TABLE "user_answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userSessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "grammarTopic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_answers_userSessionId_fkey" FOREIGN KEY ("userSessionId") REFERENCES "user_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "user_answers_grammarTopic_idx" ON "user_answers"("grammarTopic");

-- CreateIndex
CREATE INDEX "user_answers_isCorrect_idx" ON "user_answers"("isCorrect");

-- CreateIndex
CREATE INDEX "user_answers_userSessionId_idx" ON "user_answers"("userSessionId");
