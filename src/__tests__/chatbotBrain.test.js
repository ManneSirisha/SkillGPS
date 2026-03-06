import { describe, it, expect, beforeEach } from 'vitest';
import { updateContext, getContext, resetContext, extractDomain, processMessage, analyzeGitHubRepos } from '../services/chatbotBrain';

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

describe('chatbotBrain analyzeGitHubRepos', () => {
    it('handles empty repos array', () => {
        const result = analyzeGitHubRepos([]);
        expect(result).toEqual({
            repoCount: 0,
            languages: [],
            totalStars: 0,
            totalForks: 0,
            topics: [],
            domainScores: [],
            primaryDomain: null,
            skillGaps: []
        });
    });

    it('accumulates language counts, topics, stars, and forks', () => {
        const repos = [
            { language: 'JavaScript', stargazers_count: 5, forks_count: 2, topics: ['react', 'frontend'] },
            { language: 'JavaScript', stargazers_count: 3, forks_count: 1, topics: ['react'] },
            { language: 'HTML', stargazers_count: 1, forks_count: 0, topics: ['web'] }
        ];
        const result = analyzeGitHubRepos(repos);
        expect(result.repoCount).toBe(3);
        expect(result.totalStars).toBe(9);
        expect(result.totalForks).toBe(3);

        // Sorting means JavaScript (count 2) should be first
        expect(result.languages).toEqual([
            ['JavaScript', 2],
            ['HTML', 1]
        ]);

        // Topics should be unique and array spread
        expect(result.topics).toEqual(expect.arrayContaining(['react', 'frontend', 'web']));
        expect(result.topics.length).toBe(3);
    });

    it('correctly identifies primary domain', () => {
        const repos = [
            { language: 'Python', stargazers_count: 10 },
            { language: 'Python', stargazers_count: 5 },
            { language: 'Jupyter Notebook', stargazers_count: 2 },
            { language: 'JavaScript', stargazers_count: 1 }
        ];
        const result = analyzeGitHubRepos(repos);

        // Python and Jupyter Notebook map heavily to Data Scientist/AI/ML
        // Based on LANGUAGE_TO_DOMAIN mapping in chatbotBrain.js:
        // Python: 'Backend Developer', 'Data Scientist', 'AI/ML Engineer', 'Data Analyst' (count 2)
        // Jupyter Notebook: 'Data Scientist', 'AI/ML Engineer', 'Data Analyst' (count 1)
        // Total for Data Scientist/AI/ML = 3.
        expect(['Data Scientist', 'AI/ML Engineer', 'Data Analyst']).toContain(result.primaryDomain);
    });

    it('handles missing data in repo objects gracefully', () => {
        const repos = [
            {}, // No language, stars, forks, or topics
            { stargazers_count: null, forks_count: undefined, topics: null } // Explicit null/undefined
        ];
        const result = analyzeGitHubRepos(repos);
        expect(result.repoCount).toBe(2);
        expect(result.languages).toEqual([]);
        expect(result.totalStars).toBe(0);
        expect(result.totalForks).toBe(0);
        expect(result.topics).toEqual([]);
        expect(result.domainScores).toEqual([]);
        expect(result.primaryDomain).toBeNull();
        expect(result.skillGaps).toEqual([]);
    });

    it('calculates skill gaps correctly based on primary domain', () => {
        // Let's create a user heavily skewed towards 'Backend Developer' using 'Java'
        const repos = [
            { language: 'Java', topics: ['spring'] },
            { language: 'Java', topics: ['backend'] }
        ];

        const result = analyzeGitHubRepos(repos);
        expect(result.primaryDomain).toBe('Backend Developer');

        // Essential skills for Backend Developer from careerSkills.js:
        // ['JavaScript', 'Node.js', 'Python', 'Java', 'SQL', 'REST API', 'Git', 'Database Design']
        // We provided 'Java' and some topics. The user lacks JavaScript, Node.js, Python, SQL, etc.
        expect(result.skillGaps.length).toBeGreaterThan(0);

        // Ensure Java is NOT in the skill gap because they have it
        const lowerGaps = result.skillGaps.map(g => g.toLowerCase());
        expect(lowerGaps).not.toContain('java');

        // They should have other essential skills in the gap
        expect(lowerGaps).toEqual(expect.arrayContaining(['javascript', 'sql']));
    });
});
