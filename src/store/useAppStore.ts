import { create } from 'zustand';

export type SuggestedDate = {
  date: string;
  type: 'vacation' | 'holiday' | 'weekend';
  reason: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface AppState {
  theme: 'default' | 'world-cup' | 'japan';
  setTheme: (theme: 'default' | 'world-cup' | 'japan') => void;
  
  messages: Message[];
  addMessage: (message: Omit<Message, 'id'>) => void;
  
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  
  highlightedDates: SuggestedDate[];
  setHighlightedDates: (dates: SuggestedDate[]) => void;
  
  stats: { total_days_off: number; vacation_days_used: number } | null;
  setStats: (stats: { total_days_off: number; vacation_days_used: number } | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'default',
  setTheme: (theme) => set({ theme }),
  
  messages: [],
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, { ...message, id: Date.now().toString() }] 
  })),
  
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  highlightedDates: [],
  setHighlightedDates: (highlightedDates) => set({ highlightedDates }),
  
  stats: null,
  setStats: (stats) => set({ stats }),
}));
