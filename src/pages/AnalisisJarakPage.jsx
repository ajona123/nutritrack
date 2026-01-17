import React, { useState } from 'react';
import { MapPin, TrendingUp, Award, Activity, Target, AlertTriangle, Settings, BarChart3, Layers, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ==============================================
// ANALISIS JARAK & WAKTU TEMPUH PAGE - SINTA 1 LEVEL
// ==============================================
function AnalisisJarakPage() {
  const [selectedKecamatan, setSelectedKecamatan] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // overview, matrix, network, risk
  const [thresholdJarak, setThresholdJarak] = useState(15); // km
  const [thresholdWaktu, setThresholdWaktu] = useState(30); // menit
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Comprehensive distance & time data
  const jarakWaktuData = [
    {
      id: 1,
      sekolah: 'SDN 1 Bandung',
      kecamatan: 'Bandung',
      sppg: 'SPPG Bandung Pusat',
      jarak: 7.2,
      waktu: 18,
      status: 'optimal',
      rute: 'Jl. Raya Bandung → Jl. Merdeka',
      jalanKondisi: 'baik',
      lintasKendala: [],
      alternatif: 1,
      siswa: 245,
      prioritas: 'normal'
    },
    {
      id: 2,
      sekolah: 'MIN 2 Bandung',
      kecamatan: 'Bandung',
      sppg: 'SPPG Bandung Pusat',
      jarak: 12.4,
      waktu: 28,
      status: 'waspada',
      rute: 'Jl. Bandung Utara → Jl. Pasar',
      jalanKondisi: 'sedang',
      lintasKendala: ['Padat pagi'],
      alternatif: 2,
      siswa: 198,
      prioritas: 'medium'
    },
    {
      id: 3,
      sekolah: 'SDN 3 Cimahi',
      kecamatan: 'Cimahi',
      sppg: 'SPPG Cimahi',
      jarak: 5.8,
      waktu: 14,
      status: 'optimal',
      rute: 'Jl. Cimahi → Jl. Industri',
      jalanKondisi: 'baik',
      lintasKendala: [],
      alternatif: 1,
      siswa: 312,
      prioritas: 'normal'
    },
    {
      id: 4,
      sekolah: 'SDN 2 Lembang',
      kecamatan: 'Lembang',
      sppg: 'SPPG Lembang',
      jarak: 16.7,
      waktu: 42,
      status: 'kritis',
      rute: 'Jl. Lembang → Jl. Desa → Jl. Puncak',
      jalanKondisi: 'buruk',
      lintasKendala: ['Jalan rusak', 'Tanjakan'],
      alternatif: 0,
      siswa: 278,
      prioritas: 'high'
    },
    {
      id: 5,
      sekolah: 'MIN 1 Cibeunying',
      kecamatan: 'Cibeunying',
      sppg: 'SPPG Cibeunying',
      jarak: 8.1,
      waktu: 20,
      status: 'optimal',
      rute: 'Jl. Cibeunying → Jl. Raya',
      jalanKondisi: 'baik',
      lintasKendala: [],
      alternatif: 2,
      siswa: 189,
      prioritas: 'normal'
    },
    {
      id: 6,
      sekolah: 'SDN 4 Soreang',
      kecamatan: 'Soreang',
      sppg: 'SPPG Soreang',
      jarak: 11.9,
      waktu: 26,
      status: 'waspada',
      rute: 'Jl. Soreang → Jl. Sentral',
      jalanKondisi: 'sedang',
      lintasKendala: ['Pasar tradisional'],
      alternatif: 1,
      siswa: 156,
      prioritas: 'medium'
    },
    {
      id: 7,
      sekolah: 'SDN 5 Bandung',
      kecamatan: 'Bandung',
      sppg: 'SPPG Bandung Pusat',
      jarak: 6.4,
      waktu: 16,
      status: 'optimal',
      rute: 'Jl. Bandung Timur → Jl. Merdeka',
      jalanKondisi: 'baik',
      lintasKendala: [],
      alternatif: 1,
      siswa: 223,
      prioritas: 'normal'
    },
    {
      id: 8,
      sekolah: 'MIN 3 Lembang',
      kecamatan: 'Lembang',
      sppg: 'SPPG Lembang',
      jarak: 18.2,
      waktu: 48,
      status: 'kritis',
      rute: 'Jl. Lembang Jauh → Jl. Pegunungan',
      jalanKondisi: 'buruk',
      lintasKendala: ['Jalan sempit', 'Tanjakan curam', 'Padat pagi'],
      alternatif: 0,
      siswa: 201,
      prioritas: 'high'
    },
    {
      id: 9,
      sekolah: 'SDN 2 Cibeunying',
      kecamatan: 'Cibeunying',
      sppg: 'SPPG Cibeunying',
      jarak: 9.3,
      waktu: 22,
      status: 'optimal',
      rute: 'Jl. Cibeunying Barat → Jl. Utama',
      jalanKondisi: 'baik',
      lintasKendala: [],
      alternatif: 2,
      siswa: 267,
      prioritas: 'normal'
    },
    {
      id: 10,
      sekolah: 'SDN 1 Cimahi',
      kecamatan: 'Cimahi',
      sppg: 'SPPG Cimahi',
      jarak: 13.1,
      waktu: 30,
      status: 'waspada',
      rute: 'Jl. Cimahi Selatan → Jl. Bypass',
      jalanKondisi: 'sedang',
      lintasKendala: ['Traffic light'],
      alternatif: 1,
      siswa: 289,
      prioritas: 'medium'
    }
  ];

  // Filtering
  const filteredData = jarakWaktuData.filter(item =>
    selectedKecamatan === 'all' || item.kecamatan === selectedKecamatan
  );

  // Statistics
  const stats = {
    totalSekolah: filteredData.length,
    avgJarak: (filteredData.reduce((sum, s) => sum + s.jarak, 0) / filteredData.length).toFixed(1),
    avgWaktu: Math.round(filteredData.reduce((sum, s) => sum + s.waktu, 0) / filteredData.length),
    optimal: filteredData.filter(s => s.status === 'optimal').length,
    waspada: filteredData.filter(s => s.status === 'waspada').length,
    kritis: filteredData.filter(s => s.status === 'kritis').length,
    melebihiThreshold: filteredData.filter(s => s.jarak > thresholdJarak).length,
    perluOptimasi: filteredData.filter(s => s.prioritas === 'high').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analisis Jarak & Waktu Tempuh</h2>
          <p className="text-sm text-gray-600 mt-1">
            Network analysis untuk optimasi rute distribusi Makanan Bergizi Gratis
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Kecamatan</option>
            <option value="Bandung">Bandung</option>
            <option value="Cimahi">Cimahi</option>
            <option value="Lembang">Lembang</option>
            <option value="Cibeunying">Cibeunying</option>
            <option value="Soreang">Soreang</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
            Export Analisis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <DistanceStatCard
          label="Avg Jarak"
          value={`${stats.avgJarak} km`}
          icon={MapPin}
          color="blue"
        />
        <DistanceStatCard
          label="Avg Waktu"
          value={`${stats.avgWaktu} mnt`}
          icon={Activity}
          color="green"
        />
        <DistanceStatCard
          label="Status Optimal"
          value={stats.optimal}
          icon={Target}
          color="green"
        />
        <DistanceStatCard
          label="Waspada"
          value={stats.waspada}
          icon={AlertTriangle}
          color="yellow"
        />
        <DistanceStatCard
          label="Kritis"
          value={stats.kritis}
          icon={AlertTriangle}
          color="red"
        />
        <DistanceStatCard
          label="Perlu Optimasi"
          value={stats.perluOptimasi}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Threshold Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Parameter Threshold</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Threshold Jarak Maksimal (km)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="20"
                value={thresholdJarak}
                onChange={(e) => setThresholdJarak(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-2xl font-black text-blue-600 w-16 text-right">{thresholdJarak}</span>
              <span className="text-sm text-gray-600">km</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Sekolah dengan jarak &gt; {thresholdJarak} km dianggap berisiko
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Threshold Waktu Maksimal (menit)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="20"
                max="45"
                value={thresholdWaktu}
                onChange={(e) => setThresholdWaktu(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-2xl font-black text-green-600 w-16 text-right">{thresholdWaktu}</span>
              <span className="text-sm text-gray-600">mnt</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Waktu tempuh &gt; {thresholdWaktu} menit berisiko terhadap kualitas makanan
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-2 overflow-x-auto">
          <DistanceViewButton 
            label="Overview" 
            value="overview" 
            active={viewMode} 
            onClick={setViewMode}
            icon={BarChart3}
          />
          <DistanceViewButton 
            label="Distance Matrix" 
            value="matrix" 
            active={viewMode} 
            onClick={setViewMode}
            icon={Layers}
          />
          <DistanceViewButton 
            label="Network Routes" 
            value="network" 
            active={viewMode} 
            onClick={setViewMode}
            icon={MapPin}
          />
          <DistanceViewButton 
            label="Risk Assessment" 
            value="risk" 
            active={viewMode} 
            onClick={setViewMode}
            icon={AlertTriangle}
          />
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <DistanceOverviewView 
          data={filteredData}
          stats={stats}
          thresholdJarak={thresholdJarak}
          thresholdWaktu={thresholdWaktu}
          onSelectRoute={setSelectedRoute}
        />
      )}
      {viewMode === 'matrix' && (
        <DistanceMatrixView 
          data={filteredData}
        />
      )}
      {viewMode === 'network' && (
        <NetworkRoutesView 
          data={filteredData}
          onSelectRoute={setSelectedRoute}
        />
      )}
      {viewMode === 'risk' && (
        <RiskAssessmentView 
          data={filteredData}
          thresholdJarak={thresholdJarak}
          thresholdWaktu={thresholdWaktu}
        />
      )}

      {/* Route Detail Modal */}
      {selectedRoute && (
        <RouteDetailModal
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul Analisis Jarak & Waktu Tempuh</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan: (1) Network analysis komprehensif untuk seluruh rute distribusi MBG,
              (2) Distance matrix antar sekolah dan SPPG dengan estimasi waktu tempuh real-world,
              (3) Identifikasi sekolah berisiko (jarak &gt; threshold) yang memerlukan reassignment SPPG,
              (4) Risk assessment kualitas makanan berdasarkan durasi perjalanan, (5) Rekomendasi optimasi
              rute untuk meminimalkan travel time dan memaksimalkan kualitas pelayanan.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Network Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Distance Matrix</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Route Optimization</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Risk Assessment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function DistanceStatCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    yellow: 'from-yellow-600 to-yellow-700',
    red: 'from-red-600 to-red-700',
    orange: 'from-orange-600 to-orange-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600">{label}</div>
    </div>
  );
}

function DistanceViewButton({ label, value, active, onClick, icon: Icon }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
        active === value
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

// ==============================================
// DISTANCE OVERVIEW VIEW
// ==============================================
function DistanceOverviewView({ data, stats, thresholdJarak, thresholdWaktu, onSelectRoute }) {
  return (
    <div className="space-y-6">
      {/* Distance Distribution Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Distribusi Jarak Sekolah ke SPPG</h3>
            <p className="text-xs text-gray-600 mt-1">Klasifikasi berdasarkan threshold {thresholdJarak} km</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">≤ 10 km</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">10-15 km</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">&gt; 15 km</span>
            </div>
          </div>
        </div>
        <DistanceDistributionChart data={data} />
      </div>

      {/* Travel Time Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Analisis Waktu Tempuh</h3>
          <p className="text-xs text-gray-600 mt-1">Estimasi durasi perjalanan dan risiko keterlambatan</p>
        </div>
        <div className="space-y-4">
          {data.map((route, idx) => (
            <TravelTimeBar key={idx} route={route} thresholdWaktu={thresholdWaktu} onSelect={() => onSelectRoute(route)} />
          ))}
        </div>
      </div>

      {/* Critical Routes Alert */}
      {data.filter(r => r.status === 'kritis').length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-700 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-red-900 mb-2">
                Peringatan: {data.filter(r => r.status === 'kritis').length} Rute Kritis Terdeteksi
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                {data.filter(r => r.status === 'kritis').map((route, idx) => (
                  <li key={idx}>
                    • <span className="font-semibold">{route.sekolah}</span>: {route.jarak} km ({route.waktu} menit) - 
                    {route.lintasKendala.length > 0 ? ` Kendala: ${route.lintasKendala.join(', ')}` : ' Jarak melebihi threshold'}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onSelectRoute(data.find(r => r.status === 'kritis'))}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
              >
                Lihat Rekomendasi Optimasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Route Summary Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Ringkasan Rute Distribusi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Sekolah</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">SPPG</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Jarak</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Waktu</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Kondisi</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((route, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">{route.sekolah}</div>
                    <div className="text-xs text-gray-600">{route.siswa} siswa</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{route.sppg}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${
                      route.jarak <= 10 ? 'text-green-600' :
                      route.jarak <= 15 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {route.jarak} km
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${
                      route.waktu <= 20 ? 'text-green-600' :
                      route.waktu <= 30 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {route.waktu} mnt
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      route.jalanKondisi === 'baik' ? 'bg-green-100 text-green-700' :
                      route.jalanKondisi === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {route.jalanKondisi.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      route.status === 'optimal' ? 'bg-green-100 text-green-700' :
                      route.status === 'waspada' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {route.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelectRoute(route)}
                      className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-blue-900 mb-2">Ringkasan Analisis Jarak & Waktu</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Rata-rata jarak: <span className="font-bold">{stats.avgJarak} km</span> (threshold: {thresholdJarak} km)</li>
              <li>• Rata-rata waktu tempuh: <span className="font-bold">{stats.avgWaktu} menit</span> (threshold: {thresholdWaktu} menit)</li>
              <li>• Status optimal: <span className="font-bold text-green-700">{stats.optimal} sekolah</span> ({((stats.optimal / stats.totalSekolah) * 100).toFixed(1)}%)</li>
              <li>• Perlu monitoring: <span className="font-bold text-yellow-700">{stats.waspada} sekolah</span></li>
              <li>• Prioritas tinggi: <span className="font-bold text-red-700">{stats.kritis} sekolah</span> memerlukan reassignment atau optimasi rute</li>
              <li>• Rekomendasi: {stats.kritis > 0 ? 'Evaluasi SPPG alternatif untuk sekolah kritis' : 'Rute distribusi sudah optimal'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Overview
function DistanceDistributionChart({ data }) {
  const ranges = [
    { label: '0-5 km', min: 0, max: 5, color: 'bg-green-500' },
    { label: '5-10 km', min: 5, max: 10, color: 'bg-green-400' },
    { label: '10-15 km', min: 10, max: 15, color: 'bg-yellow-500' },
    { label: '15-20 km', min: 15, max: 20, color: 'bg-red-500' }
  ];

  const distribution = ranges.map(range => ({
    ...range,
    count: data.filter(d => d.jarak > range.min && d.jarak <= range.max).length
  }));

  const maxCount = Math.max(...distribution.map(d => d.count));

  return (
    <div className="space-y-4">
      {distribution.map((range, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">{range.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{range.count} sekolah</span>
              <span className="text-xs text-gray-500">({((range.count / data.length) * 100).toFixed(1)}%)</span>
            </div>
          </div>
          <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${range.color} flex items-center justify-end px-3`}
              style={{ width: `${(range.count / maxCount) * 100}%` }}
            >
              {range.count > 0 && (
                <span className="text-xs font-bold text-white">{range.count}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TravelTimeBar({ route, thresholdWaktu, onSelect }) {
  const percentage = Math.min((route.waktu / thresholdWaktu) * 100, 100);
  const isOverThreshold = route.waktu > thresholdWaktu;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer" onClick={onSelect}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-gray-900">{route.sekolah}</div>
          <div className="text-xs text-gray-600 mt-1">{route.rute}</div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-black ${
            route.waktu <= 20 ? 'text-green-600' :
            route.waktu <= 30 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {route.waktu} mnt
          </div>
          <div className="text-xs text-gray-600">{route.jarak} km</div>
        </div>
      </div>

      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            route.waktu <= 20 ? 'bg-gradient-to-r from-green-500 to-green-600' :
            route.waktu <= 30 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
            'bg-gradient-to-r from-red-500 to-red-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-gray-700"
          style={{ left: '100%' }}
        />
      </div>

      <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
        <span>Threshold: {thresholdWaktu} menit</span>
        {isOverThreshold && (
          <span className="text-red-600 font-bold">⚠ Melebihi {route.waktu - thresholdWaktu} menit</span>
        )}
      </div>

      {route.lintasKendala.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {route.lintasKendala.map((kendala, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
              {kendala}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ==============================================
// DISTANCE MATRIX VIEW
// ==============================================
function DistanceMatrixView({ data }) {
  // Group by SPPG
  const sppgGroups = {};
  data.forEach(route => {
    if (!sppgGroups[route.sppg]) {
      sppgGroups[route.sppg] = [];
    }
    sppgGroups[route.sppg].push(route);
  });

  return (
    <div className="space-y-6">
      {/* Matrix Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">Distance Matrix Analysis</h3>
          <p className="text-xs text-gray-600 mt-1">Matriks jarak komprehensif sekolah ke SPPG terdekat</p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Optimal (&lt;10 km)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Waspada (10-15 km)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>Kritis (&gt;15 km)</span>
          </div>
        </div>
      </div>

      {/* Matrix by SPPG */}
      {Object.entries(sppgGroups).map(([sppgName, routes], idx) => (
        <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold">{sppgName}</h4>
                <p className="text-sm text-purple-100 mt-1">{routes.length} sekolah dilayani</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">
                  {(routes.reduce((sum, r) => sum + r.jarak, 0) / routes.length).toFixed(1)} km
                </div>
                <div className="text-xs text-purple-100">rata-rata jarak</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map((route, ridx) => (
                <MatrixCell key={ridx} route={route} />
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Min Distance</div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.min(...routes.map(r => r.jarak)).toFixed(1)} km
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Max Distance</div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.max(...routes.map(r => r.jarak)).toFixed(1)} km
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Avg Travel Time</div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(routes.reduce((sum, r) => sum + r.waktu, 0) / routes.length)} min
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Total Siswa</div>
                <div className="text-lg font-bold text-gray-900">
                  {routes.reduce((sum, r) => sum + r.siswa, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Overall Matrix Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <Layers className="w-5 h-5 text-blue-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-blue-900 mb-2">Analisis Distance Matrix</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Total rute unik: <span className="font-bold">{data.length} koneksi</span></li>
              <li>• Jarak terpendek: <span className="font-bold text-green-700">{Math.min(...data.map(d => d.jarak)).toFixed(1)} km</span></li>
              <li>• Jarak terjauh: <span className="font-bold text-red-700">{Math.max(...data.map(d => d.jarak)).toFixed(1)} km</span></li>
              <li>• Variance jarak: <span className="font-bold">
                {(data.reduce((sum, d) => sum + Math.pow(d.jarak - (data.reduce((s, x) => s + x.jarak, 0) / data.length), 2), 0) / data.length).toFixed(2)} km²
              </span></li>
              <li>• Rekomendasi: Pertimbangkan realokasi untuk sekolah dengan jarak &gt; 15 km</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrixCell({ route }) {
  const getCellColor = () => {
    if (route.jarak <= 10) return 'bg-green-50 border-green-200';
    if (route.jarak <= 15) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`${getCellColor()} border rounded-lg p-3 hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900">{route.sekolah}</div>
          <div className="text-xs text-gray-600 mt-0.5">{route.siswa} siswa</div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-black ${
            route.jarak <= 10 ? 'text-green-700' :
            route.jarak <= 15 ? 'text-yellow-700' :
            'text-red-700'
          }`}>
            {route.jarak}
          </div>
          <div className="text-xs text-gray-600">km</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">⏱ {route.waktu} menit</span>
        <span className={`px-2 py-0.5 rounded font-semibold ${
          route.jalanKondisi === 'baik' ? 'bg-green-200 text-green-800' :
          route.jalanKondisi === 'sedang' ? 'bg-yellow-200 text-yellow-800' :
          'bg-red-200 text-red-800'
        }`}>
          {route.jalanKondisi}
        </span>
      </div>
    </div>
  );
}
// ==============================================
// NETWORK ROUTES VIEW
// ==============================================
function NetworkRoutesView({ data }) {
  const [selectedRoute, setSelectedRoute] = React.useState(null);

  // Calculate route metrics
  const totalRoutes = data.length;
  const avgDistance = (data.reduce((sum, r) => sum + r.jarak, 0) / data.length).toFixed(1);
  const totalStudents = data.reduce((sum, r) => sum + r.siswa, 0);
  const criticalRoutes = data.filter(r => r.jarak > 15).length;

  return (
    <div className="space-y-6">
      {/* Network Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Network Overview</h3>
        
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-black text-blue-600">{totalRoutes}</div>
            <div className="text-xs text-gray-600 mt-1">Total Routes</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-black text-green-600">{avgDistance}</div>
            <div className="text-xs text-gray-600 mt-1">Avg Distance (km)</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-black text-purple-600">{totalStudents.toLocaleString()}</div>
            <div className="text-xs text-gray-600 mt-1">Total Students</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-black text-red-600">{criticalRoutes}</div>
            <div className="text-xs text-gray-600 mt-1">Critical Routes</div>
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All Routes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Sekolah</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">SPPG</th>
                  <th className="text-center text-xs font-semibold text-gray-600 pb-3">Jarak</th>
                  <th className="text-center text-xs font-semibold text-gray-600 pb-3">Waktu</th>
                  <th className="text-center text-xs font-semibold text-gray-600 pb-3">Siswa</th>
                  <th className="text-center text-xs font-semibold text-gray-600 pb-3">Kondisi</th>
                  <th className="text-center text-xs font-semibold text-gray-600 pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((route, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">{route.sekolah}</td>
                    <td className="py-3 text-sm text-gray-600">{route.sppg}</td>
                    <td className="py-3 text-center">
                      <span className={`text-sm font-bold ${
                        route.jarak <= 10 ? 'text-green-600' :
                        route.jarak <= 15 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {route.jarak} km
                      </span>
                    </td>
                    <td className="py-3 text-center text-sm text-gray-600">{route.waktu} min</td>
                    <td className="py-3 text-center text-sm text-gray-900">{route.siswa}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        route.jalanKondisi === 'baik' ? 'bg-green-100 text-green-700' :
                        route.jalanKondisi === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {route.jalanKondisi}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() => setSelectedRoute(route)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRoute && (
        <RouteDetailModal route={selectedRoute} onClose={() => setSelectedRoute(null)} />
      )}
    </div>
  );
}

// ==============================================
// RISK ASSESSMENT VIEW
// ==============================================
function RiskAssessmentView({ data }) {
  // Calculate risks
  const highRisk = data.filter(r => r.jarak > 15 || r.jalanKondisi === 'buruk');
  const mediumRisk = data.filter(r => (r.jarak > 10 && r.jarak <= 15) || r.jalanKondisi === 'sedang');
  const lowRisk = data.filter(r => r.jarak <= 10 && r.jalanKondisi === 'baik');

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Risk Assessment Summary</h3>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="border-2 border-red-200 rounded-xl p-5 bg-red-50">
            <div className="text-center">
              <div className="text-4xl font-black text-red-600">{highRisk.length}</div>
              <div className="text-sm font-semibold text-red-900 mt-2">High Risk</div>
              <div className="text-xs text-gray-600 mt-1">
                {((highRisk.length / data.length) * 100).toFixed(0)}% of routes
              </div>
            </div>
          </div>
          
          <div className="border-2 border-yellow-200 rounded-xl p-5 bg-yellow-50">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-600">{mediumRisk.length}</div>
              <div className="text-sm font-semibold text-yellow-900 mt-2">Medium Risk</div>
              <div className="text-xs text-gray-600 mt-1">
                {((mediumRisk.length / data.length) * 100).toFixed(0)}% of routes
              </div>
            </div>
          </div>
          
          <div className="border-2 border-green-200 rounded-xl p-5 bg-green-50">
            <div className="text-center">
              <div className="text-4xl font-black text-green-600">{lowRisk.length}</div>
              <div className="text-sm font-semibold text-green-900 mt-2">Low Risk</div>
              <div className="text-xs text-gray-600 mt-1">
                {((lowRisk.length / data.length) * 100).toFixed(0)}% of routes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High Risk Routes */}
      {highRisk.length > 0 && (
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">High Risk Routes - Immediate Action Required</h3>
          </div>
          
          <div className="space-y-3">
            {highRisk.map((route, idx) => (
              <div key={idx} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{route.sekolah}</div>
                    <div className="text-sm text-gray-600 mt-1">→ {route.sppg}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-red-600">{route.jarak} km</div>
                    <div className="text-xs text-gray-600">{route.waktu} menit</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-red-200 text-red-800 rounded font-semibold">
                    {route.jalanKondisi}
                  </span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded">
                    {route.siswa} siswa
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-bold text-blue-900 mb-4">Risk Mitigation Recommendations</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Prioritize road improvements for routes with "buruk" condition</li>
          <li>• Consider establishing new SPPG locations to reduce high-risk routes</li>
          <li>• Implement regular monitoring for medium-risk routes</li>
          <li>• Develop contingency plans for high-risk routes during emergencies</li>
        </ul>
      </div>
    </div>
  );
}

// ==============================================
// ROUTE DETAIL MODAL
// ==============================================
function RouteDetailModal({ route, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">{route.sekolah}</h3>
              <p className="text-blue-100 text-sm mt-1">Route Details</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">SPPG</div>
              <div className="text-lg font-bold text-gray-900">{route.sppg}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Jarak</div>
              <div className="text-lg font-bold text-blue-600">{route.jarak} km</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Waktu Tempuh</div>
              <div className="text-lg font-bold text-gray-900">{route.waktu} menit</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Jumlah Siswa</div>
              <div className="text-lg font-bold text-gray-900">{route.siswa}</div>
            </div>
          </div>

          {/* Road Condition */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-2">Kondisi Jalan</div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-lg font-bold ${
                route.jalanKondisi === 'baik' ? 'bg-green-100 text-green-700' :
                route.jalanKondisi === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {route.jalanKondisi.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className={`rounded-lg p-4 ${
            route.jarak > 15 || route.jalanKondisi === 'buruk' ? 'bg-red-50 border border-red-200' :
            route.jarak > 10 || route.jalanKondisi === 'sedang' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-green-50 border border-green-200'
          }`}>
            <div className="text-xs font-semibold text-gray-600 mb-2">Risk Level</div>
            <div className={`text-lg font-bold ${
              route.jarak > 15 || route.jalanKondisi === 'buruk' ? 'text-red-700' :
              route.jarak > 10 || route.jalanKondisi === 'sedang' ? 'text-yellow-700' :
              'text-green-700'
            }`}>
              {route.jarak > 15 || route.jalanKondisi === 'buruk' ? 'HIGH RISK' :
               route.jarak > 10 || route.jalanKondisi === 'sedang' ? 'MEDIUM RISK' :
               'LOW RISK'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalisisJarakPage;