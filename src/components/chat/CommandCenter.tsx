'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Send, Plane, CalendarDays, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CommandCenter({ isMobileHidden }: { isMobileHidden?: boolean }) {
  const { 
    messages, addMessage, isLoading, setIsLoading, 
    setHighlightedDates, setStats, setTheme, 
  } = useAppStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages,
          currentDate: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const text = data.response;

      // Extract JSON block
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      let analysisText = text;
      
      if (jsonMatch) {
        analysisText = text.replace(jsonMatch[0], '').trim();
        const jsonStr = jsonMatch[1];
        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.action === 'HIGHLIGHT_DATES') {
            const dates = parsed.dates || [];
            setHighlightedDates(dates);
            setStats(parsed.stats || null);
            if (parsed.theme) setTheme(parsed.theme);
          }
        } catch (err) {
          console.error("Failed to parse JSON from AI", err);
        }
      }

      addMessage({ role: 'assistant', content: analysisText });
    } catch (error) {
      console.error(error);
      addMessage({ role: 'assistant', content: 'Hubo un error procesando tu solicitud. Por favor intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className={`w-full md:w-[400px] h-full flex-col glass-panel z-10 relative border-r border-border/50 ${isMobileHidden ? 'hidden md:flex' : 'flex'}`}>
      <div className="p-6 pb-2 border-b border-border/30">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Plane className="text-primary w-6 h-6" />
          <span>Emiliani<span className="text-primary">AI</span></span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Optimizador de Vacaciones Premium</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground opacity-50">
            <CalendarDays className="w-12 h-12" />
            <p>Describe tus planes de viaje y calcularé la forma más eficiente de usar tus días.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md' 
                  : 'bg-card border border-border/50 rounded-tl-sm shadow-sm'
              }`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Optimizando calendario...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-2 pb-24 md:pb-6 bg-gradient-to-t from-background to-transparent">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ej. Quiero ir a Japón en el mundial..."
            className="w-full pl-4 pr-12 py-6 rounded-full bg-input/50 backdrop-blur-md border-border focus-visible:ring-primary shadow-lg"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 rounded-full w-10 h-10 bg-primary hover:bg-primary/90 transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </aside>
  );
}
