import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import InterestStep from '../components/survey/InterestStep';
import WorkStyleStep from '../components/survey/WorkStyleStep';
import IntentStep from '../components/survey/IntentStep';
import ConfidenceStep from '../components/survey/ConfidenceStep';
import { useNavigate } from 'react-router-dom';
import './Survey.css';

const Survey = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        interests: {},
        workStyle: {},
        intent: {},
        confidence: { math: 5, coding: 5, communication: 5 }
    });

    const validateStep = () => {
        switch (step) {
            case 1: {
                const { numbers, building, design, explaining, logic } = formData.interests || {};
                if (numbers === undefined || building === undefined || design === undefined || explaining === undefined || logic === undefined) {
                    return false;
                }
                return true;
            }
            case 2: {
                const { environment, structure, roleType } = formData.workStyle || {};
                if (!environment || !structure || !roleType) {
                    return false;
                }
                return true;
            }
            case 3: {
                const { afterEdu, workplace, nature } = formData.intent || {};
                if (!afterEdu || !workplace || !nature) {
                    return false;
                }
                return true;
            }
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (!validateStep()) {
            alert("Please answer all questions to proceed.");
            return;
        }
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const updateData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleFinish = () => {
        localStorage.removeItem('completedCourses');
        localStorage.removeItem('enrolledCourses');
        navigate('/results', { state: { formData } });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <InterestStep key="step1" data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 2:
                return <WorkStyleStep key="step2" data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <IntentStep key="step3" data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 4:
                return <ConfidenceStep key="step4" data={formData} updateData={updateData} onNext={handleFinish} onBack={prevStep} />;
            default:
                return null;
        }
    };

    return (
        <div className="survey-container">
            <Helmet>
                <title>Career Assessment Survey | SkillGPS</title>
                <meta name="description" content="Take our AI-driven career assessment survey to discover your ideal tech career path based on your skills, interests, and working style." />
                <link rel="canonical" href="https://skillgps.vercel.app/survey" />
            </Helmet>

            <div className="survey-progress">
                <div className="survey-progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>
        </div>
    );
};

export default Survey;
