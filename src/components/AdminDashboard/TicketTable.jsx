import React, { useState } from 'react';
import { Search, Download, RotateCcw, Eye } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import PriorityBadge from '../PriorityBadge';
import { KATEGORI_LIST, STATUS_LIST, PRIORITAS_LIST } from '../../data/constants';

export default function TicketTable({ tickets, onOpenModal, onResetData, onExportCSV }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredTickets = tickets.filter((t) => {
    const term = search.toLowerCase();
    const matchSearch =
      t.id.toLowerCase().includes(term) ||
      (t.nama && t.nama.toLowerCase().includes(term)) ||
      (t.deskripsi && t.deskripsi.toLowerCase().includes(term));

    const matchStatus = filterStatus === 'ALL' || t.status === filterStatus;
    const matchPriority = filterPriority === 'ALL' || t.prioritas === filterPriority;
    const matchCategory =
      filterCategory === 'ALL' || (t.kategori && t.kategori.includes(filterCategory));

    return matchSearch && matchStatus && matchPriority && matchCategory;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-5">
      {/* Header Filters & Tools */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Daftar Tiket IT Helpdesk</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola, perbarui status, dan tugaskan teknisi IT untuk menangani keluhan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onExportCSV}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" /> Ekspor CSV
          </button>
          <button
            type="button"
            onClick={onResetData}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            title="Reset Data Simulasi"
          >
            <RotateCcw className="w-4 h-4" /> Reset Data
          </button>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID, Pelapor, Deskripsi..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="ALL">Semua Status</option>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="ALL">Semua Prioritas</option>
          {PRIORITAS_LIST.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="ALL">Semua Kategori</option>
          {KATEGORI_LIST.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <th className="p-3">ID Tiket</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Pelapor / Divisi</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Prioritas</th>
              <th className="p-3">Teknisi (Assign)</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-400 font-medium">
                  Tidak ada data tiket yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/90 transition group">
                  <td className="p-3 font-mono font-bold text-blue-600">{t.id}</td>
                  <td className="p-3 text-slate-500 whitespace-nowrap">{t.created_at}</td>
                  <td className="p-3">
                    <p className="font-semibold text-slate-800">{t.nama}</p>
                    <p className="text-[10px] text-slate-400">{t.divisi}</p>
                  </td>
                  <td className="p-3 text-slate-600 max-w-[200px] truncate" title={t.kategori}>
                    {t.kategori}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <PriorityBadge priority={t.prioritas} />
                  </td>
                  <td className="p-3 font-medium text-slate-700 whitespace-nowrap">
                    {t.assignee || 'Belum Ditugaskan'}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenModal(t)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-semibold rounded-lg text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Kelola
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
