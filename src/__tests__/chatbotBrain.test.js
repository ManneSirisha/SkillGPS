import { describe, it, expect, beforeEach } from 'vitest';
import { updateContext, getContext, resetContext, extractDomain, processMessage } from '../services/chatbotBrain';

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

    it('does not update lastDomain if domain is falsy', () => {
        updateContext('Data Science', 'course_recommendation');
        updateContext(null, 'project_suggestion');
        const context = getContext();
        expect(context.lastDomain).toBe('Data Science');
        expect(context.lastIntent).toBe('project_suggestion');
        expect(context.turnCount).toBe(2);
    });

    it('does not update lastIntent if intent is general or greeting', () => {
        updateContext('Backend Developer', 'skill_inquiry');

        updateContext('Frontend Developer', 'general');
        let context = getContext();
        expect(context.lastDomain).toBe('Frontend Developer');
        expect(context.lastIntent).toBe('skill_inquiry');
        expect(context.turnCount).toBe(2);

        updateContext('UI/UX Designer', 'greeting');
        context = getContext();
        expect(context.lastDomain).toBe('UI/UX Designer');
        expect(context.lastIntent).toBe('skill_inquiry');
        expect(context.turnCount).toBe(3);
    });

    it('does not update lastIntent if intent is falsy', () => {
        updateContext('AI/ML Engineer', 'roadmap');
        updateContext('Cloud Engineer', null);
        const context = getContext();
        expect(context.lastDomain).toBe('Cloud Engineer');
        expect(context.lastIntent).toBe('roadmap');
        expect(context.turnCount).toBe(2);
    });

    it('increments turnCount on every call regardless of parameters', () => {
        updateContext(null, null);
        updateContext(undefined, undefined);
        const context = getContext();
        expect(context.turnCount).toBe(2);
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
