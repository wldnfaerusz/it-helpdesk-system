import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-slate-800 text-white border-slate-700';
        let Icon = Info;
        if (toast.type === 'success') {
          bg = 'bg-emerald-600 text-white border-emerald-500';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bg = 'bg-rose-600 text-white border-rose-500';
          Icon = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className={`${bg} border px-4 py-3 rounded-xl shadow-xl text-xs font-medium flex items-center justify-between gap-3 pointer-events-auto transition-all animate-bounce-subtle`}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onClose(toast.id)}
              className="p-1 hover:bg-black/10 rounded-lg transition shrink-0"
              title="Tutup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
