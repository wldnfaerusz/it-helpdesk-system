import React from 'react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p>&copy; {CURRENT_YEAR} PT Balai Pustaka - Sistem Informasi Helpdesk & Ticketing IT</p>
      </div>
    </footer>
  );
}
