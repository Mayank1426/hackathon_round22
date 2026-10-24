import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-white border-2 border-amber-400 text-slate-900 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs sm:text-sm font-semibold backdrop-blur-lg">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-dk-yellow text-slate-950 font-black text-xs shrink-0 border border-amber-300">
          ✳
        </span>
        <span className="pr-2">{message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
