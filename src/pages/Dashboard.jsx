import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { courses } from '../data/courses';
import { PlayCircle, Clock, Star, CheckCircle, Circle, X, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { matchSkills } from '../services/skillsMatcher';
import './Dashboard.css';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const CourseCard = ({ course, isCompleted, onToggle, onStart }) => (
    <motion.div
        className={`card course-card ${isCompleted ? 'completed' : ''}`}
        variants={cardVariants}
        whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className="course-card-header">
            <h4 className="course-card-title">{course.title}</h4>
            <span className="course-card-platform">{course.platform}</span>
        </div>

        <div className="course-card-meta">
            <span><Clock size={14} /> {course.duration}</span>
            <span><Star size={14} color="#fbbf24" fill="#fbbf24" /> {course.rating}</span>
        </div>

        <p className="course-card-outcome">Outcome: {course.outcome}</p>

        <div className="course-card-actions">
            <motion.button
                className="btn-primary"
                onClick={() => {
                    onStart(course.title);
                    window.open(course.link, '_blank');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Start Course
            </motion.button>
            <motion.button
                className={`course-complete-btn ${isCompleted ? 'is-complete' : ''}`}
                onClick={onToggle}
                title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
            </motion.button>
        </div>
    </motion.div>
);

const Section = ({ title, items, completedSet, onToggle, onStart }) => (
    <motion.div
        style={{ marginBottom: '40px' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
    >
        <motion.h3 className="dashboard-level-title" variants={cardVariants}>
            {title}
        </motion.h3>
        <div className="course-grid">
            {items.map((item, idx) => (
                <CourseCard
                    key={idx}
                    course={item}
                    isCompleted={completedSet.has(item.title)}
                    onToggle={() => onToggle(item.title)}
                    onStart={onStart}
                />
            ))}
        </div>
    </motion.div>
);

const EnrolledModal = ({ isOpen, onClose, enrolledCourses, completedCourses, allCoursesMap }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        <div className="enrolled-modal-header">
                            <h2>Enrolled Courses</h2>
                            <button className="enrolled-modal-close" onClick={onClose} aria-label="Close modal">
                                <X size={24} />
                            </button>
                        </div>

                        {enrolledCourses.size === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>You haven't started any courses yet.</p>
                        ) : (
                            <div className="enrolled-list">
                                {Array.from(enrolledCourses).map(title => {
                                    const course = allCoursesMap[title];
                                    if (!course) return null;
                                    const isCompleted = completedCourses.has(title);
                                    return (
                                        <motion.div
                                            key={title}
                                            className="enrolled-item"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            <div>
                                                <h4>{course.title}</h4>
                                                <span className="enrolled-item-platform">{course.platform}</span>
                                            </div>
                                            <div className={`enrolled-status ${isCompleted ? 'completed' : 'in-progress'}`}>
                                                {isCompleted ? (
                                                    <><CheckCircle size={14} /> Completed</>
                                                ) : (
                                                    <><PlayCircle size={14} /> In Progress</>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Dashboard = () => {
    const location = useLocation();
    const selectedDomain = location.state?.selectedDomain || 'Data Scientist';

    const [completedCourses, setCompletedCourses] = useState(() => {
        const saved = localStorage.getItem('completedCourses');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const [enrolledCourses, setEnrolledCourses] = useState(() => {
        const saved = localStorage.getItem('enrolledCourses');
        const initial = saved ? new Set(JSON.parse(saved)) : new Set();
        return initial;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const resumeData = (() => {
        const saved = localStorage.getItem('resumeData');
        return saved ? JSON.parse(saved) : null;
    })();

    const skillsGap = (() => {
        if (resumeData && selectedDomain) {
            return matchSkills(resumeData.skills, selectedDomain);
        }
        return null;
    })();

    console.log('Dashboard: selectedDomain:', selectedDomain);
    const domainCourses = courses[selectedDomain] || courses['default'];

    const allCourses = domainCourses ? [
        ...(domainCourses.beginner || []),
        ...(domainCourses.intermediate || []),
        ...(domainCourses.advanced || [])
    ] : [];

    const allCoursesMap = allCourses.reduce((acc, course) => {
        acc[course.title] = course;
        return acc;
    }, {});

    useEffect(() => {
        const jsonStats = JSON.stringify([...completedCourses]);
        localStorage.setItem('completedCourses', jsonStats);

        const userId = localStorage.getItem('userId');
        if (userId) {
            const userDbKey = `db_${userId}`;
            const userDb = JSON.parse(localStorage.getItem(userDbKey) || '{}');
            userDb.completedCourses = jsonStats;
            localStorage.setItem(userDbKey, JSON.stringify(userDb));
        }
    }, [completedCourses]);

    const actualEnrolledCourses = new Set([...enrolledCourses, ...completedCourses]);

    if (actualEnrolledCourses.size !== enrolledCourses.size) {
        setEnrolledCourses(actualEnrolledCourses);

        const jsonStats = JSON.stringify([...actualEnrolledCourses]);
        localStorage.setItem('enrolledCourses', jsonStats);

        const userId = localStorage.getItem('userId');
        if (userId) {
            const userDbKey = `db_${userId}`;
            const userDb = JSON.parse(localStorage.getItem(userDbKey) || '{}');
            userDb.enrolledCourses = jsonStats;
            localStorage.setItem(userDbKey, JSON.stringify(userDb));
        }
    }

    const toggleCourse = (title) => {
        setCompletedCourses(prev => {
            const next = new Set(prev);
            if (next.has(title)) {
                next.delete(title);
            } else {
                next.add(title);
            }
            return next;
        });
    };

    const startCourse = (title) => {
        setEnrolledCourses(prev => {
            const next = new Set(prev);
            next.add(title);
            return next;
        });
    };

    const progress = Math.round((completedCourses.size / allCourses.length) * 100) || 0;

    if (!domainCourses) {
        console.error('Dashboard: No domain courses found for', selectedDomain);
        return <div className="container" style={{ paddingTop: '40px' }}>Error: Course data not found.</div>;
    }

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Helmet>
                <title>Dashboard | SkillGPS</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="page-header">
                <motion.h1
                    initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
                >
                    Your Learning Path: <span className="gradient-text">{selectedDomain}</span>
                </motion.h1>
                <motion.p
                    initial={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Curated courses to take you from Beginner to Expert.
                </motion.p>
            </div>

            {/* Stats & Progress */}
            <motion.div
                className="dashboard-stats-panel"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className="dashboard-stats-row">
                    <div>
                        <span className="dashboard-progress-value">{progress}%</span>
                        <span className="dashboard-progress-label">Completion Rate</span>
                    </div>
                    <div className="dashboard-stats-right">
                        <button
                            className="dashboard-retake-btn"
                            onClick={() => {
                                if (window.confirm("Retaking the survey will reset your progress. Continue?")) {
                                    localStorage.removeItem('formData');
                                    localStorage.removeItem('completedCourses');
                                    localStorage.removeItem('enrolledCourses');
                                    localStorage.removeItem('resumeData');
                                    window.location.href = '/survey';
                                }
                            }}
                        >
                            Retake Survey
                        </button>
                        <button className="dashboard-enrolled-btn" onClick={() => setIsModalOpen(true)}>
                            {actualEnrolledCourses.size} Courses Enrolled
                        </button>
                        <span className="dashboard-completed-text">
                            <span className="dashboard-completed-count">{completedCourses.size}</span> / {allCourses.length} Completed
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Skills Gap Section */}
            {skillsGap && skillsGap.essentialMissing.length > 0 && (
                <motion.div
                    className="skills-gap-section"
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="skills-gap-header">
                        <AlertCircle size={28} color="var(--danger)" />
                        <div>
                            <h2>Essential Skills You Need</h2>
                            <p>Based on your resume analysis, focus on acquiring these skills</p>
                        </div>
                    </div>
                    <div className="skills-gap-tags">
                        {skillsGap.essentialMissing.slice(0, 10).map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </motion.div>
            )}

            <div className="dashboard-grid">
                {/* Left Column: Free Resources */}
                <div>
                    <h2 className="dashboard-section-title">Free Resources</h2>
                    {['beginner', 'intermediate', 'advanced'].map(level => {
                        const items = (domainCourses[level] || []).filter(c => c.type === 'free');
                        if (items.length === 0) return null;
                        return (
                            <Section
                                key={level}
                                title={level.charAt(0).toUpperCase() + level.slice(1)}
                                items={items}
                                completedSet={completedCourses}
                                onToggle={toggleCourse}
                                onStart={startCourse}
                            />
                        );
                    })}
                </div>

                {/* Right Column: Paid Courses */}
                <div>
                    <h2 className="dashboard-section-title paid">Paid Courses</h2>
                    {['beginner', 'intermediate', 'advanced'].map(level => {
                        const items = (domainCourses[level] || []).filter(c => c.type === 'paid');
                        if (items.length === 0) return null;
                        return (
                            <Section
                                key={level}
                                title={level.charAt(0).toUpperCase() + level.slice(1)}
                                items={items}
                                completedSet={completedCourses}
                                onToggle={toggleCourse}
                                onStart={startCourse}
                            />
                        );
                    })}
                    {Object.values(domainCourses || {}).every(lvl => (lvl || []).filter(c => c.type === 'paid').length === 0) && (
                        <div className="dashboard-empty-state">
                            <p>Premium paid courses coming soon.</p>
                        </div>
                    )}
                </div>
            </div>

            <EnrolledModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                enrolledCourses={actualEnrolledCourses}
                completedCourses={completedCourses}
                allCoursesMap={allCoursesMap}
            />
        </motion.div>
    );
};

export default Dashboard;
