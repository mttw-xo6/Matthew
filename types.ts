
export enum Status {
  Done = 'done',
  Missed = 'missed',
  Partial = 'partial',
  ProtectedByRp = 'protected_by_rp',
}

export enum RecoveryActive {
  None = 'none',
  Day1 = 'day1',
  Day2 = 'day2',
}

export enum PrefLength {
  Short = 'short',
  Standard = 'standard',
  Deep = 'deep',
}

export enum PrefTone {
  Gentle = 'gentle',
  Cheerful = 'cheerful',
  MatterOfFact = 'matter_of_fact',
  Coach = 'coach',
}

export interface Habit {
  id: number;
  name: string;
  icon: string;
}

export interface HabitData {
  userName: string;
  habits: Habit[];
  todayStatus: Status;
  yesterdayStatus: Status;
  currentStreak: number;
  preResetStreak: number | null;
  lastResetDate: string | null;
  recoveryActive: RecoveryActive;
  recoverySuccessToday: boolean;
  consecutiveMisses: number;
  rpAvailable: number;
  rpAutoSpendEnabled: boolean;
  riskResetToday: boolean;
  length: PrefLength;
  tone: PrefTone;
  topObstacle: string | null;
  tomorrowWindow: string | null;
  userNotes: string | null;
}

export interface CoachFeedback {
  summary: string;
  message: string;
  nextToday: string;
  nextTomorrow: string;
  suggestRP: boolean;
  ctas: string[];
}
