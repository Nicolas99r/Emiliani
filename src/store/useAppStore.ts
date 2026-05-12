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
  
  aiSuggestedDates: SuggestedDate[];
  setAiSuggestedDates: (dates: SuggestedDate[]) => void;
  
  referenceDateRange: { from?: Date; to?: Date } | undefined;
  setReferenceDateRange: (range: { from?: Date; to?: Date } | undefined) => void;
  
  stats: { total_days_off: number; vacation_days_used: number } | null;
  setStats: (stats: { total_days_off: number; vacation_days_used: number } | null) => void;
  
  aiStats: { total_days_off: number; vacation_days_used: number } | null;
  setAiStats: (stats: { total_days_off: number; vacation_days_used: number } | null) => void;
  
  resetToAiSuggestedDates: () => void;
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
  
  aiSuggestedDates: [],
  setAiSuggestedDates: (aiSuggestedDates) => set({ aiSuggestedDates }),
  
  referenceDateRange: undefined,
  setReferenceDateRange: (referenceDateRange) => set({ referenceDateRange }),
  
  stats: null,
  setStats: (stats) => set({ stats }),
  
  aiStats: null,
  setAiStats: (aiStats) => set({ aiStats }),
  
  resetToAiSuggestedDates: () => set((state) => ({ 
    highlightedDates: state.aiSuggestedDates, 
    stats: state.aiStats 
  })),
}));
