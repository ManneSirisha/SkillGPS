import React from 'react';
import StepWrapper from './StepWrapper';

const IntentStep = ({ data, updateData, onNext, onBack }) => {
    const handleChange = (field, val) => {
        updateData({ ...data, intent: { ...(data.intent || {}), [field]: val } });
    };

    const intent = data.intent || {};

    const renderOption = (field, value, label) => (
        <button
            onClick={() => handleChange(field, value)}
            style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                marginBottom: '12px',
                textAlign: 'left',
                borderRadius: 'var(--radius-sm)',
                border: intent[field] === value ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                background: intent[field] === value ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                color: intent[field] === value ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'all 0.2s',
                fontWeight: intent[field] === value ? '500' : '400'
            }}
        >
            {label}
        </button>
    );

    return (
        <StepWrapper
            title="Career Intent"
            description="What are your immediate goals?"
            onNext={onNext}
            onBack={onBack}
        >
            <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-main)' }}>After Current Education</label>
                {renderOption("afterEdu", "job", "Get a Job")}
                {renderOption("afterEdu", "higherStudies", "Higher Studies")}
            </div>

            <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-main)' }}>Workplace Preference</label>
                {renderOption("workplace", "startup", "Startup (Fast-paced, wearing multiple hats)")}
                {renderOption("workplace", "corporate", "Corporate (Structured, specialized roles)")}
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-main)' }}>Nature of Work</label>
                {renderOption("nature", "research", "Research & Development")}
                {renderOption("nature", "applied", "Applied Engineering / Product")}
            </div>
        </StepWrapper>
    );
};

export default IntentStep;
