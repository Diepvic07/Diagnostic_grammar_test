
import { getQuizQuestions } from './src/services/questionService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testLogic() {
    console.log('Running Quiz Logic Test...');

    try {
        const questions = await getQuizQuestions();

        console.log(`Received ${questions.length} questions.`);

        if (questions.length !== 50) {
            console.error('FAIL: Expected 50 questions.');
            process.exit(1);
        }

        // Check distribution
        const topicCounts: Record<number, number> = {};
        for (const q of questions) {
            topicCounts[q.topicNumber] = (topicCounts[q.topicNumber] || 0) + 1;
        }

        const topics = Object.keys(topicCounts).map(Number).sort((a, b) => a - b);
        console.log(`Covered ${topics.length} topics.`);

        let fail = false;
        if (topics.length !== 25) {
            console.error('FAIL: Expected 25 unique topics.');
            fail = true;
        }

        for (const t of topics) {
            if (topicCounts[t] !== 2) {
                console.error(`FAIL: Topic ${t} has ${topicCounts[t]} questions, expected 2.`);
                fail = true;
            }
        }

        if (!fail) {
            console.log('SUCCESS: Logic verified (50 questions, 2 per topic).');
        } else {
            console.error('FAIL: Distribution incorrect.');
            process.exit(1);
        }

    } catch (e) {
        console.error('Error running test:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

testLogic();
