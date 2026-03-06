import { describe, it, expect } from 'vitest';
import { matchSkills } from '../../services/skillsMatcher';
import { careerSkills, getAllSkillsForCareer, getEssentialSkills } from '../../data/careerSkills';

describe('skillsMatcher matchSkills', () => {
    const careerName = 'Data Scientist';

    it('returns error object for invalid career name', () => {
        const result = matchSkills(['Python', 'SQL'], 'Invalid Career Name');
        expect(result).toEqual({
            matchedSkills: [],
            missingSkills: [],
            matchPercentage: 0,
            essentialMatched: [],
            essentialMissing: [],
            error: 'Career not found'
        });
    });

    it('handles empty resume skills array', () => {
        const result = matchSkills([], careerName);
        const allRequiredSkills = getAllSkillsForCareer(careerName);
        const essentialSkills = getEssentialSkills(careerName).map(s => s.toLowerCase());

        expect(result.matchPercentage).toBe(0);
        expect(result.essentialMatchPercentage).toBe(0);
        expect(result.matchedSkills).toHaveLength(0);
        expect(result.essentialMatched).toHaveLength(0);
        expect(result.missingSkills.length).toBe(allRequiredSkills.length);
        expect(result.essentialMissing.length).toBe(essentialSkills.length);
        expect(result.totalRequired).toBe(allRequiredSkills.length);
        expect(result.totalMatched).toBe(0);
        expect(result.career).toBe(careerName);
    });

    it('calculates 100% match when all required and essential skills are present', () => {
        const allRequiredSkills = getAllSkillsForCareer(careerName);
        const essentialSkills = getEssentialSkills(careerName).map(s => s.toLowerCase());

        const result = matchSkills(allRequiredSkills, careerName);

        expect(result.matchPercentage).toBe(100);
        expect(result.essentialMatchPercentage).toBe(100);
        expect(result.matchedSkills.length).toBe(allRequiredSkills.length);
        expect(result.essentialMatched.length).toBe(essentialSkills.length);
        expect(result.missingSkills).toHaveLength(0);
        expect(result.essentialMissing).toHaveLength(0);
        expect(result.totalRequired).toBe(allRequiredSkills.length);
        expect(result.totalMatched).toBe(allRequiredSkills.length);
        expect(result.career).toBe(careerName);
    });

    it('calculates partial match correctly and categorizes skills properly', () => {
        const essentialSkills = getEssentialSkills(careerName).map(s => s.toLowerCase());
        const allRequiredSkills = getAllSkillsForCareer(careerName);

        // Mix of some essential and some non-essential skills
        const resumeSkills = ['Python', 'SQL', 'R', 'Excel', 'Docker'];

        const result = matchSkills(resumeSkills, careerName);

        // Python, SQL, Excel are essential for Data Scientist.
        // R, Docker are recommended/advanced but not essential (based on data).

        expect(result.matchedSkills).toContain('python');
        expect(result.matchedSkills).toContain('sql');
        expect(result.matchedSkills).toContain('excel');
        expect(result.matchedSkills).toContain('r');
        expect(result.matchedSkills).toContain('docker');

        expect(result.essentialMatched).toContain('python');
        expect(result.essentialMatched).toContain('sql');
        expect(result.essentialMatched).toContain('excel');

        expect(result.missingSkills.length).toBe(allRequiredSkills.length - result.matchedSkills.length);
        expect(result.essentialMissing.length).toBe(essentialSkills.length - result.essentialMatched.length);

        expect(result.essentialMatchPercentage).toBe(Math.round((result.essentialMatched.length / essentialSkills.length) * 100));
        expect(result.matchPercentage).toBe(Math.round((result.matchedSkills.length / allRequiredSkills.length) * 100));
    });

    it('matches skills case-insensitively', () => {
        // Essential skills are 'Python' and 'SQL'
        const result = matchSkills(['PYTHON', 'sql'], careerName);

        expect(result.matchedSkills.includes('python')).toBe(true);
        expect(result.matchedSkills.includes('sql')).toBe(true);
        expect(result.essentialMatched.includes('python')).toBe(true);
        expect(result.essentialMatched.includes('sql')).toBe(true);
    });

    it('performs substring matching for skills', () => {
        // Required skills include 'Python', 'Machine Learning'
        // Resume has 'Python 3.9' which contains 'Python'
        // Resume has 'machine' which is contained in 'Machine Learning'

        const result = matchSkills(['Python 3.9', 'machine'], careerName);

        expect(result.matchedSkills.includes('python')).toBe(true);
        expect(result.matchedSkills.includes('machine learning')).toBe(true);
    });
});
