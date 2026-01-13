import { PrismaClient } from '@prisma/client';
import type { UserAnswer, WeakTopic, StudyPlanResponse } from '../types';

const prisma = new PrismaClient();

/**
 * Generate personalized study plan based on quiz results
 */
export async function generateStudyPlan(
    sessionId: string,
    language: 'en' | 'vi' | 'es' | 'zh'
): Promise<StudyPlanResponse> {
    const session = await prisma.userSession.findUnique({
        where: { id: sessionId },
    });

    if (!session || !session.answersData) {
        throw new Error('Session not found or not completed');
    }

    const answersData = session.answersData as unknown as UserAnswer[];

    // Analyze errors by topic
    const topicErrors = analyzeTopicErrors(answersData);

    // Get top 3 weakest topics
    const weakestTopics = topicErrors
        .sort((a, b) => b.errorRate - a.errorRate)
        .slice(0, 3);

    // Fetch study resources for weak topics
    const weakTopics: WeakTopic[] = [];

    for (let i = 0; i < weakestTopics.length; i++) {
        const topicData = weakestTopics[i];
        const grammarTopic = await prisma.grammarTopic.findFirst({
            where: { topicNumber: topicData.topicNumber },
        });

        if (!grammarTopic) continue;

        const studyReference = getStudyReferenceByLanguage(grammarTopic, language);

        weakTopics.push({
            topicName: grammarTopic.topicName,
            topicNumber: grammarTopic.topicNumber,
            errorCount: topicData.errorCount,
            totalQuestions: topicData.totalQuestions,
            isPriority: i === 0, // First topic is priority
            studyReference,
            studyReferenceLink: '#', // TODO: Add actual links
            practiceTitle: `Watch Lesson: ${grammarTopic.topicName}`,
            practiceLink: grammarTopic.practiceLink,
        });
    }

    return {
        weakTopics,
        ieltsRecommendation: {
            title: 'Grammar for IELTS',
            description: 'Master grammar rules with our comprehensive textbook designed for your level.',
            link: 'https://example.com/ielts-grammar', // TODO: Update with actual link
        },
        ejoyRecommendation: {
            title: 'Practice on eJOY',
            description: 'Immerse yourself in real-world English using movies and videos on the eJOY app.',
            link: 'https://ejoy-english.com',
        },
    };
}

interface TopicErrorAnalysis {
    topicNumber: number;
    topicName: string;
    errorCount: number;
    totalQuestions: number;
    errorRate: number;
}

function analyzeTopicErrors(answersData: UserAnswer[]): TopicErrorAnalysis[] {
    const topicMap = new Map<number, { name: string; errors: number; total: number }>();

    for (const answer of answersData) {
        const existing = topicMap.get(answer.topicNumber) || {
            name: answer.grammarTopic,
            errors: 0,
            total: 0,
        };

        existing.total++;
        if (!answer.isCorrect) {
            existing.errors++;
        }

        topicMap.set(answer.topicNumber, existing);
    }

    const results: TopicErrorAnalysis[] = [];

    for (const [topicNumber, data] of topicMap.entries()) {
        // Only include topics with errors
        if (data.errors > 0) {
            results.push({
                topicNumber,
                topicName: data.name,
                errorCount: data.errors,
                totalQuestions: data.total,
                errorRate: data.errors / data.total,
            });
        }
    }

    return results;
}

function getStudyReferenceByLanguage(
    topic: any,
    language: 'en' | 'vi' | 'es' | 'zh'
): string {
    switch (language) {
        case 'vi':
            return topic.studyReferenceVi;
        case 'es':
            return topic.studyReferenceEs;
        case 'zh':
            return topic.studyReferenceZh;
        default:
            return topic.studyReferenceEn;
    }
}
