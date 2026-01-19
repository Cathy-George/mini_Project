import React from 'react';
import { BookOpen, Github, Briefcase, Code } from 'lucide-react';
import SkillGapChart from './SkillGapChart';
import StudyPlan from './StudyPlan';

const Dashboard = ({ data, onBack }) => {
    if (!data) return null;

    const { job_match_analysis, skill_gap_report, study_plan, project_suggestions, learning_resources, github_repositories, alternative_roles } = data;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 w-full max-w-6xl mx-auto pb-12">
            <button onClick={onBack} className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors">
                &larr; Analyze Another Role
            </button>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-brand-card p-8 rounded-2xl border border-brand-border">
                    <h2 className="text-3xl font-bold text-brand-text mb-2">{job_match_analysis.seniority_level} Role Analysis</h2>
                    <p className="text-brand-muted mb-6">{job_match_analysis.reasoning}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-brand-accent/10 border border-brand-accent/30 p-4 rounded-xl">
                            <span className="text-brand-accent text-sm font-semibold">Strong Skills</span>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {skill_gap_report.strong.map(s => <span key={s} className="text-xs bg-brand-accent/20 text-brand-accent px-2 py-1 rounded-full">{s}</span>)}
                            </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                            <span className="text-red-400 text-sm font-semibold">Missing</span>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {skill_gap_report.missing.map(s => <span key={s} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">{s}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <SkillGapChart analysis={job_match_analysis} />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-brand-text flex items-center gap-2">
                    <BookOpen className="text-brand-accent" />
                    Personalized Study Plan
                </h3>
                <StudyPlan plan={study_plan} />
            </div>

            {/* Projects & Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Projects */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-brand-text flex items-center gap-2">
                        <Code className="text-brand-accent" />
                        Recommended Projects
                    </h3>
                    <div className="space-y-4">
                        {project_suggestions.map((project, i) => (
                            <div key={i} className="bg-brand-card p-6 rounded-xl border border-brand-border hover:bg-brand-card/80 transition-all">
                                <h4 className="font-bold text-lg text-white mb-2">{project.title}</h4>
                                <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.map(t => (
                                        <span key={t} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resources & Repos */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-brand-text flex items-center gap-2">
                        <Github className="text-brand-text" />
                        Resources & Repos
                    </h3>
                    <div className="bg-brand-card p-6 rounded-xl border border-brand-border space-y-4">
                        {github_repositories.map((repo, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-700/30 rounded-lg transition-colors cursor-pointer group">
                                <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                <div>
                                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400">{repo.name}</h4>
                                    <p className="text-xs text-slate-500">{repo.description}</p>
                                    <span className="text-xs bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded mt-1 inline-block">Search: {repo.search_term}</span>
                                </div>
                            </div>
                        ))}
                        {learning_resources.map((res, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-700/30 rounded-lg transition-colors cursor-pointer group">
                                <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400">{res.name}</h4>
                                    <a href={res.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline break-all">{res.url}</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Alternative Roles */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                            <Briefcase className="text-pink-400" />
                            Alternative Roles
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {alternative_roles.map((role, i) => (
                                <div key={i} className="bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-300 hover:border-pink-500/50 transition-colors">
                                    {role.role} <span className="text-xs ml-1 opacity-50">({role.match_potential} match)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
