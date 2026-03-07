import { describe, it, expect, vi } from 'vitest';
import { getSkillGapRecommendations } from '../services/skillsMatcher';
import { courses } from '../data/courses';

// Mock the courses data
vi.mock('../data/courses', () => ({
    courses: {
        'Test Career': {
            beginner: [
                { title: 'Intro to Testing', outcome: 'Learn testing basics', platform: 'Udemy' },
                { title: 'Test Driven Development', outcome: 'Write tests first', platform: 'Coursera' },
                { title: 'Testing Tools', outcome: 'Jest and Vitest', platform: 'YouTube' },
                { title: 'Advanced Testing', outcome: 'Mocking and stubbing', platform: 'Pluralsight' }
            ],
            intermediate: [
                { title: 'Integration Testing', outcome: 'Test interactions', platform: 'Udacity' }
            ],
            advanced: [
                { title: 'E2E Testing', outcome: 'Cypress and Playwright', platform: 'Frontend Masters' }
            ]
        },
        'default': {
            beginner: [
                { title: 'Default Course 1', outcome: 'Default outcome', platform: 'Default Platform' },
                { title: 'Learn Basic Skills', outcome: 'General skills', platform: 'Coursera' }
            ]
        },
        'Empty Career': {}
    }
}));

describe('skillsMatcher getSkillGapRecommendations', () => {
    it('returns course recommendations for a missing skill', () => {
        const missingSkills = ['testing'];
        const recommendations = getSkillGapRecommendations(missingSkills, 'Test Career');

        expect(recommendations).toHaveLength(1);
        expect(recommendations[0].skill).toBe('testing');

        // It should match 'Intro to Testing', 'Test Driven Development', 'Testing Tools', 'Advanced Testing', 'Integration Testing', 'E2E Testing'
        // But limited to top 3
        expect(recommendations[0].courses).toHaveLength(3);

        // Check that the returned courses match the 'testing' keyword
        recommendations[0].courses.forEach(course => {
            const searchText = `${course.title} ${course.outcome} ${course.platform}`.toLowerCase();
            expect(searchText).toContain('testing');
        });
    });

    it('limits recommendations to top 3 courses per skill', () => {
        const missingSkills = ['testing'];
        const recommendations = getSkillGapRecommendations(missingSkills, 'Test Career');

        expect(recommendations).toHaveLength(1);
        expect(recommendations[0].courses).toHaveLength(3); // Although there are more than 3 matches in the mock
    });

    it('returns empty array when missing skills do not match any course', () => {
        const missingSkills = ['quantum computing'];
        const recommendations = getSkillGapRecommendations(missingSkills, 'Test Career');

        expect(recommendations).toHaveLength(0);
    });

    it('falls back to default courses if career is not found', () => {
        const missingSkills = ['skills']; // 'Learn Basic Skills'
        const recommendations = getSkillGapRecommendations(missingSkills, 'Unknown Career');

        expect(recommendations).toHaveLength(1);
        expect(recommendations[0].skill).toBe('skills');
        expect(recommendations[0].courses[0].title).toBe('Learn Basic Skills');
    });

    it('returns empty array if careerCourses is falsy/empty (e.g., if default is also missing or career is explicitly empty with no default fallback triggered if we assume standard logic)', () => {
        // Here we test a career that exists but has no courses (no beginner/intermediate/advanced)
        const missingSkills = ['testing'];
        const recommendations = getSkillGapRecommendations(missingSkills, 'Empty Career');

        expect(recommendations).toHaveLength(0);
    });

    it('returns empty array if missingSkills is empty', () => {
        const missingSkills = [];
        const recommendations = getSkillGapRecommendations(missingSkills, 'Test Career');

        expect(recommendations).toHaveLength(0);
    });

    it('handles multiple missing skills', () => {
        const missingSkills = ['testing', 'Cypress'];
        const recommendations = getSkillGapRecommendations(missingSkills, 'Test Career');

        expect(recommendations).toHaveLength(2);

        const testingRec = recommendations.find(r => r.skill === 'testing');
        expect(testingRec).toBeDefined();
        expect(testingRec.courses.length).toBeGreaterThan(0);

        const cypressRec = recommendations.find(r => r.skill === 'Cypress');
        expect(cypressRec).toBeDefined();
        expect(cypressRec.courses.length).toBe(1);
        expect(cypressRec.courses[0].title).toBe('E2E Testing');
    });
});
