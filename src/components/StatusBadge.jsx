import React from 'react';

export default function StatusBadge({ status }) {
  let badgeClass = 'bg-slate-100 text-slate-700';
  
  switch (status) {
    case 'Open':
      badgeClass = 'bg-red-100 text-red-700 border border-red-200';
      break;
    case 'In Progress':
      badgeClass = 'bg-amber-100 text-amber-800 border border-amber-200';
      break;
    case 'Resolved':
      badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      break;
    case 'Closed':
      badgeClass = 'bg-slate-200 text-slate-700 border border-slate-300';
      break;
    default:
      badgeClass = 'bg-slate-100 text-slate-700 border border-slate-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badgeClass}`}>
      {status}
    </span>
  );
}
