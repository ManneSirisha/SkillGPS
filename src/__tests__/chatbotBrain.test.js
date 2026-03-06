import { describe, it, expect, beforeEach } from 'vitest';
import { updateContext, getContext, resetContext, extractDomain, processMessage, formatGitHubAnalysis } from '../services/chatbotBrain';

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

describe('chatbotBrain formatGitHubAnalysis', () => {
    it('formats a complete analysis correctly', () => {
        const mockAnalysis = {
            repoCount: 15,
            totalStars: 42,
            totalForks: 10,
            languages: [
                ['JavaScript', 8],
                ['Python', 4],
                ['HTML', 3]
            ],
            domainScores: [
                ['Frontend Developer', 11],
                ['Backend Developer', 8],
                ['Data Scientist', 4]
            ],
            primaryDomain: 'Frontend Developer',
            skillGaps: ['React', 'TypeScript', 'CSS'],
            topics: ['react', 'web', 'api', 'machine-learning']
        };

        const result = formatGitHubAnalysis(mockAnalysis, 'testuser');

        // Check header and stats
        expect(result).toContain('## 🐙 GitHub Analysis — @testuser');
        expect(result).toContain('| **Repositories** | 15 |');
        expect(result).toContain('| **Total Stars** | ⭐ 42 |');
        expect(result).toContain('| **Total Forks** | 🔱 10 |');

        // Check languages (should have bars based on maxCount = 8)
        expect(result).toContain('| **JavaScript** | 8 | █████ |');
        // 4/8 * 5 = 2.5 -> ceil(2.5) = 3
        expect(result).toContain('| **Python** | 4 | ███ |');
        // 3/8 * 5 = 1.875 -> ceil(1.875) = 2
        expect(result).toContain('| **HTML** | 3 | ██ |');

        // Check career match
        expect(result).toContain('### 🎯 Career Match');
        // 11/15 = 73% -> ceil(73/20) = 4 blocks
        expect(result).toContain('| **Frontend Developer** | 🟩🟩🟩🟩 73% |');
        // 8/15 = 53% -> ceil(53/20) = 3 blocks
        expect(result).toContain('| **Backend Developer** | 🟩🟩🟩 53% |');

        // Check skill gaps
        expect(result).toContain('### ⚠️ Skill Gaps for Frontend Developer');
        expect(result).toContain('You should learn: **React, TypeScript, CSS**');

        // Check topics
        expect(result).toContain('### 🏷️ Topics');
        expect(result).toContain('react, web, api, machine-learning');
    });

    it('handles empty/minimal analysis without crashing', () => {
        const minimalAnalysis = {
            repoCount: 0,
            totalStars: 0,
            totalForks: 0,
            languages: [],
            domainScores: [],
            primaryDomain: null,
            skillGaps: [],
            topics: []
        };

        const result = formatGitHubAnalysis(minimalAnalysis, 'newbie');

        // Check header and stats
        expect(result).toContain('## 🐙 GitHub Analysis — @newbie');
        expect(result).toContain('| **Repositories** | 0 |');
        expect(result).toContain('| **Total Stars** | ⭐ 0 |');
        expect(result).toContain('| **Total Forks** | 🔱 0 |');

        // Check optional sections are omitted
        expect(result).not.toContain('### 🎯 Career Match');
        expect(result).not.toContain('### ⚠️ Skill Gaps');
        expect(result).not.toContain('### 🏷️ Topics');

        // Check languages is handled safely (empty list)
        expect(result).toContain('### 💻 Languages Used');
        expect(result).toContain('| Language | Repos | Strength |');
    });
});
