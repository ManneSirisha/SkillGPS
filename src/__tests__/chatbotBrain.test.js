import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
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
        // Mock the system time to ensure consistent start dates
        // Jan 1, 2024 is a Monday
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns null for an invalid domain', () => {
        const result = generateICSFile('Invalid Domain');
        expect(result).toBeNull();
    });

    it('generates a valid ICS file for a known domain', () => {
        const result = generateICSFile('Data Scientist');

        // Assertions for ICS format
        expect(result).toContain('BEGIN:VCALENDAR');
        expect(result).toContain('VERSION:2.0');
        expect(result).toContain('BEGIN:VEVENT');
        expect(result).toContain('END:VEVENT');
        expect(result).toContain('END:VCALENDAR');

        // Assertions for specific domain content
        expect(result).toContain('SUMMARY:SkillGPS: Data Scientist');
        // Based on careerSkills['Data Scientist'].technical.essential = ['Python', ...]
        expect(result).toContain('Learn Python');

        // Check for specific date formatting
        // Jan 1, 2024 is Monday. Next Monday is Jan 8, 2024.
        // The script does: startMonday.setDate(startMonday.getDate() + ((1 + 7 - startMonday.getDay()) % 7 || 7));
        // So for Jan 1 (day 1), (1 + 7 - 1) % 7 = 0. So it adds 7 days to get Jan 8.
        // It sets hours to 9. The time is localized to wherever it runs.
        // Therefore, we just check that DTSTART and DTEND exist and use the format string replacing /[-:]/g
        expect(result).toMatch(/DTSTART:\d{8}T\d{6}Z/);
        expect(result).toMatch(/DTEND:\d{8}T\d{6}Z/);
    });

    it('creates 5 sessions per week for 8 weeks', () => {
        const result = generateICSFile('Backend Developer');

        // Count BEGIN:VEVENT instances
        const events = result.match(/BEGIN:VEVENT/g);
        expect(events).toBeDefined();
        expect(events.length).toBe(40); // 8 weeks * 5 days
    });
});
