'use client';

import { useAppStore } from '@/store/useAppStore';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { parseISO, isSameDay } from 'date-fns';

export function PremiumCalendar() {
  const { highlightedDates, stats, isLoading } = useAppStore();

  const vacationDates = highlightedDates
    .filter(d => d.type === 'vacation')
    .map(d => parseISO(d.date));
    
  const holidayDates = highlightedDates
    .filter(d => d.type === 'holiday')
    .map(d => parseISO(d.date));

  const weekendDates = highlightedDates
    .filter(d => d.type === 'weekend')
    .map(d => parseISO(d.date));

  // Determine starting month based on first highlighted date, or default to June 2026 (World Cup context)
  const defaultMonth = highlightedDates.length > 0 ? parseISO(highlightedDates[0].date) : new Date(2026, 5);

  return (
    <div className="w-full h-full flex flex-col p-8 lg:p-12 relative overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-medium text-primary animate-pulse">Analizando las mejores fechas...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stats && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex gap-4"
        >
          <Card className="p-4 bg-primary/10 border-primary/20 backdrop-blur-md">
            <p className="text-sm text-muted-foreground">Días libres efectivos</p>
            <p className="text-3xl font-bold text-primary">{stats.total_days_off}</p>
          </Card>
          <Card className="p-4 bg-card border-border/50 backdrop-blur-md">
            <p className="text-sm text-muted-foreground">Días de vacaciones usados</p>
            <p className="text-3xl font-bold">{stats.vacation_days_used}</p>
          </Card>
        </motion.div>
      )}

      <motion.div 
        key={defaultMonth.toISOString()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex-1 glass-panel rounded-3xl p-6 shadow-2xl relative overflow-y-auto"
      >
        <Calendar
          mode="multiple"
          defaultMonth={defaultMonth}
          numberOfMonths={2}
          className="w-full"
          classNames={{
            months: "flex flex-col lg:flex-row gap-8 w-full justify-around",
            month: "w-full space-y-4",
            table: "w-full h-full border-collapse",
            head_row: "flex w-full justify-between mb-2 gap-1 sm:gap-2",
            head_cell: "text-muted-foreground font-medium text-[0.9rem] w-full text-center",
            row: "flex w-full mt-2 justify-between gap-1 sm:gap-2",
            cell: "w-full aspect-square relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            day: "w-full h-full rounded-2xl flex items-center justify-center text-lg px-1 hover:bg-muted transition-all duration-300",
          }}
          modifiers={{
            vacation: vacationDates,
            holiday: holidayDates,
            weekend: weekendDates,
          }}
          modifiersClassNames={{
            vacation: "date-glow-vacation scale-110 z-10",
            holiday: "date-glow-holiday scale-105 z-10",
            weekend: "bg-secondary text-secondary-foreground opacity-80",
          }}
          components={{
            DayButton: (props) => {
              const { day } = props;
              const dateStr = day.date;
              
              const info = highlightedDates.find(d => isSameDay(parseISO(d.date), dateStr));

              if (info) {
                return (
                  <Tooltip>
                    <TooltipTrigger {...props} className={`${props.className} ${info.type === 'vacation' ? 'date-glow-vacation scale-110 z-10' : info.type === 'holiday' ? 'date-glow-holiday scale-105 z-10' : ''}`} />
                    <TooltipContent side="top" className="bg-popover text-popover-foreground border-border/50 shadow-xl p-3">
                      <p className="font-bold text-sm mb-1 capitalize">{info.type === 'holiday' ? 'Festivo' : info.type === 'vacation' ? 'Vacaciones' : 'Fin de semana'}</p>
                      <p className="text-xs text-muted-foreground">{info.reason}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <button {...props} />;
            }
          }}
        />
      </motion.div>
    </div>
  );
}
