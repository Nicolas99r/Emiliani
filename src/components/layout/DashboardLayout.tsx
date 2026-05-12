'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    // Update theme class on body
    const body = document.body;
    body.classList.remove('theme-world-cup', 'theme-japan', 'theme-default');
    if (theme !== 'default') {
      body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {children}
    </div>
  );
}
