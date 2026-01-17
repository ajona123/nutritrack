import React, { useState, useRef } from 'react';
import { Filter, ChevronDown, Download, Printer, Share2, Building2, Users, Target, Activity, Image, Eye, MapPin, FileText, X, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from 'recharts';

function LaporanPage() {
  const [selectedReport, setSelectedReport] = useState('executive');
  const [selectedPeriod, setSelectedPeriod] = useState('semester1-2025');
  const [selectedKecamatan, setSelectedKecamatan] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('preview');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState(['all']);
  const reportRef = useRef(null);

  // Dummy sekolah data
  const sekolahData = [
    { id: 1, nama: 'SDN 1 Bandung', siswa: 245, jenjang: 'SD', status: 'layak' },
    { id: 2, nama: 'SDN 2 Bandung', siswa: 198, jenjang: 'SD', status: 'layak' },
    { id: 3, nama: 'SDN 3 Cimahi', siswa: 312, jenjang: 'SD', status: 'waspada' },
    { id: 4, nama: 'SDN 4 Lembang', siswa: 278, jenjang: 'SD', status: 'layak' },
    { id: 5, nama: 'MIN 1 Bandung', siswa: 189, jenjang: 'MI', status: 'layak' },
    { id: 6, nama: 'SDN 5 Cibeunying', siswa: 156, jenjang: 'SD', status: 'kritis' },
    { id: 7, nama: 'SDN 6 Soreang', siswa: 223, jenjang: 'SD', status: 'layak' },
    { id: 8, nama: 'MIN 2 Lembang', siswa: 201, jenjang: 'MI', status: 'layak' },
  ];

  // Data untuk visualisasi
  const kelayakanData = [
    { kecamatan: 'Bandung', layak: 45, waspada: 12, kritis: 3, total: 60, persentase: 75.0 },
    { kecamatan: 'Cimahi', layak: 38, waspada: 8, kritis: 2, total: 48, persentase: 79.2 },
    { kecamatan: 'Lembang', layak: 52, waspada: 15, kritis: 5, total: 72, persentase: 72.2 },
    { kecamatan: 'Cibeunying', layak: 42, waspada: 10, kritis: 3, total: 55, persentase: 76.4 },
    { kecamatan: 'Soreang', layak: 35, waspada: 9, kritis: 4, total: 48, persentase: 72.9 }
  ];

  // Data Tren Pelayanan Bulanan
  const trendData = [
    { bulan: 'Jul', kelayakan: 82.5, siswa: 335, sppg: 44, coverage: 88.2 },
    { bulan: 'Agu', kelayakan: 83.8, siswa: 338, sppg: 45, coverage: 89.1 },
    { bulan: 'Sep', kelayakan: 84.2, siswa: 340, sppg: 46, coverage: 89.8 },
    { bulan: 'Okt', kelayakan: 85.1, siswa: 341, sppg: 46, coverage: 90.5 },
    { bulan: 'Nov', kelayakan: 86.4, siswa: 342, sppg: 47, coverage: 91.2 },
    { bulan: 'Des', kelayakan: 87.3, siswa: 343, sppg: 47, coverage: 92.0 }
  ];

  // Data Distribusi Status
  const statusDistribusi = [
    { name: 'Layak', value: 212, color: '#10b981', persen: 75.4 },
    { name: 'Waspada', value: 54, color: '#f59e0b', persen: 19.2 },
    { name: 'Kritis', value: 17, color: '#ef4444', persen: 6.0 }
  ];

  // Data Kapasitas SPPG
  const kapasitasData = [
    { sppg: 'SPPG Bandung Pusat', kapasitas: 8500, terpakai: 7820, utilisasi: 92, status: 'Tinggi' },
    { sppg: 'SPPG Bandung Utara', kapasitas: 7200, terpakai: 6480, utilisasi: 90, status: 'Tinggi' },
    { sppg: 'SPPG Bandung Selatan', kapasitas: 6800, terpakai: 5440, utilisasi: 80, status: 'Optimal' },
    { sppg: 'SPPG Bandung Timur', kapasitas: 9000, terpakai: 7560, utilisasi: 84, status: 'Optimal' },
    { sppg: 'SPPG Bandung Barat', kapasitas: 6500, terpakai: 5200, utilisasi: 80, status: 'Optimal' },
    { sppg: 'SPPG Bandung Pusat 2', kapasitas: 7500, terpakai: 6000, utilisasi: 80, status: 'Optimal' }
  ];

  // Data Jarak Rata-rata
  const jarakData = [
    { kategori: '0-5 km', jumlah: 156, persen: 55.1, status: 'Ideal' },
    { kategori: '5-10 km', jumlah: 89, persen: 31.4, status: 'Baik' },
    { kategori: '10-15 km', jumlah: 28, persen: 9.9, status: 'Waspada' },
    { kategori: '>15 km', jumlah: 10, persen: 3.5, status: 'Kritis' }
  ];

  // Data Performa Radar
  const performaRadar = [
    { indicator: 'Kelayakan', value: 87.3, fullMark: 100 },
    { indicator: 'Coverage', value: 92.0, fullMark: 100 },
    { indicator: 'Kapasitas', value: 84.5, fullMark: 100 },
    { indicator: 'Aksesibilitas', value: 86.5, fullMark: 100 },
    { indicator: 'Efisiensi', value: 88.2, fullMark: 100 },
    { indicator: 'Pemerataan', value: 79.8, fullMark: 100 }
  ];

  // Data Rekomendasi
  const rekomendasiData = [
    {
      prioritas: 'Tinggi',
      wilayah: 'Lembang',
      masalah: 'Kapasitas SPPG tidak mencukupi untuk 5 sekolah',
      solusi: 'Penambahan 1 unit SPPG baru dengan kapasitas 8000 porsi/hari',
      dampak: 'Meningkatkan kelayakan dari 72.2% menjadi 89.5%',
      estimasi: '6-8 bulan',
      biaya: 'Rp 2.8M'
    },
    {
      prioritas: 'Tinggi',
      wilayah: 'Soreang',
      masalah: 'Jarak tempuh 4 sekolah >12 km dari SPPG terdekat',
      solusi: 'Relokasi SPPG atau penambahan satelit distribusi',
      dampak: 'Mengurangi waktu distribusi 35-40 menit',
      estimasi: '4-6 bulan',
      biaya: 'Rp 1.5M'
    },
    {
      prioritas: 'Sedang',
      wilayah: 'Bandung',
      masalah: 'Utilisasi SPPG mencapai 92% (mendekati maksimal)',
      solusi: 'Optimasi jadwal produksi dan routing distribusi',
      dampak: 'Efisiensi operasional +15%',
      estimasi: '2-3 bulan',
      biaya: 'Rp 500K'
    }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const handleExport = (format) => {
    alert(`Export laporan dalam format ${format.toUpperCase()}`);
    setShowExportModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const StatCard = ({ icon: Icon, label, value, change, color, subtitle }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-600 font-medium">{label}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        {change && (
          <div className={`text-xs font-semibold px-2 py-1 rounded ${
            change > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Laporan & Visualisasi</h1>
              <span className="px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded">
                Live Data
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Optimalisasi Pelayanan Pemenuhan Gizi - Program MBG
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Last Update</span>
            <span className="text-sm font-semibold text-gray-900">14 Des 2025, 09:30</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Data</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="text-sm font-medium">Print Preview</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Periode Laporan</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="semester1-2025">Semester 1 - 2025</option>
                  <option value="semester2-2025">Semester 2 - 2025</option>
                  <option value="tahunan-2025">Tahunan - 2025</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                <select
                  value={selectedKecamatan}
                  onChange={(e) => setSelectedKecamatan(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Kecamatan</option>
                  <option value="bandung">Bandung</option>
                  <option value="cimahi">Cimahi</option>
                  <option value="lembang">Lembang</option>
                  <option value="cibeunying">Cibeunying</option>
                  <option value="soreang">Soreang</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan</label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="executive">Executive Summary</option>
                  <option value="detailed">Laporan Lengkap</option>
                  <option value="visualization">Visualisasi Data</option>
                  <option value="thematic">Peta Tematik</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="space-y-6">
        
        {/* Executive Summary Cards - DYNAMIC */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={Building2}
            label="Total Sekolah"
            value={sekolahData.length.toString()}
            subtitle="Sekolah sasaran aktif"
            change={1.2}
            color="bg-blue-500"
          />
          <StatCard
            icon={Users}
            label="Total Siswa MBG"
            value={(sekolahData.reduce((sum, s) => sum + s.siswa, 0)).toLocaleString()}
            subtitle="Penerima manfaat"
            change={0.8}
            color="bg-green-500"
          />
          <StatCard
            icon={Target}
            label="Tingkat Kelayakan"
            value="100%"
            subtitle="Standar pelayanan"
            change={0.9}
            color="bg-orange-500"
          />
          <StatCard
            icon={Activity}
            label="Coverage Area"
            value="92.0%"
            subtitle="Wilayah terlayani"
            change={1.1}
            color="bg-purple-500"
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Chart 1: Distribusi Status Kelayakan */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Distribusi Status Kelayakan</h3>
                <p className="text-sm text-gray-600">Per kecamatan dalam wilayah studi</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kelayakanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="kecamatan" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="circle"
                />
                <Bar dataKey="layak" fill="#10b981" name="Layak" radius={[4, 4, 0, 0]} />
                <Bar dataKey="waspada" fill="#f59e0b" name="Waspada" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kritis" fill="#ef4444" name="Kritis" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rata-rata Kelayakan:</span>
                <span className="font-semibold text-gray-900">75.1%</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Status Distribution Pie */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Proporsi Status Global</h3>
                <p className="text-sm text-gray-600">Agregat seluruh sekolah sasaran</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribusi}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, persen }) => `${name}: ${persen}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribusi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {statusDistribusi.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                    <span className="text-xs text-gray-500">({item.persen}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Tren Pelayanan MBG</h3>
              <p className="text-sm text-gray-600">6 bulan terakhir (Jul - Des 2025)</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="bulan" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }}
                label={{ value: 'Kelayakan (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                label={{ value: 'Siswa (ribu)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="kelayakan" 
                stroke="#3b82f6" 
                strokeWidth={2.5}
                dot={{ r: 4 }}
                name="Tingkat Kelayakan (%)"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="coverage" 
                stroke="#10b981" 
                strokeWidth={2.5}
                dot={{ r: 4 }}
                name="Coverage Area (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="siswa" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Total Siswa (ribu)"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Improvement</div>
              <div className="text-xl font-bold text-green-600">+4.8%</div>
              <div className="text-xs text-gray-500">Jul → Des</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Avg Growth</div>
              <div className="text-xl font-bold text-blue-600">+0.96%</div>
              <div className="text-xs text-gray-500">per bulan</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Target 2026</div>
              <div className="text-xl font-bold text-purple-600">92.0%</div>
              <div className="text-xs text-gray-500">Kelayakan</div>
            </div>
          </div>
        </div>

        {/* Radar & Area Charts */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Radar Chart - Performance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Performa Multi-Dimensi</h3>
                <p className="text-sm text-gray-600">6 indikator kunci sistem MBG</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performaRadar}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="indicator" 
                  tick={{ fontSize: 11 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
                />
                <Radar 
                  name="Actual Performance" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Skor Rata-rata:</div>
              <div className="text-2xl font-bold text-gray-900">86.2 / 100</div>
            </div>
          </div>

          {/* Capacity Utilization */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Utilisasi Kapasitas SPPG</h3>
                <p className="text-sm text-gray-600">6 unit SPPG aktif</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              {kapasitasData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{item.sppg}</span>
                    <span className="text-gray-600">{item.utilisasi}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full transition-all ${
                        item.utilisasi >= 90 ? 'bg-red-500' :
                        item.utilisasi >= 75 ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${item.utilisasi}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.terpakai.toLocaleString()} / {item.kapasitas.toLocaleString()} porsi</span>
                    <span className={`px-2 py-0.5 rounded font-medium ${
                      item.status === 'Tinggi' ? 'bg-red-50 text-red-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
              <span className="text-gray-600">Rata-rata Utilisasi:</span>
              <span className="font-semibold text-gray-900">84.3%</span>
            </div>
          </div>
        </div>

        {/* Distance Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Analisis Jarak Sekolah ke SPPG</h3>
              <p className="text-sm text-gray-600">Distribusi berdasarkan kategori jarak</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Image className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={jarakData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="kategori" 
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="jumlah" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
                name="Jumlah Sekolah"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {jarakData.map((item, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">{item.kategori}</div>
                <div className="text-lg font-bold text-gray-900">{item.jumlah}</div>
                <div className="text-xs text-gray-500">{item.persen}%</div>
                <div className={`text-xs font-medium mt-1 ${
                  item.status === 'Ideal' ? 'text-green-600' :
                  item.status === 'Baik' ? 'text-blue-600' :
                  item.status === 'Waspada' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rekomendasi Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rekomendasi Kebijakan</h3>
              <p className="text-sm text-gray-600">Berdasarkan analisis spasial dan kapasitas</p>
            </div>
          </div>

          <div className="space-y-4">
            {rekomendasiData.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    item.prioritas === 'Tinggi' ? 'bg-red-50 text-red-700' :
                    'bg-yellow-50 text-yellow-700'
                  }`}>
                    {item.prioritas}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-semibold text-gray-900">{item.wilayah}</h4>
                      <span className="text-sm text-gray-600">{item.estimasi}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Masalah:</div>
                        <div className="text-sm text-gray-900">{item.masalah}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Solusi:</div>
                        <div className="text-sm text-gray-900">{item.solusi}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="text-xs">
                          <span className="text-gray-600">Dampak: </span>
                          <span className="font-medium text-green-600">{item.dampak}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Biaya: </span>
                          <span className="font-semibold text-gray-900">{item.biaya}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        Detail Analisis →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peta Tematik Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Peta Tematik Kelayakan</h3>
              <p className="text-sm text-gray-600">Visualisasi spasial status pelayanan MBG</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                Lihat Peta Lengkap
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Preview Peta Tematik</h4>
              <p className="text-sm text-gray-600 mb-4 max-w-md">
                Peta menampilkan sebaran sekolah sasaran, lokasi SPPG, dan zona kelayakan pelayanan berdasarkan analisis spasial.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span>Layak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span>Waspada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span>Kritis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900 mb-2">
                Catatan Metodologi Laporan
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Laporan ini disusun berdasarkan analisis spasial menggunakan metode <span className="font-medium">Network Analysis</span> dan 
                <span className="font-medium"> Multi-Criteria Decision Making (MCDM)</span>. Data bersumber dari Dinas Pendidikan Kabupaten Bandung, 
                validasi lapangan, dan sistem monitoring real-time.
              </p>
              <div className="flex items-center gap-6 text-xs text-gray-600">
                <div>
                  <span className="font-medium">Dataset:</span> 1,247 sekolah, 47 SPPG
                </div>
                <div>
                  <span className="font-medium">Update:</span> Harian (otomatis)
                </div>
                <div>
                  <span className="font-medium">Validitas:</span> Desember 2025
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Export Laporan</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Pilih format export untuk laporan dan visualisasi
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleExport('pdf')}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-red-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">PDF Document</div>
                  <div className="text-xs text-gray-600">Format standar, siap cetak</div>
                </div>
              </button>

              <button
                onClick={() => handleExport('excel')}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Excel Spreadsheet</div>
                  <div className="text-xs text-gray-600">Data lengkap, dapat diolah</div>
                </div>
              </button>

              <button
                onClick={() => handleExport('png')}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
              >
                <Image className="w-5 h-5 text-purple-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">High-Res Images</div>
                  <div className="text-xs text-gray-600">Grafik individual, PNG/SVG</div>
                </div>
              </button>

              <button
                onClick={() => handleExport('csv')}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
              >
                <FileSpreadsheet className="w-5 h-5 text-orange-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">CSV Data</div>
                  <div className="text-xs text-gray-600">Raw data, universal format</div>
                </div>
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  Export mencakup semua visualisasi dan data sesuai filter yang dipilih
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LaporanPage;