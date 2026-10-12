import React, { useState } from 'react';
import { X, Sliders, MessageSquare, Send } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { STATUS_LIST, TEKNISI_LIST, PRIORITAS_LIST } from '../data/constants';

export default function TicketModal({
  ticket,
  currentRole,
  onClose,
  onUpdateStatus,
  onUpdateAssignee,
  onUpdatePriority,
  onSendReply
}) {
  const [replyText, setReplyText] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  if (!ticket) return null;

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onSendReply(ticket.id, replyText.trim(), isInternal);
    setReplyText('');
    setIsInternal(false);
  };

  const visibleResponses = (ticket.responses || []).filter(
    (r) => currentRole === 'admin' || !r.is_internal
  );

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-mono font-bold rounded-lg text-xs">
              #{ticket.id}
            </span>
            <StatusBadge status={ticket.status} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-grow">
          {/* Ticket Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs border border-slate-100">
            <div>
              <p className="text-slate-400 font-medium">Pelapor:</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">
                {ticket.nama} <span className="text-xs font-normal text-slate-500">({ticket.divisi})</span>
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Lokasi / Ruang:</p>
              <p className="font-semibold text-slate-700 mt-0.5">{ticket.lokasi}</p>
              <p className="text-slate-400 font-medium mt-2">Perangkat / Sistem:</p>
              <p className="font-semibold text-slate-700 mt-0.5">{ticket.perangkat || 'Tidak Disebutkan'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Kategori:</p>
              <p className="font-semibold text-slate-700 mt-0.5">{ticket.kategori}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Prioritas:</p>
              <div className="mt-0.5">
                <PriorityBadge priority={ticket.prioritas} />
              </div>
            </div>
          </div>

          {/* Problem Description */}
          <div>
            <h5 className="text-xs uppercase font-bold text-slate-400 mb-2">Deskripsi Permasalahan</h5>
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {ticket.deskripsi}
            </div>
          </div>

          {/* Admin Controls (Only visible for Admin role) */}
          {currentRole === 'admin' && (
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
              <h5 className="text-xs uppercase font-bold text-slate-500 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Pengaturan Tiket (IT Admin)
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-600 mb-1">Status Tiket</label>
                  <select
                    value={ticket.status}
                    onChange={(e) => onUpdateStatus(ticket.id, e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {STATUS_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-600 mb-1">Tugaskan Ke (Teknisi)</label>
                  <select
                    value={ticket.assignee || 'Belum Ditugaskan'}
                    onChange={(e) => onUpdateAssignee(ticket.id, e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {TEKNISI_LIST.map((tek) => (
                      <option key={tek} value={tek}>
                        {tek}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-600 mb-1">Ubah Prioritas</label>
                  <select
                    value={ticket.prioritas}
                    onChange={(e) => onUpdatePriority(ticket.id, e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {PRIORITAS_LIST.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Timeline / Discussion */}
          <div>
            <h5 className="text-xs uppercase font-bold text-slate-400 mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Riwayat Tanggapan & Catatan
            </h5>
            <div className="space-y-3">
              {visibleResponses.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Belum ada tanggapan tambahan.</p>
              ) : (
                visibleResponses.map((r, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 transition ${
                      r.is_internal
                        ? 'bg-amber-50 border border-amber-200'
                        : r.role === 'Admin'
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-bold flex items-center gap-1.5 ${
                          r.is_internal
                            ? 'text-amber-800'
                            : r.role === 'Admin'
                            ? 'text-blue-800'
                            : 'text-slate-800'
                        }`}
                      >
                        {r.sender}
                        {r.role === 'Admin' && (
                          <span className="bg-blue-200 text-blue-800 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                            IT Team
                          </span>
                        )}
                        {r.is_internal && (
                          <span className="bg-amber-200 text-amber-900 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                            Catatan Internal
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">{r.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{r.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reply Form */}
          <div className="border-t border-slate-200 pt-4">
            <form onSubmit={handleSubmitReply} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Tambah Tanggapan / Balasan</label>
                {currentRole === 'admin' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="internal-note-checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                    />
                    <label
                      htmlFor="internal-note-checkbox"
                      className="text-xs text-amber-700 font-semibold cursor-pointer select-none"
                    >
                      Catatan Internal IT (Pengguna tidak melihat)
                    </label>
                  </div>
                )}
              </div>

              <textarea
                rows="3"
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tuliskan jawaban, update progres, atau catatan perbaikan..."
                className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim Balasan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
