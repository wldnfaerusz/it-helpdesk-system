import React from 'react';
import { Headphones, User, ShieldCheck } from 'lucide-react';

export default function Navbar({ currentRole, onSelectRole, openTicketCount }) {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectRole('user')}>
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight">IT Helpdesk</h1>
              <p className="text-[11px] text-slate-400">Balai Pustaka Portal Service</p>
            </div>
          </div>

          {/* Navigation Tabs / Role Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <button
              type="button"
              onClick={() => onSelectRole('user')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentRole === 'user'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Portal Karyawan</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectRole('admin')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                currentRole === 'admin'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Dashboard IT</span>
              {openTicketCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 animate-pulse">
                  {openTicketCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
