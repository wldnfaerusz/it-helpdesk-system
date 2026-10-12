import React, { useState } from 'react';
import { Search, Inbox, ChevronRight } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import PriorityBadge from '../PriorityBadge';

export default function UserTicketList({ tickets, onOpenModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTickets = tickets.filter((t) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      t.id.toLowerCase().includes(term) ||
      (t.deskripsi && t.deskripsi.toLowerCase().includes(term)) ||
      (t.kategori && t.kategori.toLowerCase().includes(term));
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filterTabs = [
    { label: 'Semua', value: 'ALL' },
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tiket ID, judul, atau status..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {filterTabs.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ticket List Cards */}
      <div className="space-y-3.5">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Inbox className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">Tidak ada tiket ditemukan.</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci atau filter status Anda.</p>
          </div>
        ) : (
          filteredTickets.map((t) => (
            <div
              key={t.id}
              onClick={() => onOpenModal(t)}
              className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition cursor-pointer flex flex-col md:flex-row justify-between md:items-center gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md">
                    {t.id}
                  </span>
                  <StatusBadge status={t.status} />
                  <PriorityBadge priority={t.prioritas} />
                  <span className="text-xs text-slate-400">• {t.created_at}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition">
                  {t.kategori}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-1">{t.deskripsi}</p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                <div className="text-left md:text-right">
                  <p className="text-[11px] text-slate-400">Teknisi:</p>
                  <p className="text-xs font-semibold text-slate-700">{t.assignee || 'Belum Ditugaskan'}</p>
                </div>
                <button
                  type="button"
                  className="p-2 bg-white border border-slate-200 group-hover:border-blue-500 rounded-xl text-slate-500 group-hover:text-blue-600 shadow-sm transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
