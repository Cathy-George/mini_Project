import React from 'react';

const CircularProgress = ({ value, max, color, label, subLabel }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-700"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className={`${color} transition-all duration-1000 ease-out`}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{value}{max === 10 ? '/10' : '%'}</span>
                </div>
            </div>
            <p className="font-medium text-slate-200 mt-2">{label}</p>
            <p className="text-xs text-slate-500">{subLabel}</p>
        </div>
    );
};

const SkillGapChart = ({ analysis }) => {
    return (
        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border h-full flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-brand-text mb-6 w-full text-center md:text-left">Match Analysis</h3>

            <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8">
                <CircularProgress
                    value={analysis.match_percentage}
                    max={100}
                    color="text-brand-accent"
                    label="Match Score"
                    subLabel="Overall Fit"
                />

                <CircularProgress
                    value={analysis.readiness_score}
                    max={10}
                    color="text-blue-500"
                    label="Readiness"
                    subLabel="Job Preparedness"
                />
            </div>
        </div>
    );
};

export default SkillGapChart;
