export const initialMockTickets = [
  {
    id: 'TK-1001',
    nama: 'Budi Santoso',
    email: 'budi.santoso@balaipustaka.co.id',
    divisi: 'Publishing & Heritage Ecosystem (Independen)',
    lokasi: 'Gedung A, Lt 2, Ruang Redaksi',
    kategori: 'Hardware (Laptop, PC, Printer, dll.)',
    perangkat: 'Printer HP LaserJet Pro M404',
    prioritas: 'Tinggi',
    deskripsi: 'Printer tidak mau menarik kertas dan muncul lampu indikator paper jam terus menerus.',
    status: 'Open',
    assignee: 'Andi (Hardware Tech)',
    created_at: '2026-10-07 09:30',
    responses: [
      {
        sender: 'Budi Santoso',
        role: 'User',
        text: 'Mohon dibantu, proses cetak naskah buku terhambat.',
        timestamp: '2026-10-07 09:30',
        is_internal: false
      }
    ]
  },
  {
    id: 'TK-1002',
    nama: 'Siti Aminah',
    email: 'siti.aminah@balaipustaka.co.id',
    divisi: 'Finance (Independen)',
    lokasi: 'Gedung B, Lt 1, Ruang Keuangan',
    kategori: 'Software / Aplikasi',
    perangkat: 'Aplikasi ERP / E-Faktur',
    prioritas: 'Sedang',
    deskripsi: 'Gagal login ke portal ERP Keuangan, muncul notifikasi "Database connection timeout".',
    status: 'In Progress',
    assignee: 'Siti (System Admin)',
    created_at: '2026-10-07 10:15',
    responses: [
      {
        sender: 'Siti Aminah',
        role: 'User',
        text: 'Gagal login dari tadi pagi.',
        timestamp: '2026-10-07 10:15',
        is_internal: false
      },
      {
        sender: 'Siti (System Admin)',
        role: 'Admin',
        text: 'Sedang dilakukan perbaikan konfigurasi koneksi server database.',
        timestamp: '2026-10-07 10:45',
        is_internal: false
      },
      {
        sender: 'Siti (System Admin)',
        role: 'Admin',
        text: 'Internal Note: DB Port 5432 sempat terblokir firewall lokal.',
        timestamp: '2026-10-07 11:00',
        is_internal: true
      }
    ]
  },
  {
    id: 'TK-1003',
    nama: 'Eko Prasetyo',
    email: 'eko.p@balaipustaka.co.id',
    divisi: 'Enterprise (Commercial)',
    lokasi: 'Gedung A, Lt 3',
    kategori: 'Jaringan / Internet / WiFi',
    perangkat: 'Access Point WiFi Lt 3',
    prioritas: 'Rendah',
    deskripsi: 'Koneksi WiFi di area lorong lantai 3 agak lambat saat jam makan siang.',
    status: 'Resolved',
    assignee: 'Rian (Network Support)',
    created_at: '2026-10-06 14:00',
    responses: [
      {
        sender: 'Rian (Network Support)',
        role: 'Admin',
        text: 'Access point sudah direstart dan dilakukan penyesuaian bandwidth limit.',
        timestamp: '2026-10-06 16:30',
        is_internal: false
      }
    ]
  }
];

export const DIVISI_GROUPS = [
  {
    group: 'Business Support',
    options: [
      'Procurement (Business Support)',
      'Warehouse & Asset Management (Business Support)'
    ]
  },
  {
    group: 'Independen',
    options: [
      'Corporate Secretary (Independen)',
      'Internal Audit (Independen)',
      'Finance (Independen)',
      'Information Technology (Independen)',
      'Publishing & Heritage Ecosystem (Independen)'
    ]
  },
  {
    group: 'Commercial',
    options: [
      'Enterprise (Commercial)',
      'Project Management (Commercial)'
    ]
  }
];

export const KATEGORI_LIST = [
  'Hardware (Laptop, PC, Printer, dll.)',
  'Software / Aplikasi',
  'Jaringan / Internet / WiFi',
  'Email & Komunikasi',
  'Akun & Password (Reset / Unlock)',
  'Instalasi Perangkat Lunak',
  'VPN & Akses Remote',
  'Keamanan Siber (Virus, Phishing, dll.)',
  'Backup & Recovery Data',
  'CCTV & Perangkat Keamanan',
  'Telepon & VOIP',
  'Permintaan Akses Sistem / Aplikasi',
  'Lainnya'
];

export const TEKNISI_LIST = [
  'Belum Ditugaskan',
  'Rian (Network Support)',
  'Andi (Hardware Tech)',
  'Siti (System Admin)',
  'Bagus (Helpdesk)'
];

export const STATUS_LIST = ['Open', 'In Progress', 'Resolved', 'Closed'];

export const PRIORITAS_LIST = ['Tinggi', 'Sedang', 'Rendah', 'Informasi'];
