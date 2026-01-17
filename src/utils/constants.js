// ==========================================
// CONSTANTS & COLOR SCHEMES
// ==========================================

export const STATUS_COLORS = {
  layak: {
    color: '#22c55e',
    hex: '#22c55e',
    bg: 'bg-green-500',
    light: 'bg-green-100',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-700'
  },
  waspada: {
    color: '#eab308',
    hex: '#eab308',
    bg: 'bg-yellow-500',
    light: 'bg-yellow-100',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-700'
  },
  kritis: {
    color: '#ef4444',
    hex: '#ef4444',
    bg: 'bg-red-500',
    light: 'bg-red-100',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-700'
  }
};

export const COLOR_GRADIENTS = {
  blue: 'from-blue-600 to-blue-700',
  green: 'from-green-600 to-green-700',
  purple: 'from-purple-600 to-purple-700',
  orange: 'from-orange-600 to-orange-700',
  yellow: 'from-yellow-600 to-yellow-700',
  red: 'from-red-600 to-red-700',
  indigo: 'from-indigo-600 to-indigo-700',
  teal: 'from-teal-600 to-teal-700'
};

export const MAP_STYLES = {
  street: 'Street Map',
  satellite: 'Satellite',
  terrain: 'Terrain',
  cartodb: 'CartoDB Light',
  dark: 'Dark Mode',
  topo: 'Topographic'
};

export const PAGE_NAMES = {
  dashboard: 'Dashboard Utama',
  webgis: 'WebGIS Interaktif',
  sekolah: 'Data Sekolah Sasaran',
  sppg: 'Data SPPG',
  'analisis-gizi': 'Analisis Kebutuhan Gizi',
  'analisis-kapasitas': 'Analisis Kapasitas Produksi',
  'analisis-jarak': 'Analisis Jarak & Waktu Tempuh',
  optimasi: 'Optimasi Pelayanan',
  simulasi: 'Simulasi What-If Analysis',
  rekomendasi: 'Rekomendasi Kebijakan',
  laporan: 'Laporan & Visualisasi',
  monitoring: 'Monitoring & Evaluasi',
  'kualitas-data': 'Kualitas & Validasi Data',
  sensitivitas: 'Analisis Sensitivitas',
  risiko: 'Penilaian Risiko Pelayanan',
  equity: 'Analisis Keadilan & Pemerataan',
  kinerja: 'Evaluasi Kinerja Wilayah',
  skenario: 'Skenario Kebijakan',
  benchmarking: 'Benchmarking Regional',
  indeks: 'Indeks Kelayakan MBG',
  profil: 'Profil Sistem',
  help: 'Dokumentasi & Bantuan'
};

export const SIDEBAR_MENU_GROUPS = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard Utama', icon: 'Home', badge: null },
      { id: 'webgis', label: 'WebGIS Interaktif', icon: 'Map', badge: 'Core' }
    ]
  },
  {
    title: 'Data & Manajemen',
    items: [
      { id: 'sekolah', label: 'Data Sekolah', icon: 'Building2' },
      { id: 'sppg', label: 'Data SPPG', icon: 'Database' },
      { id: 'kualitas-data', label: 'Kualitas Data', icon: 'Shield' }
    ]
  },
  {
    title: 'Analisis & Optimasi',
    items: [
      { id: 'analisis-gizi', label: 'Kebutuhan Gizi', icon: 'BarChart3' },
      { id: 'analisis-kapasitas', label: 'Kapasitas Produksi', icon: 'TrendingUp' },
      { id: 'analisis-jarak', label: 'Jarak & Waktu', icon: 'MapPin' },
      { id: 'optimasi', label: 'Optimasi Pelayanan', icon: 'Target' },
      { id: 'sensitivitas', label: 'Analisis Sensitivitas', icon: 'Activity' },
      { id: 'risiko', label: 'Penilaian Risiko', icon: 'AlertTriangle' }
    ]
  },
  {
    title: 'Kebijakan & Evaluasi',
    items: [
      { id: 'rekomendasi', label: 'Rekomendasi Kebijakan', icon: 'FileText' },
      { id: 'simulasi', label: 'Simulasi What-If', icon: 'Settings' },
      { id: 'kinerja', label: 'Evaluasi Kinerja', icon: 'Award' },
      { id: 'equity', label: 'Analisis Pemerataan', icon: 'Users' },
      { id: 'indeks', label: 'Indeks Kelayakan', icon: 'Target', badge: 'New' },
      { id: 'skenario', label: 'Skenario Kebijakan', icon: 'Layers' },
      { id: 'benchmarking', label: 'Benchmarking', icon: 'BarChart3' }
    ]
  },
  {
    title: 'Laporan & Sistem',
    items: [
      { id: 'laporan', label: 'Laporan & Visualisasi', icon: 'FileText' },
      { id: 'monitoring', label: 'Monitoring & Evaluasi', icon: 'Activity' },
      { id: 'profil', label: 'Profil Sistem', icon: 'BookOpen' },
      { id: 'help', label: 'Dokumentasi', icon: 'BookOpen' }
    ]
  }
];
