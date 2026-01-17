// ==========================================
// DUMMY DATA FOR SEKOLAH & SPPG
// ==========================================

export const dummySekolah = [
  { id: 1, lat: -7.0050, lng: 107.6500, nama: 'SDN Bandung 1', siswa: 450, status: 'Layak', sppg: 'SPPG Pusat' },
  { id: 2, lat: -7.0150, lng: 107.6400, nama: 'SDN Bandung 2', siswa: 380, status: 'Layak', sppg: 'SPPG Pusat' },
  { id: 3, lat: -6.9950, lng: 107.6600, nama: 'SDN Cimahi', siswa: 520, status: 'Waspada', sppg: 'SPPG Utara' },
  { id: 4, lat: -7.0250, lng: 107.6300, nama: 'SDN Lembang', siswa: 290, status: 'Kritis', sppg: 'SPPG Selatan' },
  { id: 5, lat: -6.9850, lng: 107.6700, nama: 'SDN Cibeunying', siswa: 410, status: 'Layak', sppg: 'SPPG Utara' },
  { id: 6, lat: -7.0350, lng: 107.6200, nama: 'SDN Soreang', siswa: 340, status: 'Waspada', sppg: 'SPPG Selatan' },
  { id: 7, lat: -7.0050, lng: 107.6800, nama: 'SDN Ujungjaya', siswa: 480, status: 'Layak', sppg: 'SPPG Timur' },
  { id: 8, lat: -7.0450, lng: 107.6100, nama: 'SDN Pengalengan', siswa: 310, status: 'Kritis', sppg: 'SPPG Barat' }
];

export const dummySPPG = [
  { id: 1, lat: -7.0274, lng: 107.5192, nama: 'SPPG Soreang', kapasitas: 50000, produksi: 48500 },
  { id: 2, lat: -6.9900, lng: 107.6350, nama: 'SPPG Dayeuh Kolot', kapasitas: 45000, produksi: 43200 },
  { id: 3, lat: -6.9050, lng: 107.4050, nama: 'SPPG Cipongkor', kapasitas: 38000, produksi: 36800 },
  { id: 4, lat: -7.0470, lng: 107.7550, nama: 'SPPG Majalaya', kapasitas: 42000, produksi: 40100 }
];

// Comprehensive Sekolah Data with Details
export const sekolahDataFull = [
  { id: 1, npsn: '20203001', nama: 'SDN 1 Bandung', jenjang: 'SD', kecamatan: 'Bandung', siswa: 245, sppg: 'SPPG Bandung Pusat', jarak: 7.2, waktu: 18, status: 'layak', lat: -7.0050, lng: 107.6500 },
  { id: 2, npsn: '20203002', nama: 'MIN 1 Bandung', jenjang: 'MI', kecamatan: 'Bandung', siswa: 198, sppg: 'SPPG Bandung Pusat', jarak: 12.4, waktu: 28, status: 'waspada', lat: -7.0100, lng: 107.6550 },
  { id: 3, npsn: '20203003', nama: 'SDN 2 Cimahi', jenjang: 'SD', kecamatan: 'Cimahi', siswa: 312, sppg: 'SPPG Bandung Utara', jarak: 5.8, waktu: 14, status: 'layak', lat: -6.9950, lng: 107.6600 },
  { id: 4, npsn: '20203004', nama: 'SDN 3 Lembang', jenjang: 'SD', kecamatan: 'Lembang', siswa: 278, sppg: 'SPPG Bandung Selatan', jarak: 16.7, waktu: 42, status: 'kritis', lat: -7.0250, lng: 107.6300 },
  { id: 5, npsn: '20203005', nama: 'MIN 2 Cimahi', jenjang: 'MI', kecamatan: 'Cimahi', siswa: 189, sppg: 'SPPG Bandung Utara', jarak: 8.1, waktu: 20, status: 'layak', lat: -6.9900, lng: 107.6650 },
  { id: 6, npsn: '20203006', nama: 'SDN 4 Cibeunying', jenjang: 'SD', kecamatan: 'Cibeunying', siswa: 156, sppg: 'SPPG Bandung Utara', jarak: 11.9, waktu: 26, status: 'waspada', lat: -6.9850, lng: 107.6700 },
  { id: 7, npsn: '20203007', nama: 'SDN 5 Soreang', jenjang: 'SD', kecamatan: 'Soreang', siswa: 223, sppg: 'SPPG Bandung Selatan', jarak: 6.4, waktu: 16, status: 'layak', lat: -7.0350, lng: 107.6200 },
  { id: 8, npsn: '20203008', nama: 'MIN 3 Lembang', jenjang: 'MI', kecamatan: 'Lembang', siswa: 201, sppg: 'SPPG Bandung Selatan', jarak: 18.2, waktu: 48, status: 'kritis', lat: -7.0300, lng: 107.6250 },
];

// Comprehensive SPPG Data
export const sppgDataFull = [
  {
    id: 1,
    kode: 'SPPG-001',
    nama: 'SPPG Bandung Pusat',
    kecamatan: 'Bandung',
    alamat: 'Jl. Raya Bandung No. 45',
    kapasitas: 15000,
    produksiHarian: 12500,
    sekolahDilayani: 28,
    totalSiswa: 6845,
    pekerja: 25,
    status: 'operasional',
    utilisasi: 83.3,
    lat: -7.0050,
    lng: 107.6500,
    fasilitas: ['Dapur Utama', 'Cold Storage', 'Packaging Area', 'Quality Control Lab'],
    jamOperasional: '05:00 - 14:00',
    sertifikat: ['Halal', 'PIRT', 'ISO 22000'],
    surplus: 2155
  },
  {
    id: 2,
    kode: 'SPPG-002',
    nama: 'SPPG Bandung Utara',
    kecamatan: 'Cimahi',
    alamat: 'Jl. Cimahi Indah No. 12',
    kapasitas: 12000,
    produksiHarian: 11200,
    sekolahDilayani: 22,
    totalSiswa: 5389,
    pekerja: 20,
    status: 'operasional',
    utilisasi: 93.3,
    lat: -6.9950,
    lng: 107.6600,
    fasilitas: ['Dapur Utama', 'Cold Storage', 'Packaging Area'],
    jamOperasional: '05:30 - 14:30',
    sertifikat: ['Halal', 'PIRT'],
    surplus: 611
  }
];
