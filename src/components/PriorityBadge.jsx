import React from 'react';

export default function PriorityBadge({ priority }) {
  switch (priority) {
    case 'Tinggi':
      return (
        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Tinggi
        </span>
      );
    case 'Sedang':
      return (
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Sedang
        </span>
      );
    case 'Rendah':
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Rendah
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Informasi
        </span>
      );
  }
}
