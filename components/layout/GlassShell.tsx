import React from 'react';
import { Settings, Flame } from 'lucide-react';

interface GlassShellProps {
  children: React.ReactNode;
}

export default function GlassShell({ children }: GlassShellProps) {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden text-white selection:bg-white/20">
      {/* Background Blobs - positioned absolute behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <header className="relative z-50 w-full max-w-5xl mx-auto p-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <span className="font-medium tracking-tight text-lg opacity-90 group-hover:opacity-100 transition-opacity">
            FocusFlow
          </span>
        </div>

        <button
          className="glass-button p-3 rounded-full text-white/80 hover:text-white"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 w-full max-w-3xl mx-auto min-h-0">
        <div className="w-full h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Footer / Status (Optional) */}
      <footer className="relative z-10 p-6 text-center text-white/30 text-xs tracking-widest uppercase">
        Focus • Flow • Achieve
      </footer>
    </div>
  );
}
