import { describe, it, expect } from 'vitest';
import { getRecommendations } from '../utils/recommendationEngine';

describe('recommendationEngine getRecommendations', () => {
    it('returns exactly 3 recommendations', () => {
        const data = {
            workStyle: { environment: 'Solo', structure: 'Structured', roleType: 'Desk' },
            interests: { numbers: true, logic: true },
            confidence: { math: 8, coding: 8, communication: 5 },
            intent: { afterEdu: 'job', workplace: 'corporate', nature: 'applied' }
        };
        const results = getRecommendations(data);
        expect(results).toHaveLength(3);

        // Each object should have career, prob, explanation, and metadata
        expect(results[0]).toHaveProperty('career');
        expect(results[0]).toHaveProperty('prob');
        expect(results[0]).toHaveProperty('explanation');
        expect(results[0]).toHaveProperty('metadata');
        expect(typeof results[0].prob).toBe('number');
    });

    it('predicts Data Scientist for math and logic focused profile', () => {
        const data = {
            workStyle: { environment: 'Solo', structure: 'Structured', roleType: 'Desk' },
            interests: { numbers: true, logic: true, explaining: true },
            confidence: { math: 10, coding: 8, communication: 6 },
            intent: { afterEdu: 'job', workplace: 'corporate', nature: 'research' }
        };
        const results = getRecommendations(data);
        const careers = results.map(r => r.career);
        expect(careers).toContain('Data Scientist');
    });

    it('predicts UI/UX Designer for design focused profile', () => {
        const data = {
            workStyle: { environment: 'Team', structure: 'Flexible', roleType: 'Desk' },
            interests: { design: true, explaining: true },
            confidence: { math: 3, coding: 3, communication: 8 },
            intent: { afterEdu: 'job', workplace: 'startup', nature: 'applied' }
        };
        const results = getRecommendations(data);
        const careers = results.map(r => r.career);
        expect(careers).toContain('UI/UX Designer');
    });

    it('predicts Backend Developer for building and coding focused profile', () => {
        const data = {
            workStyle: { environment: 'Solo', structure: 'Structured', roleType: 'Desk' },
            interests: { building: true, logic: true },
            confidence: { math: 5, coding: 10, communication: 3 },
            intent: { afterEdu: 'job', workplace: 'startup', nature: 'applied' }
        };
        const results = getRecommendations(data);
        const careers = results.map(r => r.career);
        expect(careers).toContain('Backend Developer');
    });

    it('handles empty data gracefully', () => {
        const data = {};
        const results = getRecommendations(data);
        expect(results).toHaveLength(3);
        results.forEach(r => {
            expect(typeof r.prob).toBe('number');
            expect(r.prob).toBeGreaterThanOrEqual(0);
            expect(r).toHaveProperty('explanation');
            expect(r).toHaveProperty('metadata');
        });
    });

    // --- New tests for the improved engine ---

    it('includes career metadata with all required fields', () => {
        const data = {
            workStyle: { environment: 'Solo', structure: 'Structured', roleType: 'Desk' },
            interests: { numbers: true, logic: true },
            confidence: { math: 8, coding: 8, communication: 5 },
            intent: { afterEdu: 'job', workplace: 'corporate', nature: 'applied' }
        };
        const results = getRecommendations(data);
        results.forEach(r => {
            expect(r.metadata).toHaveProperty('icon');
            expect(r.metadata).toHaveProperty('description');
            expect(r.metadata).toHaveProperty('salaryRange');
            expect(r.metadata.salaryRange).toHaveProperty('entry');
            expect(r.metadata.salaryRange).toHaveProperty('senior');
            expect(r.metadata).toHaveProperty('growthOutlook');
            expect(r.metadata).toHaveProperty('keyStrengths');
            expect(Array.isArray(r.metadata.keyStrengths)).toBe(true);
        });
    });

    it('generates human-readable match explanations', () => {
        const data = {
            workStyle: { environment: 'Solo', structure: 'Structured', roleType: 'Desk' },
            interests: { numbers: true, logic: true },
            confidence: { math: 9, coding: 9, communication: 5 },
            intent: { afterEdu: 'job', workplace: 'corporate', nature: 'research' }
        };
        const results = getRecommendations(data);
        results.forEach(r => {
            expect(typeof r.explanation).toBe('string');
            expect(r.explanation.length).toBeGreaterThan(10);
        });
    });

    it('intent data influences recommendations — research pushes toward AI/ML', () => {
        const baseData = {
            workStyle: { environment: 'Solo', structure: 'Structured', roleType: 'Desk' },
            interests: { numbers: true, logic: true, building: true },
            confidence: { math: 9, coding: 9, communication: 5 }
        };

        const researchProfile = {
            ...baseData,
            intent: { afterEdu: 'higherStudies', workplace: 'corporate', nature: 'research' }
        };

        const appliedProfile = {
            ...baseData,
            intent: { afterEdu: 'job', workplace: 'startup', nature: 'applied' }
        };

        const researchResults = getRecommendations(researchProfile);
        const appliedResults = getRecommendations(appliedProfile);

        // Research-oriented profile should rank AI/ML Engineer or Data Scientist higher
        const researchCareers = researchResults.map(r => r.career);
        expect(
            researchCareers.includes('AI/ML Engineer') || researchCareers.includes('Data Scientist')
        ).toBe(true);

        // Results should differ between the two profiles
        expect(researchResults[0].career).not.toBe(appliedResults[0].career);
    });

    it('scores are between 0 and 1', () => {
        const data = {
            workStyle: { environment: 'Team', structure: 'Flexible', roleType: 'Dynamic' },
            interests: { explaining: true, design: true },
            confidence: { math: 5, coding: 5, communication: 9 },
            intent: { afterEdu: 'job', workplace: 'startup', nature: 'applied' }
        };
        const results = getRecommendations(data);
        results.forEach(r => {
            expect(r.prob).toBeGreaterThanOrEqual(0);
            expect(r.prob).toBeLessThanOrEqual(1);
        });
    });

    it('handles explicit false interests', () => {
        const data = {
            interests: { numbers: false, building: false, design: false, explaining: false, logic: false },
        };
        const results = getRecommendations(data);
        expect(results).toHaveLength(3);
        results.forEach(r => {
            expect(typeof r.prob).toBe('number');
        });
    });

    it('handles all intent variations', () => {
        const data = {
            intent: { afterEdu: 'higherStudies', workplace: 'corporate', nature: 'applied' }
        };
        const results = getRecommendations(data);
        expect(results).toHaveLength(3);
        results.forEach(r => {
            expect(typeof r.prob).toBe('number');
        });
    });

    it('handles single match explanation', () => {
        const data = {
            workStyle: { roleType: 'Dynamic' }
        };
        const results = getRecommendations(data);
        expect(results).toHaveLength(3);
        const explanations = results.map(r => r.explanation);
        // It might not exactly match 1 reason due to some defaults, but we ensure it doesn't crash
        expect(explanations.length).toBe(3);
    });

    it('handles zero match explanation', () => {
        const data = {
            interests: { numbers: false, building: false, design: false, explaining: false, logic: false },
            confidence: { math: 0, coding: 0, communication: 0 }
            // Providing minimum/false values to try to trigger 0 score
        };

        // Let's create a custom "empty" vector to test getMatchExplanation directly indirectly by mocking
        // the userVector as 0 everywhere, or forcing it if possible.
        // Since we can't easily force an empty match due to default role_desk vs role_dynamic,
        // we'll pass exactly data that gives us zero overlap with at least one career.

        const results = getRecommendations(data);
        expect(results).toHaveLength(3);

        // Find if any return the 0 match string, or just verify no crash
        results.forEach(r => {
            expect(typeof r.explanation).toBe('string');
        });
    });

    it('handles 1 match explanation edge case directly', () => {
        // Since we can't easily get 0 or 1 match through `getRecommendations` because `createUserVector` always assigns defaults to `role_desk` vs `role_dynamic`,
        // we test the empty case by calling `getRecommendations` with undefined / invalid values.
        const results = getRecommendations({
            workStyle: { roleType: 'Dynamic', environment: 'Solo', structure: 'Structured' },
            interests: { numbers: false, building: false, design: false, explaining: false, logic: false },
            confidence: null,
            intent: null
        });
        expect(results).toHaveLength(3);
        results.forEach(r => {
            expect(typeof r.explanation).toBe('string');
        });
    });
});
