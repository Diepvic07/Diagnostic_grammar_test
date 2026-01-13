# Backend API Documentation
## Global English Grammar Diagnostic Tool

**Base URL**: `http://localhost:3000/api`  
**Version**: 1.0.0  
**Authentication**: None (MVP - sessions are ephemeral)

---

## API Endpoints

### 1. Start Quiz Session

**Endpoint**: `POST /quiz/start`

**Description**: Initialize a new quiz session and retrieve 50 questions.

**Request Body**:
```json
{
  "language": "en" // Options: "en", "vi", "es", "zh"
}
```

**Response** (200 OK):
```json
{
  "sessionId": "uuid-string",
  "questions": [
    {
      "id": "q1-uuid",
      "contentEn": "Most university students __________ on campus...",
      "grammarTopic": "Present tenses",
      "topicNumber": 1,
      "answers": [
        { "id": "a1-uuid", "textEn": "are living" },
        { "id": "a2-uuid", "textEn": "live" },
        { "id": "a3-uuid", "textEn": "will live" },
        { "id": "a4-uuid", "textEn": "lived" }
      ]
    }
    // ... 49 more questions
  ]
}
```

---

### 2. Submit Quiz Answers

**Endpoint**: `POST /quiz/submit`

**Description**: Submit user answers and receive score.

**Request Body**:
```json
{
  "sessionId": "uuid-string",
  "answers": [
    {
      "questionId": "q1-uuid",
      "selectedAnswerId": "a2-uuid"
    }
    // ... 49 more answers (total 50)
  ]
}
```

**Response** (200 OK):
```json
{
  "score": 38,
  "totalQuestions": 50,
  "percentage": 76
}
```

---

### 3. Get Quiz Results

**Endpoint**: `GET /results/:sessionId?language=en`

**Description**: Get detailed results with user answers, correct answers, and localized explanations.

**Query Parameters**:
- `language` (optional): "en", "vi", "es", or "zh". Default: "en"

**Response** (200 OK):
```json
{
  "score": 38,
  "totalQuestions": 50,
  "percentage": 76,
  "questions": [
    {
      "id": "q1-uuid",
      "questionText": "By this time next year, I ___ graduated.",
      "userAnswer": "will have",
      "correctAnswer": "will have been",
      "isCorrect": false,
      "explanation": "We use the Future Perfect Simple (will have + past participle)...",
      "grammarTopic": "Future Perfect",
      "topicNumber": 13
    }
    // ... 49 more questions
  ]
}
```

---

### 4. Get Study Plan

**Endpoint**: `GET /results/:sessionId/study-plan?language=en`

**Description**: Generate personalized study plan based on quiz results.

**Query Parameters**:
- `language` (optional): "en", "vi", "es", or "zh". Default: "en"

**Response** (200 OK):
```json
{
  "weakTopics": [
    {
      "topicName": "Future Perfect",
      "topicNumber": 13,
      "errorCount": 2,
      "totalQuestions": 2,
      "isPriority": true,
      "studyReference": "Grammar for IELTS - Unit 14",
      "studyReferenceLink": "#",
      "practiceTitle": "Watch Lesson: Future Perfect",
      "practiceLink": "https://ejoy-english.com/lessons/future-perfect"
    }
    // Top 3 weak topics
  ],
  "ieltsRecommendation": {
    "title": "Grammar for IELTS",
    "description": "Master grammar rules with our comprehensive textbook...",
    "link": "https://example.com/ielts-grammar"
  },
  "ejoyRecommendation": {
    "title": "Practice on eJOY",
    "description": "Immerse yourself in real-world English...",
    "link": "https://ejoy-english.com"
  }
}
```

---

### 5. Health Check

**Endpoint**: `GET /health`

**Description**: Check if the API server is running.

**Response** (200 OK):
```json
{
  "status": "OK",
  "timestamp": "2026-01-10T09:15:00.000Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**:
```json
{
  "error": "Invalid request body" // or specific validation error
}
```

**404 Not Found**:
```json
{
  "error": "Session not found or not completed"
}
```

**500 Internal Server Error**:
```json
{
  "error": "Failed to process request"
}
```

---

## Data Models

### Question
```typescript
{
  id: string;
  contentEn: string;
  grammarTopic: string;
  topicNumber: number;
  answers: AnswerOption[];
}
```

### AnswerOption
```typescript
{
  id: string;
  questionId: string;
  textEn: string;
  isCorrect: boolean;
}
```

### UserSession
```typescript
{
  id: string;
  selectedLanguage: "en" | "vi" | "es" | "zh";
  score?: number;
  totalQuestions: number;
  answersData?: UserAnswer[];
  createdAt: Date;
  completedAt?: Date;
}
```

---

## Development Notes

### Running the Backend

```bash
# Install dependencies
cd backend
npm install

# Generate Prisma client
npm run prisma:generate

# Set up database (requires PostgreSQL)
# Update .env with DATABASE_URL
npm run prisma:migrate

# Seed database with questions
npm run prisma:seed

# Start development server
npm run dev
# Server will run on http://localhost:3000
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/grammar_diagnostic?schema=public"
PORT=3000
NODE_ENV=development
```

---

## Next Steps for Implementation

1. **Complete Seed Data**: Add remaining 45 questions to `prisma/seed.ts`
2. **Set up PostgreSQL**: Create database locally or use cloud service
3. **Run Migrations**: Execute `npm run prisma:migrate`
4. **Test Endpoints**: Use Postman or curl to verify API functionality
5. **Frontend Integration**: Connect React app to these endpoints
