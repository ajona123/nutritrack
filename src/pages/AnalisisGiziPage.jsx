import React, { useState } from 'react';
import { Users, TrendingUp, Activity, Target, BarChart3, Award, Shield, BookOpen, Map } from 'lucide-react';

// ==============================================
// ANALISIS KEBUTUHAN GIZI PAGE - SINTA 1 LEVEL
// ==============================================
function AnalisisGiziPage() {
  const [selectedKecamatan, setSelectedKecamatan] = useState('all');
  const [selectedJenjang, setSelectedJenjang] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // overview, detail, heatmap

  // Comprehensive nutritional requirements data
  const kebutuhanGiziData = {
    perSiswa: {
      energi: 700, // kcal
      protein: 20, // gram
      lemak: 20, // gram
      karbohidrat: 100, // gram
      serat: 10, // gram
      vitaminA: 300, // mcg
      vitaminC: 45, // mg
      kalsium: 400, // mg
      zatBesi: 5, // mg
    },
    distribusiMenu: {
      nasiLauk: 0.40,
      sayuran: 0.30,
      buah: 0.20,
      susu: 0.10,
    }
  };

  // Data kebutuhan per kecamatan
  const kebutuhanPerWilayah = [
    { 
      kecamatan: 'Bandung', 
      sekolah: 45, 
      siswa: 10245, 
      kebutuhanHarian: 10245 * 0.38, // kg
      energiTotal: 10245 * 700,
      proteinTotal: 10245 * 20,
      status: 'terpenuhi'
    },
    { 
      kecamatan: 'Cimahi', 
      sekolah: 38, 
      siswa: 8672, 
      kebutuhanHarian: 8672 * 0.38,
      energiTotal: 8672 * 700,
      proteinTotal: 8672 * 20,
      status: 'terpenuhi'
    },
    { 
      kecamatan: 'Lembang', 
      sekolah: 52, 
      siswa: 11834, 
      kebutuhanHarian: 11834 * 0.38,
      energiTotal: 11834 * 700,
      proteinTotal: 11834 * 20,
      status: 'waspada'
    },
    { 
      kecamatan: 'Cibeunying', 
      sekolah: 41, 
      siswa: 9323, 
      kebutuhanHarian: 9323 * 0.38,
      energiTotal: 9323 * 700,
      proteinTotal: 9323 * 20,
      status: 'terpenuhi'
    },
    { 
      kecamatan: 'Soreang', 
      sekolah: 35, 
      siswa: 7817, 
      kebutuhanHarian: 7817 * 0.38,
      energiTotal: 7817 * 700,
      proteinTotal: 7817 * 20,
      status: 'terpenuhi'
    }
  ];

  // Filtering
  const filteredData = kebutuhanPerWilayah.filter(w => 
    selectedKecamatan === 'all' || w.kecamatan === selectedKecamatan
  );

  // Statistics
  const stats = {
    totalSiswa: filteredData.reduce((sum, w) => sum + w.siswa, 0),
    totalKebutuhan: filteredData.reduce((sum, w) => sum + w.kebutuhanHarian, 0),
    totalEnergi: filteredData.reduce((sum, w) => sum + w.energiTotal, 0),
    totalProtein: filteredData.reduce((sum, w) => sum + w.proteinTotal, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analisis Kebutuhan Gizi MBG</h2>
          <p className="text-sm text-gray-600 mt-1">
            Perhitungan kebutuhan nutrisi harian siswa berdasarkan standar nasional
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Semua Kecamatan</option>
            {kebutuhanPerWilayah.map(w => (
              <option key={w.kecamatan} value={w.kecamatan}>{w.kecamatan}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
            Export Analisis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <NutritionStatCard
          label="Total Siswa"
          value={stats.totalSiswa.toLocaleString()}
          icon={Users}
          color="blue"
          unit="siswa"
        />
        <NutritionStatCard
          label="Kebutuhan Harian"
          value={stats.totalKebutuhan.toFixed(0).toLocaleString()}
          icon={TrendingUp}
          color="green"
          unit="kg"
        />
        <NutritionStatCard
          label="Total Energi"
          value={(stats.totalEnergi / 1000000).toFixed(2)}
          icon={Activity}
          color="orange"
          unit="M kcal"
        />
        <NutritionStatCard
          label="Total Protein"
          value={(stats.totalProtein / 1000).toFixed(1)}
          icon={Target}
          color="purple"
          unit="ton"
        />
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-2">
          <ViewModeButton 
            label="Overview" 
            value="overview" 
            active={viewMode} 
            onClick={setViewMode}
            icon={BarChart3}
          />
          <ViewModeButton 
            label="Detail Nutrisi" 
            value="detail" 
            active={viewMode} 
            onClick={setViewMode}
            icon={Target}
          />
          <ViewModeButton 
            label="Heatmap Wilayah" 
            value="heatmap" 
            active={viewMode} 
            onClick={setViewMode}
            icon={Map}
          />
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <OverviewNutritionView 
          data={filteredData} 
          kebutuhanGizi={kebutuhanGiziData}
          stats={stats}
        />
      )}
      {viewMode === 'detail' && (
        <DetailNutritionView 
          data={filteredData}
          kebutuhanGizi={kebutuhanGiziData}
        />
      )}
      {viewMode === 'heatmap' && (
        <HeatmapNutritionView 
          data={kebutuhanPerWilayah}
        />
      )}

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul Analisis Kebutuhan Gizi</h3>
            <p className="text-green-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan: (1) Kalkulasi kebutuhan nutrisi harian berdasarkan standar nasional per siswa,
              (2) Distribusi kebutuhan makronutrien (karbohidrat, protein, lemak) dan mikronutrien (vitamin, mineral),
              (3) Analisis gap kebutuhan vs kapasitas produksi SPPG, (4) Heatmap spasial kebutuhan per wilayah,
              (5) Rekomendasi menu seimbang untuk optimalisasi gizi.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Nutritional Calculation</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Macronutrient Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Spatial Distribution</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Gap Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Analisis Gizi
function NutritionStatCard({ label, value, icon: Icon, color, unit }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    orange: 'from-orange-600 to-orange-700',
    purple: 'from-purple-600 to-purple-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
      <div className="text-xs text-gray-500">{unit}</div>
    </div>
  );
}

function ViewModeButton({ label, value, active, onClick, icon: Icon }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        active === value
          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

// ==============================================
// OVERVIEW NUTRITION VIEW
// ==============================================
function OverviewNutritionView({ data, kebutuhanGizi, stats }) {
  return (
    <div className="space-y-6">
      {/* Nutritional Requirements per Student */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Kebutuhan Gizi per Siswa</h3>
            <p className="text-xs text-gray-600 mt-1">Berdasarkan standar nasional Angka Kecukupan Gizi (AKG)</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold">
            <Shield className="w-4 h-4" />
            Standar Nasional
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <NutrientCard label="Energi" value={kebutuhanGizi.perSiswa.energi} unit="kcal" color="orange" />
          <NutrientCard label="Protein" value={kebutuhanGizi.perSiswa.protein} unit="gram" color="red" />
          <NutrientCard label="Lemak" value={kebutuhanGizi.perSiswa.lemak} unit="gram" color="yellow" />
          <NutrientCard label="Karbohidrat" value={kebutuhanGizi.perSiswa.karbohidrat} unit="gram" color="blue" />
          <NutrientCard label="Serat" value={kebutuhanGizi.perSiswa.serat} unit="gram" color="green" />
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-green-700 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-green-900 mb-2">Standar Referensi</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Kebutuhan gizi disesuaikan dengan Peraturan Menteri Kesehatan RI tentang Angka Kecukupan Gizi (AKG) 
                untuk anak usia sekolah dasar (6-12 tahun). Nilai di atas adalah kebutuhan minimal per siswa per hari.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Requirements by Region */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Kebutuhan Total per Wilayah</h3>
          <p className="text-xs text-gray-600 mt-1">Agregasi kebutuhan harian seluruh siswa MBG</p>
        </div>

        <div className="space-y-4">
          {data.map((wilayah, idx) => (
            <RegionalRequirementBar key={idx} wilayah={wilayah} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-600 mb-1">Total Siswa</div>
            <div className="text-2xl font-black text-gray-900">{stats.totalSiswa.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-600 mb-1">Kebutuhan/Hari</div>
            <div className="text-2xl font-black text-gray-900">{stats.totalKebutuhan.toFixed(0).toLocaleString()} kg</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-600 mb-1">Energi Total</div>
            <div className="text-2xl font-black text-gray-900">{(stats.totalEnergi / 1000000).toFixed(1)}M kcal</div>
          </div>
        </div>
      </div>

      {/* Menu Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Distribusi Kebutuhan Menu</h3>
          <p className="text-xs text-gray-600 mt-1">Proporsi komponen makanan bergizi seimbang</p>
        </div>

        <div className="space-y-4">
          <MenuDistributionBar 
            label="Nasi & Lauk Pauk" 
            percentage={40} 
            value={stats.totalKebutuhan * 0.40}
            color="orange"
            nutrients="Sumber energi & protein utama"
          />
          <MenuDistributionBar 
            label="Sayuran" 
            percentage={30} 
            value={stats.totalKebutuhan * 0.30}
            color="green"
            nutrients="Sumber serat, vitamin & mineral"
          />
          <MenuDistributionBar 
            label="Buah-buahan" 
            percentage={20} 
            value={stats.totalKebutuhan * 0.20}
            color="purple"
            nutrients="Sumber vitamin C & antioksidan"
          />
          <MenuDistributionBar 
            label="Susu/Minuman" 
            percentage={10} 
            value={stats.totalKebutuhan * 0.10}
            color="blue"
            nutrients="Sumber kalsium & protein"
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-blue-700 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-blue-900 mb-1">Catatan Gizi</h5>
              <p className="text-xs text-gray-700">
                Distribusi menu mengikuti pedoman Gizi Seimbang dengan prinsip "Isi Piringku" 
                dari Kementerian Kesehatan RI, memastikan kebutuhan makronutrien dan mikronutrien terpenuhi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Capacity vs Requirement */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Gap Analysis: Kapasitas vs Kebutuhan</h3>
          <p className="text-xs text-gray-600 mt-1">Perbandingan kapasitas produksi SPPG dengan kebutuhan aktual</p>
        </div>

        <CapacityGapChart totalKebutuhan={stats.totalKebutuhan} />

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs font-semibold text-green-700">Status Pemenuhan</div>
            </div>
            <div className="text-2xl font-black text-green-900 mb-1">127.3%</div>
            <div className="text-xs text-gray-700">Kapasitas SPPG melebihi kebutuhan</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs font-semibold text-blue-700">Surplus Kapasitas</div>
            </div>
            <div className="text-2xl font-black text-blue-900 mb-1">4,892 kg</div>
            <div className="text-xs text-gray-700">Per hari untuk ekspansi</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NutrientCard({ label, value, unit, color }) {
  const colors = {
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200'
  };

  return (
    <div className={`${colors[color]} rounded-lg p-4 border`}>
      <div className="text-xs font-semibold mb-2">{label}</div>
      <div className="text-2xl font-black mb-1">{value}</div>
      <div className="text-xs opacity-75">{unit}</div>
    </div>
  );
}

function RegionalRequirementBar({ wilayah }) {
  const maxSiswa = 12000;
  const percentage = (wilayah.siswa / maxSiswa) * 100;

  const statusConfig = {
    terpenuhi: { bg: 'bg-green-500', badge: 'bg-green-100 text-green-700' },
    waspada: { bg: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700' },
    defisit: { bg: 'bg-red-500', badge: 'bg-red-100 text-red-700' }
  };

  const status = statusConfig[wilayah.status];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{wilayah.kecamatan}</span>
          <span className={`px-2 py-0.5 ${status.badge} rounded text-xs font-bold`}>
            {wilayah.status.toUpperCase()}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">{wilayah.siswa.toLocaleString()} siswa</div>
          <div className="text-xs text-gray-600">{wilayah.kebutuhanHarian.toFixed(0)} kg/hari</div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${status.bg}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function MenuDistributionBar({ label, percentage, value, color, nutrients }) {
  const colors = {
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500'
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          <div className="text-xs text-gray-600 mt-0.5">{nutrients}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">{percentage}%</div>
          <div className="text-xs text-gray-600">{value.toFixed(0)} kg</div>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function CapacityGapChart({ totalKebutuhan }) {
  const totalKapasitas = 18000; // Sample total SPPG capacity
  const kapasitasPercentage = (totalKapasitas / (totalKapasitas + totalKebutuhan)) * 100;
  const kebutuhanPercentage = (totalKebutuhan / (totalKapasitas + totalKebutuhan)) * 100;

  return (
    <div>
      <div className="flex h-16 rounded-xl overflow-hidden border-2 border-gray-200 mb-4">
        <div 
          className="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold"
          style={{ width: `${kapasitasPercentage}%` }}
        >
          <span className="text-sm">Kapasitas {totalKapasitas.toLocaleString()} kg</span>
        </div>
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold"
          style={{ width: `${kebutuhanPercentage}%` }}
        >
          <span className="text-sm">Kebutuhan {totalKebutuhan.toFixed(0).toLocaleString()} kg</span>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-600">
        <span>Surplus: <span className="font-bold text-green-700">{(totalKapasitas - totalKebutuhan).toFixed(0).toLocaleString()} kg</span></span>
        <span>Utilisasi: <span className="font-bold text-blue-700">{((totalKebutuhan / totalKapasitas) * 100).toFixed(1)}%</span></span>
      </div>
    </div>
  );
} 

// ==============================================
// DETAIL NUTRITION VIEW
// ==============================================
function DetailNutritionView({ data, kebutuhanGizi }) {
  return (
    <div className="space-y-6">
      {/* Micronutrient Requirements */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Kebutuhan Mikronutrien per Siswa</h3>
          <p className="text-xs text-gray-600 mt-1">Vitamin dan mineral esensial untuk pertumbuhan optimal</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MicronutrientCard
            label="Vitamin A"
            value={kebutuhanGizi.perSiswa.vitaminA}
            unit="mcg"
            icon="🥕"
            benefit="Kesehatan mata & imun"
            color="orange"
          />
          <MicronutrientCard
            label="Vitamin C"
            value={kebutuhanGizi.perSiswa.vitaminC}
            unit="mg"
            icon="🍊"
            benefit="Antioksidan & imunitas"
            color="yellow"
          />
          <MicronutrientCard
            label="Kalsium"
            value={kebutuhanGizi.perSiswa.kalsium}
            unit="mg"
            icon="🥛"
            benefit="Pertumbuhan tulang"
            color="blue"
          />
          <MicronutrientCard
            label="Zat Besi"
            value={kebutuhanGizi.perSiswa.zatBesi}
            unit="mg"
            icon="🥩"
            benefit="Mencegah anemia"
            color="red"
          />
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-orange-700 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-orange-900 mb-2">Pentingnya Mikronutrien</h5>
              <p className="text-xs text-gray-700 leading-relaxed">
                Mikronutrien (vitamin & mineral) sangat penting untuk mendukung pertumbuhan fisik, 
                perkembangan kognitif, dan sistem kekebalan tubuh anak usia sekolah. Defisiensi mikronutrien 
                dapat menyebabkan stunting, anemia, dan gangguan belajar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Requirements by Region */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Detail Kebutuhan per Wilayah</h3>
          <p className="text-xs text-gray-600 mt-1">Breakdown kebutuhan makronutrien & mikronutrien</p>
        </div>

        <div className="space-y-6">
          {data.map((wilayah, idx) => (
            <DetailedRegionCard key={idx} wilayah={wilayah} kebutuhanGizi={kebutuhanGizi} />
          ))}
        </div>
      </div>

      {/* Nutritional Balance Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Analisis Keseimbangan Gizi</h3>
          <p className="text-xs text-gray-600 mt-1">Proporsi makronutrien sesuai pedoman gizi seimbang</p>
        </div>

        <NutritionalBalancePieChart />

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-sm font-semibold text-orange-700 mb-1">Karbohidrat</div>
            <div className="text-2xl font-black text-orange-900">55-65%</div>
            <div className="text-xs text-gray-600 mt-1">dari total energi</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-sm font-semibold text-red-700 mb-1">Protein</div>
            <div className="text-2xl font-black text-red-900">10-15%</div>
            <div className="text-xs text-gray-600 mt-1">dari total energi</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-sm font-semibold text-yellow-700 mb-1">Lemak</div>
            <div className="text-2xl font-black text-yellow-900">25-30%</div>
            <div className="text-xs text-gray-600 mt-1">dari total energi</div>
          </div>
        </div>
      </div>

      {/* Food Sources Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Rekomendasi Sumber Pangan</h3>
          <p className="text-xs text-gray-600 mt-1">Bahan makanan untuk memenuhi kebutuhan gizi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FoodSourceCard
            category="Sumber Karbohidrat"
            foods={['Nasi', 'Roti gandum', 'Kentang', 'Ubi', 'Jagung']}
            color="orange"
            icon="🍚"
          />
          <FoodSourceCard
            category="Sumber Protein"
            foods={['Ayam', 'Ikan', 'Telur', 'Tempe', 'Tahu']}
            color="red"
            icon="🍗"
          />
          <FoodSourceCard
            category="Sumber Vitamin & Mineral"
            foods={['Sayur hijau', 'Wortel', 'Tomat', 'Brokoli', 'Bayam']}
            color="green"
            icon="🥬"
          />
          <FoodSourceCard
            category="Sumber Kalsium"
            foods={['Susu', 'Keju', 'Yogurt', 'Ikan teri', 'Kacang kedelai']}
            color="blue"
            icon="🥛"
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components for Detail View
function MicronutrientCard({ label, value, unit, icon, benefit, color }) {
  const colors = {
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    yellow: 'from-yellow-50 to-yellow-100 border-yellow-200',
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    red: 'from-red-50 to-red-100 border-red-200'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-xl p-4 border`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm font-bold text-gray-900 mb-1">{label}</div>
      <div className="text-2xl font-black text-gray-900 mb-1">
        {value} <span className="text-sm font-normal">{unit}</span>
      </div>
      <div className="text-xs text-gray-600 mt-2">{benefit}</div>
    </div>
  );
}

function DetailedRegionCard({ wilayah, kebutuhanGizi }) {
  const totalEnergi = wilayah.siswa * kebutuhanGizi.perSiswa.energi;
  const totalProtein = wilayah.siswa * kebutuhanGizi.perSiswa.protein;
  const totalLemak = wilayah.siswa * kebutuhanGizi.perSiswa.lemak;
  const totalKarbo = wilayah.siswa * kebutuhanGizi.perSiswa.karbohidrat;

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-gray-900">{wilayah.kecamatan}</h4>
          <p className="text-sm text-gray-600">{wilayah.siswa.toLocaleString()} siswa dari {wilayah.sekolah} sekolah</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">Total Kebutuhan</div>
          <div className="text-2xl font-black text-gray-900">{wilayah.kebutuhanHarian.toFixed(0)} kg</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NutrientDetailBox label="Energi" value={totalEnergi} unit="kcal" color="orange" />
        <NutrientDetailBox label="Protein" value={totalProtein} unit="g" color="red" />
        <NutrientDetailBox label="Lemak" value={totalLemak} unit="g" color="yellow" />
        <NutrientDetailBox label="Karbohidrat" value={totalKarbo} unit="g" color="blue" />
      </div>
    </div>
  );
}

function NutrientDetailBox({ label, value, unit, color }) {
  const colors = {
    orange: 'bg-orange-50 text-orange-700',
    red: 'bg-red-50 text-red-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    blue: 'bg-blue-50 text-blue-700'
  };

  return (
    <div className={`${colors[color]} rounded-lg p-3`}>
      <div className="text-xs font-semibold mb-1">{label}</div>
      <div className="text-lg font-black">
        {value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value.toLocaleString()}
      </div>
      <div className="text-xs opacity-75">{unit}</div>
    </div>
  );
}

function NutritionalBalancePieChart() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Karbohidrat 60% */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f97316"
            strokeWidth="20"
            strokeDasharray="150.8 251.3"
            strokeDashoffset="0"
          />
          {/* Protein 15% */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeDasharray="37.7 251.3"
            strokeDashoffset="-150.8"
          />
          {/* Lemak 25% */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#eab308"
            strokeWidth="20"
            strokeDasharray="62.8 251.3"
            strokeDashoffset="-188.5"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-700">Gizi</div>
            <div className="text-lg font-black text-gray-900">Seimbang</div>
          </div>
        </div>
      </div>
      <div className="ml-8 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-700">Karbohidrat (60%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-700">Lemak (25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-700">Protein (15%)</span>
        </div>
      </div>
    </div>
  );
}

function FoodSourceCard({ category, foods, color, icon }) {
  const colors = {
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    red: 'from-red-50 to-red-100 border-red-200',
    green: 'from-green-50 to-green-100 border-green-200',
    blue: 'from-blue-50 to-blue-100 border-blue-200'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-xl p-5 border`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{icon}</div>
        <h4 className="text-sm font-bold text-gray-900">{category}</h4>
      </div>
      <ul className="space-y-2">
        {foods.map((food, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            <span>{food}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==============================================
// HEATMAP NUTRITION VIEW
// ==============================================
function HeatmapNutritionView({ data }) {
  const maxKebutuhan = Math.max(...data.map(d => d.kebutuhanHarian));

  return (
    <div className="space-y-6">
      {/* Heatmap Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Heatmap Kebutuhan Gizi per Wilayah</h3>
          <p className="text-xs text-gray-600 mt-1">Visualisasi spasial intensitas kebutuhan pangan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.map((wilayah, idx) => {
            const intensity = (wilayah.kebutuhanHarian / maxKebutuhan) * 100;
            const heatColor = 
              intensity > 80 ? 'from-red-500 to-red-600' :
              intensity > 60 ? 'from-orange-500 to-orange-600' :
              intensity > 40 ? 'from-yellow-500 to-yellow-600' :
              'from-green-500 to-green-600';

            return (
              <div key={idx} className="relative group">
                <div className={`bg-gradient-to-br ${heatColor} rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer`}>
                  <div className="text-sm font-semibold mb-2">{wilayah.kecamatan}</div>
                  <div className="text-3xl font-black mb-2">
                    {wilayah.kebutuhanHarian.toFixed(0)}
                  </div>
                  <div className="text-xs opacity-90">kg/hari</div>
                  <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                    <div className="text-xs">{wilayah.siswa.toLocaleString()} siswa</div>
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Intensitas: {intensity.toFixed(1)}%
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-gray-700">Intensitas Kebutuhan:</span>
          <div className="flex items-center gap-1">
            <div className="w-12 h-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-l"></div>
            <div className="w-12 h-4 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            <div className="w-12 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-r"></div>
          </div>
          <div className="flex gap-4 text-xs text-gray-600 ml-2">
            <span>Rendah</span>
            <span>Sedang</span>
            <span>Tinggi</span>
          </div>
        </div>
      </div>

      {/* Spatial Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Distribusi Kebutuhan</h4>
          <div className="space-y-3">
            {data.map((wilayah, idx) => {
              const percentage = (wilayah.kebutuhanHarian / data.reduce((sum, w) => sum + w.kebutuhanHarian, 0)) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{wilayah.kecamatan}</span>
                    <span className="font-bold text-gray-900">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Ranking Wilayah</h4>
          <div className="space-y-3">
            {[...data].sort((a, b) => b.kebutuhanHarian - a.kebutuhanHarian).map((wilayah, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  idx === 0 ? 'bg-yellow-500' :
                  idx === 1 ? 'bg-gray-400' :
                  idx === 2 ? 'bg-orange-600' :
                  'bg-gray-300'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{wilayah.kecamatan}</div>
                  <div className="text-xs text-gray-600">{wilayah.siswa.toLocaleString()} siswa</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{wilayah.kebutuhanHarian.toFixed(0)}</div>
                  <div className="text-xs text-gray-600">kg/hari</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spatial Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
        <div className="flex items-start gap-3">
          <Map className="w-5 h-5 text-purple-700 mt-1" />
          <div>
            <h5 className="text-sm font-bold text-purple-900 mb-2">Insight Spasial</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Lembang memiliki kebutuhan tertinggi ({data.find(d => d.kecamatan === 'Lembang')?.kebutuhanHarian.toFixed(0)} kg/hari)</li>
              <li>• Soreang kebutuhan terendah namun perlu monitoring jarak distribusi</li>
              <li>• Distribusi kebutuhan relatif merata antar wilayah (CV &lt; 20%)</li>
              <li>• Rekomendasi: Optimasi rute distribusi dari SPPG terdekat untuk efisiensi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalisisGiziPage;