import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

const StudyPlan = ({ plan }) => {
    if (!plan) return null;

    const phases = [
        { title: 'Days 1-30', items: plan.day_30, color: 'text-brand-accent', border: 'border-brand-accent/30', bg: 'bg-brand-accent/10' },
        { title: 'Days 31-60', items: plan.day_60, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
        { title: 'Days 61-90', items: plan.day_90, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${phase.border} ${phase.bg} backdrop-blur-sm`}>
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className={`w-5 h-5 ${phase.color}`} />
                        <h3 className={`font-bold text-lg ${phase.color}`}>{phase.title}</h3>
                    </div>
                    <ul className="space-y-3">
                        {phase.items && phase.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${phase.color}`} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default StudyPlan;
