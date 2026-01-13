# Product Requirements Document (PRD)
**Product Name:** Global English Grammar Diagnostic Tool
**Status:** Draft
**Date:** 2026-01-09
**Version:** 1.1

---

## 1. Document History
| Version | Date       | Author          | Description                                  |
| :------ | :--------- | :-------------- | :------------------------------------------- |
| 1.0     | 2026-01-09 | Product Manager | Initial Draft of Functional Requirements     |
| 1.1     | 2026-01-09 | Product Manager | Added Appendix A with full 50-question dataset |

---

## 2. Executive Summary
### Problem Statement
Learners of English as a Second Language (ESL) often lack a clear, objective understanding of their specific grammar weaknesses. Generic quizzes often fail to provide actionable feedback in the learner's native language, leading to confusion and slower progress. Furthermore, learners struggle to find high-quality, targeted resources to address their specific gaps.

### Proposed Solution
The **Global English Grammar Diagnostic Tool** is a web-based assessment application that delivers a personalized 50-question grammar test pulled dynamically from a comprehensive Question Bank.
**Key differentiators:**
1.  **Strict Localization:** While the test content remains in English (to test proficiency), all instructions and *crucial* error explanations are provided in the user's native language (English, Vietnamese, Spanish, Chinese).
2.  **Diagnostic Feedback:** Immediate, detailed analysis of incorrect answers with rule explanations.
3.  **Actionable Pathways:** Direct linkage to premium learning resources ("Grammar for IELTS" & "eJOY").

---

## 3. User Personas

### Persona A: The "IELTS Aspirant" (Primary)
*   **Profile:** High school or university student preparing for high-stakes exams.
*   **Goal:** Identifying specific weak points to maximize study efficiency for Band 7.0+.
*   **Pain Point:** "I know I make mistakes, but I don't understand the complex English explanations of *why* I'm wrong."
*   **Behavior:** Diligent, results-oriented, looking for credible book recommendations.

### Persona B: The "Casual Improver" (Secondary)
*   **Profile:** Working professional needing better English for business communication.
*   **Goal:** Quick assessment of current level without a heavy time commitment.
*   **Pain Point:** "I get bored easily. I need something interactive."
*   **Behavior:** Mobile-first user, prefers video content over textbooks.

---

## 4. User Stories

| ID    | As a...          | I want to...                                                                 | So that...                                                                                  |
| :---- | :--------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **US-1** | User             | Select my native language (EN, VI, ES, ZH) on the landing page               | I can navigate the interface and understand the feedback instructions clearly.                |
| **US-2** | User             | Answer 50 randomly selected grammar questions                                | I get a unique and comprehensive test experience every time I take it.                      |
| **US-3** | User             | See the questions and answers *only* in English                              | I am testing my actual English proficiency, not my translation skills.                      |
| **US-4** | User             | Receive immediate feedback on my score after finishing                       | I know my current proficiency level.                                                        |
| **US-5** | User             | Review my incorrect answers with explanations in my selected language        | I fully understand the grammar rule I violated without language barriers blocking confusion. |
| **US-6** | User             | Be recommended specific resources like "Grammar for IELTS" or "eJOY" videos  | I know exactly what to do next to improve my score.                                         |

---

## 5. Functional Specifications

### 5.1 Quiz Mechanism (The "Engine")
*   **Logic:**
    *   The system must connect to a backend **Question Bank** containing at least 200+ unique questions. *For the Initial Release (MVP), the bank will be seeded with the 50 specific questions defined in Appendix A.*
    *   For each new session, the system Randomly Selects exactly **50 questions** ensuring **all 25 grammar topics** (defined in Section 10) are represented.
    *   **Critical Requirement:** The randomization algorithm MUST select exactly **2 questions** from each of the 25 grammar topics to ensure comprehensive diagnostic coverage.
    *   For MVP with exactly 50 questions, use the fixed set defined in Appendix A which covers all 25 topics.
*   **Content Display:**
    *   **Question Text:** Always standard English.
    *   **Answer Choices:** Always standard English.
    *   *Constraint:* No translation overlays allowed on the quiz content itself.

### 5.2 Localization Logic (Multi-language Support)
*   **Supported Languages:** English (default), Vietnamese (vi), Spanish (es), Chinese (zh).
*   **Scope:**
    *   **UI Elements:** Navigation, Buttons ("Start", "Next", "Submit"), Instructions, Error Messages.
    *   **Educational Content:** The `Explanation` field for every question must be retrieved from the database in the user's active language.
*   **User Flow:** Language selection is the *first* action on the Landing Page. Selection persists for the session.

### 5.3 Results & Feedback Logic
*   **Scoring:** Display Score as `X/50` and a Percentage `%`.
*   **Detailed Review:**
    *   List all 50 questions.
    *   Visual indicators: Green check (Correct), Red 'X' (Incorrect).
    *   **The Crucial Feature:** For incorrect answers, expand a card showing:
        *   The User's Answer.
        *   The Correct Answer.
        *   **The Explanation:** "Why is this wrong?" text fetched from the `Explanation_Translation` table matching the user's language.

### 5.4 Recommendation Engine
*   **Trigger:** Displayed prominently on the Results Page footer or sidebar.
*   **Logic:** Hard-coded logic to display distinct Call-to-Action (CTA) depending on the context (or static for MVP).
*   **Mandatory Recommendations:**
    1.  **Academic Path:**
        *   *Copy:* "Enhance your academic knowledge with the 'Grammar for IELTS' book."
        *   *Action:* Link to book purchase/info page.
    2.  **Interactive Path:**
        *   *Copy:* "Learn grammar interactively with videos on the eJOY website."
        *   *Action:* Link to `https://ejoy-english.com` (or specific landing page).

---

## 6. Non-Functional Requirements
*   **Performance:** Quiz generation (fetching 50 Qs) must load in < 2 seconds.
*   **Scalability:** Database design must support expanding the Question Bank to 10,000+ items without schema changes.
*   **Encoding:** Strict **UTF-8** support for all database tables to handle Vietnamese diacritics and Chinese characters correctly.
*   **Availability:** Web-based, responsive design (Mobile, Tablet, Desktop compat).

---

## 7. UI/UX Wireframe Descriptions

### 7.1 Landing Page
*   **Hero Section:** "Test Your English Grammar Accuracy."
*   **Language Selector:** Prominent dropdown/flags for EN, VI, ES, ZH.
*   **CTA:** "Start Diagnostic Test" (Button).

### 7.2 Quiz Interface
*   **Header:** Progress Bar (Question n/50).
*   **Main Card:** Question Text (English).
*   **Options:** Radio buttons for answers (English).
*   **Footer:** "Next" / "Submit" (Localized text).
*   *Note:* Clean, distraction-free interface. No explanations shown *during* the test.

### 7.3 Results Page
*   **Top Banner:** "Your Score: 35/50 (70%)".
*   **Review Section:** Scrollable list of questions. Incorrect items are highlighted. Clicking one expands the **Localized Explanation**.
*   **Bottom Section (The Upsell):**
    *   Card 1: Image of "Grammar for IELTS" book -> "Buy Now".
    *   Card 2: eJOY Logo -> "Watch Video Lessons".

---

## 8. Data Model Overview

### 8.1 Entities

**`UserSession`** (Ephemeral or Persistent)
*   `session_id`: UUID
*   `selected_language`: enum (en, vi, es, zh)
*   `score`: integer

**`Question`**
*   `question_id`: UUID
*   `content_en`: Text (The question stem)
*   `correct_answer_id`: UUID (FK)
*   `grammar_topic`: String (e.g., "Past Tenses")

**`AnswerOption`**
*   `option_id`: UUID
*   `question_id`: FK
*   `text_en`: Text (The option content)
*   `is_correct`: Boolean

**`Explanation_Translation`** (The Localization Key)
*   `explanation_id`: UUID
*   `question_id`: FK
*   `language_code`: enum (en, vi, es, zh)
*   `explanation_text`: Text (The rich text explanation in the specific language)

---

## 9. Success Metrics (KPIs)
1.  **Completion Rate:** % of users who start the quiz and reach the Results page.
2.  **Click-Through Rate (CTR):** % of users clicking on "Grammar for IELTS" or "eJOY" links on the results page.
3.  **Language Usage:** % breakdown of interface language selection (validates the need for localization).

---

## 10. Grammar Topics Coverage

The diagnostic test is designed to assess learners across **25 core grammar topics** that are essential for English proficiency. The 50-question test ensures comprehensive coverage across all topics.

### 10.1 Complete Grammar Topics List

The following topics MUST be covered in the question bank:

| # | Grammar Topic | Minimum Questions | Current Coverage |
| :-- | :--- | :--- | :--- |
| 1 | Present tenses | 2 | Q1-Q2 |
| 2 | Past tenses 1 | 2 | Q3-Q4 |
| 3 | Present perfect | 2 | Q5-Q6 |
| 4 | Past tenses 2 | 2 | Q7-Q8 |
| 5 | Future 1 | 2 | Q9-Q10 |
| 6 | Future 2 | 2 | Q11-Q12 |
| 7 | Countable and uncountable nouns | 2 | Q13-Q14 |
| 8 | Referring to nouns | 2 | Q15-Q16 |
| 9 | Pronouns and referencing | 2 | Q17-Q18 |
| 10 | Adjectives and adverbs | 2 | Q19-Q20 |
| 11 | Comparing things | 2 | Q21-Q22 |
| 12 | The noun phrase | 2 | Q23-Q24 |
| 13 | Modals 1 | 2 | Q25-Q26 |
| 14 | Modals 2 | 2 | Q27-Q28 |
| 15 | Reported speech | 2 | Q29-Q30 |
| 16 | Verb + verb patterns | 2 | Q31-Q32 |
| 17 | Likelihood based on conditions 1 | 2 | Q33-Q34 |
| 18 | Likelihood based on conditions 2 | 2 | Q35-Q36 |
| 19 | Prepositions | 2 | Q37-Q38 |
| 20 | Relative clauses | 2 | Q39-Q40 |
| 21 | Ways of organising texts | 2 | Q41-Q42 |
| 22 | The passive | 2 | Q43-Q44 |
| 23 | Linking ideas | 2 | Q45-Q46 |
| 24 | Showing your position in a text | 2 | Q47-Q48 |
| 25 | Nominalisation in written English | 2 | Q49-Q50 |
| | **TOTAL** | **50** | **50** |

### 10.2 Coverage Requirements

**Business Rule:** The 50 questions randomly selected from the Question Bank MUST:
1. Include exactly **TWO questions from each of the 25 grammar topics** listed above.
2. Ensure perfect distribution (2 questions per topic) for balanced assessment.
3. When the Question Bank expands beyond 50 items, the randomization algorithm must maintain topic diversity by selecting 2 distinct questions per topic.

### 10.3 Topic Distribution Strategy

**For MVP (Current 50-Question Fixed Set):**
- ✅ All 25 topics are currently covered in Questions 1-50
- ✅ Distribution is perfectly balanced with exactly 2 questions per topic
- ✅ All topics are equally weighted for diagnostic accuracy

**For Future Expansion (200+ Question Bank):**
- Implement structured random selection ensuring each of the 25 topics appears exactly twice
- Maintain exactly 2 questions per topic (50 ÷ 25 = 2)

---

## Appendix A: Initial Question Set (50 Items)

The following 50 questions constitute the initial seed for the **Question Bank**.


| Q# | Question Text | Correct Answer | Unit/Topic | Explanation (Base English) |
| :-- | :--- | :--- | :--- | :--- |
| 1 | Most university students __________ on campus in their first year. | B (live) | Present tenses | We use the Present Simple for facts and habits. |
| 2 | From this graph we can see that the economy __________ at the moment. | C (is improving) | Present tenses | We use the Present Continuous for things happening now ("at the moment"). |
| 3 | They __________ personal computers when my father was a student. | B (didn’t have) | Past tenses 1 | We use "didn't have" because we don't usually use "having" to mean possession. |
| 4 | I __________ want to be a practising doctor but now I’m more interested in research. | B (used to) | Past tenses 1 | We use "used to" for things that were true in the past but not now. |
| 5 | I finished my essay yesterday but __________ it in to the tutor yet. | B (I haven’t given) | Present perfect | We use "yet" with negative sentences to say something hasn't happened. |
| 6 | __________ the experiment three times now with different results each time! | A (We’ve done) | Present perfect | We use Present Perfect to say how many times something has happened. |
| 7 | When I arrived the lecture __________ so I didn’t find it easy to follow. | B (had started) | Past tenses 2 | We use Past Perfect for the first of two past actions. |
| 8 | She __________ well at school but that changed when she became friends with a different group of girls. | C (had been doing) | Past tenses 2 | We use Past Perfect Continuous to emphasize how long something happened before a past moment. |
| 9 | __________ the doctor at 2.00 this afternoon so I can’t go to the lecture. | A (I’m seeing) | Future 1 | We use Present Continuous for fixed arrangements in the future. |
| 10 | My sister __________ economics and politics when she goes to university. | A (is going to study) | Future 1 | We use "going to" for future plans. |
| 11 | While we’re working on the project our boss __________ on a beach in Greece! | C (will be sitting) | Future 2 | We use Future Continuous for actions that will be in progress at a time in the future. |
| 12 | If the trend continues, the average income __________ by 107% by 2020. | B (will have increased) | Future 2 | We use Future Perfect for actions that will be finished before a time in the future. |
| 13 | You can base your geography assignment on __________ country – it doesn’t matter which. | C (any) | Countable and uncountable nouns | We use "any" when it does not matter which one you choose. |
| 14 | There aren’t __________ places left on the course so you’d better apply soon. | B (many) | Countable and uncountable nouns | We use "many" for things we can count in negative sentences. |
| 15 | I don’t know whether to accept the job offer. It’s __________ . | A (a difficult decision) | Referring to nouns | We use "a" because "decision" is one single thing (countable). |
| 16 | For those of you new to the company, this leaflet is full of __________ . | C (valuable information) | Referring to nouns | "Information" is uncountable, so we cannot use "a" or "an". |
| 17 | I know it’s not much of a present but I made it __________ . | B (myself) | Pronouns and referencing | We use a reflexive pronoun (like "myself") to emphasize who did the action. |
| 18 | He built the house __________. | A (himself) | Pronouns and referencing | We use a reflexive pronoun (like "myself") to emphasize who did the action. |
| 19 | You should visit Bath. It’s __________ city. | C (an interesting historical) | Adjectives and adverbs | Opinion words (like "interesting") come before fact words (like "historical"). |
| 20 | The government has released some __________ data showing how schools are not providing an adequate education to our children. | A (shocking) | Adjectives and adverbs | We use adjectives ending in "-ing" to describe the thing causing the feeling. |
| 21 | This factory produces some of __________ cameras in the world. | B (the best) | Comparing things | We always use "the" before superlative adjectives (like "best", "tallest"). |
| 22 | __________ people live in the countryside than 100 years ago. | C (Fewer) | Comparing things | We use "fewer" for things we can count (like "people"). |
| 23 | The bookshop __________ the end of the road is excellent. | A (at) | The noun phrase | We use "at" for a specific place. |
| 24 | There were millions of people around the world __________ the football match live on television. | B (watching) | The noun phrase | We use the "-ing" form to describe the noun actively doing something. |
| 25 | Scientists finally __________ find a cure for the disease after years of research. | A (managed to) | Modals 1 | We use "managed to" when we succeed in doing something difficult. |
| 26 | She got a terrible mark in the exam so she __________ very hard at all. | B (can’t have worked) | Modals 1 | We use "can't have" when we are sure something did not happen in the past. |
| 27 | What __________ in order to get a permit to work in your country? | A (do I need to do) | Modals 2 | This is the correct way to ask "Is it necessary?". |
| 28 | When you write your essays you __________ copy ideas from books without referencing them properly. | A (mustn’t) | Modals 2 | We use "must not" to say something is not allowed. |
| 29 | Doctors have __________ us to cut down on salt in our diets if we want to reduce the risk of getting heart disease. | C (advised) | Reported speech | After "advise", we use a person + "to do". |
| 30 | __________ this newspaper report, more women smoke than men nowadays. | B (According to) | Reported speech | We use "according to" to say where information comes from. |
| 31 | My parents encouraged __________ this course. | A (me to do) | Verb + verb patterns | After "encourage", we use a person + "to do". |
| 32 | He invited __________ the party. | B (me to join) | Verb + verb patterns | After "invite", we use a person + "to do". |
| 33 | What will you do if __________ | A (you don’t get a good IELTS score?) | Likelihood based on conditions 1 | We use the First Conditional for real possibilities in the future. |
| 34 | A recent government report has warned that __________ we act immediately to reduce pollution, there will be serious consequences for the planet. | C (unless) | Likelihood based on conditions 1 | "Unless" means the same as "if not". |
| 35 | If I didn’t have to work tonight, __________ | A (I’d be able to relax now.) | Likelihood based on conditions 2 | We use the Second Conditional for imaginary situations. |
| 36 | I wish that man __________ tapping his fingers on the table. It’s really annoying me. | C (would stop) | Likelihood based on conditions 2 | We use "wish... would" for annoying habits we want to change. |
| 37 | I’m aiming __________ a band 7 in IELTS. | B (for) | Prepositions | We say "aim for" a goal. |
| 38 | Do you have any knowledge __________ how our education system works? | A (of) | Prepositions | We say "knowledge of" a subject. |
| 39 | The minister __________ is responsible for education has just resigned. | B (who) | Relative clauses | We use "who" for people. |
| 40 | The University of St Andrews __________ is the oldest university in Scotland. | B (, which was founded in 1413,) | Relative clauses | We use commas for extra information that isn't essential. |
| 41 | Many children these days do not have a healthy diet. __________ is possible that this is because less healthy foods are cheaper than healthy ones. | C (It) | Ways of organising texts | We use "It" to start sentences like this. |
| 42 | The charity is trying to find ways to save and __________ the world’s endangered animal species. | C (protect) | Ways of organising texts | We can remove words like "to" to avoid repeating them. |
| 43 | In the past we threw a lot of our kitchen waste away, but today many items such as plastic bottles and newspapers __________ . | A (are recycled) | The passive | We use the Passive Voice when the action is more important than who did it. |
| 44 | I can’t pick you up from the station on Wednesday because __________ on that day. | B (I’m having my car fixed) | The passive | We say "have something done" when someone else does a service for us. |
| 45 | These drugs are the best medicine available as a treatment at the moment, __________ they are expensive, unfortunately. | A (although) | Linking ideas | We use this word to show a contrast or difference. |
| 46 | Learning a foreign language is important because it helps you to understand other cultures better. __________ it can be a useful skill in many areas of work. | C (In addition,) | Linking ideas | We use this word to add similar information. |
| 47 | __________ I can’t go to the conference as I’ve got to go to Sydney on business. | B (Unfortunately) | Showing your position in a text | We use this word to introduce bad news. |
| 48 | __________ I think it’s useful to write an outline of your essay before you start to write the first draft. | C (Personally,) | Showing your position in a text | We use this word to give our personal opinion. |
| 49 | The __________ of dark red spots is one of the first signs of the disease. | A (appearance) | Nominalisation in written English | We need a noun (a thing word) after "The". |
| 50 | The __________ of the sun was beautiful. | B (brightness) | Nominalisation in written English | We need a noun (a thing word) here. |

