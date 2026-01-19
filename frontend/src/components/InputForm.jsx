import React, { useState } from 'react';
import { Target, Code2, Loader2 } from 'lucide-react';

const InputForm = ({ onAnalyze, loading }) => {
    const [targetRole, setTargetRole] = useState('');
    const [currentSkills, setCurrentSkills] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (targetRole && currentSkills) {
            onAnalyze({ target_role: targetRole, current_skills: currentSkills });
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold text-brand-accent">
                    CareerPath
                </h2>
                <p className="text-brand-muted text-lg">
                    Discover your path to your dream job with AI-powered analysis
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-brand-card/50 backdrop-blur-xl p-8 rounded-2xl border border-brand-border shadow-2xl space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-brand-text">
                        <Target className="w-4 h-4 text-brand-accent" />
                        Target Role
                    </label>
                    <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all placeholder:text-brand-muted/50 text-brand-text"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-brand-text">
                        <Code2 className="w-4 h-4 text-brand-accent" />
                        Current Skills
                    </label>
                    <textarea
                        value={currentSkills}
                        onChange={(e) => setCurrentSkills(e.target.value)}
                        placeholder="e.g. React, JavaScript, HTML, CSS, Git"
                        className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all placeholder:text-brand-muted/50 text-brand-text min-h-[120px]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-accent hover:bg-brand-primary text-brand-bg font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-accent/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing Career Path...
                        </>
                    ) : (
                        'Generate Analysis'
                    )}
                </button>
            </form>
        </div>
    );
};

export default InputForm;
