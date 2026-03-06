import { careerSkills, getAllSkillsForCareer, getEssentialSkills } from '../data/careerSkills';
import { courses } from '../data/courses';
import { careerProjects } from '../data/careerProjects';

/**
 * Match resume skills with career requirements
 * @param {Array} resumeSkills - Skills extracted from resume
 * @param {String} careerName - Target career name
 * @returns {Object} - Matching results with stats and recommendations
 */
export const matchSkills = (resumeSkills, careerName) => {
    const career = careerSkills[careerName];

    if (!career) {
        return {
            matchedSkills: [],
            missingSkills: [],
            matchPercentage: 0,
            essentialMatched: [],
            essentialMissing: [],
            error: 'Career not found'
        };
    }

    // Normalize resume skills to lowercase for comparison
    const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase());

    // Get all required skills for the career
    const allRequiredSkills = getAllSkillsForCareer(careerName);
    const essentialSkills = getEssentialSkills(careerName).map(s => s.toLowerCase());

    // Find matches and misses
    const matchedSkills = [];
    const missingSkills = [];
    const essentialMatched = [];
    const essentialMissing = [];

    // Check each required skill
    allRequiredSkills.forEach(requiredSkill => {
        const isMatched = normalizedResumeSkills.some(resumeSkill =>
            resumeSkill.includes(requiredSkill) || requiredSkill.includes(resumeSkill)
        );

        if (isMatched) {
            matchedSkills.push(requiredSkill);
            if (essentialSkills.includes(requiredSkill)) {
                essentialMatched.push(requiredSkill);
            }
        } else {
            missingSkills.push(requiredSkill);
            if (essentialSkills.includes(requiredSkill)) {
                essentialMissing.push(requiredSkill);
            }
        }
    });

    // Calculate match percentage (focus on essential skills)
    const essentialMatchPercentage = essentialSkills.length > 0
        ? Math.round((essentialMatched.length / essentialSkills.length) * 100)
        : 0;

    const overallMatchPercentage = allRequiredSkills.length > 0
        ? Math.round((matchedSkills.length / allRequiredSkills.length) * 100)
        : 0;

    return {
        matchedSkills,
        missingSkills,
        matchPercentage: overallMatchPercentage,
        essentialMatchPercentage,
        essentialMatched,
        essentialMissing,
        totalRequired: allRequiredSkills.length,
        totalMatched: matchedSkills.length,
        career: careerName
    };
};

/**
 * Get course recommendations for missing skills
 * @param {Array} missingSkills - Skills that are missing
 * @param {String} careerName - Target career
 * @returns {Array} - Recommended courses
 */
export const getSkillGapRecommendations = (missingSkills, careerName) => {
    const careerCourses = courses[careerName] || courses['default'];

    if (!careerCourses) {
        return [];
    }

    // Flatten all courses
    const allCourses = [
        ...(careerCourses.beginner || []),
        ...(careerCourses.intermediate || []),
        ...(careerCourses.advanced || [])
    ];

    // Create a map of skills to courses
    const skillToCourses = new Map();

    missingSkills.forEach(skill => {
        const relatedCourses = allCourses.filter(course => {
            const searchText = `${course.title} ${course.outcome} ${course.platform}`.toLowerCase();
            return searchText.includes(skill.toLowerCase());
        });

        if (relatedCourses.length > 0) {
            skillToCourses.set(skill, relatedCourses);
        }
    });

    return Array.from(skillToCourses.entries()).map(([skill, courses]) => ({
        skill,
        courses: courses.slice(0, 3) // Limit to top 3 courses per skill
    }));
};

/**
 * Analyze multiple careers and return best matches
 * @param {Array} resumeSkills - Skills from resume
 * @param {Array} careerList - List of career names to check
 * @returns {Array} - Sorted list of careers by match percentage
 */
export const analyzeMultipleCareers = (resumeSkills, careerList) => {
    const results = careerList.map(career => ({
        ...matchSkills(resumeSkills, career),
        career
    }));

    // Sort by match percentage (descending)
    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

/**
 * Get a skill readiness assessment
 * @param {Object} matchResult - Result from matchSkills
 * @returns {Object} - Readiness assessment
 */
export const getReadinessAssessment = (matchResult) => {
    const { essentialMatchPercentage, matchPercentage } = matchResult;

    let level = 'beginner';
    let message = 'You are just getting started. Focus on building essential skills.';
    let color = '#ef4444'; // red

    if (essentialMatchPercentage >= 80) {
        level = 'advanced';
        message = 'You are well-prepared! Consider advanced topics to excel.';
        color = '#10b981'; // green
    } else if (essentialMatchPercentage >= 50) {
        level = 'intermediate';
        message = 'You have a solid foundation. Keep building your expertise.';
        color = '#f59e0b'; // yellow
    } else if (essentialMatchPercentage >= 25) {
        level = 'beginner-intermediate';
        message = 'You have started your journey. Focus on core competencies.';
        color = '#f97316'; // orange
    }

    return {
        level,
        message,
        color,
        essentialMatchPercentage,
        overallMatchPercentage: matchPercentage
    };
};

/**
 * Get project recommendations based on user's skill level and missing skills
 * @param {Object} matchResult - Result from matchSkills
 * @param {Array} userSkills - User's current skills
 * @param {String} careerName - Target career
 * @returns {Object} - Categorized project recommendations
 */
export const getProjectRecommendations = (matchResult, userSkills, careerName) => {
    const projects = careerProjects[careerName];

    if (!projects) {
        return { beginner: [], intermediate: [], advanced: [] };
    }

    const { essentialMatchPercentage, essentialMissing } = matchResult;
    const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
    const userSkillsSet = new Set(normalizedUserSkills);

    // Score projects based on skill alignment
    const scoreProject = (project) => {
        const projectSkills = project.skills.map(s => s.toLowerCase());

        const matchedProjectSkills = [];
        const skillsToLearn = [];

        projectSkills.forEach(skill => {
            const hasMatch = userSkillsSet.has(skill) || normalizedUserSkills.some(userSkill =>
                userSkill.includes(skill) || skill.includes(userSkill)
            );

            if (hasMatch) {
                matchedProjectSkills.push(skill);
            } else {
                skillsToLearn.push(skill);
            }
        });

        // Check if project helps with missing essential skills
        const helpsWithEssentialSkills = essentialMissing.some(missing =>
            projectSkills.some(pSkill => pSkill.toLowerCase().includes(missing.toLowerCase()))
        );

        return {
            ...project,
            matchScore: matchedProjectSkills.length,
            skillsToLearn,
            helpsWithEssentialSkills,
            readyToStart: matchedProjectSkills.length >= projectSkills.length * 0.5
        };
    };

    // Determine which difficulty levels to show
    let recommendedLevels = [];

    if (essentialMatchPercentage < 30) {
        recommendedLevels = ['beginner'];
    } else if (essentialMatchPercentage < 60) {
        recommendedLevels = ['beginner', 'intermediate'];
    } else if (essentialMatchPercentage < 85) {
        recommendedLevels = ['intermediate', 'advanced'];
    } else {
        recommendedLevels = ['intermediate', 'advanced'];
    }

    const recommendations = {};

    // Score and filter projects for each level
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
        if (recommendedLevels.includes(level)) {
            const levelProjects = (projects[level] || [])
                .map(scoreProject)
                .sort((a, b) => {
                    // Prioritize projects that help with essential skills
                    if (a.helpsWithEssentialSkills && !b.helpsWithEssentialSkills) return -1;
                    if (!a.helpsWithEssentialSkills && b.helpsWithEssentialSkills) return 1;
                    // Then by match score
                    return b.matchScore - a.matchScore;
                })
                .slice(0, 5); // Top 5 projects per level

            recommendations[level] = levelProjects;
        } else {
            recommendations[level] = [];
        }
    });

    return recommendations;
};
