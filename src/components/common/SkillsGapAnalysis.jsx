import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, TrendingUp, BookOpen, ChevronDown, ChevronUp, Code } from 'lucide-react';
import { matchSkills, getSkillGapRecommendations, getReadinessAssessment, getProjectRecommendations } from '../../services/skillsMatcher';

const SkillsGapAnalysis = ({ resumeData, career }) => {
    const [expandedSkillIndex, setExpandedSkillIndex] = useState(null);
    const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);

    const computedData = (() => {
        if (resumeData && career) {
            const result = matchSkills(resumeData.skills, career);
            const recs = getSkillGapRecommendations(result.essentialMissing, career);
            const assessment = getReadinessAssessment(result);
            const projectRecs = getProjectRecommendations(result, resumeData.skills, career);
            return { result, recs, assessment, projectRecs };
        }
        return null;
    })();

    const resultToUse = computedData?.result;
    const recommendationsToUse = computedData?.recs;
    const readinessToUse = computedData?.assessment;
    const projectRecommendationsToUse = computedData?.projectRecs;


    if (!resultToUse) {
        return null;
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ marginTop: '40px' }}
        >
            {/* Header */}
            <motion.div variants={cardVariants}>
                <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>
                    Skills Match Analysis for <span className="gradient-text">{career}</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                    See how your current skills align with this career path
                </p>
            </motion.div>

            {/* Readiness Card */}
            {readinessToUse && (
                <motion.div
                    variants={cardVariants}
                    className="card"
                    style={{
                        padding: '24px',
                        marginBottom: '24px',
                        background: `linear-gradient(135deg, ${readinessToUse.color}15 0%, rgba(255,255,255,0.03) 100%)`,
                        border: `1px solid ${readinessToUse.color}50`
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <TrendingUp size={32} color={readinessToUse.color} />
                        <div>
                            <h3 style={{ fontSize: '1.3rem', margin: 0, marginBottom: '4px' }}>
                                {readinessToUse.level.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Level
                            </h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>{readinessToUse.message}</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                Essential Skills Match
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: readinessToUse.color }}>
                                {resultToUse.essentialMatchPercentage}%
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {resultToUse.essentialMatched.length} of {resultToUse.essentialMatched.length + resultToUse.essentialMissing.length} essential skills
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                Overall Skills Match
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                                {resultToUse.matchPercentage}%
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {resultToUse.totalMatched} of {resultToUse.totalRequired} total skills
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Skills Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {/* Matched Skills */}
                <motion.div variants={cardVariants} className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <CheckCircle size={24} color="#10b981" />
                        <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Skills You Have</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                        {resultToUse.matchedSkills.length} matching skills found
                    </p>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {resultToUse.matchedSkills.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {resultToUse.matchedSkills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        style={{
                                            padding: '10px 12px',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <CheckCircle size={16} color="#10b981" />
                                        <span style={{ textTransform: 'capitalize' }}>{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No matching skills found</p>
                        )}
                    </div>
                </motion.div>

                {/* Missing Essential Skills */}
                <motion.div variants={cardVariants} className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <XCircle size={24} color="#ef4444" />
                        <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Essential Skills to Acquire</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                        {resultToUse.essentialMissing.length} essential skills needed
                    </p>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {resultToUse.essentialMissing.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {resultToUse.essentialMissing.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        style={{
                                            padding: '10px 12px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <XCircle size={16} color="#ef4444" />
                                        <span style={{ textTransform: 'capitalize' }}>{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                padding: '20px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 12px' }} />
                                <p style={{ color: '#10b981', fontWeight: '500' }}>
                                    Great job! You have all essential skills!
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Course Recommendations */}
            {recommendationsToUse.length > 0 && (
                <motion.div variants={cardVariants}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <BookOpen size={28} color="var(--primary)" />
                        Recommended Courses to Fill Skill Gaps
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Start with these courses to acquire the essential skills you're missing
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {recommendationsToUse.map((rec, index) => (
                            <motion.div
                                key={index}
                                className="card"
                                style={{ padding: '20px' }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setExpandedSkillIndex(expandedSkillIndex === index ? null : index)}
                                >
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', margin: 0, marginBottom: '4px', textTransform: 'capitalize' }}>
                                            {rec.skill}
                                        </h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                                            {rec.courses.length} course{rec.courses.length !== 1 ? 's' : ''} available
                                        </p>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedSkillIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {expandedSkillIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {expandedSkillIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden', marginTop: '16px' }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {rec.courses.map((course, courseIndex) => (
                                                    <div
                                                        key={courseIndex}
                                                        style={{
                                                            padding: '12px',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: '8px',
                                                            border: '1px solid var(--border)'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                            <h5 style={{ margin: 0, fontSize: '0.95rem' }}>{course.title}</h5>
                                                            <span style={{
                                                                fontSize: '0.75rem',
                                                                padding: '2px 8px',
                                                                borderRadius: '4px',
                                                                background: course.type === 'free' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                                                                color: course.type === 'free' ? '#10b981' : 'var(--primary)'
                                                            }}>
                                                                {course.type === 'free' ? 'FREE' : 'PAID'}
                                                            </span>
                                                        </div>
                                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0' }}>
                                                            {course.platform} • {course.duration}
                                                        </p>
                                                        <motion.a
                                                            href={course.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-primary"
                                                            style={{
                                                                display: 'inline-block',
                                                                marginTop: '8px',
                                                                padding: '6px 12px',
                                                                fontSize: '0.85rem',
                                                                textDecoration: 'none'
                                                            }}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            Start Course
                                                        </motion.a>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Project Recommendations */}
            {projectRecommendationsToUse && (projectRecommendationsToUse.beginner?.length > 0 || projectRecommendationsToUse.intermediate?.length > 0 || projectRecommendationsToUse.advanced?.length > 0) && (
                <motion.div variants={cardVariants} style={{ marginTop: '48px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Code size={28} color="var(--primary)" />
                        Recommended Projects to Build
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Build these projects to acquire missing skills and strengthen your portfolio
                    </p>

                    {projectRecommendationsToUse.beginner?.length > 0 && (
                        <div style={{ marginBottom: '32px' }}>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#10b981' }}>🟢 Beginner Projects</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {projectRecommendationsToUse.beginner.map((project, index) => (
                                    <motion.div key={index} className="card" style={{ padding: '20px', cursor: 'pointer' }} onClick={() => setExpandedProjectIndex(expandedProjectIndex === `beginner-${index}` ? null : `beginner-${index}`)}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h5 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{project.title}</h5>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Duration: {project.duration} • {project.skills.length} skills</p>
                                            </div>
                                            <motion.div animate={{ rotate: expandedProjectIndex === `beginner-${index}` ? 180 : 0 }}>
                                                <ChevronDown size={20} />
                                            </motion.div>
                                        </div>
                                        <AnimatePresence>
                                            {expandedProjectIndex === `beginner-${index}` && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', marginTop: '16px' }}>
                                                    <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{project.description}</p>
                                                    <div style={{ marginBottom: '12px' }}>
                                                        <strong>Skills you'll learn:</strong>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                                            {project.skillsToLearn?.map((skill, idx) => (
                                                                <span key={idx} style={{ padding: '4px 10px', background: 'rgba(255, 153, 51, 0.1)', border: '1px solid rgba(255, 153, 51, 0.3)', borderRadius: '6px', fontSize: '0.85rem' }}>{skill}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default SkillsGapAnalysis;
