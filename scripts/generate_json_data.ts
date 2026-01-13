import * as fs from 'fs';
import * as path from 'path';

// Define types matching our new JSON structure
interface AnswerOption {
    id: string;
    textEn: string;
    isCorrect: boolean;
}

interface Explanation {
    languageCode: string;
    explanationText: string;
}

interface Question {
    id: string;
    contentEn: string;
    grammarTopic: string;
    topicNumber: number;
    answers: AnswerOption[];
    explanations: Explanation[];
}

interface GrammarTopic {
    topicNumber: number;
    topicName: string;
    studyReferenceEn: string;
    studyReferenceVi: string;
    studyReferenceEs: string;
    studyReferenceZh: string;
    practiceLink: string;
}

// 1. Define Topics (Copied from seed.ts)
const topicsData = [
    { topicNumber: 1, topicName: 'Present tenses', studyRef: 'Grammar for IELTS - Unit 1', practiceLink: 'https://ejoy-english.com/lessons/present-tenses' },
    { topicNumber: 2, topicName: 'Past tenses 1', studyRef: 'Grammar for IELTS - Unit 2', practiceLink: 'https://ejoy-english.com/lessons/past-tenses' },
    { topicNumber: 3, topicName: 'Present perfect', studyRef: 'Grammar for IELTS - Unit 3', practiceLink: 'https://ejoy-english.com/lessons/present-perfect' },
    { topicNumber: 4, topicName: 'Past tenses 2', studyRef: 'Grammar for IELTS - Unit 4', practiceLink: 'https://ejoy-english.com/lessons/past-perfect' },
    { topicNumber: 5, topicName: 'Future 1', studyRef: 'Grammar for IELTS - Unit 5', practiceLink: 'https://ejoy-english.com/lessons/future-forms' },
    { topicNumber: 6, topicName: 'Future 2', studyRef: 'Grammar for IELTS - Unit 6', practiceLink: 'https://ejoy-english.com/lessons/future-perfect' },
    { topicNumber: 7, topicName: 'Countable and uncountable nouns', studyRef: 'Grammar for IELTS - Unit 7', practiceLink: 'https://ejoy-english.com/lessons/nouns' },
    { topicNumber: 8, topicName: 'Referring to nouns', studyRef: 'Grammar for IELTS - Unit 8', practiceLink: 'https://ejoy-english.com/lessons/articles' },
    { topicNumber: 9, topicName: 'Pronouns and referencing', studyRef: 'Grammar for IELTS - Unit 9', practiceLink: 'https://ejoy-english.com/lessons/pronouns' },
    { topicNumber: 10, topicName: 'Adjectives and adverbs', studyRef: 'Grammar for IELTS - Unit 10', practiceLink: 'https://ejoy-english.com/lessons/adjectives' },
    { topicNumber: 11, topicName: 'Comparing things', studyRef: 'Grammar for IELTS - Unit 11', practiceLink: 'https://ejoy-english.com/lessons/comparatives' },
    { topicNumber: 12, topicName: 'The noun phrase', studyRef: 'Grammar for IELTS - Unit 12', practiceLink: 'https://ejoy-english.com/lessons/noun-phrases' },
    { topicNumber: 13, topicName: 'Modals 1', studyRef: 'Grammar for IELTS - Unit 13', practiceLink: 'https://ejoy-english.com/lessons/modals' },
    { topicNumber: 14, topicName: 'Modals 2', studyRef: 'Grammar for IELTS - Unit 14', practiceLink: 'https://ejoy-english.com/lessons/modal-perfects' },
    { topicNumber: 15, topicName: 'Reported speech', studyRef: 'Grammar for IELTS - Unit 15', practiceLink: 'https://ejoy-english.com/lessons/reported-speech' },
    { topicNumber: 16, topicName: 'Verb + verb patterns', studyRef: 'Grammar for IELTS - Unit 16', practiceLink: 'https://ejoy-english.com/lessons/verb-patterns' },
    { topicNumber: 17, topicName: 'Likelihood based on conditions 1', studyRef: 'Grammar for IELTS - Unit 17', practiceLink: 'https://ejoy-english.com/lessons/conditionals-1' },
    { topicNumber: 18, topicName: 'Likelihood based on conditions 2', studyRef: 'Grammar for IELTS - Unit 18', practiceLink: 'https://ejoy-english.com/lessons/conditionals-2' },
    { topicNumber: 19, topicName: 'Prepositions', studyRef: 'Grammar for IELTS - Unit 19', practiceLink: 'https://ejoy-english.com/lessons/prepositions' },
    { topicNumber: 20, topicName: 'Relative clauses', studyRef: 'Grammar for IELTS - Unit 20', practiceLink: 'https://ejoy-english.com/lessons/relative-clauses' },
    { topicNumber: 21, topicName: 'Ways of organising texts', studyRef: 'Grammar for IELTS - Unit 21', practiceLink: 'https://ejoy-english.com/lessons/text-organization' },
    { topicNumber: 22, topicName: 'The passive', studyRef: 'Grammar for IELTS - Unit 22', practiceLink: 'https://ejoy-english.com/lessons/passive-voice' },
    { topicNumber: 23, topicName: 'Linking ideas', studyRef: 'Grammar for IELTS - Unit 23', practiceLink: 'https://ejoy-english.com/lessons/linking-words' },
    { topicNumber: 24, topicName: 'Showing your position in a text', studyRef: 'Grammar for IELTS - Unit 24', practiceLink: 'https://ejoy-english.com/lessons/stance-markers' },
    { topicNumber: 25, topicName: 'Nominalisation in written English', studyRef: 'Grammar for IELTS - Unit 25', practiceLink: 'https://ejoy-english.com/lessons/nominalisation' },
];

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuote = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuote && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuote = !inQuote;
            }
        } else if (char === ',' && !inQuote) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

async function main() {
    const csvPath = path.join(process.cwd(), 'doc/complete_question_bank_localized.csv');
    const outputDir = path.join(process.cwd(), 'backend/src/data');

    // Ensure output dir exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 1. Process Topics
    const topics: GrammarTopic[] = topicsData.map(t => ({
        topicNumber: t.topicNumber,
        topicName: t.topicName,
        studyReferenceEn: t.studyRef,
        studyReferenceVi: t.studyRef,
        studyReferenceEs: t.studyRef,
        studyReferenceZh: t.studyRef,
        practiceLink: t.practiceLink
    }));

    // Create topic lookup map
    const topicMap = new Map<string, number>();
    topics.forEach(t => {
        topicMap.set(t.topicName.toLowerCase(), t.topicNumber);
        if (t.topicName === 'Countable and uncountable nouns') {
            topicMap.set('countable and uncountable nouns', t.topicNumber);
            topicMap.set('countable/uncountable nouns', t.topicNumber);
        }
        if (t.topicName === 'Nominalisation in written English') {
            topicMap.set('nominalisation', t.topicNumber);
        }
    });


    // 2. Process Questions
    const questions: Question[] = [];

    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = fileContent.split('\n');

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const cols = parseCSVLine(line);
        if (cols.length < 9) continue;

        const questionText = cols[1];
        const correctAnswerRaw = cols[2];
        const grammarTopicName = cols[4];
        const explEn = cols[5];
        const explVi = cols[6];
        const explEs = cols[7];
        const explZh = cols[8];

        const dist1 = cols[9];
        const dist2 = cols[10];
        const dist3 = cols[11];

        const correctValRegex = /^[A-Z]\s*\((.*)\)$/;
        const match = correctAnswerRaw.match(correctValRegex);
        const correctText = match ? match[1] : correctAnswerRaw;

        const answers: AnswerOption[] = [
            { id: generateUUID(), textEn: correctText, isCorrect: true },
            { id: generateUUID(), textEn: dist1, isCorrect: false },
            { id: generateUUID(), textEn: dist2, isCorrect: false },
            { id: generateUUID(), textEn: dist3, isCorrect: false },
        ];

        // Map topic
        let topicNum = topicMap.get(grammarTopicName.toLowerCase());
        if (!topicNum) {
            if (grammarTopicName === 'Countable/uncountable nouns') topicNum = 7;
            else if (grammarTopicName === 'Nominalisation') topicNum = 25;
            else {
                console.warn(`Unknown topic: "${grammarTopicName}" mapping to 1`);
                topicNum = 1;
            }
        }

        const explications: Explanation[] = [
            { languageCode: 'en', explanationText: explEn || '' },
            { languageCode: 'vi', explanationText: explVi || '' },
            { languageCode: 'es', explanationText: explEs || '' },
            { languageCode: 'zh', explanationText: explZh || '' },
        ]

        questions.push({
            id: generateUUID(),
            contentEn: questionText,
            grammarTopic: grammarTopicName,
            topicNumber: topicNum || 1,
            answers: answers,
            explanations: explications
        });
    }

    // Write Files
    fs.writeFileSync(path.join(outputDir, 'topics.json'), JSON.stringify(topics, null, 2));
    fs.writeFileSync(path.join(outputDir, 'questions.json'), JSON.stringify(questions, null, 2));

    // Create empty sessions file
    if (!fs.existsSync(path.join(outputDir, 'sessions.json'))) {
        fs.writeFileSync(path.join(outputDir, 'sessions.json'), JSON.stringify([]));
    }

    console.log(`Generated ${questions.length} questions and ${topics.length} topics in ${outputDir}`);
}

main().catch(console.error);
