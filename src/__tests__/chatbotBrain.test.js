import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { updateContext, getContext, resetContext, extractDomain, processMessage, generateICSFile } from '../services/chatbotBrain';

describe('chatbotBrain Context Management', () => {
    beforeEach(() => {
        resetContext();
    });

    it('initializes with empty context', () => {
        const context = getContext();
        expect(context.lastDomain).toBeNull();
        expect(context.lastIntent).toBeNull();
        expect(context.turnCount).toBe(0);
    });

    it('updates context successfully', () => {
        updateContext('Data Science', 'course_recommendation');
        const context = getContext();
        expect(context.lastDomain).toBe('Data Science');
        expect(context.lastIntent).toBe('course_recommendation');
        expect(context.turnCount).toBe(1);
    });

    it('resets context successfully', () => {
        updateContext('AI/ML Engineer', 'project_suggestion');
        resetContext();
        const context = getContext();
        expect(context.lastDomain).toBeNull();
        expect(context.lastIntent).toBeNull();
        expect(context.turnCount).toBe(0);
    });
});

describe('chatbotBrain extractDomain', () => {
    it('extracts matching domains directly', () => {
        expect(extractDomain('I want to learn Data Science')).toBe('Data Scientist');
        expect(extractDomain('What is AI?')).toBe('AI/ML Engineer'); // AI alias
    });

    it('handles fuzzy matching and aliases', () => {
        // Expected aliases:
        expect(extractDomain('I am a frontend dev')).toBe('Frontend Developer');
        expect(extractDomain('I like UI/UX')).toBe('UI/UX Designer');
        expect(extractDomain('Tell me about backend')).toBe('Backend Developer');
    });

    it('returns null if no domain matches', () => {
        expect(extractDomain('Hello, how are you?')).toBeNull();
        expect(extractDomain('What courses do you have?')).toBeNull();
    });
});

describe('chatbotBrain processMessage', () => {
    beforeEach(() => {
        resetContext();
    });

    it('responds to greetings', () => {
        const response = processMessage('Hello');
        expect(response).toBeTruthy();
        expect(typeof response).toBe('string');
        // greeting responses have some keywords
        expect(response.toLowerCase().includes('hello') || response.toLowerCase().includes('hey') || response.toLowerCase().includes('namaste')).toBeTruthy();
    });

    it('processes course recommendation for a new domain', () => {
        const response = processMessage('Recommend courses for Data Science');
        expect(response).toContain('Data Scientist');
        expect(response).toContain('Learning Path'); // The heading text for overview
        const context = getContext();
        expect(context.lastDomain).toBe('Data Scientist');
    });

    it('remembers context for follow-ups', () => {
        processMessage('Recommend courses for Backend Developer');
        // next message is vague "what about projects"
        const response = processMessage('what about projects');
        expect(response).toContain('Projects');
        expect(response).toContain('Backend Developer');
        const context = getContext();
        expect(context.lastDomain).toBe('Backend Developer');
    });

    it('asks for clarification on empty/missing domain for specific intent', () => {
        const response = processMessage('I want to learn');
        expect(response.toLowerCase()).toContain('which'); // Usually says "which career field"
    });

    it('returns fallback for empty message', () => {
        const response = processMessage('   ');
        expect(response).toContain('I didn\'t get that. Could you say something?');
    });
});

describe('chatbotBrain generateICSFile', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns null for unknown domain', () => {
        expect(generateICSFile('Unknown Domain')).toBeNull();
    });

    it('generates deterministic ICS file for a known domain', () => {
        // Set date to 2024-01-03T12:00:00.000Z (A Wednesday)
        const mockDate = new Date('2024-01-03T12:00:00Z');
        vi.setSystemTime(mockDate);

        const ics = generateICSFile('Data Scientist');

        // Basic structure
        expect(ics).toContain('BEGIN:VCALENDAR');
        expect(ics).toContain('VERSION:2.0');
        expect(ics).toContain('END:VCALENDAR');

        // Check if it contains the skills
        expect(ics).toContain('SUMMARY:SkillGPS: Data Scientist — Learn Python');
        expect(ics).toContain('SUMMARY:SkillGPS: Data Scientist — Learn SQL');
        expect(ics).toContain('SUMMARY:SkillGPS: Data Scientist — Learn R'); // Recommended[0]

        // Check number of events (8 weeks * 5 days = 40 events)
        const eventCount = (ics.match(/BEGIN:VEVENT/g) || []).length;
        expect(eventCount).toBe(40);
    });
});
