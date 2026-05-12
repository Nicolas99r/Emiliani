'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CommandCenter } from '@/components/chat/CommandCenter';
import { PremiumCalendar } from '@/components/calendar/PremiumCalendar';
import { EmptyState } from '@/components/calendar/EmptyState';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar as CalendarIcon } from 'lucide-react';

export default function Home() {
  const { highlightedDates, isLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState<'chat' | 'calendar'>('chat');

  return (
    <DashboardLayout>
      <CommandCenter isMobileHidden={activeTab === 'calendar'} />
      
      <main className={`flex-1 relative z-10 overflow-y-auto ${activeTab === 'chat' ? 'hidden md:block' : 'block'}`}>
        {highlightedDates.length > 0 || isLoading ? (
          <PremiumCalendar />
        ) : (
          <EmptyState />
        )}
      </main>

      {/* Mobile Navigation Switcher */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background/90 backdrop-blur-xl p-1.5 rounded-full border border-border/50 shadow-2xl flex gap-1">
        <Button 
          variant={activeTab === 'chat' ? 'default' : 'ghost'} 
          className="rounded-full px-5 gap-2 font-medium"
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </Button>
        <Button 
          variant={activeTab === 'calendar' ? 'default' : 'ghost'} 
          className="rounded-full px-5 gap-2 font-medium"
          onClick={() => setActiveTab('calendar')}
        >
          <CalendarIcon className="w-4 h-4" />
          Calendario
        </Button>
      </div>
    </DashboardLayout>
  );
}
