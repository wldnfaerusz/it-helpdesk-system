import React from 'react';
import { Ticket, AlertCircle, Clock, CheckCircle2, Zap } from 'lucide-react';

export default function StatsCards({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === 'Open').length;
  const progress = tickets.filter((t) => t.status === 'In Progress').length;
  const resolved = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Tiket */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-sm transition">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Tiket</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{total}</h3>
        </div>
        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
          <Ticket className="w-6 h-6" />
        </div>
      </div>

      {/* Open */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-sm transition">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tiket Open</p>
          <h3 className="text-2xl font-bold text-red-600 mt-1">{open}</h3>
        </div>
        <div className="bg-red-50 p-3 rounded-xl text-red-600">
          <AlertCircle className="w-6 h-6" />
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-sm transition">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sedang Ditangani</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{progress}</h3>
        </div>
        <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Resolved */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-sm transition">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selesai (Resolved)</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{resolved}</h3>
        </div>
        <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      {/* Rata-Rata Respon */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-sm transition">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rata-Rata Respon</p>
          <h3 className="text-2xl font-bold text-indigo-600 mt-1">1.2 jam</h3>
        </div>
        <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
          <Zap className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
