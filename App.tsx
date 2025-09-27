
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { CoachResponse } from './components/CoachResponse';
import { generateCoachingFeedback } from './services/geminiService';
import type { HabitData, CoachFeedback } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<CoachFeedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFeedback = async (data: HabitData) => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const result = await generateCoachingFeedback(data);
      setFeedback(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm">
            <SparklesIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Habit Coach AI
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-600">
            Generate AI-powered feedback based on your habit progress.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Backend Data Simulation</h2>
            <InputForm onGenerate={handleGenerateFeedback} isLoading={isLoading} />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Coach's Feedback</h2>
            <div className="min-h-[400px] flex items-center justify-center p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              {isLoading && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Generating feedback...</p>
                </div>
              )}
              {error && (
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
                  <h3 className="font-bold">Error</h3>
                  <p>{error}</p>
                </div>
              )}
              {!isLoading && !error && feedback && (
                <CoachResponse feedback={feedback} />
              )}
              {!isLoading && !error && !feedback && (
                <div className="text-center text-gray-500">
                  <p>Fill out the form to see the AI's response here.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
