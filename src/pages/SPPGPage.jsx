import React, { useState } from 'react';
import { Database, FileText, Settings, Award, TrendingUp, Activity, Target, Building2, AlertTriangle, Users, MapPin, X, Shield, Layers } from 'lucide-react';

// ==============================================
// DATA SPPG PAGE - SINTA 1 LEVEL
// ==============================================
function SPPGPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKecamatan, setFilterKecamatan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSPPG, setSelectedSPPG] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or table

  // Comprehensive SPPG Data
  const sppgDataFull = [
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
    },
    {
      id: 3,
      kode: 'SPPG-003',
      nama: 'SPPG Bandung Selatan',
      kecamatan: 'Lembang',
      alamat: 'Jl. Lembang Sejahtera No. 78',
      kapasitas: 18000,
      produksiHarian: 17100,
      sekolahDilayani: 35,
      totalSiswa: 8956,
      pekerja: 32,
      status: 'operasional',
      utilisasi: 95.0,
      lat: -7.0250,
      lng: 107.6300,
      fasilitas: ['Dapur Utama', 'Cold Storage', 'Packaging Area', 'Quality Control Lab', 'Gudang'],
      jamOperasional: '04:30 - 14:00',
      sertifikat: ['Halal', 'PIRT', 'ISO 22000', 'HACCP'],
      surplus: 144
    },
    {
      id: 4,
      kode: 'SPPG-004',
      nama: 'SPPG Bandung Timur',
      kecamatan: 'Ujungjaya',
      alamat: 'Jl. Ujungjaya Raya No. 34',
      kapasitas: 14000,
      produksiHarian: 11900,
      sekolahDilayani: 26,
      totalSiswa: 6234,
      pekerja: 23,
      status: 'operasional',
      utilisasi: 85.0,
      lat: -7.0050,
      lng: 107.6800,
      fasilitas: ['Dapur Utama', 'Cold Storage', 'Packaging Area', 'Quality Control Lab'],
      jamOperasional: '05:00 - 14:30',
      sertifikat: ['Halal', 'PIRT', 'ISO 22000'],
      surplus: 2100
    },
    {
      id: 5,
      kode: 'SPPG-005',
      nama: 'SPPG Bandung Barat',
      kecamatan: 'Pengalengan',
      alamat: 'Jl. Pengalengan Timur No. 21',
      kapasitas: 10000,
      produksiHarian: 9450,
      sekolahDilayani: 18,
      totalSiswa: 4567,
      pekerja: 18,
      status: 'operasional',
      utilisasi: 94.5,
      lat: -7.0450,
      lng: 107.6100,
      fasilitas: ['Dapur Utama', 'Cold Storage', 'Packaging Area'],
      jamOperasional: '05:30 - 14:00',
      sertifikat: ['Halal', 'PIRT'],
      surplus: 550
    },
    {
      id: 6,
      kode: 'SPPG-006',
      nama: 'SPPG Bandung Pusat 2',
      kecamatan: 'Bandung',
      alamat: 'Jl. Merdeka No. 89',
      kapasitas: 13000,
      produksiHarian: 9800,
      sekolahDilayani: 20,
      totalSiswa: 4890,
      pekerja: 21,
      status: 'maintenance',
      utilisasi: 75.4,
      lat: -7.0100,
      lng: 107.6450,
      fasilitas: ['Dapur Utama', 'Packaging Area'],
      jamOperasional: '05:00 - 14:00',
      sertifikat: ['Halal', 'PIRT'],
      surplus: 3200
    }
  ];

  // Filtering
  const filteredData = sppgDataFull.filter(sppg => {
    const matchSearch = sppg.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sppg.kode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKecamatan = filterKecamatan === 'all' || sppg.kecamatan === filterKecamatan;
    const matchStatus = filterStatus === 'all' || sppg.status === filterStatus;
    
    return matchSearch && matchKecamatan && matchStatus;
  });

  // Statistics
  const stats = {
    total: filteredData.length,
    operasional: filteredData.filter(s => s.status === 'operasional').length,
    totalKapasitas: filteredData.reduce((sum, s) => sum + s.kapasitas, 0),
    totalProduksi: filteredData.reduce((sum, s) => sum + s.produksiHarian, 0),
    totalSekolah: filteredData.reduce((sum, s) => sum + s.sekolahDilayani, 0),
    totalSiswa: filteredData.reduce((sum, s) => sum + s.totalSiswa, 0),
    avgUtilisasi: (filteredData.reduce((sum, s) => sum + s.utilisasi, 0) / filteredData.length).toFixed(1)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data SPPG Kec. Rancaekek ({filteredData.length} Unit)</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitoring kapasitas {filteredData.length} SPPG dengan total produksi {stats.totalProduksi.toLocaleString()} porsi/hari untuk {stats.totalSekolah} sekolah
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <Database className="w-4 h-4" />
            Add SPPG
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <SPPGStatCard 
          label="Total SPPG" 
          value={stats.total} 
          icon={Database} 
          color="purple" 
        />
        <SPPGStatCard 
          label="Operasional" 
          value={stats.operasional} 
          icon={Activity} 
          color="green" 
        />
        <SPPGStatCard 
          label="Kapasitas Total" 
          value={stats.totalKapasitas.toLocaleString()} 
          icon={TrendingUp} 
          color="blue"
          unit="porsi"
        />
        <SPPGStatCard 
          label="Produksi Harian" 
          value={stats.totalProduksi.toLocaleString()} 
          icon={Target} 
          color="orange"
          unit="porsi"
        />
        <SPPGStatCard 
          label="Sekolah Dilayani" 
          value={stats.totalSekolah} 
          icon={Building2} 
          color="indigo"
        />
        <SPPGStatCard 
          label="Utilisasi Rata-rata" 
          value={`${stats.avgUtilisasi}%`} 
          icon={Activity} 
          color="teal"
        />
      </div>

      {/* Capacity Overview Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Kapasitas vs Produksi SPPG</h3>
            <p className="text-xs text-gray-600 mt-1">Perbandingan kapasitas maksimal dengan produksi aktual</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">Kapasitas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">Produksi</span>
            </div>
          </div>
        </div>
        <SPPGCapacityChart data={filteredData} />
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Filter & Pencarian</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Cari SPPG
            </label>
            <input
              type="text"
              placeholder="Nama atau kode SPPG..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Kecamatan
            </label>
            <select
              value={filterKecamatan}
              onChange={(e) => setFilterKecamatan(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Kecamatan</option>
              <option value="Bandung">Bandung</option>
              <option value="Cimahi">Cimahi</option>
              <option value="Lembang">Lembang</option>
              <option value="Cibeunying">Cibeunying</option>
              <option value="Soreang">Soreang</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Status</option>
              <option value="operasional">✓ Operasional</option>
              <option value="maintenance">🔧 Maintenance</option>
              <option value="nonaktif">✕ Non-aktif</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">View Mode:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Table
            </button>
          </div>
          <div className="text-xs text-gray-600">
            Menampilkan <span className="font-bold text-gray-900">{filteredData.length}</span> SPPG
          </div>
        </div>
      </div>

      {/* Data Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(sppg => (
            <SPPGCard 
              key={sppg.id} 
              sppg={sppg} 
              onDetail={() => setSelectedSPPG(sppg)} 
            />
          ))}
        </div>
      ) : (
        <SPPGTable 
          data={filteredData} 
          onDetail={setSelectedSPPG} 
        />
      )}

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul Data SPPG</h3>
            <p className="text-purple-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan: (1) Database komprehensif SPPG dengan profil kapasitas produksi,
              (2) Analisis utilisasi dan efisiensi operasional, (3) Monitoring status produksi real-time,
              (4) Identifikasi surplus/defisit kapasitas per wilayah, (5) Dashboard performa untuk optimasi resource allocation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Capacity Management</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Production Monitoring</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Utilization Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Resource Optimization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSPPG && (
        <SPPGDetailModal
          sppg={selectedSPPG}
          onClose={() => setSelectedSPPG(null)}
        />
      )}
    </div>
  );
}

// Helper Components
function SPPGStatCard({ label, value, icon: Icon, color, unit }) {
  const colors = {
    purple: 'from-purple-600 to-purple-700',
    green: 'from-green-600 to-green-700',
    blue: 'from-blue-600 to-blue-700',
    orange: 'from-orange-600 to-orange-700',
    indigo: 'from-indigo-600 to-indigo-700',
    teal: 'from-teal-600 to-teal-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600">
        {label}
        {unit && <span className="text-gray-400 ml-1">({unit})</span>}
      </div>
    </div>
  );
}

function SPPGCapacityChart({ data }) {
  const maxValue = Math.max(...data.map(d => d.kapasitas));

  return (
    <div className="space-y-4">
      {data.map(sppg => (
        <div key={sppg.id}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">{sppg.nama}</span>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-600">
                Utilisasi: <span className="font-bold text-gray-900">{sppg.utilisasi}%</span>
              </span>
            </div>
          </div>
          <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
            {/* Capacity Bar (Background) */}
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-30"
              style={{ width: `${(sppg.kapasitas / maxValue) * 100}%` }}
            />
            {/* Production Bar (Foreground) */}
            <div 
              className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-3"
              style={{ width: `${(sppg.produksiHarian / maxValue) * 100}%` }}
            >
              <span className="text-xs font-bold text-white">{sppg.produksiHarian.toLocaleString()}</span>
            </div>
            {/* Capacity Label */}
            <div 
              className="absolute h-full flex items-center px-3"
              style={{ left: `${(sppg.kapasitas / maxValue) * 100}%` }}
            >
              <span className="text-xs font-bold text-blue-700">{sppg.kapasitas.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Surplus: {sppg.surplus.toLocaleString()} porsi</span>
            <span>{sppg.sekolahDilayani} sekolah</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SPPGCard({ sppg, onDetail }) {
  const getStatusColor = () => {
    if (sppg.status === 'operasional') return 'bg-green-100 text-green-700';
    if (sppg.status === 'maintenance') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getUtilisasiColor = () => {
    if (sppg.utilisasi >= 90) return 'text-red-600';
    if (sppg.utilisasi >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{sppg.nama}</h4>
              <p className="text-xs text-purple-100">{sppg.kode}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span className="text-xs">{sppg.kecamatan}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor()}`}>
            {sppg.status.toUpperCase()}
          </span>
          <span className={`text-2xl font-black ${getUtilisasiColor()}`}>
            {sppg.utilisasi}%
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <MetricItem label="Kapasitas" value={sppg.kapasitas.toLocaleString()} />
          <MetricItem label="Produksi" value={sppg.produksiHarian.toLocaleString()} />
          <MetricItem label="Sekolah" value={sppg.sekolahDilayani} />
          <MetricItem label="Siswa" value={sppg.totalSiswa.toLocaleString()} />
        </div>

        {/* Capacity Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Utilisasi Kapasitas</span>
            <span className="font-bold text-gray-900">{sppg.utilisasi}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                sppg.utilisasi >= 90 ? 'bg-red-500' :
                sppg.utilisasi >= 80 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${sppg.utilisasi}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onDetail}
          className="w-full px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold transition-colors"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
}

function MetricItem({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
    </div>
  );
}

// ==============================================
// SPPG TABLE COMPONENT
// ==============================================
function SPPGTable({ data, onDetail }) {
  const [sortBy, setSortBy] = useState('nama');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'nama') comparison = a.nama.localeCompare(b.nama);
    else if (sortBy === 'kapasitas') comparison = a.kapasitas - b.kapasitas;
    else if (sortBy === 'produksi') comparison = a.produksiHarian - b.produksiHarian;
    else if (sortBy === 'utilisasi') comparison = a.utilisasi - b.utilisasi;
    else if (sortBy === 'sekolah') comparison = a.sekolahDilayani - b.sekolahDilayani;
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getStatusBadge = (status) => {
    const config = {
      operasional: { bg: 'bg-green-100', text: 'text-green-700', label: '✓ Operasional' },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '🔧 Maintenance' },
      nonaktif: { bg: 'bg-red-100', text: 'text-red-700', label: '✕ Non-aktif' }
    };
    const normalizedStatus = (status || '').toLowerCase();
    const style = config[normalizedStatus] || config.operasional;
    return <span className={`px-3 py-1 ${style.bg} ${style.text} rounded-lg text-xs font-bold`}>{style.label}</span>;
  };

  const getUtilisasiColor = (utilisasi) => {
    if (utilisasi >= 90) return 'text-red-600 bg-red-50';
    if (utilisasi >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">Urutkan:</span>
          <div className="flex gap-2">
            <TableSortButton label="Nama" value="nama" current={sortBy} onClick={setSortBy} />
            <TableSortButton label="Kapasitas" value="kapasitas" current={sortBy} onClick={setSortBy} />
            <TableSortButton label="Produksi" value="produksi" current={sortBy} onClick={setSortBy} />
            <TableSortButton label="Utilisasi" value="utilisasi" current={sortBy} onClick={setSortBy} />
            <TableSortButton label="Sekolah" value="sekolah" current={sortBy} onClick={setSortBy} />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors"
          >
            {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
          </button>
        </div>
        <div className="text-xs text-gray-600">
          <span className="font-bold text-gray-900">{data.length}</span> SPPG
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kode</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama SPPG</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kecamatan</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kapasitas</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Produksi</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Utilisasi</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sekolah</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Siswa</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((sppg, idx) => (
              <tr key={sppg.id} className="hover:bg-purple-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-mono font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded">
                    {sppg.kode}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{sppg.nama}</div>
                      <div className="text-xs text-gray-500">{sppg.pekerja} pekerja</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{sppg.kecamatan}</td>
                <td className="px-4 py-3">
                  <div className="text-sm font-bold text-gray-900">{sppg.kapasitas.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">porsi/hari</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-bold text-gray-900">{sppg.produksiHarian.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">aktual</div>
                </td>
                <td className="px-4 py-3">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${getUtilisasiColor(sppg.utilisasi)}`}>
                    <span className="text-sm font-black">{sppg.utilisasi}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{sppg.sekolahDilayani}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-700">{sppg.totalSiswa.toLocaleString()}</td>
                <td className="px-4 py-3">{getStatusBadge(sppg.status)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDetail(sppg)}
                    className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div>
            Total Kapasitas: <span className="font-bold text-gray-900">{data.reduce((sum, s) => sum + s.kapasitas, 0).toLocaleString()}</span> porsi/hari
          </div>
          <div>
            Total Produksi: <span className="font-bold text-gray-900">{data.reduce((sum, s) => sum + s.produksiHarian, 0).toLocaleString()}</span> porsi/hari
          </div>
          <div>
            Utilisasi Rata-rata: <span className="font-bold text-gray-900">{(data.reduce((sum, s) => sum + s.utilisasi, 0) / data.length).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableSortButton({ label, value, current, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
        current === value
          ? 'bg-purple-600 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
      }`}
    >
      {label}
    </button>
  );
}

// ==============================================
// SPPG DETAIL MODAL
// ==============================================
function SPPGDetailModal({ sppg, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{sppg.nama}</h3>
                <div className="flex items-center gap-3 text-purple-100 text-sm">
                  <span>{sppg.kode}</span>
                  <span>•</span>
                  <span>{sppg.kecamatan}</span>
                  <span>•</span>
                  <span>{sppg.pekerja} pekerja</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            <SPPGTabButton label="Overview" value="overview" active={activeTab} onClick={setActiveTab} />
            <SPPGTabButton label="Produksi" value="produksi" active={activeTab} onClick={setActiveTab} />
            <SPPGTabButton label="Sekolah Dilayani" value="sekolah" active={activeTab} onClick={setActiveTab} />
            <SPPGTabButton label="Fasilitas" value="fasilitas" active={activeTab} onClick={setActiveTab} />
            <SPPGTabButton label="Kinerja" value="kinerja" active={activeTab} onClick={setActiveTab} />
            <SPPGTabButton label="Lokasi" value="lokasi" active={activeTab} onClick={setActiveTab} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 220px)' }}>
          {activeTab === 'overview' && <SPPGOverviewTab sppg={sppg} />}
          {activeTab === 'produksi' && <SPPGProduksiTab sppg={sppg} />}
          {activeTab === 'sekolah' && <SPPGSekolahTab sppg={sppg} />}
          {activeTab === 'fasilitas' && <SPPGFasilitasTab sppg={sppg} />}
          {activeTab === 'kinerja' && <SPPGKinerjaTab sppg={sppg} />}
          {activeTab === 'lokasi' && <SPPGLokasiTab sppg={sppg} />}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Terakhir diperbarui: 14 Des 2025</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Tutup
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
              Export Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SPPGTabButton({ label, value, active, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
        active === value
          ? 'bg-white text-purple-700 shadow-lg'
          : 'text-purple-100 hover:bg-white hover:bg-opacity-20'
      }`}
    >
      {label}
    </button>
  );
}

// ==============================================
// SPPG MODAL TAB CONTENTS
// ==============================================
function SPPGOverviewTab({ sppg }) {
  const getUtilisasiStatus = () => {
    if (sppg.utilisasi >= 90) return { color: 'red', status: 'Overload - Perlu Perhatian', icon: AlertTriangle };
    if (sppg.utilisasi >= 80) return { color: 'yellow', status: 'High Utilization - Monitor', icon: AlertTriangle };
    return { color: 'green', status: 'Normal Operation', icon: Target };
  };

  const utilisasiStatus = getUtilisasiStatus();
  const StatusIcon = utilisasiStatus.icon;

  return (
    <div className="space-y-6">
      {/* Utilization Score */}
      <div className={`bg-gradient-to-r ${
        utilisasiStatus.color === 'red' ? 'from-red-600 to-red-700' :
        utilisasiStatus.color === 'yellow' ? 'from-yellow-600 to-yellow-700' :
        'from-green-600 to-green-700'
      } rounded-xl p-6 text-white`}>
        <div className="text-center">
          <div className="text-sm font-semibold mb-2">Tingkat Utilisasi Kapasitas</div>
          <div className="text-6xl font-black mb-2">{sppg.utilisasi}%</div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <StatusIcon className="w-5 h-5" />
            <span>{utilisasiStatus.status}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SPPGMetricCard
          label="Kapasitas Maksimal"
          value={sppg.kapasitas.toLocaleString()}
          unit="porsi/hari"
          icon={Database}
          color="blue"
        />
        <SPPGMetricCard
          label="Produksi Harian"
          value={sppg.produksiHarian.toLocaleString()}
          unit="porsi/hari"
          icon={TrendingUp}
          color="green"
        />
        <SPPGMetricCard
          label="Surplus Kapasitas"
          value={sppg.surplus.toLocaleString()}
          unit="porsi"
          icon={Target}
          color="purple"
        />
        <SPPGMetricCard
          label="Sekolah Dilayani"
          value={sppg.sekolahDilayani}
          unit="sekolah"
          icon={Building2}
          color="orange"
        />
      </div>

      {/* Production Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Kapasitas vs Produksi
        </h4>
        <div className="relative h-16 bg-gray-100 rounded-xl overflow-hidden">
          {/* Capacity Background */}
          <div className="absolute h-full w-full bg-gradient-to-r from-blue-200 to-blue-300 opacity-40" />
          {/* Production Foreground */}
          <div 
            className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-4"
            style={{ width: `${(sppg.produksiHarian / sppg.kapasitas) * 100}%` }}
          >
            <span className="text-sm font-bold text-white">{sppg.produksiHarian.toLocaleString()}</span>
          </div>
          {/* Capacity Marker */}
          <div className="absolute h-full right-0 flex items-center px-4">
            <span className="text-sm font-bold text-blue-700">{sppg.kapasitas.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-3">
          <span>Surplus: <span className="font-bold text-gray-900">{sppg.surplus.toLocaleString()}</span> porsi</span>
          <span>Utilisasi: <span className="font-bold text-gray-900">{sppg.utilisasi}%</span></span>
        </div>
      </div>

      {/* Operational Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Informasi Operasional
          </h4>
          <div className="space-y-3">
            <InfoRow label="Jam Operasional" value={sppg.jamOperasional} />
            <InfoRow label="Jumlah Pekerja" value={`${sppg.pekerja} orang`} />
            <InfoRow label="Total Siswa Dilayani" value={sppg.totalSiswa.toLocaleString()} />
            <InfoRow label="Status Operasional" value={sppg.status.toUpperCase()} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Informasi Lokasi
          </h4>
          <div className="space-y-3">
            <InfoRow label="Kecamatan" value={sppg.kecamatan} />
            <InfoRow label="Alamat" value={sppg.alamat} />
            <InfoRow label="Koordinat" value={`${sppg.lat}, ${sppg.lng}`} />
          </div>
        </div>
      </div>

      {/* Certification */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-700 mt-1" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-green-900 mb-3">Sertifikasi & Standar</h4>
            <div className="flex flex-wrap gap-2">
              {sppg.sertifikat.map((cert, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-green-300 rounded-lg text-xs font-semibold text-green-800">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SPPGMetricCard({ label, value, unit, icon: Icon, color }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-700">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{unit}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}

// ==============================================
// SPPG PRODUKSI TAB
// ==============================================
function SPPGProduksiTab({ sppg }) {
  // Sample production data over time
  const productionHistory = [
    { bulan: 'Jul', target: sppg.produksiHarian, actual: sppg.produksiHarian * 0.95, efisiensi: 95 },
    { bulan: 'Agu', target: sppg.produksiHarian, actual: sppg.produksiHarian * 0.97, efisiensi: 97 },
    { bulan: 'Sep', target: sppg.produksiHarian, actual: sppg.produksiHarian * 0.92, efisiensi: 92 },
    { bulan: 'Okt', target: sppg.produksiHarian, actual: sppg.produksiHarian * 0.98, efisiensi: 98 },
    { bulan: 'Nov', target: sppg.produksiHarian, actual: sppg.produksiHarian * 0.96, efisiensi: 96 },
    { bulan: 'Des', target: sppg.produksiHarian, actual: sppg.produksiHarian, efisiensi: 100 },
  ];

  const avgEfficiency = (productionHistory.reduce((sum, p) => sum + p.efisiensi, 0) / productionHistory.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Production Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-700">Target Produksi</div>
              <div className="text-2xl font-black text-blue-900">{sppg.produksiHarian.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-gray-700">porsi per hari</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-green-700">Produksi Aktual</div>
              <div className="text-2xl font-black text-green-900">{sppg.produksiHarian.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-gray-700">hari ini</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-purple-700">Efisiensi Rata-rata</div>
              <div className="text-2xl font-black text-purple-900">{avgEfficiency}%</div>
            </div>
          </div>
          <div className="text-xs text-gray-700">6 bulan terakhir</div>
        </div>
      </div>

      {/* Production Trend Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-gray-900">Tren Produksi 6 Bulan</h4>
            <p className="text-xs text-gray-600 mt-1">Perbandingan target vs aktual produksi harian</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">Target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">Aktual</span>
            </div>
          </div>
        </div>
        <ProductionTrendChart data={productionHistory} />
      </div>

      {/* Efficiency Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Analisis Efisiensi Produksi</h4>
        <div className="space-y-3">
          {productionHistory.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{item.bulan} 2025</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600">
                    {Math.round(item.actual).toLocaleString()} / {item.target.toLocaleString()}
                  </span>
                  <span className={`text-sm font-bold ${
                    item.efisiensi >= 95 ? 'text-green-600' : 
                    item.efisiensi >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.efisiensi}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    item.efisiensi >= 95 ? 'bg-green-500' : 
                    item.efisiensi >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.efisiensi}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Capacity by Meal Type */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Distribusi Produksi per Menu</h4>
        <div className="space-y-4">
          <MenuProductionBar label="Nasi & Lauk" percentage={40} color="orange" value={Math.round(sppg.produksiHarian * 0.4)} />
          <MenuProductionBar label="Sayuran" percentage={30} color="green" value={Math.round(sppg.produksiHarian * 0.3)} />
          <MenuProductionBar label="Buah" percentage={20} color="purple" value={Math.round(sppg.produksiHarian * 0.2)} />
          <MenuProductionBar label="Susu/Minuman" percentage={10} color="blue" value={Math.round(sppg.produksiHarian * 0.1)} />
        </div>
      </div>

      {/* Production Notes */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-blue-900 mb-2">Catatan Produksi</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Produksi stabil dengan efisiensi rata-rata {avgEfficiency}%</li>
              <li>• Kapasitas surplus {sppg.surplus.toLocaleString()} porsi dapat digunakan untuk ekspansi</li>
              <li>• Monitoring kualitas dilakukan setiap batch produksi</li>
              <li>• Standar keamanan pangan terpenuhi (HACCP compliant)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductionTrendChart({ data }) {
  const maxValue = Math.max(...data.map(d => Math.max(d.target, d.actual)));

  return (
    <div className="h-64 flex items-end justify-between gap-4 pb-8">
      {data.map((item, idx) => {
        const targetHeight = (item.target / maxValue) * 100;
        const actualHeight = (item.actual / maxValue) * 100;
        
        return (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="w-full flex gap-1 items-end h-48">
              {/* Target Bar */}
              <div className="relative flex-1 flex flex-col justify-end">
                <div 
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded-t-lg hover:from-blue-500 hover:to-blue-600 transition-all"
                  style={{ height: `${targetHeight}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-700 whitespace-nowrap">
                    {Math.round(item.target).toLocaleString()}
                  </div>
                </div>
              </div>
              {/* Actual Bar */}
              <div className="relative flex-1 flex flex-col justify-end">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg hover:from-green-600 hover:to-green-700 transition-all"
                  style={{ height: `${actualHeight}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-700 whitespace-nowrap">
                    {Math.round(item.actual).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-700 mt-2">{item.bulan}</div>
            <div className={`text-xs font-bold mt-1 ${
              item.efisiensi >= 95 ? 'text-green-600' : 
              item.efisiensi >= 90 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {item.efisiensi}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MenuProductionBar({ label, percentage, color, value }) {
  const colors = {
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="font-bold text-gray-900">{value.toLocaleString()} porsi ({percentage}%)</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

// ==============================================
// SPPG SEKOLAH TAB
// ==============================================
function SPPGSekolahTab({ sppg }) {
  // Sample school data served by this SPPG
  const sekolahDilayani = [
    { nama: 'SDN 1 Bandung', siswa: 245, jarak: 7.2, status: 'layak', jenjang: 'SD' },
    { nama: 'MIN 1 Bandung', siswa: 198, jarak: 12.4, status: 'waspada', jenjang: 'MI' },
    { nama: 'SDN 2 Cimahi', siswa: 223, jarak: 6.4, status: 'layak', jenjang: 'SD' },
    { nama: 'SDN 3 Lembang', siswa: 312, jarak: 8.8, status: 'layak', jenjang: 'SD' },
    { nama: 'MIN 2 Cimahi', siswa: 189, jarak: 9.5, status: 'layak', jenjang: 'MI' },
  ].slice(0, Math.min(sppg.sekolahDilayani, 10)); // Limit to actual number or 10

  const stats = {
    totalSiswa: sekolahDilayani.reduce((sum, s) => sum + s.siswa, 0),
    avgJarak: (sekolahDilayani.reduce((sum, s) => sum + s.jarak, 0) / sekolahDilayani.length).toFixed(1),
    layak: sekolahDilayani.filter(s => s.status === 'layak').length,
    waspada: sekolahDilayani.filter(s => s.status === 'waspada').length
  };

  return (
    <div className="space-y-6">
      {/* Service Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Total Sekolah" value={sppg.sekolahDilayani} icon={Building2} color="blue" />
        <StatBox label="Total Siswa" value={sppg.totalSiswa.toLocaleString()} icon={Users} color="green" />
        <StatBox label="Jarak Rata-rata" value={`${stats.avgJarak} km`} icon={MapPin} color="purple" />
        <StatBox label="Status Layak" value={stats.layak} icon={Target} color="orange" />
      </div>

      {/* Distribution Map Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Sebaran Geografis Sekolah Dilayani</h4>
        <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 rounded-xl h-64 flex items-center justify-center border-2 border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
          
          {/* SPPG Center */}
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Sample School Markers */}
          {[
            { x: '30%', y: '30%', color: 'bg-green-500' },
            { x: '70%', y: '25%', color: 'bg-green-500' },
            { x: '65%', y: '60%', color: 'bg-yellow-500' },
            { x: '40%', y: '70%', color: 'bg-green-500' },
            { x: '25%', y: '55%', color: 'bg-green-500' },
          ].map((marker, idx) => (
            <div key={idx} className="absolute" style={{ left: marker.x, top: marker.y, transform: 'translate(-50%, -50%)' }}>
              <div className={`w-4 h-4 ${marker.color} rounded-full border-2 border-white shadow-lg animate-pulse`} style={{ animationDelay: `${idx * 0.2}s` }}></div>
            </div>
          ))}

          {/* Service Radius */}
          <div className="absolute top-1/2 left-1/2 w-72 h-72 border-4 border-purple-300 border-dashed rounded-full opacity-30" style={{ transform: 'translate(-50%, -50%)' }}></div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-600">
          Radius pelayanan maksimal: <span className="font-bold text-gray-900">15 km</span>
        </div>
      </div>

      {/* School List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-bold text-gray-900">Daftar Sekolah ({sekolahDilayani.length} dari {sppg.sekolahDilayani})</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {sekolahDilayani.map((sekolah, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{sekolah.nama}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {sekolah.siswa} siswa
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {sekolah.jarak} km
                      </span>
                      <span className={`px-2 py-0.5 rounded ${
                        sekolah.jenjang === 'SD' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      } font-semibold`}>
                        {sekolah.jenjang}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  sekolah.status === 'layak' ? 'bg-green-100 text-green-700' :
                  sekolah.status === 'waspada' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {sekolah.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
        {sppg.sekolahDilayani > sekolahDilayani.length && (
          <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-600">
            ... dan {sppg.sekolahDilayani - sekolahDilayani.length} sekolah lainnya
          </div>
        )}
      </div>

      {/* Service Quality Analysis */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-green-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-green-900 mb-2">Analisis Kualitas Pelayanan</h5>
            <div className="space-y-1 text-xs text-gray-700">
              <div>• <span className="font-bold">{stats.layak}</span> sekolah dalam status layak ({((stats.layak / sekolahDilayani.length) * 100).toFixed(1)}%)</div>
              <div>• Jarak rata-rata <span className="font-bold">{stats.avgJarak} km</span> masih dalam radius optimal</div>
              <div>• Estimasi waktu tempuh rata-rata: <span className="font-bold">{Math.round(parseFloat(stats.avgJarak) * 2.5)} menit</span></div>
              <div>• Kapasitas SPPG mencukupi untuk {sppg.totalSiswa.toLocaleString()} siswa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon: Icon, color }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600">{label}</div>
    </div>
  );
}

// ==============================================
// SPPG FASILITAS TAB
// ==============================================
function SPPGFasilitasTab({ sppg }) {
  const facilityCategories = [
    {
      title: 'Produksi',
      icon: TrendingUp,
      facilities: sppg.fasilitas.filter(f => 
        f.includes('Dapur') || f.includes('Packaging') || f.includes('Produksi')
      )
    },
    {
      title: 'Penyimpanan',
      icon: Database,
      facilities: sppg.fasilitas.filter(f => 
        f.includes('Storage') || f.includes('Gudang') || f.includes('Freezer')
      )
    },
    {
      title: 'Quality Control',
      icon: Shield,
      facilities: sppg.fasilitas.filter(f => 
        f.includes('Quality') || f.includes('Lab') || f.includes('Testing')
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Facilities Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm font-semibold text-purple-100">Total Fasilitas</div>
            <div className="text-3xl font-black">{sppg.fasilitas.length} Unit</div>
          </div>
        </div>
        <p className="text-sm text-purple-100">
          Fasilitas lengkap mendukung produksi {sppg.produksiHarian.toLocaleString()} porsi/hari dengan standar keamanan pangan
        </p>
      </div>

      {/* Facility Categories */}
      {facilityCategories.map((category, idx) => (
        category.facilities.length > 0 && (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <category.icon className="w-5 h-5 text-purple-700" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">{category.title}</h4>
              <span className="ml-auto px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold">
                {category.facilities.length} unit
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.facilities.map((facility, fidx) => (
                <div key={fidx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-900">{facility}</span>
                  <span className="ml-auto text-xs text-green-600 font-bold">✓ Aktif</span>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {/* All Facilities List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Daftar Lengkap Fasilitas</h4>
        <div className="space-y-2">
          {sppg.fasilitas.map((facility, idx) => (
            <FacilityItem key={idx} name={facility} status="operational" />
          ))}
        </div>
      </div>

      {/* Certification & Compliance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Sertifikasi & Kepatuhan</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sppg.sertifikat.map((cert, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-bold text-green-900">{cert}</div>
              <div className="text-xs text-gray-600 mt-1">Valid</div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Maintenance Schedule */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-5 border border-yellow-200">
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-yellow-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-yellow-900 mb-2">Jadwal Maintenance</h5>
            <div className="space-y-1 text-xs text-gray-700">
              <div>• Pembersihan menyeluruh: <span className="font-bold">Setiap hari</span></div>
              <div>• Kalibrasi peralatan: <span className="font-bold">Setiap minggu</span></div>
              <div>• Inspeksi fasilitas: <span className="font-bold">Setiap bulan</span></div>
              <div>• Audit keamanan pangan: <span className="font-bold">Setiap 3 bulan</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FacilityItem = ({ name, status }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="text-sm font-semibold text-gray-900">{name}</span>
    </div>
    <span className="text-xs font-bold text-green-600">
      {status === 'operational' ? '✓ Operasional' : '🔧 Maintenance'}
    </span>
  </div>
);

// ==============================================
// SPPG KINERJA TAB
// ==============================================
function SPPGKinerjaTab({ sppg }) {
  // Performance metrics calculation
  const performanceMetrics = {
    productionScore: Math.min(100, (sppg.produksiHarian / sppg.kapasitas) * 120), // Bonus if high production
    efficiencyScore: sppg.utilisasi,
    serviceScore: Math.min(100, (sppg.sekolahDilayani / 30) * 100), // Assume 30 is max ideal
    qualityScore: 92, // Sample quality score
  };

  const overallScore = Math.round(
    (performanceMetrics.productionScore * 0.3 +
      performanceMetrics.efficiencyScore * 0.3 +
      performanceMetrics.serviceScore * 0.2 +
      performanceMetrics.qualityScore * 0.2)
  );

  const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'from-green-600 to-green-700', text: 'text-green-700', light: 'bg-green-50' };
    if (score >= 70) return { bg: 'from-yellow-600 to-yellow-700', text: 'text-yellow-700', light: 'bg-yellow-50' };
    return { bg: 'from-red-600 to-red-700', text: 'text-red-700', light: 'bg-red-50' };
  };

  const scoreColor = getScoreColor(overallScore);

  // Monthly performance trend
  const monthlyPerformance = [
    { bulan: 'Jul', score: 82 },
    { bulan: 'Agu', score: 85 },
    { bulan: 'Sep', score: 79 },
    { bulan: 'Okt', score: 88 },
    { bulan: 'Nov', score: 86 },
    { bulan: 'Des', score: overallScore },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Performance Score */}
      <div className={`bg-gradient-to-r ${scoreColor.bg} rounded-xl p-8 text-white text-center shadow-2xl`}>
        <div className="mb-3">
          <Award className="w-16 h-16 mx-auto mb-2 opacity-80" />
          <div className="text-sm font-semibold text-white text-opacity-90">Skor Kinerja Overall</div>
        </div>
        <div className="text-7xl font-black mb-2">{overallScore}</div>
        <div className="text-lg font-semibold">
          {overallScore >= 85 ? '⭐ EXCELLENT' : overallScore >= 70 ? '✓ GOOD' : '⚠ NEEDS IMPROVEMENT'}
        </div>
        <div className="mt-4 text-sm text-white text-opacity-80">
          Berdasarkan 4 indikator utama kinerja SPPG
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PerformanceCard
          title="Skor Produksi"
          score={Math.round(performanceMetrics.productionScore)}
          description="Pencapaian target produksi harian"
          icon={TrendingUp}
          color="blue"
        />
        <PerformanceCard
          title="Skor Efisiensi"
          score={Math.round(performanceMetrics.efficiencyScore)}
          description="Utilisasi kapasitas optimal"
          icon={Target}
          color="green"
        />
        <PerformanceCard
          title="Skor Pelayanan"
          score={Math.round(performanceMetrics.serviceScore)}
          description="Jangkauan sekolah dilayani"
          icon={Building2}
          color="purple"
        />
        <PerformanceCard
          title="Skor Kualitas"
          score={performanceMetrics.qualityScore}
          description="Standar keamanan pangan"
          icon={Shield}
          color="orange"
        />
      </div>

      {/* Performance Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-gray-900">Tren Kinerja 6 Bulan</h4>
            <p className="text-xs text-gray-600 mt-1">Perkembangan skor kinerja overall SPPG</p>
          </div>
          <div className={`px-4 py-2 ${scoreColor.light} ${scoreColor.text} rounded-lg text-sm font-bold`}>
            {overallScore >= 85 ? '↑ Trending Up' : overallScore >= 70 ? '→ Stable' : '↓ Needs Focus'}
          </div>
        </div>
        <PerformanceTrendChart data={monthlyPerformance} />
      </div>

      {/* Key Performance Indicators */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Key Performance Indicators (KPI)</h4>
        <div className="space-y-4">
          <KPIBar
            label="On-Time Delivery Rate"
            value={96}
            target={95}
            unit="%"
            color="green"
          />
          <KPIBar
            label="Food Safety Compliance"
            value={98}
            target={100}
            unit="%"
            color="blue"
          />
          <KPIBar
            label="Customer Satisfaction"
            value={88}
            target={90}
            unit="%"
            color="purple"
          />
          <KPIBar
            label="Waste Reduction"
            value={7}
            target={5}
            unit="%"
            color="orange"
            inverse
          />
        </div>
      </div>

      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h5 className="text-sm font-bold text-green-900">Kekuatan</h5>
          </div>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Utilisasi kapasitas tinggi ({sppg.utilisasi}%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Sertifikasi lengkap ({sppg.sertifikat.join(', ')})</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Jangkauan pelayanan luas ({sppg.sekolahDilayani} sekolah)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Tim produksi berpengalaman</span>
            </li>
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border border-yellow-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <h5 className="text-sm font-bold text-yellow-900">Area Pengembangan</h5>
          </div>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">→</span>
              <span>Optimasi manajemen waste (target &lt;5%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">→</span>
              <span>Peningkatan customer satisfaction score</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">→</span>
              <span>Diversifikasi menu makanan sehat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">→</span>
              <span>Implementasi tracking system real-time</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-blue-900 mb-2">Rekomendasi Peningkatan Kinerja</h5>
            <ol className="space-y-1 text-xs text-gray-700">
              <li><span className="font-bold text-blue-700">1.</span> Maintain skor kinerja di atas 85 dengan monitoring rutin KPI</li>
              <li><span className="font-bold text-blue-700">2.</span> Fokus pada waste reduction melalui demand forecasting yang lebih akurat</li>
              <li><span className="font-bold text-blue-700">3.</span> Tingkatkan customer satisfaction dengan feedback mechanism yang lebih baik</li>
              <li><span className="font-bold text-blue-700">4.</span> Pertimbangkan ekspansi kapasitas jika utilisasi konsisten &gt;90%</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformanceCard({ title, score, description, icon: Icon, color }) {
  const colors = {
    blue: { bg: 'from-blue-600 to-blue-700', light: 'bg-blue-50', text: 'text-blue-700' },
    green: { bg: 'from-green-600 to-green-700', light: 'bg-green-50', text: 'text-green-700' },
    purple: { bg: 'from-purple-600 to-purple-700', light: 'bg-purple-50', text: 'text-purple-700' },
    orange: { bg: 'from-orange-600 to-orange-700', light: 'bg-orange-50', text: 'text-orange-700' }
  };

  const colorStyle = colors[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorStyle.bg} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-3xl font-black ${colorStyle.text}`}>{score}</div>
      </div>
      <h5 className="text-sm font-bold text-gray-900 mb-1">{title}</h5>
      <p className="text-xs text-gray-600">{description}</p>
      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorStyle.bg}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function PerformanceTrendChart({ data }) {
  const maxScore = Math.max(...data.map(d => d.score));
  const minScore = Math.min(...data.map(d => d.score));

  return (
    <div className="h-48 flex items-end justify-between gap-3">
      {data.map((item, idx) => {
        const height = ((item.score - minScore + 10) / (maxScore - minScore + 20)) * 100;
        const prevScore = idx > 0 ? data[idx - 1].score : item.score;
        const trend = item.score > prevScore ? 'up' : item.score < prevScore ? 'down' : 'stable';

        return (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="text-xs font-bold text-gray-700 mb-1">{item.score}</div>
            <div className="w-full flex flex-col justify-end" style={{ height: '140px' }}>
              <div 
                className={`w-full rounded-t-lg transition-all ${
                  item.score >= 85 ? 'bg-gradient-to-t from-green-500 to-green-600' :
                  item.score >= 70 ? 'bg-gradient-to-t from-yellow-500 to-yellow-600' :
                  'bg-gradient-to-t from-red-500 to-red-600'
                }`}
                style={{ height: `${height}%` }}
              />
            </div>
            <div className="text-xs font-semibold text-gray-700 mt-2">{item.bulan}</div>
            <div className="text-xs mt-1">
              {trend === 'up' && <span className="text-green-600">↑</span>}
              {trend === 'down' && <span className="text-red-600">↓</span>}
              {trend === 'stable' && <span className="text-gray-400">→</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KPIBar({ label, value, target, unit, color, inverse }) {
  const percentage = (value / target) * 100;
  const isOnTarget = inverse ? value <= target : value >= target;

  const colors = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold text-gray-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{value}{unit}</span>
          <span className="text-xs text-gray-500">/ {target}{unit}</span>
          {isOnTarget ? (
            <span className="text-green-600 font-bold">✓</span>
          ) : (
            <span className="text-yellow-600 font-bold">⚠</span>
          )}
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
        <div 
          className={`h-full ${colors[color]} transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        {/* Target line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-gray-700"
          style={{ left: '100%' }}
        />
      </div>
    </div>
  );
}

// ==============================================
// SPPG LOKASI TAB
// ==============================================
function SPPGLokasiTab({ sppg }) {
  return (
    <div className="space-y-6">
      {/* Location Map */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Peta Lokasi SPPG</h4>
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 rounded-xl h-96 flex items-center justify-center border-2 border-gray-200 relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          {/* SPPG Building Icon */}
          <div className="relative z-10">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl mb-4 animate-pulse" style={{ animationDuration: '3s' }}>
              <Database className="w-16 h-16 text-white" />
            </div>
            <div className="bg-white rounded-xl shadow-lg px-6 py-3 text-center border border-gray-200">
              <div className="text-sm font-bold text-gray-900">{sppg.nama}</div>
              <div className="text-xs text-gray-600 mt-1">{sppg.kecamatan}</div>
            </div>
          </div>

          {/* Service Radius Circles */}
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-purple-300 rounded-full opacity-20" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 border-4 border-purple-400 border-dashed rounded-full opacity-20" style={{ transform: 'translate(-50%, -50%)' }}></div>

          {/* Compass */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
            <div className="text-xs font-bold text-gray-700 text-center mb-1">N</div>
            <div className="w-8 h-8 border-2 border-gray-400 rounded-full relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2"></div>
            </div>
          </div>

          {/* Scale Bar */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 bg-gray-700"></div>
              <span className="text-xs font-semibold text-gray-700">5 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600">Koordinat GPS</div>
              <div className="text-lg font-bold text-gray-900">Lokasi Geografis</div>
            </div>
          </div>
          <div className="space-y-3">
            <CoordinateRow label="Latitude" value={sppg.lat} />
            <CoordinateRow label="Longitude" value={sppg.lng} />
            <div className="pt-3 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold transition-colors">
                📍 Buka di Google Maps
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600">Alamat Lengkap</div>
              <div className="text-lg font-bold text-gray-900">Informasi Kontak</div>
            </div>
          </div>
          <div className="space-y-3">
            <AddressRow label="Alamat" value={sppg.alamat} />
            <AddressRow label="Kecamatan" value={sppg.kecamatan} />
            <AddressRow label="Kota" value="Bandung" />
            <AddressRow label="Provinsi" value="Jawa Barat" />
          </div>
        </div>
      </div>

      {/* Accessibility Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Analisis Aksesibilitas</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AccessibilityCard
            title="Jalan Utama"
            distance="200 m"
            status="Sangat Baik"
            icon={MapPin}
            color="green"
          />
          <AccessibilityCard
            title="Terminal/Stasiun"
            distance="3.5 km"
            status="Mudah Dijangkau"
            icon={TrendingUp}
            color="blue"
          />
          <AccessibilityCard
            title="Jangkauan Sekolah"
            distance="8.3 km avg"
            status="Optimal"
            icon={Target}
            color="purple"
          />
        </div>
      </div>

      {/* Nearby Facilities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Fasilitas Terdekat</h4>
        <div className="space-y-3">
          <NearbyFacility name="Pasar Tradisional" type="Supplier" distance={1.2} />
          <NearbyFacility name="Bank/ATM" type="Keuangan" distance={0.8} />
          <NearbyFacility name="Puskesmas" type="Kesehatan" distance={2.1} />
          <NearbyFacility name="Kantor Kecamatan" type="Pemerintahan" distance={1.5} />
          <NearbyFacility name="Pos Polisi" type="Keamanan" distance={1.8} />
        </div>
      </div>

      {/* Service Coverage Area */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
        <div className="flex items-start gap-3">
          <Layers className="w-5 h-5 text-purple-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-purple-900 mb-2">Area Layanan</h5>
            <div className="space-y-1 text-xs text-gray-700">
              <div>• Radius layanan maksimal: <span className="font-bold">15 km</span></div>
              <div>• Cakupan wilayah: <span className="font-bold">Kec. {sppg.kecamatan} dan sekitarnya</span></div>
              <div>• Total sekolah terjangkau: <span className="font-bold">{sppg.sekolahDilayani} sekolah</span></div>
              <div>• Estimasi waktu distribusi terjauh: <span className="font-bold">45 menit</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-green-700" />
            <h5 className="text-sm font-bold text-green-900">Keunggulan Lokasi</h5>
          </div>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>✓ Dekat dengan jalan utama transportasi</li>
            <li>✓ Mudah diakses dari berbagai arah</li>
            <li>✓ Dekat dengan sumber bahan baku (pasar)</li>
            <li>✓ Infrastruktur pendukung lengkap</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-blue-700" />
            <h5 className="text-sm font-bold text-blue-900">Keamanan & Lingkungan</h5>
          </div>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>✓ Area aman dan terpantau 24/7</li>
            <li>✓ Lingkungan bersih dan higienis</li>
            <li>✓ Dekat dengan fasilitas kesehatan</li>
            <li>✓ Akses emergency response cepat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function CoordinateRow({ label, value }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <span className="text-sm font-mono font-bold text-gray-900">{value}</span>
    </div>
  );
}

function AddressRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-semibold text-gray-600 min-w-20">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}

function AccessibilityCard({ title, distance, status, icon: Icon, color }) {
  const colors = {
    green: { bg: 'from-green-600 to-green-700', light: 'bg-green-50', text: 'text-green-700' },
    blue: { bg: 'from-blue-600 to-blue-700', light: 'bg-blue-50', text: 'text-blue-700' },
    purple: { bg: 'from-purple-600 to-purple-700', light: 'bg-purple-50', text: 'text-purple-700' }
  };

  const colorStyle = colors[color];

  return (
    <div className={`${colorStyle.light} rounded-xl p-4 border border-${color}-200`}>
      <div className={`w-10 h-10 bg-gradient-to-br ${colorStyle.bg} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-sm font-bold text-gray-900 mb-1">{title}</div>
      <div className="text-xl font-black text-gray-900 mb-1">{distance}</div>
      <div className={`text-xs font-semibold ${colorStyle.text}`}>{status}</div>
    </div>
  );
}

function NearbyFacility({ name, type, distance }) 
{
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          <div className="text-xs text-gray-600">{type}</div>
        </div>
      </div>
      <div className="text-sm font-bold text-purple-700">{distance} km</div>
    </div>
  );
}

export default SPPGPage;