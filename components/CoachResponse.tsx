
import React from 'react';
import type { CoachFeedback } from '../types';
import { StreakIcon } from './icons/StreakIcon';
import { ShieldIcon } from './icons/ShieldIcon';

interface CoachResponseProps {
  feedback: CoachFeedback;
}

const ActionItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-600 text-sm">{title}</h4>
        <p className="text-gray-800">{description}</p>
    </div>
);


export const CoachResponse: React.FC<CoachResponseProps> = ({ feedback }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-5 animate-fade-in">
        <header className="pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
                {feedback.summary.includes('Streak') && <StreakIcon className="w-7 h-7 text-orange-500" />}
                <h3 className="text-xl font-bold text-gray-800 tracking-wide">{feedback.summary}</h3>
                {feedback.suggestRP && <ShieldIcon className="w-7 h-7 text-sky-500" title="Recovery Point suggested/used" />}
            </div>
        </header>

        <section>
            <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
        </section>

        <section className="space-y-3 pt-3">
            <h4 className="text-lg font-semibold text-gray-800">Next Steps</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionItem title="Today's Action" description={feedback.nextToday} />
                <ActionItem title="Tomorrow's Plan" description={feedback.nextTomorrow} />
            </div>
        </section>

        {feedback.ctas.length > 0 && (
            <footer className="pt-4 flex flex-wrap gap-3">
            {feedback.ctas.map((cta, index) => (
                <button
                key={index}
                className="bg-indigo-100 text-indigo-800 font-semibold py-2 px-4 rounded-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 text-sm"
                >
                {cta}
                </button>
            ))}
            </footer>
        )}
    </div>
  );
};
