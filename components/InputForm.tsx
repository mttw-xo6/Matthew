import React, { useState } from 'react';
import type { HabitData, Habit } from '../types';
import { Status, RecoveryActive, PrefLength, PrefTone } from '../types';
import { HabitIcon, availableHabitIcons } from './icons/habits';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SaveIcon } from './icons/SaveIcon';


interface InputFormProps {
  onGenerate: (data: HabitData) => void;
  isLoading: boolean;
}

const initialFormData: HabitData = {
  userName: '',
  habits: [],
  todayStatus: Status.Done,
  yesterdayStatus: Status.Done,
  currentStreak: 7,
  preResetStreak: null,
  lastResetDate: null,
  recoveryActive: RecoveryActive.None,
  recoverySuccessToday: false,
  consecutiveMisses: 0,
  rpAvailable: 1,
  rpAutoSpendEnabled: false,
  riskResetToday: false,
  length: PrefLength.Short,
  tone: PrefTone.Coach,
  topObstacle: '',
  tomorrowWindow: '7:00-8:00',
  userNotes: '',
};

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">{children}</div>
);

const FormLabel: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 sm:col-span-1">{children}</label>
);

const FormInputContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="sm:col-span-2">{children}</div>
);


export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<HabitData>(initialFormData);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState(availableHabitIcons[0]);

  const [editingHabit, setEditingHabit] = useState<{ id: number; name: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
        setFormData(prev => ({ ...prev, [name]: value === '' ? null : Number(value) }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
    }
  };

  const handleAddHabit = () => {
    const trimmedName = newHabitName.trim();
    if (trimmedName) {
      const newHabit: Habit = {
        id: Date.now(),
        name: trimmedName,
        icon: newHabitIcon,
      };
      setFormData(prev => ({
        ...prev,
        habits: [...prev.habits, newHabit],
      }));
      setNewHabitName('');
      setNewHabitIcon(availableHabitIcons[0]);
    }
  };

  const handleStartEdit = (habit: Habit) => {
    setEditingHabit({ id: habit.id, name: habit.name });
  };

  const handleCancelEdit = () => {
    setEditingHabit(null);
  };

  const handleSaveEdit = () => {
    if (!editingHabit || editingHabit.name.trim() === '') return;
    setFormData(prev => ({
      ...prev,
      habits: prev.habits.map(h => 
        h.id === editingHabit.id ? { ...h, name: editingHabit.name.trim() } : h
      ),
    }));
    setEditingHabit(null);
  };
  
  const handleRemoveHabit = (habitId: number) => {
    setFormData(prev => ({
      ...prev,
      habits: prev.habits.filter(habit => habit.id !== habitId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.habits.length === 0) return;
    onGenerate(formData);
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors";
  const sectionClass = "space-y-4 p-4 border rounded-lg bg-gray-50";
  
  const checkmarkSvg = encodeURIComponent(`<svg viewBox="0 0 16 16" fill="#4B5563" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`);
  const checkboxClass = `
    h-5 w-5 rounded border border-gray-300 bg-white
    appearance-none cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500
    checked:bg-white
    checked:border-gray-300
    checked:bg-[url("data:image/svg+xml,${checkmarkSvg}")]
    bg-center bg-no-repeat
  `.replace(/\s+/g, ' ').trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={sectionClass}>
        <h3 className="font-semibold text-lg text-gray-700">User Profile</h3>
        <FormRow>
          <FormLabel htmlFor="userName">User Name</FormLabel>
          <FormInputContainer><input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} className={inputClass} /></FormInputContainer>
        </FormRow>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-lg text-gray-700">Habits</h3>
        <div className="space-y-3">
            {formData.habits.length > 0 && (
                <ul className="space-y-2">
                    {formData.habits.map(habit => (
                        <li key={habit.id} className="flex items-center gap-2 p-2 bg-white border rounded-lg animate-fade-in">
                           <HabitIcon iconName={habit.icon} className="w-6 h-6 text-indigo-500 shrink-0" />
                            {editingHabit?.id === habit.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingHabit.name}
                                        onChange={(e) => setEditingHabit({...editingHabit, name: e.target.value})}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') handleCancelEdit(); }}
                                        className="flex-grow p-1 border border-indigo-300 rounded-md"
                                        autoFocus
                                    />
                                    <button type="button" onClick={handleSaveEdit} className="p-1.5 text-green-600 hover:bg-green-100 rounded-md"><SaveIcon className="w-5 h-5"/></button>
                                </>
                            ) : (
                                <>
                                    <span className="flex-grow font-medium text-gray-800">{habit.name}</span>
                                    <button type="button" onClick={() => handleStartEdit(habit)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md"><EditIcon className="w-5 h-5"/></button>
                                    <button type="button" onClick={() => handleRemoveHabit(habit.id)} className="p-1.5 text-red-500 hover:bg-red-100 rounded-md"><TrashIcon className="w-5 h-5"/></button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
           {formData.habits.length === 0 && (
              <p className="text-sm text-center text-gray-500 py-2">Add at least one habit to get feedback.</p>
           )}
          <div className='pt-2 space-y-3'>
            <FormRow>
                <FormLabel htmlFor="newHabitName">Add a new habit</FormLabel>
                <FormInputContainer>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="newHabitName"
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddHabit(); } }}
                            className={inputClass}
                            placeholder="e.g., Drink water"
                        />
                         <button
                            type="button"
                            onClick={handleAddHabit}
                            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shrink-0"
                            >
                            Add
                        </button>
                    </div>
                </FormInputContainer>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="newHabitIcon">Choose an icon</FormLabel>
                 <FormInputContainer>
                    <div className="flex flex-wrap gap-2">
                        {availableHabitIcons.map(icon => (
                            <button
                                type="button"
                                key={icon}
                                onClick={() => setNewHabitIcon(icon)}
                                className={`p-2 rounded-lg border-2 transition-colors ${newHabitIcon === icon ? 'border-indigo-500 bg-indigo-100' : 'border-transparent bg-gray-200 hover:border-indigo-300'}`}
                                aria-label={`Select ${icon} icon`}
                            >
                                <HabitIcon iconName={icon} className="w-6 h-6 text-gray-700" />
                            </button>
                        ))}
                    </div>
                </FormInputContainer>
            </FormRow>
          </div>
        </div>
      </div>
      
      <div className={sectionClass}>
        <h3 className="font-semibold text-lg text-gray-700">Status & Streak</h3>
        <FormRow>
            <FormLabel htmlFor="todayStatus">Today's Status</FormLabel>
            <FormInputContainer>
                <select id="todayStatus" name="todayStatus" value={formData.todayStatus} onChange={handleChange} className={inputClass}>
                    {Object.values(Status).filter(s => s !== Status.ProtectedByRp).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="yesterdayStatus">Yesterday's Status</FormLabel>
            <FormInputContainer>
                <select id="yesterdayStatus" name="yesterdayStatus" value={formData.yesterdayStatus} onChange={handleChange} className={inputClass}>
                    {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="currentStreak">Current Streak</FormLabel>
            <FormInputContainer><input type="number" id="currentStreak" name="currentStreak" value={formData.currentStreak ?? ''} onChange={handleChange} className={inputClass} /></FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="consecutiveMisses">Consecutive Misses</FormLabel>
            <FormInputContainer><input type="number" id="consecutiveMisses" name="consecutiveMisses" value={formData.consecutiveMisses} onChange={handleChange} min="0" max="2" className={inputClass} /></FormInputContainer>
        </FormRow>
      </div>

       <div className={sectionClass}>
        <h3 className="font-semibold text-lg text-gray-700">Recovery & RP</h3>
        <FormRow>
            <FormLabel htmlFor="recoveryActive">Recovery Status</FormLabel>
            <FormInputContainer>
                <select id="recoveryActive" name="recoveryActive" value={formData.recoveryActive} onChange={handleChange} className={inputClass}>
                    {Object.values(RecoveryActive).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </FormInputContainer>
        </FormRow>
         <FormRow>
            <FormLabel htmlFor="rpAvailable">RP Available</FormLabel>
            <FormInputContainer><input type="number" id="rpAvailable" name="rpAvailable" value={formData.rpAvailable} min="0" onChange={handleChange} className={inputClass} /></FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="recoverySuccessToday">Recovery Success Today</FormLabel>
            <FormInputContainer><input type="checkbox" id="recoverySuccessToday" name="recoverySuccessToday" checked={formData.recoverySuccessToday} onChange={handleChange} className={checkboxClass} /></FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="rpAutoSpendEnabled">RP Auto-spend</FormLabel>
            <FormInputContainer><input type="checkbox" id="rpAutoSpendEnabled" name="rpAutoSpendEnabled" checked={formData.rpAutoSpendEnabled} onChange={handleChange} className={checkboxClass} /></FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="riskResetToday">Risk Reset Today</FormLabel>
            <FormInputContainer><input type="checkbox" id="riskResetToday" name="riskResetToday" checked={formData.riskResetToday} onChange={handleChange} className={checkboxClass} /></FormInputContainer>
        </FormRow>
      </div>

       <div className={sectionClass}>
        <h3 className="font-semibold text-lg text-gray-700">Preferences & Context</h3>
        <FormRow>
            <FormLabel htmlFor="length">Response Length</FormLabel>
            <FormInputContainer>
                <select id="length" name="length" value={formData.length} onChange={handleChange} className={inputClass}>
                    {Object.values(PrefLength).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="tone">Response Tone</FormLabel>
            <FormInputContainer>
                <select id="tone" name="tone" value={formData.tone} onChange={handleChange} className={inputClass}>
                    {Object.values(PrefTone).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="topObstacle">Top Obstacle</FormLabel>
            <FormInputContainer><textarea id="topObstacle" name="topObstacle" value={formData.topObstacle ?? ''} onChange={handleChange} rows={2} className={inputClass}></textarea></FormInputContainer>
        </FormRow>
        <FormRow>
            <FormLabel htmlFor="tomorrowWindow">Tomorrow Window</FormLabel>
            <FormInputContainer><input type="text" id="tomorrowWindow" name="tomorrowWindow" value={formData.tomorrowWindow ?? ''} onChange={handleChange} className={inputClass} /></FormInputContainer>
        </FormRow>
       </div>

      <button type="submit" disabled={isLoading || formData.habits.length === 0} className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-200">
        {isLoading ? 'Generating...' : 'Generate Feedback'}
      </button>
    </form>
  );
};