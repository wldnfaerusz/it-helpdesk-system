import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserPortal from './components/UserPortal/UserPortal';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import TicketModal from './components/TicketModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { initialMockTickets } from './data/constants';

const STORAGE_KEY = 'bp_it_tickets';

export default function App() {
  const [currentRole, setCurrentRole] = useState('user'); // 'user' | 'admin'
  const [tickets, setTickets] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored tickets', e);
    }
    return initialMockTickets;
  });

  const [activeModalTicketId, setActiveModalTicketId] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to localStorage', e);
    }
  }, [tickets]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleCloseToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Create Ticket
  const handleCreateTicket = (formData) => {
    const newId = 'TK-' + Math.floor(1000 + Math.random() * 9000);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket = {
      id: newId,
      nama: formData.nama,
      email: `${formData.nama.toLowerCase().replace(/\s+/g, '.')}@balaipustaka.co.id`,
      divisi: formData.divisi,
      lokasi: formData.lokasi,
      kategori: formData.kategori.join(', '),
      perangkat: formData.perangkat || 'Tidak Disebutkan',
      prioritas: formData.prioritas,
      deskripsi: formData.deskripsi,
      status: 'Open',
      assignee: 'Belum Ditugaskan',
      created_at: nowStr,
      responses: [
        {
          sender: formData.nama,
          role: 'User',
          text: formData.deskripsi,
          timestamp: nowStr,
          is_internal: false
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Tiket berhasil dibuat dengan ID ${newId}`, 'success');
  };

  // Update Status
  const handleUpdateStatus = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    showToast(`Status tiket ${ticketId} diubah menjadi ${newStatus}`, 'info');
  };

  // Update Assignee
  const handleUpdateAssignee = (ticketId, newAssignee) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignee: newAssignee } : t))
    );
    showToast(`Tiket ${ticketId} ditugaskan kepada ${newAssignee}`, 'info');
  };

  // Update Priority
  const handleUpdatePriority = (ticketId, newPriority) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, prioritas: newPriority } : t))
    );
    showToast(`Prioritas tiket ${ticketId} diubah menjadi ${newPriority}`, 'info');
  };

  // Send Reply
  const handleSendReply = (ticketId, replyText, isInternal) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const targetTicket = tickets.find((t) => t.id === ticketId);

    const newReply = {
      sender: currentRole === 'admin' ? 'Tim IT Helpdesk' : (targetTicket?.nama || 'Pengguna'),
      role: currentRole === 'admin' ? 'Admin' : 'User',
      text: replyText,
      timestamp: nowStr,
      is_internal: currentRole === 'admin' && Boolean(isInternal)
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const nextStatus = currentRole === 'admin' && t.status === 'Open' ? 'In Progress' : t.status;
          return {
            ...t,
            status: nextStatus,
            responses: [...(t.responses || []), newReply]
          };
        }
        return t;
      })
    );

    showToast('Tanggapan berhasil dikirim', 'success');
  };

  // Reset Mock Data
  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan data ke sampel awal?')) {
      setTickets([...initialMockTickets]);
      showToast('Data berhasil di-reset ke sampel awal', 'success');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (tickets.length === 0) {
      showToast('Tidak ada data tiket untuk diekspor', 'error');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
    csvContent += 'ID Tiket,Nama Pelapor,Email,Divisi,Lokasi,Kategori,Perangkat,Prioritas,Status,Teknisi,Tanggal\n';

    tickets.forEach((t) => {
      const row = [
        t.id,
        `"${(t.nama || '').replace(/"/g, '""')}"`,
        `"${(t.email || '').replace(/"/g, '""')}"`,
        `"${(t.divisi || '').replace(/"/g, '""')}"`,
        `"${(t.lokasi || '').replace(/"/g, '""')}"`,
        `"${(t.kategori || '').replace(/"/g, '""')}"`,
        `"${(t.perangkat || '').replace(/"/g, '""')}"`,
        t.prioritas,
        t.status,
        `"${(t.assignee || '').replace(/"/g, '""')}"`,
        t.created_at
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `IT_Helpdesk_Export_${new Date().toISOString().substring(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Laporan berhasil diunduh dalam format CSV', 'success');
  };

  const openTicketCount = tickets.filter((t) => t.status === 'Open').length;
  const activeModalTicket = tickets.find((t) => t.id === activeModalTicketId) || null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        openTicketCount={openTicketCount}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {currentRole === 'user' ? (
          <UserPortal
            tickets={tickets}
            onSubmitTicket={handleCreateTicket}
            onOpenModal={(t) => setActiveModalTicketId(t.id)}
          />
        ) : (
          <AdminDashboard
            tickets={tickets}
            onOpenModal={(t) => setActiveModalTicketId(t.id)}
            onResetData={handleResetData}
            onExportCSV={handleExportCSV}
          />
        )}
      </main>

      {/* Ticket Detail & Replies Modal */}
      {activeModalTicket && (
        <TicketModal
          ticket={activeModalTicket}
          currentRole={currentRole}
          onClose={() => setActiveModalTicketId(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateAssignee={handleUpdateAssignee}
          onUpdatePriority={handleUpdatePriority}
          onSendReply={handleSendReply}
        />
      )}

      {/* Global Toast Container */}
      <Toast toasts={toasts} onClose={handleCloseToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
