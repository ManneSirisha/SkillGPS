import { describe, it, expect, vi } from 'vitest';
import { getProjectRecommendations } from '../skillsMatcher';

// Mock the careerProjects data
vi.mock('../../data/careerProjects', () => ({
    careerProjects: {
        'Test Career': {
            beginner: [
                {
                    title: 'Beginner Project 1',
                    skills: ['skill1', 'skill2'],
                },
                {
                    title: 'Beginner Project 2',
                    skills: ['skill3', 'skill4'],
                }
            ],
            intermediate: [
                {
                    title: 'Intermediate Project 1',
                    skills: ['skill5', 'skill6'],
                }
            ],
            advanced: [
                {
                    title: 'Advanced Project 1',
                    skills: ['skill7', 'skill8'],
                }
            ]
        }
    }
}));

describe('getProjectRecommendations', () => {
    it('returns empty lists for a career that does not exist', () => {
        const matchResult = { essentialMatchPercentage: 0, essentialMissing: [] };
        const result = getProjectRecommendations(matchResult, [], 'Nonexistent Career');

        expect(result).toEqual({
            beginner: [],
            intermediate: [],
            advanced: []
        });
    });

    it('returns beginner projects when essentialMatchPercentage < 30', () => {
        const matchResult = { essentialMatchPercentage: 20, essentialMissing: [] };
        const result = getProjectRecommendations(matchResult, [], 'Test Career');

        expect(result.beginner.length).toBeGreaterThan(0);
        expect(result.intermediate.length).toBe(0);
        expect(result.advanced.length).toBe(0);
    });

    it('returns beginner and intermediate projects when essentialMatchPercentage < 60', () => {
        const matchResult = { essentialMatchPercentage: 50, essentialMissing: [] };
        const result = getProjectRecommendations(matchResult, [], 'Test Career');

        expect(result.beginner.length).toBeGreaterThan(0);
        expect(result.intermediate.length).toBeGreaterThan(0);
        expect(result.advanced.length).toBe(0);
    });

    it('returns intermediate and advanced projects when essentialMatchPercentage < 85', () => {
        const matchResult = { essentialMatchPercentage: 70, essentialMissing: [] };
        const result = getProjectRecommendations(matchResult, [], 'Test Career');

        expect(result.beginner.length).toBe(0);
        expect(result.intermediate.length).toBeGreaterThan(0);
        expect(result.advanced.length).toBeGreaterThan(0);
    });

    it('returns intermediate and advanced projects when essentialMatchPercentage >= 85', () => {
        const matchResult = { essentialMatchPercentage: 90, essentialMissing: [] };
        const result = getProjectRecommendations(matchResult, [], 'Test Career');

        expect(result.beginner.length).toBe(0);
        expect(result.intermediate.length).toBeGreaterThan(0);
        expect(result.advanced.length).toBeGreaterThan(0);
    });

    it('scores and annotates projects correctly based on user skills', () => {
        const matchResult = { essentialMatchPercentage: 20, essentialMissing: ['skill2'] };
        const userSkills = ['skill1'];
        const result = getProjectRecommendations(matchResult, userSkills, 'Test Career');

        const project1 = result.beginner.find(p => p.title === 'Beginner Project 1');

        expect(project1.matchScore).toBe(1); // Matches 'skill1'
        expect(project1.skillsToLearn).toEqual(['skill2']); // Doesn't have 'skill2'
        expect(project1.helpsWithEssentialSkills).toBe(true); // helps with missing 'skill2'
        expect(project1.readyToStart).toBe(true); // 1 / 2 >= 0.5
    });

    it('prioritizes projects that help with essential skills in sorting', () => {
        const matchResult = { essentialMatchPercentage: 20, essentialMissing: ['skill3'] };
        // User has skill1 and skill4.
        // Beginner Project 1: skills: ['skill1', 'skill2']. helpsWithEssentialSkills: false. matchScore: 1
        // Beginner Project 2: skills: ['skill3', 'skill4']. helpsWithEssentialSkills: true. matchScore: 1
        const userSkills = ['skill1', 'skill4'];

        const result = getProjectRecommendations(matchResult, userSkills, 'Test Career');

        expect(result.beginner[0].title).toBe('Beginner Project 2');
        expect(result.beginner[1].title).toBe('Beginner Project 1');
    });

    it('prioritizes matchScore in sorting if helpsWithEssentialSkills is the same', () => {
        const matchResult = { essentialMatchPercentage: 20, essentialMissing: [] };
        // User has skill3 and skill4, so Project 2 has score 2. User has no skills for Project 1, so score is 0.
        // Both helpsWithEssentialSkills: false.
        const userSkills = ['skill3', 'skill4'];

        const result = getProjectRecommendations(matchResult, userSkills, 'Test Career');

        expect(result.beginner[0].title).toBe('Beginner Project 2');
        expect(result.beginner[1].title).toBe('Beginner Project 1');
    });
});
