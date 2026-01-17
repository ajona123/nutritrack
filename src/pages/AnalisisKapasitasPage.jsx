import React, { useState } from 'react';
import { Database, TrendingUp, Target, Activity, AlertTriangle, BarChart3, Award } from 'lucide-react';

// ==============================================
// ANALISIS KAPASITAS PRODUKSI PAGE - SINTA 1 LEVEL
// ==============================================
function AnalisisKapasitasPage() {
  const [selectedSPPG, setSelectedSPPG] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // overview, detail, projection
  const [timeframe, setTimeframe] = useState('current'); // current, monthly, yearly

  // Comprehensive SPPG capacity data
  const sppgCapacityData = [
    {
      id: 1,
      nama: 'SPPG Bandung Pusat',
      kecamatan: 'Bandung',
      kapasitas: 15000,
      produksiAktual: 12500,
      utilisasi: 83.3,
      sekolahDilayani: 28,
      siswa: 6845,
      kebutuhanHarian: 6845 * 0.38,
      pekerja: 25,
      shiftKerja: 2,
      jamOperasional: 9,
      status: 'optimal',
      proyeksiDemand: 13200,
      surplus: 2500
    },
    {
      id: 2,
      nama: 'SPPG Cimahi',
      kecamatan: 'Cimahi',
      kapasitas: 12000,
      produksiAktual: 11200,
      utilisasi: 93.3,
      sekolahDilayani: 22,
      siswa: 5389,
      kebutuhanHarian: 5389 * 0.38,
      pekerja: 20,
      shiftKerja: 2,
      jamOperasional: 9,
      status: 'waspada',
      proyeksiDemand: 11800,
      surplus: 200
    },
    {
      id: 3,
      nama: 'SPPG Lembang',
      kecamatan: 'Lembang',
      kapasitas: 18000,
      produksiAktual: 17100,
      utilisasi: 95.0,
      sekolahDilayani: 35,
      siswa: 8956,
      kebutuhanHarian: 8956 * 0.38,
      pekerja: 32,
      shiftKerja: 2,
      jamOperasional: 9.5,
      status: 'high',
      proyeksiDemand: 17800,
      surplus: 200
    },
    {
      id: 4,
      nama: 'SPPG Cibeunying',
      kecamatan: 'Cibeunying',
      kapasitas: 14000,
      produksiAktual: 11900,
      utilisasi: 85.0,
      sekolahDilayani: 26,
      siswa: 6234,
      kebutuhanHarian: 6234 * 0.38,
      pekerja: 23,
      shiftKerja: 2,
      jamOperasional: 9,
      status: 'optimal',
      proyeksiDemand: 12400,
      surplus: 1600
    },
    {
      id: 5,
      nama: 'SPPG Soreang',
      kecamatan: 'Soreang',
      kapasitas: 10000,
      produksiAktual: 9450,
      utilisasi: 94.5,
      sekolahDilayani: 18,
      siswa: 4567,
      kebutuhanHarian: 4567 * 0.38,
      pekerja: 18,
      shiftKerja: 2,
      jamOperasional: 8.5,
      status: 'waspada',
      proyeksiDemand: 9800,
      surplus: 200
    }
  ];

  // Filtering
  const filteredData = sppgCapacityData.filter(sppg =>
    selectedSPPG === 'all' || sppg.nama === selectedSPPG
  );

  // Statistics
  const stats = {
    totalKapasitas: filteredData.reduce((sum, s) => sum + s.kapasitas, 0),
    totalProduksi: filteredData.reduce((sum, s) => sum + s.produksiAktual, 0),
    totalKebutuhan: filteredData.reduce((sum, s) => sum + s.kebutuhanHarian, 0),
    avgUtilisasi: (filteredData.reduce((sum, s) => sum + s.utilisasi, 0) / filteredData.length).toFixed(1),
    totalSurplus: filteredData.reduce((sum, s) => sum + s.surplus, 0),
    sppgOverload: filteredData.filter(s => s.utilisasi >= 90).length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analisis Kapasitas Produksi SPPG</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitoring utilisasi dan optimasi kapasitas produksi makanan bergizi
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedSPPG}
            onChange={(e) => setSelectedSPPG(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua SPPG</option>
            {sppgCapacityData.map(sppg => (
              <option key={sppg.id} value={sppg.nama}>{sppg.nama}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
            Export Analisis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <CapacityStatCard
          label="Total Kapasitas"
          value={stats.totalKapasitas.toLocaleString()}
          icon={Database}
          color="blue"
          unit="kg/hari"
        />
        <CapacityStatCard
          label="Produksi Aktual"
          value={stats.totalProduksi.toLocaleString()}
          icon={TrendingUp}
          color="green"
          unit="kg/hari"
        />
        <CapacityStatCard
          label="Total Kebutuhan"
          value={stats.totalKebutuhan.toFixed(0).toLocaleString()}
          icon={Target}
          color="orange"
          unit="kg/hari"
        />
        <CapacityStatCard
          label="Utilisasi Avg"
          value={`${stats.avgUtilisasi}%`}
          icon={Activity}
          color="purple"
        />
        <CapacityStatCard
          label="Surplus Total"
          value={stats.totalSurplus.toLocaleString()}
          icon={TrendingUp}
          color="teal"
          unit="kg/hari"
        />
        <CapacityStatCard
          label="SPPG Overload"
          value={stats.sppgOverload}
          icon={AlertTriangle}
          color="red"
          unit="unit"
        />
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-2">
          <CapacityViewButton 
            label="Overview" 
            value="overview" 
            active={viewMode} 
            onClick={setViewMode}
            icon={BarChart3}
          />
          <CapacityViewButton 
            label="Detail Analisis" 
            value="detail" 
            active={viewMode} 
            onClick={setViewMode}
            icon={Target}
          />
          <CapacityViewButton 
            label="Proyeksi Future" 
            value="projection" 
            active={viewMode} 
            onClick={setViewMode}
            icon={TrendingUp}
          />
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <CapacityOverviewView 
          data={filteredData}
          stats={stats}
        />
      )}
      {viewMode === 'detail' && (
        <CapacityDetailView 
          data={filteredData}
        />
      )}
      {viewMode === 'projection' && (
        <CapacityProjectionView 
          data={filteredData}
        />
      )}

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul Analisis Kapasitas Produksi</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan: (1) Analisis utilisasi kapasitas real-time per SPPG,
              (2) Identifikasi surplus/defisit produksi vs kebutuhan aktual, (3) Gap analysis untuk capacity planning,
              (4) Proyeksi kebutuhan kapasitas future berdasarkan pertumbuhan siswa, (5) Rekomendasi optimasi
              alokasi produksi dan ekspansi kapasitas untuk mendukung skalabilitas program MBG.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Utilization Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Capacity Planning</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Gap Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Future Projection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function CapacityStatCard({ label, value, icon: Icon, color, unit }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    orange: 'from-orange-600 to-orange-700',
    purple: 'from-purple-600 to-purple-700',
    teal: 'from-teal-600 to-teal-700',
    red: 'from-red-600 to-red-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-700">{label}</div>
      {unit && <div className="text-xs text-gray-500 mt-1">{unit}</div>}
    </div>
  );
}

function CapacityViewButton({ label, value, active, onClick, icon: Icon }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
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
// CAPACITY OVERVIEW VIEW
// ==============================================
function CapacityOverviewView({ data, stats }) {
  return (
    <div className="space-y-6">
      {/* Capacity vs Production Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Kapasitas vs Produksi per SPPG</h3>
            <p className="text-xs text-gray-600 mt-1">Perbandingan kapasitas maksimal dengan produksi aktual harian</p>
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
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-xs font-semibold text-gray-700">Kebutuhan</span>
            </div>
          </div>
        </div>
        <CapacityProductionChart data={data} />
      </div>

      {/* Utilization Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Analisis Utilisasi Kapasitas</h3>
          <p className="text-xs text-gray-600 mt-1">Tingkat penggunaan kapasitas produksi terhadap maksimum</p>
        </div>

        <div className="space-y-4">
          {data.map((sppg, idx) => (
            <UtilizationBar key={idx} sppg={sppg} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-700 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-yellow-900 mb-2">Peringatan Utilisasi</h5>
              <ul className="space-y-1 text-xs text-gray-700">
                {data.filter(s => s.utilisasi >= 90).map((sppg, idx) => (
                  <li key={idx}>• {sppg.nama}: {sppg.utilisasi}% utilisasi - risiko overload tinggi</li>
                ))}
                {data.filter(s => s.utilisasi >= 90).length === 0 && (
                  <li>• Semua SPPG dalam kondisi utilisasi normal</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Surplus/Deficit Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Status Kapasitas</h4>
          
          <div className="space-y-3">
            {data.map((sppg, idx) => {
              const surplusPercentage = (sppg.surplus / sppg.kapasitas) * 100;
              return (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{sppg.nama}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      sppg.surplus >= 1000 ? 'bg-green-100 text-green-700' :
                      sppg.surplus >= 500 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {sppg.surplus >= 0 ? 'Surplus' : 'Defisit'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Kapasitas: {sppg.kapasitas.toLocaleString()} kg</span>
                    <span className="font-bold text-gray-900">{sppg.surplus >= 0 ? '+' : ''}{sppg.surplus.toLocaleString()} kg</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Distribusi Status</h4>
          
          <div className="mb-6">
            <CapacityStatusPieChart data={data} />
          </div>

          <div className="space-y-2">
            <StatusLegendItem
              color="bg-green-500"
              label="Optimal"
              count={data.filter(s => s.status === 'optimal').length}
              description="Utilisasi 70-85%"
            />
            <StatusLegendItem
              color="bg-yellow-500"
              label="Waspada"
              count={data.filter(s => s.status === 'waspada').length}
              description="Utilisasi 85-95%"
            />
            <StatusLegendItem
              color="bg-red-500"
              label="High Load"
              count={data.filter(s => s.status === 'high').length}
              description="Utilisasi >95%"
            />
          </div>
        </div>
      </div>

      {/* Operational Efficiency */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Efisiensi Operasional</h3>
          <p className="text-xs text-gray-600 mt-1">Analisis produktivitas tenaga kerja dan waktu operasional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((sppg, idx) => (
            <OperationalEfficiencyCard key={idx} sppg={sppg} />
          ))}
        </div>
      </div>

      {/* Summary Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-blue-900 mb-2">Ringkasan Analisis Kapasitas</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Total kapasitas sistem: <span className="font-bold">{stats.totalKapasitas.toLocaleString()} kg/hari</span></li>
              <li>• Utilisasi rata-rata: <span className="font-bold">{stats.avgUtilisasi}%</span> (kategori {parseFloat(stats.avgUtilisasi) >= 85 ? 'tinggi' : 'optimal'})</li>
              <li>• Surplus kapasitas total: <span className="font-bold">{stats.totalSurplus.toLocaleString()} kg/hari</span> untuk ekspansi</li>
              <li>• {stats.sppgOverload} SPPG memerlukan monitoring ketat (utilisasi ≥90%)</li>
              <li>• Rekomendasi: {stats.sppgOverload > 0 ? 'Pertimbangkan realokasi atau peningkatan kapasitas' : 'Kapasitas mencukupi untuk kebutuhan saat ini'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Overview
function CapacityProductionChart({ data }) {
  const maxValue = Math.max(...data.map(d => d.kapasitas));

  return (
    <div className="space-y-4">
      {data.map((sppg, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">{sppg.nama}</span>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span>Utilisasi: <span className="font-bold text-gray-900">{sppg.utilisasi}%</span></span>
            </div>
          </div>
          <div className="relative h-14 bg-gray-100 rounded-lg overflow-hidden">
            {/* Capacity Background */}
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-300 to-blue-400 opacity-40"
              style={{ width: `${(sppg.kapasitas / maxValue) * 100}%` }}
            />
            {/* Production Bar */}
            <div 
              className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-3"
              style={{ width: `${(sppg.produksiAktual / maxValue) * 100}%` }}
            >
              <span className="text-xs font-bold text-white">{sppg.produksiAktual.toLocaleString()}</span>
            </div>
            {/* Demand Line */}
            <div 
              className="absolute h-full border-r-4 border-orange-500 border-dashed"
              style={{ left: `${(sppg.kebutuhanHarian / maxValue) * 100}%` }}
            />
            {/* Capacity Label */}
            <div 
              className="absolute h-full flex items-center px-3"
              style={{ left: `${(sppg.kapasitas / maxValue) * 100}%` }}
            >
              <span className="text-xs font-bold text-blue-700">{sppg.kapasitas.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Kebutuhan: {sppg.kebutuhanHarian.toFixed(0).toLocaleString()} kg</span>
            <span>Surplus: {sppg.surplus.toLocaleString()} kg</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function UtilizationBar({ sppg }) {
  const getUtilizationColor = (util) => {
    if (util >= 95) return 'from-red-500 to-red-600';
    if (util >= 85) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-semibold text-gray-900">{sppg.nama}</span>
          <span className="ml-2 text-xs text-gray-600">({sppg.pekerja} pekerja, {sppg.shiftKerja} shift)</span>
        </div>
        <span className={`text-lg font-black ${
          sppg.utilisasi >= 95 ? 'text-red-600' :
          sppg.utilisasi >= 85 ? 'text-yellow-600' :
          'text-green-600'
        }`}>
          {sppg.utilisasi}%
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${getUtilizationColor(sppg.utilisasi)}`}
          style={{ width: `${sppg.utilisasi}%` }}
        />
      </div>
    </div>
  );
}

function CapacityStatusPieChart({ data }) {
  const optimal = data.filter(s => s.status === 'optimal').length;
  const waspada = data.filter(s => s.status === 'waspada').length;
  const high = data.filter(s => s.status === 'high').length;
  const total = data.length;

  const optimalPercentage = (optimal / total) * 100;
  const waspadaPercentage = (waspada / total) * 100;
  const highPercentage = (high / total) * 100;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Green - Optimal */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="20"
            strokeDasharray={`${optimalPercentage * 2.513} 251.3`}
            strokeDashoffset="0"
          />
          {/* Yellow - Waspada */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#eab308"
            strokeWidth="20"
            strokeDasharray={`${waspadaPercentage * 2.513} 251.3`}
            strokeDashoffset={`-${optimalPercentage * 2.513}`}
          />
          {/* Red - High */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeDasharray={`${highPercentage * 2.513} 251.3`}
            strokeDashoffset={`-${(optimalPercentage + waspadaPercentage) * 2.513}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-black text-gray-900">{total}</div>
            <div className="text-xs text-gray-600">SPPG</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusLegendItem({ color, label, count, description }) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 ${color} rounded`}></div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          <div className="text-xs text-gray-600">{description}</div>
        </div>
      </div>
      <div className="text-lg font-black text-gray-900">{count}</div>
    </div>
  );
}

function OperationalEfficiencyCard({ sppg }) {
  const produksiPerPekerja = (sppg.produksiAktual / sppg.pekerja).toFixed(0);
  const produksiPerJam = (sppg.produksiAktual / sppg.jamOperasional).toFixed(0);

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <h5 className="text-sm font-bold text-gray-900 mb-3">{sppg.nama}</h5>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Produksi/Pekerja</span>
          <span className="font-bold text-gray-900">{produksiPerPekerja} kg</span>
        </div><div className="flex justify-between text-xs">
          <span className="text-gray-600">Produksi/Jam</span>
          <span className="font-bold text-gray-900">{produksiPerJam} kg</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Jam Operasional</span>
          <span className="font-bold text-gray-900">{sppg.jamOperasional} jam</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Shift Kerja</span>
          <span className="font-bold text-gray-900">{sppg.shiftKerja} shift</span>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// CAPACITY DETAIL VIEW
// ==============================================
function CapacityDetailView({ data }) {
  return (
    <div className="space-y-6">
      {/* Detailed Capacity Cards */}
      <div className="grid grid-cols-1 gap-6">
        {data.map((sppg, idx) => (
          <DetailedCapacityCard key={idx} sppg={sppg} />
        ))}
      </div>

      {/* Bottleneck Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Analisis Bottleneck Produksi</h3>
          <p className="text-xs text-gray-600 mt-1">Identifikasi kendala dan limitasi kapasitas</p>
        </div>

        <div className="space-y-4">
          {data.map((sppg, idx) => (
            <BottleneckAnalysisCard key={idx} sppg={sppg} />
          ))}
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Rekomendasi Optimasi Kapasitas</h3>
          <p className="text-xs text-gray-600 mt-1">Saran peningkatan efisiensi dan produktivitas</p>
        </div>

        <div className="space-y-4">
          {data.map((sppg, idx) => {
            const recommendations = generateRecommendations(sppg);
            return recommendations.length > 0 && (
              <OptimizationRecommendationCard key={idx} sppg={sppg} recommendations={recommendations} />
            );
          })}
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Alokasi Sumber Daya</h3>
          <p className="text-xs text-gray-600 mt-1">Distribusi tenaga kerja dan waktu operasional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Worker Distribution */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Distribusi Tenaga Kerja</h4>
            <div className="space-y-3">
              {data.map((sppg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{sppg.nama}</div>
                    <div className="text-xs text-gray-600">{sppg.pekerja} pekerja</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {(sppg.produksiAktual / sppg.pekerja).toFixed(0)} kg
                    </div>
                    <div className="text-xs text-gray-600">per pekerja</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Allocation */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Alokasi Waktu Operasional</h4>
            <div className="space-y-3">
              {data.map((sppg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{sppg.nama}</div>
                    <div className="text-xs text-gray-600">{sppg.jamOperasional} jam/hari</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {(sppg.produksiAktual / sppg.jamOperasional).toFixed(0)} kg
                    </div>
                    <div className="text-xs text-gray-600">per jam</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Perbandingan Kinerja Antar SPPG</h3>
          <p className="text-xs text-gray-600 mt-1">Benchmarking efisiensi dan produktivitas</p>
        </div>

        <ComparativePerformanceChart data={data} />
      </div>
    </div>
  );
}

// Helper Components for Detail View
function DetailedCapacityCard({ sppg }) {
  const gapPercentage = ((sppg.kapasitas - sppg.kebutuhanHarian) / sppg.kapasitas) * 100;
  
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-1">{sppg.nama}</h4>
          <p className="text-sm text-gray-600">{sppg.kecamatan} • {sppg.sekolahDilayani} sekolah dilayani</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
          sppg.status === 'optimal' ? 'bg-green-100 text-green-700' :
          sppg.status === 'waspada' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {sppg.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricBox label="Kapasitas" value={sppg.kapasitas.toLocaleString()} unit="kg/hari" color="blue" />
        <MetricBox label="Produksi" value={sppg.produksiAktual.toLocaleString()} unit="kg/hari" color="green" />
        <MetricBox label="Kebutuhan" value={sppg.kebutuhanHarian.toFixed(0).toLocaleString()} unit="kg/hari" color="orange" />
        <MetricBox label="Utilisasi" value={`${sppg.utilisasi}%`} unit="kapasitas" color="purple" />
      </div>

      {/* Capacity Bar Visualization */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Utilisasi Kapasitas</span>
          <span className="font-bold text-gray-900">{sppg.utilisasi}%</span>
        </div>
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full ${
              sppg.utilisasi >= 95 ? 'bg-gradient-to-r from-red-500 to-red-600' :
              sppg.utilisasi >= 85 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-green-500 to-green-600'
            } flex items-center justify-center text-white text-xs font-bold`}
            style={{ width: `${sppg.utilisasi}%` }}
          >
            {sppg.produksiAktual.toLocaleString()} kg
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 kg</span>
          <span>{sppg.kapasitas.toLocaleString()} kg</span>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Surplus</div>
          <div className="text-lg font-black text-gray-900">{sppg.surplus.toLocaleString()}</div>
          <div className="text-xs text-gray-500">kg/hari</div>
        </div>
        <div className="text-center border-l border-r border-gray-300">
          <div className="text-xs text-gray-600 mb-1">Siswa</div>
          <div className="text-lg font-black text-gray-900">{sppg.siswa.toLocaleString()}</div>
          <div className="text-xs text-gray-500">total</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Gap</div>
          <div className="text-lg font-black text-gray-900">{gapPercentage.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">kapasitas</div>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value, unit, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div className={`${colors[color]} rounded-lg p-3 border`}>
      <div className="text-xs font-semibold mb-1">{label}</div>
      <div className="text-xl font-black mb-0.5">{value}</div>
      <div className="text-xs opacity-75">{unit}</div>
    </div>
  );
}

function BottleneckAnalysisCard({ sppg }) {
  const bottlenecks = [];
  
  if (sppg.utilisasi >= 90) {
    bottlenecks.push({
      type: 'capacity',
      severity: 'high',
      issue: 'Kapasitas hampir maksimal',
      impact: 'Risiko tidak mampu memenuhi lonjakan permintaan',
      solution: 'Pertimbangkan penambahan shift atau peningkatan kapasitas'
    });
  }

  if (sppg.pekerja < 20) {
    bottlenecks.push({
      type: 'workforce',
      severity: 'medium',
      issue: 'Jumlah pekerja terbatas',
      impact: 'Produktivitas per pekerja tinggi, risiko kelelahan',
      solution: 'Rekrutmen pekerja tambahan atau rotasi shift optimal'
    });
  }

  if (sppg.jamOperasional < 9) {
    bottlenecks.push({
      type: 'time',
      severity: 'low',
      issue: 'Jam operasional dapat dioptimalkan',
      impact: 'Potensi peningkatan produksi belum maksimal',
      solution: 'Evaluasi penambahan jam operasional jika diperlukan'
    });
  }

  if (bottlenecks.length === 0) {
    bottlenecks.push({
      type: 'none',
      severity: 'none',
      issue: 'Tidak ada bottleneck signifikan',
      impact: 'Operasional berjalan optimal',
      solution: 'Pertahankan standar operasional saat ini'
    });
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h5 className="text-sm font-bold text-gray-900 mb-4">{sppg.nama}</h5>
      <div className="space-y-3">
        {bottlenecks.map((bottleneck, idx) => (
          <BottleneckItem key={idx} bottleneck={bottleneck} />
        ))}
      </div>
    </div>
  );
}

function BottleneckItem({ bottleneck }) {
  const severityConfig = {
    high: { color: 'red', icon: '🔴', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
    medium: { color: 'yellow', icon: '🟡', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
    low: { color: 'blue', icon: '🔵', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    none: { color: 'green', icon: '🟢', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' }
  };

  const config = severityConfig[bottleneck.severity];

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-3`}>
      <div className="flex items-start gap-2 mb-2">
        <span className="text-lg">{config.icon}</span>
        <div className="flex-1">
          <div className={`text-sm font-bold ${config.text} mb-1`}>{bottleneck.issue}</div>
          <div className="text-xs text-gray-700 mb-2">{bottleneck.impact}</div>
          <div className="text-xs text-gray-600 bg-white bg-opacity-50 rounded p-2">
            <span className="font-semibold">Solusi:</span> {bottleneck.solution}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateRecommendations(sppg) {
  const recommendations = [];

  if (sppg.utilisasi >= 95) {
    recommendations.push({
      priority: 'high',
      title: 'Peningkatan Kapasitas Urgent',
      description: `Utilisasi ${sppg.utilisasi}% sangat tinggi. Risiko overload dan penurunan kualitas.`,
      actions: [
        'Tambah 1 shift produksi (estimasi +30% kapasitas)',
        'Upgrade peralatan produksi',
        'Rekrutmen 5-8 pekerja tambahan'
      ]
    });
  } else if (sppg.utilisasi >= 85) {
    recommendations.push({
      priority: 'medium',
      title: 'Monitoring & Preventif',
      description: `Utilisasi ${sppg.utilisasi}% mendekati batas optimal. Perlu monitoring ketat.`,
      actions: [
        'Siapkan contingency plan untuk lonjakan permintaan',
        'Optimasi alur produksi untuk efisiensi',
        'Evaluasi penambahan kapasitas dalam 3 bulan'
      ]
    });
  }

  if (sppg.surplus >= 2000) {
    recommendations.push({
      priority: 'low',
      title: 'Peluang Ekspansi',
      description: `Surplus ${sppg.surplus.toLocaleString()} kg dapat dimanfaatkan untuk ekspansi layanan.`,
      actions: [
        'Evaluasi penambahan sekolah sasaran di radius 15-20 km',
        'Pertimbangkan kolaborasi antar-kecamatan',
        'Diversifikasi menu dengan kapasitas tersedia'
      ]
    });
  }

  return recommendations;
}

function OptimizationRecommendationCard({ sppg, recommendations }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h5 className="text-sm font-bold text-gray-900 mb-4">{sppg.nama}</h5>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <RecommendationItem key={idx} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}

function RecommendationItem({ recommendation }) {
  const priorityConfig = {
    high: { bg: 'from-red-50 to-red-100', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-600' },
    medium: { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-600' },
    low: { bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600' }
  };

  const config = priorityConfig[recommendation.priority];

  return (
    <div className={`bg-gradient-to-r ${config.bg} border ${config.border} rounded-lg p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`${config.badge} text-white px-2 py-1 rounded text-xs font-bold uppercase`}>
          {recommendation.priority}
        </div>
        <div className="flex-1">
          <h6 className={`text-sm font-bold ${config.text} mb-1`}>{recommendation.title}</h6>
          <p className="text-xs text-gray-700">{recommendation.description}</p>
        </div>
      </div>
      <div className="bg-white bg-opacity-60 rounded-lg p-3">
        <div className="text-xs font-semibold text-gray-700 mb-2">Action Plan:</div>
        <ul className="space-y-1">
          {recommendation.actions.map((action, idx) => (
            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
              <span className="text-blue-600 font-bold">→</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ComparativePerformanceChart({ data }) {
  const metrics = [
    { label: 'Utilisasi (%)', key: 'utilisasi', max: 100 },
    { label: 'Produktivitas (kg/pekerja)', key: 'prodPerWorker', max: 1000 },
    { label: 'Efisiensi Waktu (kg/jam)', key: 'prodPerHour', max: 2000 }
  ];

  const enrichedData = data.map(sppg => ({
    ...sppg,
    prodPerWorker: sppg.produksiAktual / sppg.pekerja,
    prodPerHour: sppg.produksiAktual / sppg.jamOperasional
  }));

  return (
    <div className="space-y-6">
      {metrics.map((metric, idx) => (
        <div key={idx}>
          <h5 className="text-sm font-semibold text-gray-700 mb-3">{metric.label}</h5>
          <div className="space-y-2">
            {enrichedData.map((sppg, sidx) => {
              const value = sppg[metric.key];
              const percentage = (value / metric.max) * 100;
              const isTop = value === Math.max(...enrichedData.map(s => s[metric.key]));

              return (
                <div key={sidx} className="flex items-center gap-3">
                  <div className="w-32 text-xs font-medium text-gray-700 truncate">{sppg.nama}</div>
                  <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full flex items-center justify-end px-2 ${
                        isTop ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    >
                      <span className="text-xs font-bold text-white">{value.toFixed(metric.key === 'utilisasi' ? 1 : 0)}</span>
                    </div>
                  </div>
                  {isTop && <span className="text-yellow-500 text-lg">🏆</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==============================================
// CAPACITY PROJECTION VIEW
// ==============================================
function CapacityProjectionView({ data }) {
  // Projection scenarios
  const growthScenarios = [
    { name: 'Konservatif', rate: 0.03, label: '+3% siswa/tahun' },
    { name: 'Moderat', rate: 0.05, label: '+5% siswa/tahun' },
    { name: 'Agresif', rate: 0.08, label: '+8% siswa/tahun' }
  ];

  return (
    <div className="space-y-6">
      {/* Projection Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Proyeksi Kebutuhan Kapasitas</h3>
          <p className="text-xs text-gray-600 mt-1">Estimasi kebutuhan 1-5 tahun ke depan berdasarkan pertumbuhan siswa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {growthScenarios.map((scenario, idx) => (
            <GrowthScenarioCard key={idx} scenario={scenario} data={data} />
          ))}
        </div>
      </div>

      {/* Yearly Projection Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Proyeksi 5 Tahun</h3>
          <p className="text-xs text-gray-600 mt-1">Perbandingan kapasitas vs proyeksi kebutuhan</p>
        </div>
        <YearlyProjectionChart data={data} />
      </div>

      {/* SPPG-Specific Projections */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Proyeksi per SPPG</h3>
          <p className="text-xs text-gray-600 mt-1">Kebutuhan kapasitas individual 3 tahun ke depan</p>
        </div>

        <div className="space-y-6">
          {data.map((sppg, idx) => (
            <SPPGProjectionCard key={idx} sppg={sppg} />
          ))}
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-purple-900 mb-3">Rekomendasi Investasi Kapasitas</h4>
            <div className="space-y-3">
              <InvestmentRecommendation
                priority="Tahun 1-2"
                items={[
                  'SPPG Lembang: Peningkatan kapasitas +2000 kg (investasi ~Rp 500 juta)',
                  'SPPG Soreang: Penambahan 1 shift produksi (investasi ~Rp 200 juta)',
                  'Semua SPPG: Upgrade peralatan produksi untuk efisiensi (investasi ~Rp 300 juta)'
                ]}
              />
              <InvestmentRecommendation
                priority="Tahun 3-5"
                items={[
                  'SPPG Baru di wilayah ekspansi (investasi ~Rp 2-3 miliar)',
                  'Modernisasi sistem produksi dengan automation (investasi ~Rp 800 juta)',
                  'Peningkatan kapasitas penyimpanan cold storage (investasi ~Rp 400 juta)'
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Projection View
function GrowthScenarioCard({ scenario, data }) {
  const currentTotal = data.reduce((sum, s) => sum + s.siswa, 0);
  const year3 = Math.round(currentTotal * Math.pow(1 + scenario.rate, 3));
  const year5 = Math.round(currentTotal * Math.pow(1 + scenario.rate, 5));
  
  const currentDemand = data.reduce((sum, s) => sum + s.kebutuhanHarian, 0);
  const year3Demand = currentDemand * Math.pow(1 + scenario.rate, 3);
  const year5Demand = currentDemand * Math.pow(1 + scenario.rate, 5);

  const totalCapacity = data.reduce((sum, s) => sum + s.kapasitas, 0);
  const year3Gap = totalCapacity - year3Demand;
  const year5Gap = totalCapacity - year5Demand;

  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-sm font-bold text-gray-900">{scenario.name}</h5>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">{scenario.label}</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-gray-600 mb-1">Proyeksi Siswa (Tahun 3)</div>
          <div className="text-2xl font-black text-gray-900">{year3.toLocaleString()}</div>
          <div className="text-xs text-gray-500">+{(year3 - currentTotal).toLocaleString()} siswa</div>
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-1">Kebutuhan (Tahun 3)</div>
          <div className="text-lg font-bold text-gray-900">{year3Demand.toFixed(0).toLocaleString()} kg</div>
          <div className={`text-xs font-semibold ${year3Gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {year3Gap >= 0 ? 'Surplus' : 'Defisit'}: {Math.abs(year3Gap).toFixed(0).toLocaleString()} kg
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Tahun 5</div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-gray-700">{year5.toLocaleString()} siswa</span>
            <span className={`text-xs font-bold ${year5Gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {year5Gap >= 0 ? '+' : ''}{year5Gap.toFixed(0).toLocaleString()} kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function YearlyProjectionChart({ data }) {
  const totalCapacity = data.reduce((sum, s) => sum + s.kapasitas, 0);
  const currentDemand = data.reduce((sum, s) => sum + s.kebutuhanHarian, 0);
  const years = [2025, 2026, 2027, 2028, 2029, 2030];
  
  const projections = years.map((year, idx) => ({
    year,
    capacity: totalCapacity,
    conservative: currentDemand * Math.pow(1.03, idx),
    moderate: currentDemand * Math.pow(1.05, idx),
    aggressive: currentDemand * Math.pow(1.08, idx)
  }));

  const maxValue = Math.max(...projections.map(p => Math.max(p.capacity, p.aggressive)));

  return (
    <div className="h-80 flex items-end justify-between gap-2 pb-12">
      {projections.map((proj, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center">
          <div className="w-full h-full flex items-end justify-center gap-1">
            {/* Capacity line */}
            <div className="relative w-full" style={{ height: '100%' }}>
              <div
                className="absolute bottom-0 w-full border-t-2 border-blue-600 border-dashed"
                style={{ bottom: `${(proj.capacity / maxValue) * 100}%` }}
              />
            </div>
            
            {/* Demand bars */}
            <div className="flex gap-1 items-end w-full">
              <div
                className="flex-1 bg-green-400 rounded-t hover:bg-green-500 transition-colors"
                style={{ height: `${(proj.conservative / maxValue) * 100}%` }}
                title={`Konservatif: ${proj.conservative.toFixed(0)}`}
              />
              <div
                className="flex-1 bg-yellow-400 rounded-t hover:bg-yellow-500 transition-colors"
                style={{ height: `${(proj.moderate / maxValue) * 100}%` }}
                title={`Moderat: ${proj.moderate.toFixed(0)}`}
              />
              <div
                className="flex-1 bg-red-400 rounded-t hover:bg-red-500 transition-colors"
                style={{ height: `${(proj.aggressive / maxValue) * 100}%` }}
                title={`Agresif: ${proj.aggressive.toFixed(0)}`}
              />
            </div>
          </div>
          <div className="text-xs font-semibold text-gray-700 mt-2">{proj.year}</div>
        </div>
      ))}
    </div>
  );
}

function SPPGProjectionCard({ sppg }) {
  const years = [1, 2, 3];
  const growthRate = 0.05; // 5% growth per year
  
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h5 className="text-sm font-bold text-gray-900 mb-4">{sppg.nama}</h5>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Saat Ini</div>
          <div className="text-lg font-bold text-gray-900">{sppg.kebutuhanHarian.toFixed(0)}</div>
          <div className="text-xs text-gray-500">kg/hari</div>
          <div className={`mt-2 text-xs font-bold ${
            sppg.surplus >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {sppg.surplus >= 0 ? 'Surplus' : 'Defisit'}
          </div>
        </div>
        
        {years.map(year => {
          const projectedDemand = sppg.kebutuhanHarian * Math.pow(1 + growthRate, year);
          const projectedGap = sppg.kapasitas - projectedDemand;
          
          return (
            <div key={year} className="text-center">
              <div className="text-xs text-gray-600 mb-1">Tahun {year}</div>
              <div className="text-lg font-bold text-gray-900">{projectedDemand.toFixed(0)}</div>
              <div className="text-xs text-gray-500">kg/hari</div>
              <div className={`mt-2 text-xs font-bold ${
                projectedGap >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {projectedGap >= 0 ? '+' : ''}{projectedGap.toFixed(0)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InvestmentRecommendation({ priority, items }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <h5 className="font-bold text-gray-900">{priority}</h5>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-gray-700 pl-4">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalisisKapasitasPage;
