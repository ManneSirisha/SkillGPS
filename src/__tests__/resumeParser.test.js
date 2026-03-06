import { describe, it, expect } from 'vitest';
import { getSuggestedSkills, parseResume, extractContactInfo } from '../utils/resumeParser';

describe('resumeParser getSuggestedSkills', () => {
    it('returns empty arrays for invalid or missing targetCareer', () => {
        const result1 = getSuggestedSkills(['Python', 'SQL'], null);
        expect(result1).toEqual({ missing: [], recommended: [] });

        const result2 = getSuggestedSkills(['Python'], 'NonExistentCareer');
        expect(result2).toEqual({ missing: [], recommended: [] });
    });

    it('returns missing essential skills and recommended skills for a valid career', () => {
        // Data Scientist essential: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Excel', 'Git', 'Jupyter Notebook']
        // We provide some of them: 'python', 'SQL', 'Git'
        const resumeSkills = ['python', 'SQL', 'Git'];
        const result = getSuggestedSkills(resumeSkills, 'Data Scientist');

        expect(result.missing).toContain('Statistics');
        expect(result.missing).toContain('Machine Learning');
        expect(result.missing).toContain('Pandas');
        expect(result.missing).not.toContain('Python'); // case insensitive match
        expect(result.missing).not.toContain('SQL');
        expect(result.missing).not.toContain('Git');

        expect(result.recommended.length).toBeGreaterThan(0);
        // Data Scientist recommended tools: Docker, AWS, GCP, Azure, Tableau, Power BI
        expect(result.recommended).toContain('Docker');
        expect(result.recommended).toContain('AWS');
    });

    it('is case insensitive when matching skills', () => {
        const resumeSkills = ['PYTHON', 'sql', 'mAcHiNe LeArNiNg'];
        const result = getSuggestedSkills(resumeSkills, 'Data Scientist');

        expect(result.missing).not.toContain('Python');
        expect(result.missing).not.toContain('SQL');
        expect(result.missing).not.toContain('Machine Learning');
    });

    it('filters out recommended skills if the user already has them', () => {
        const resumeSkills = ['Docker', 'AWS', 'TensorFlow'];
        const result = getSuggestedSkills(resumeSkills, 'Data Scientist');

        expect(result.recommended).not.toContain('Docker');
        expect(result.recommended).not.toContain('AWS');
        expect(result.recommended).not.toContain('TensorFlow');

        // Still has some recommended skills
        expect(result.recommended).toContain('PyTorch');
    });

    it('handles empty or undefined resume skills', () => {
        const result1 = getSuggestedSkills(undefined, 'Data Scientist');
        expect(result1.missing.length).toBeGreaterThan(5); // Should have all essential skills
        expect(result1.recommended.length).toBeGreaterThan(5);

        const result2 = getSuggestedSkills([], 'Data Scientist');
        expect(result2.missing).toEqual(result1.missing);
        expect(result2.recommended).toEqual(result1.recommended);
    });
});

describe('resumeParser parseResume', () => {
    it('returns empty object for invalid input', () => {
        const result = parseResume(null);
        expect(result.skills).toEqual([]);
        expect(result.rawText).toBe('');
    });

    it('extracts skills from text', () => {
        const text = 'I am a software engineer with experience in Python, JavaScript, and React.';
        const result = parseResume(text);
        expect(result.skills).toContain('python');
        expect(result.skills).toContain('javascript');
        expect(result.skills).toContain('react');
        expect(result.categorizedSkills.programming).toContain('python');
        expect(result.categorizedSkills.programming).toContain('javascript');
        expect(result.categorizedSkills.frameworks).toContain('react');
    });
});

describe('resumeParser extractContactInfo', () => {
    it('extracts emails, phones, and linkedIn urls', () => {
        const text = 'Contact me at test.user@example.com or 123-456-7890. My profile is linkedin.com/in/test-user.';
        const result = extractContactInfo(text);
        expect(result.emails).toContain('test.user@example.com');
        expect(result.phones).toContain('123-456-7890');
        expect(result.linkedIn).toContain('linkedin.com/in/test-user');
    });

    it('returns empty arrays when no contact info is found', () => {
        const text = 'Just some text with no contact info.';
        const result = extractContactInfo(text);
        expect(result.emails).toEqual([]);
        expect(result.phones).toEqual([]);
        expect(result.linkedIn).toEqual([]);
    });
});
