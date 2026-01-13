import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    console.log('Starting database seed...');

    // Seed Grammar Topics
    console.log('Seeding grammar topics...');
    const topicMap = await seedGrammarTopics();

    // Seed Questions with Answers and Explanations form CSV
    console.log('Seeding questions from CSV...');
    await seedQuestionsFromCSV(topicMap);

    console.log('Database seeded successfully!');
}

async function seedGrammarTopics() {
    const topics = [
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

    const topicMap = new Map<string, number>();

    // Clear existing questions first
    console.log('Clearing existing questions...');
    // Delete answers and explanations first due to FK constraints usually, but deleteMany handles cascade if configured?
    // Prisma deleteMany on parent might fail if relation is not cascade.
    // Let's safe delete.
    await prisma.answerOption.deleteMany({});
    await prisma.explanation.deleteMany({});
    await prisma.question.deleteMany({});

    for (const topic of topics) {
        await prisma.grammarTopic.upsert({
            where: { topicNumber: topic.topicNumber },
            update: {
                topicName: topic.topicName,
            },
            create: {
                topicNumber: topic.topicNumber,
                topicName: topic.topicName,
                minimumQuestions: 2,
                studyReferenceEn: topic.studyRef,
                studyReferenceVi: topic.studyRef,
                studyReferenceEs: topic.studyRef,
                studyReferenceZh: topic.studyRef,
                practiceLink: topic.practiceLink,
            },
        });
        topicMap.set(topic.topicName.toLowerCase(), topic.topicNumber);

        // Mappings
        if (topic.topicName === 'Countable and uncountable nouns') {
            topicMap.set('countable and uncountable nouns', topic.topicNumber);
            topicMap.set('countable/uncountable nouns', topic.topicNumber);
        }
        if (topic.topicName === 'Nominalisation in written English') {
            topicMap.set('nominalisation', topic.topicNumber);
        }
    }

    return topicMap;
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

async function seedQuestionsFromCSV(topicMap: Map<string, number>) {
    const csvPath = path.join(__dirname, '../../doc/complete_question_bank_localized.csv');
    console.log(`Reading CSV from ${csvPath}`);

    try {
        const fileContent = fs.readFileSync(csvPath, 'utf-8');
        const lines = fileContent.split('\n');

        let count = 0;
        // Skip header
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const cols = parseCSVLine(line);
            if (cols.length < 9) {
                console.warn(`Skipping malformed line ${i}`);
                continue;
            }

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

            // Use real distractors
            const answers = [
                { text: correctText, isCorrect: true },
                { text: dist1, isCorrect: false },
                { text: dist2, isCorrect: false },
                { text: dist3, isCorrect: false },
            ];

            // Map topic
            let topicNum = topicMap.get(grammarTopicName.toLowerCase());
            if (!topicNum) {
                // Fallback / fuzzy 
                if (grammarTopicName === 'Countable/uncountable nouns') topicNum = 7;
                else if (grammarTopicName === 'Nominalisation') topicNum = 25;
                else {
                    // Try removing "The" if present? No.
                    // Just default to 1? Or warn?
                    console.warn(`Unknown topic: "${grammarTopicName}" mapping to 1`);
                    topicNum = 1;
                }
            }

            await prisma.question.create({
                data: {
                    contentEn: questionText,
                    grammarTopic: grammarTopicName,
                    topicNumber: topicNum || 1,
                    answers: {
                        create: answers.map(a => ({
                            textEn: a.text,
                            isCorrect: a.isCorrect
                        }))
                    },
                    explanations: {
                        create: [
                            { languageCode: 'en', explanationText: explEn || '' },
                            { languageCode: 'vi', explanationText: explVi || '' },
                            { languageCode: 'es', explanationText: explEs || '' },
                            { languageCode: 'zh', explanationText: explZh || '' },
                        ]
                    }
                }
            });
            count++;
        }
        console.log(`Seeded ${count} questions.`);
    } catch (e) {
        console.error('Error reading/seeding CSV:', e);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
