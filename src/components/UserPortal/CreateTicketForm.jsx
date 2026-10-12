import React, { useState } from 'react';
import { UserCheck, Monitor, Send, RotateCcw } from 'lucide-react';
import { DIVISI_GROUPS, KATEGORI_LIST, PRIORITAS_LIST } from '../../data/constants';

export default function CreateTicketForm({ onSubmitTicket }) {
  const [formData, setFormData] = useState({
    nama: '',
    divisi: '',
    lokasi: '',
    kategori: [],
    perangkat: '',
    prioritas: 'Sedang',
    deskripsi: ''
  });

  const handleCategoryToggle = (cat) => {
    setFormData((prev) => {
      const exists = prev.kategori.includes(cat);
      if (exists) {
        return { ...prev, kategori: prev.kategori.filter((c) => c !== cat) };
      } else {
        return { ...prev, kategori: [...prev.kategori, cat] };
      }
    });
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      divisi: '',
      lokasi: '',
      kategori: [],
      perangkat: '',
      prioritas: 'Sedang',
      deskripsi: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.kategori.length === 0) {
      alert('Pilih minimal satu Kategori Masalah / Permintaan');
      return;
    }
    onSubmitTicket(formData);
    handleReset();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: User Info */}
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" /> Informasi Pelapor
          </h3>
          <p className="text-xs text-slate-500 mt-1">Lengkapi data diri Anda untuk memudahkan verifikasi tim IT.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Departemen / Divisi <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.divisi}
              onChange={(e) => setFormData({ ...formData, divisi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white transition outline-none"
            >
              <option value="">-- Pilih Departemen / Divisi --</option>
              {DIVISI_GROUPS.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.replace(` (${group.group})`, '')}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Lokasi / Lantai / Ruangan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lokasi}
              onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              placeholder="Contoh: Gedung A, Lantai 3, Ruang Redaksi"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition outline-none"
            />
          </div>
        </div>

        {/* Section 2: Problem Details */}
        <div className="border-b border-slate-100 pb-2 pt-2">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-600" /> Detail Masalah / Permintaan
          </h3>
          <p className="text-xs text-slate-500 mt-1">Jelaskan masalah atau permintaan IT Anda secara rinci.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Kategori Masalah / Permintaan <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-500 mb-3">Pilih satu atau lebih kategori yang sesuai.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            {KATEGORI_LIST.map((cat) => {
              const checked = formData.kategori.includes(cat);
              return (
                <label
                  key={cat}
                  className={`flex items-center space-x-2.5 p-2 rounded-lg cursor-pointer transition border ${
                    checked
                      ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-xs'
                      : 'border-transparent hover:bg-white hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 accent-blue-600"
                  />
                  <span className="text-xs font-medium">{cat}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Perangkat / Sistem Terdampak
            </label>
            <input
              type="text"
              value={formData.perangkat}
              onChange={(e) => setFormData({ ...formData, perangkat: e.target.value })}
              placeholder="Contoh: Laptop ThinkPad X1 / Printer HP LaserJet 1020"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Tingkat Prioritas <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRIORITAS_LIST.map((p) => {
                const isSelected = formData.prioritas === p;
                let colorClass = 'text-blue-600';
                let dotClass = 'bg-blue-500';
                if (p === 'Tinggi') {
                  colorClass = 'text-red-600';
                  dotClass = 'bg-red-500';
                } else if (p === 'Sedang') {
                  colorClass = 'text-amber-600';
                  dotClass = 'bg-amber-500';
                } else if (p === 'Rendah') {
                  colorClass = 'text-emerald-600';
                  dotClass = 'bg-emerald-500';
                }

                return (
                  <label
                    key={p}
                    className={`border rounded-xl p-2.5 flex items-center cursor-pointer transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 shadow-xs ring-1 ring-blue-400'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="prioritas"
                      value={p}
                      checked={isSelected}
                      onChange={() => setFormData({ ...formData, prioritas: p })}
                      className="accent-blue-600"
                    />
                    <span className={`ml-2 text-xs font-medium ${colorClass} flex items-center gap-1.5`}>
                      <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
                      {p === 'Informasi' ? 'Info' : p}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
            Deskripsi Lengkap Masalah <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            required
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            placeholder="Jelaskan secara singkat kendala yang Anda alami. Contoh: Tidak bisa mencetak dokumen ke printer jaringan sejak pagi ini, muncul error code 0x0000011b."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset Form
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Kirim Tiket
          </button>
        </div>
      </form>
    </div>
  );
}
