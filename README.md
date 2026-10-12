# IT Helpdesk System (React + Vite)

Sistem IT Helpdesk terintegrasi berbasis web untuk manajemen tiket, pemantauan status perangkat, dan layanan bantuan IT PT Balai Pustaka — kini dimigrasikan menggunakan **React** dan **Vite**.

## 🚀 Fitur Utama

- **Portal Karyawan (User)**:
  - Form pembuatan tiket lengkap (Divisi, Lokasi, Multi-kategori masalah, Perangkat, Prioritas, Deskripsi).
  - Riwayat "Tiket Saya" dengan pencarian kata kunci dan filter status (Semua, Open, In Progress, Resolved, Closed).
- **Dashboard IT (Admin)**:
  - Ringkasan metrik statistik real-time (Total, Open, In Progress, Resolved, Rata-rata respon).
  - Visualisasi grafik distribusi kategori masalah (Doughnut Chart) & status tiket (Bar Chart) menggunakan Chart.js.
  - Tabel manajemen tiket dengan pencarian teks dan filter multi-kriteria.
  - Ekspor laporan tiket ke format CSV.
  - Opsi reset data simulasi awal.
- **Detail Tiket & Diskusi / Riwayat Balasan**:
  - Timeline tanggapan interaktif antara pengguna dan teknisi IT.
  - Catatan Internal IT khusus teknisi (disembunyikan dari pengguna biasa).
  - Pengubahan status, penugasan teknisi, dan tingkat prioritas secara instan.
- **Notifikasi & Penyimpanan**:
  - Toast notification interaktif.
  - Sinkronisasi otomatis dengan `localStorage` browser.

## 🛠️ Teknologi yang Digunakan

- **React 19**
- **Vite 6**
- **Lucide React** (Icon library)
- **Chart.js & React-Chartjs-2** (Visualisasi data analitik)
- **Tailwind CSS** (Styling responsif dan modern)

## 💻 Cara Menjalankan

1. **Instalasi Dependencies** (jika belum):
   ```bash
   npm install
   ```

2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka URL yang ditampilkan di terminal (biasanya `http://localhost:5173`).

3. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
