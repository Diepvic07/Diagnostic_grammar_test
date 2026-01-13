import * as fs from 'fs';
import * as path from 'path';
import { Question, GrammarTopic, UserSession } from '../types';

const DATA_DIR = path.join(process.cwd(), 'src/data');

// Types based on our generated JSONs
// We might need to map these to the main types if they differ slightly
// But for now let's assume they align or we cast them.

// Cache for static data
let questionsCache: Question[] | null = null;
let topicsCache: GrammarTopic[] | null = null;
let topicsMapCache: Map<number, GrammarTopic> | null = null;

export const JsonStore = {
    // --- Questions ---
    getQuestions: (): Question[] => {
        if (!questionsCache) {
            const data = fs.readFileSync(path.join(DATA_DIR, 'questions.json'), 'utf-8');
            questionsCache = JSON.parse(data);
        }
        return questionsCache || [];
    },

    getQuestionById: (id: string): Question | undefined => {
        const questions = JsonStore.getQuestions();
        return questions.find(q => q.id === id);
    },

    // --- Topics ---
    getTopics: (): GrammarTopic[] => {
        if (!topicsCache) {
            const data = fs.readFileSync(path.join(DATA_DIR, 'topics.json'), 'utf-8');
            topicsCache = JSON.parse(data);
        }
        return topicsCache || [];
    },

    getTopicByNumber: (num: number): GrammarTopic | undefined => {
        if (!topicsMapCache) {
            const topics = JsonStore.getTopics();
            topicsMapCache = new Map(topics.map(t => [t.topicNumber, t]));
        }
        return topicsMapCache?.get(num);
    },

    // --- Sessions ---
    // Note: This is synchronous and simple. For high concurrency, this is bad.
    // But for a simple deployment with file storage, it works.
    getSessions: (): UserSession[] => {
        const filePath = path.join(DATA_DIR, 'sessions.json');
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    },

    getSessionById: (id: string): UserSession | undefined => {
        const sessions = JsonStore.getSessions();
        return sessions.find(s => s.id === id);
    },

    saveSession: (session: UserSession): void => {
        const sessions = JsonStore.getSessions();
        const index = sessions.findIndex(s => s.id === session.id);

        if (index >= 0) {
            sessions[index] = session;
        } else {
            sessions.push(session);
        }

        fs.writeFileSync(path.join(DATA_DIR, 'sessions.json'), JSON.stringify(sessions, null, 2));
    },

    createSession: (session: UserSession): void => {
        JsonStore.saveSession(session);
    }
};
