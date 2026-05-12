'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Plane, Calendar as CalendarIcon, Map } from 'lucide-react';

const NEXT_HOLIDAYS = [
  { name: 'Semana Santa', date: 'Mar 31 - Abr 3', days_off: 4, label: 'Ideal para playa' },
  { name: 'Día del Trabajo', date: 'Mayo 1', days_off: 3, label: 'Fin de semana largo' },
  { name: 'San Pedro y San Pablo', date: 'Junio 29', days_off: 3, label: 'Pleno Mundial' },
];

export function EmptyState() {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-start md:justify-center p-8 lg:p-12 pb-32 md:pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Maximiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">tiempo libre</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Descubre cómo la Ley Emiliani puede convertir tus 15 días de vacaciones en casi un mes de descanso efectivo.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {NEXT_HOLIDAYS.map((holiday, i) => (
          <motion.div
            key={holiday.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <Card className="p-6 glass-panel hover:scale-105 transition-transform duration-300 cursor-default group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{holiday.name}</h3>
                  <p className="text-sm text-muted-foreground">{holiday.date}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-sm">
                  <span className="font-medium text-primary">{holiday.days_off} días libres</span>
                  <span className="bg-muted px-2 py-1 rounded-md text-xs">{holiday.label}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
