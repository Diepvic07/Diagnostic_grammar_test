#!/bin/bash

# Configuration
# This URL is from src/services/AnalyticsService.ts
URL="https://script.google.com/macros/s/AKfycby2sK5NUUTNH_IEps5eDc2-k6a0hKXqXDpCzMZI4EM633RgVJ17FAetqXCFJxu4KDQi0Q/exec"

# Mock Payload
# Based on the structure in AnalyticsService.ts and Code.js
JSON_DATA='{
  "attemptId": "TEST-VERIFICATION-UUID-'$(date +%s)'",
  "student": {
    "name": "Integration Test Robot",
    "email": "diepvic@gmail.com",
    "phone": "+1-555-0199"
  },
  "score": {
    "total": 45,
    "max": 50,
    "cefr": "B2"
  },
  "attempt": {
    "duration": 120
  },
  "weakTopics": ["Test Topic A", "Test Topic B"],
  "responses": [
    {
      "questionId": "q_test_01",
      "topic": "Test Topic A",
      "correct": false,
      "selectedAnswer": "Wrong Answer",
      "timeSpent": 1500
    }
  ]
}'

echo "Sending payload to Google Apps Script..."
echo "URL: $URL"
echo "Payload: $JSON_DATA"

# Send POST request
# -L to follow redirects (GAS often redirects)
response=$(curl -s -L -H "Content-Type: text/plain" -d "$JSON_DATA" "$URL")

echo ""
echo "Response:"
echo "$response"
