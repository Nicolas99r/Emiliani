'use client';

import { useAppStore } from '@/store/useAppStore';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CommandCenter } from '@/components/chat/CommandCenter';
import { PremiumCalendar } from '@/components/calendar/PremiumCalendar';
import { EmptyState } from '@/components/calendar/EmptyState';

export default function Home() {
  const { highlightedDates, isLoading } = useAppStore();

  return (
    <DashboardLayout>
      <CommandCenter />
      
      <main className="flex-1 relative z-10">
        {highlightedDates.length > 0 || isLoading ? (
          <PremiumCalendar />
        ) : (
          <EmptyState />
        )}
      </main>
    </DashboardLayout>
  );
}
