import React, { useState } from 'react';
import { PlusCircle, List } from 'lucide-react';
import CreateTicketForm from './CreateTicketForm';
import UserTicketList from './UserTicketList';

export default function UserPortal({ tickets, onSubmitTicket, onOpenModal }) {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'history'

  const handleCreated = (formData) => {
    onSubmitTicket(formData);
    setActiveTab('history');
  };

  return (
    <div className="space-y-6">
      {/* Banner / Intro */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="max-w-3xl relative z-10">
          <span className="inline-block bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-xs">
            Layanan Resmi Balai Pustaka
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2.5">
            Selamat Datang di IT Helpdesk
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Butuh bantuan teknis, perbaikan perangkat, atau permintaan akses akun? Silakan buat tiket pengaduan di bawah ini. Tim IT Balai Pustaka siap membantu Anda dengan cepat dan terpadu.
          </p>
        </div>
      </div>

      {/* User Sub Navigation */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('create')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'create'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Tiket Baru</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <List className="w-4 h-4" />
          <span>Tiket Saya</span>
          <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
            {tickets.length}
          </span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'create' ? (
        <CreateTicketForm onSubmitTicket={handleCreated} />
      ) : (
        <UserTicketList tickets={tickets} onOpenModal={onOpenModal} />
      )}
    </div>
  );
}
