-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentEn" TEXT NOT NULL,
    "correctAnswerId" TEXT,
    "grammarTopic" TEXT NOT NULL,
    "topicNumber" INTEGER NOT NULL,
    "difficultyLevel" TEXT DEFAULT 'intermediate',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "answer_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "answer_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "explanations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "explanationText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "explanations_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selectedLanguage" TEXT NOT NULL,
    "score" INTEGER,
    "totalQuestions" INTEGER NOT NULL DEFAULT 50,
    "answersData" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME
);

-- CreateTable
CREATE TABLE "grammar_topics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topicNumber" INTEGER NOT NULL,
    "topicName" TEXT NOT NULL,
    "minimumQuestions" INTEGER NOT NULL DEFAULT 1,
    "studyReferenceEn" TEXT NOT NULL,
    "studyReferenceVi" TEXT NOT NULL,
    "studyReferenceEs" TEXT NOT NULL,
    "studyReferenceZh" TEXT NOT NULL,
    "practiceLink" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "questions_grammarTopic_idx" ON "questions"("grammarTopic");

-- CreateIndex
CREATE INDEX "answer_options_questionId_idx" ON "answer_options"("questionId");

-- CreateIndex
CREATE INDEX "explanations_questionId_idx" ON "explanations"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "explanations_questionId_languageCode_key" ON "explanations"("questionId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "grammar_topics_topicNumber_key" ON "grammar_topics"("topicNumber");
