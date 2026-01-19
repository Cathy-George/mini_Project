import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Analysis failed. Please check backend connection.');
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetAnalysis = () => {
        setData(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-card/20 via-brand-bg to-brand-bg -z-10" />

            <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
                {error && (
                    <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-center animate-in fade-in slide-in-from-top-4">
                        {error}
                    </div>
                )}

                {!data ? (
                    <InputForm onAnalyze={handleAnalyze} loading={loading} />
                ) : (
                    <Dashboard data={data} onBack={resetAnalysis} />
                )}
            </main>
        </div>
    );
}

export default App;
