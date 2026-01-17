import React, { useState, useEffect } from 'react';
import { Building2, Users, Database, Target, AlertTriangle, FileText, Award, Map } from 'lucide-react';
import { sekolahService, sppgService } from '../services/apiService';

// ==============================================
// DASHBOARD PAGE - SINTA 1 LEVEL
// ==============================================
function DashboardPage() {
  // Fallback data
  const fallbackSekolahData = [
    { id: 1, nama: 'SDN 1 Rancaekek', siswa: 245, jenjang: 'SD', status: 'layak' },
    { id: 2, nama: 'SDN 2 Rancaekek', siswa: 198, jenjang: 'SD', status: 'layak' },
    { id: 3, nama: 'SDN 3 Rancaekek', siswa: 312, jenjang: 'SD', status: 'waspada' },
    { id: 4, nama: 'SDN 4 Rancaekek', siswa: 278, jenjang: 'SD', status: 'layak' },
    { id: 5, nama: 'SDN 5 Rancaekek', siswa: 189, jenjang: 'SD', status: 'layak' },
    { id: 6, nama: 'SDN 6 Rancaekek', siswa: 156, jenjang: 'SD', status: 'kritis' },
    { id: 7, nama: 'SDN 7 Rancaekek', siswa: 223, jenjang: 'SD', status: 'layak' },
    { id: 8, nama: 'SDN 8 Rancaekek', siswa: 201, jenjang: 'SD', status: 'layak' },
  ];

  const fallbackSppgData = [
    { id: 1, nama: 'SPPG Rancaekek 1', kapasitas: 1000, produksi: 950 },
    { id: 2, nama: 'SPPG Rancaekek 2', kapasitas: 1000, produksi: 925 },
    { id: 3, nama: 'SPPG Rancaekek 3', kapasitas: 1000, produksi: 943 },
    { id: 4, nama: 'SPPG Rancaekek 4', kapasitas: 1000, produksi: 982 },
    { id: 5, nama: 'SPPG Rancaekek 5', kapasitas: 1000, produksi: 876 },
    { id: 6, nama: 'SPPG Rancaekek 6', kapasitas: 1000, produksi: 1000 },
    { id: 7, nama: 'SPPG Rancaekek 7', kapasitas: 1000, produksi: 951 },
    { id: 8, nama: 'SPPG Rancaekek 8', kapasitas: 1000, produksi: 917 },
  ];

  const [selectedKecamatan, setSelectedKecamatan] = useState('all');
  const [sekolahData, setSekolahData] = useState(fallbackSekolahData);
  const [sppgData, setSppgData] = useState(fallbackSppgData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const kecamatanList = ['Rancaekek', 'SD Negeri', 'SD Swasta'];

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sekolahRes, sppgRes] = await Promise.all([
          sekolahService.getAll(),
          sppgService.getAll()
        ]);

        if (sekolahRes.success) {
          setSekolahData(sekolahRes.data || fallbackSekolahData);
        } else {
          setSekolahData(fallbackSekolahData);
        }

        if (sppgRes.success) {
          setSppgData(sppgRes.data || fallbackSppgData);
        } else {
          setSppgData(fallbackSppgData);
        }

        if (!sekolahRes.success || !sppgRes.success) {
          setError('Menggunakan data fallback - Backend belum siap');
        }
      } catch (err) {
        setError(err.message);
        setSekolahData(fallbackSekolahData);
        setSppgData(fallbackSppgData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-3 text-gray-600 font-medium text-sm">Memuat dashboard...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">{error}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard MBG Kec. Rancaekek</h2>
          <p className="text-sm text-gray-600 mt-1">
            Sistem Pelayanan Makanan Bergizi Gratis - Data REAL Dapodik SD Rancaekek
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {kecamatanList.map((kec, idx) => (
              <option key={idx} value={idx === 0 ? 'all' : kec.toLowerCase()}>{kec}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics Cards - DYNAMIC FROM DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetricCard
          icon={Building2}
          title="Total Sekolah"
          value={(sekolahData?.length || 0).toString()}
          subtitle="SD Kec. Rancaekek"
          change="+0"
          changeLabel="Stabil"
          color="blue"
          trend="up"
        />
        <DashboardMetricCard
          icon={Users}
          title="Total Siswa MBG"
          value={((sekolahData?.reduce((sum, s) => sum + (s?.siswa || 0), 0) || 0)).toLocaleString()}
          subtitle="Penerima manfaat"
          change="+0%"
          changeLabel="Data REAL Dapodik"
          color="green"
          trend="up"
        />
        <DashboardMetricCard
          icon={Database}
          title="Total SPPG"
          value={(sppgData?.length || 0).toString()}
          subtitle="Unit produksi"
          change="+0"
          changeLabel="Kebutuhan terukur"
          color="purple"
          trend="up"
        />
        <DashboardMetricCard
          icon={Target}
          title="Biaya Per Hari"
          value={`Rp${(((sekolahData?.reduce((sum, s) => sum + (s?.siswa || 0), 0) || 0) * 20000) / 1000000).toFixed(2)}J`}
          subtitle={`Rp${((sekolahData?.reduce((sum, s) => sum + (s?.siswa || 0), 0) || 0) * 20000).toLocaleString()}`}
          change={`+${(sppgData?.length || 0) * 3}`}
          changeLabel="Mobil distribusi"
          color="orange"
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Distribusi Status Kelayakan</h3>
              <p className="text-xs text-gray-500 mt-1">Per kecamatan dalam wilayah studi</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Layak</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">Waspada</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Kritis</span>
            </div>
          </div>
          <BarChartComponent />
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Tren Pelayanan MBG</h3>
            <p className="text-xs text-gray-500 mt-1">6 bulan terakhir (Jul - Des 2025)</p>
          </div>
          <LineChartComponent />
        </div>
      </div>

      {/* Map & Capacity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Map */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Peta Sebaran Sekolah & SPPG</h3>
              <p className="text-xs text-gray-500 mt-1">Visualisasi geografis distribusi pelayanan</p>
            </div>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
              Lihat WebGIS Lengkap →
            </button>
          </div>
          <MiniMapPlaceholder />
        </div>

        {/* Capacity Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Kapasitas Produksi</h3>
          <div className="space-y-4">
            <CapacityBar
              label="Kapasitas SPPG (20 unit)"
              current={19338}
              max={20000}
              color="blue"
            />
            <CapacityBar
              label="Target Harian"
              current={19338}
              max={19338}
              color="green"
            />
            <CapacityBar
              label="Utilization Rate"
              current={96.7}
              max={100}
              color="purple"
              isPercentage
            />
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-blue-900">Status Operasional</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Kapasitas produksi 20 SPPG telah tersedia dengan total 19.338 siswa. Semua sekolah di Kec. Rancaekek terlayani optimal.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Updates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Update Terkini</h3>
          <div className="space-y-3">
            <ActivityItem
              title="Data sekolah diperbarui"
              time="2 jam yang lalu"
              icon={Building2}
              color="blue"
            />
            <ActivityItem
              title="Analisis kelayakan selesai"
              time="5 jam yang lalu"
              icon={Target}
              color="green"
            />
            <ActivityItem
              title="Laporan bulanan generated"
              time="1 hari yang lalu"
              icon={FileText}
              color="purple"
            />
            <ActivityItem
              title="SPPG baru ditambahkan"
              time="2 hari yang lalu"
              icon={Database}
              color="orange"
            />
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Peringatan Sistem</h3>
          <div className="space-y-3">
            <AlertItem
              title="3 Sekolah butuh reassignment"
              description="Jarak melebihi threshold 15 km"
              severity="high"
            />
            <AlertItem
              title="SPPG Kec. Bandung Pusat overload"
              description="Kapasitas 95% - perlu monitoring"
              severity="medium"
            />
            <AlertItem
              title="Data quality check needed"
              description="12 records memerlukan validasi"
              severity="low"
            />
          </div>
        </div>
      </div>

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">Output Modul Dashboard</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan ringkasan eksekutif kondisi pelayanan MBG secara real-time, 
              mencakup indikator kinerja utama (KPI), distribusi geografis, dan status kelayakan pelayanan 
              untuk mendukung pengambilan keputusan berbasis data.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">KPI Metrics</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Trend Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Capacity Monitoring</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Alert System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Helper Components
function DashboardMetricCard({ icon: Icon, title, value, subtitle, change, changeLabel, color, trend }) {
  const colors = {
    blue: { bg: 'from-blue-600 to-blue-700', light: 'bg-blue-50', text: 'text-blue-700' },
    green: { bg: 'from-green-600 to-green-700', light: 'bg-green-50', text: 'text-green-700' },
    purple: { bg: 'from-purple-600 to-purple-700', light: 'bg-purple-50', text: 'text-purple-700' },
    orange: { bg: 'from-orange-600 to-orange-700', light: 'bg-orange-50', text: 'text-orange-700' }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color].bg} rounded-xl flex items-center justify-center shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`px-2 py-1 ${colors[color].light} ${colors[color].text} rounded-lg text-xs font-bold flex items-center gap-1`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </div>
      </div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-700 mb-1">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-600">{changeLabel}</span>
      </div>
    </div>
  );
}

function BarChartComponent() {
  const data = [
    { name: 'SD Negeri', layak: 54, waspada: 0, kritis: 0 },
    { name: 'SD Swasta', layak: 14, waspada: 0, kritis: 0 }
  ];

  const maxValue = Math.max(...data.map(d => d.layak + d.waspada + d.kritis));

  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">{item.name}</span>
            <span className="text-xs text-gray-500">{item.layak + item.waspada + item.kritis} sekolah</span>
          </div>
          <div className="flex h-8 rounded-lg overflow-hidden border border-gray-200">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(item.layak / maxValue) * 100}%` }}
            >
              {item.layak > 0 && item.layak}
            </div>
            <div 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(item.waspada / maxValue) * 100}%` }}
            >
              {item.waspada > 0 && item.waspada}
            </div>
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(item.kritis / maxValue) * 100}%` }}
            >
              {item.kritis > 0 && item.kritis}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChartComponent() {
  const months = ['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const values = [100, 100, 100, 100, 100, 100];

  return (
    <div className="h-48 flex items-end justify-between gap-4 pb-8">
      {months.map((month, idx) => {
        const height = (values[idx] / 100) * 100;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="text-xs font-bold text-blue-700 mb-2">{values[idx]}%</div>
            <div 
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
              style={{ height: `${height}%` }}
            />
            <div className="text-xs font-semibold text-gray-600 mt-2">{month}</div>
          </div>
        );
      })}
    </div>
  );
}

function MiniMapPlaceholder() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 rounded-xl h-72 flex items-center justify-center border-2 border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      <div className="text-center relative z-10">
        <Map className="w-16 h-16 text-gray-400 mx-auto mb-3" />
        <p className="text-sm font-semibold text-gray-700">Peta Interaktif</p>
        <p className="text-xs text-gray-500 mt-1">Klik "Lihat WebGIS Lengkap" untuk akses penuh</p>
      </div>
    </div>
  );
}

function CapacityBar({ label, current, max, color, isPercentage }) {
  const percentage = isPercentage ? current : (current / max) * 100;
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-700">{label}</span>
        <span className="text-xs font-bold text-gray-900">
          {isPercentage ? `${current.toFixed(1)}%` : current.toLocaleString()}
        </span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {!isPercentage && (
        <div className="text-xs text-gray-500 mt-1">Target: {max.toLocaleString()}</div>
      )}
    </div>
  );
}

function ActivityItem({ title, time, icon: Icon, color }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-10 h-10 ${colors[color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    </div>
  );
}

function AlertItem({ title, description, severity }) {
  const severityConfig = {
    high: { color: 'red', icon: AlertTriangle, label: 'Tinggi' },
    medium: { color: 'yellow', icon: AlertTriangle, label: 'Sedang' },
    low: { color: 'blue', icon: AlertTriangle, label: 'Rendah' }
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border-l-4 ${
      severity === 'high' ? 'bg-red-50 border-red-500' :
      severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
      'bg-blue-50 border-blue-500'
    }`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${
          severity === 'high' ? 'text-red-600' :
          severity === 'medium' ? 'text-yellow-600' :
          'text-blue-600'
        }`} />
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900">{title}</div>
          <div className="text-xs text-gray-600 mt-1">{description}</div>
          <div className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold ${
            severity === 'high' ? 'bg-red-200 text-red-800' :
            severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
            'bg-blue-200 text-blue-800'
          }`}>
            Prioritas {config.label}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// LEAFLET LOADER - Dynamic CDN Loading
// ==============================================
const LeafletLoader = () => {
  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
    document.head.appendChild(script);

    // Load Leaflet.markercluster CSS
    const clusterCSS = document.createElement('link');
    clusterCSS.rel = 'stylesheet';
    clusterCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css';
    document.head.appendChild(clusterCSS);

    const clusterDefaultCSS = document.createElement('link');
    clusterDefaultCSS.rel = 'stylesheet';
    clusterDefaultCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css';
    document.head.appendChild(clusterDefaultCSS);

    // Load Leaflet.markercluster JS
    const clusterScript = document.createElement('script');
    clusterScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js';
    document.head.appendChild(clusterScript);

    // Load Leaflet.heat JS
    const heatScript = document.createElement('script');
    heatScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js';
    document.head.appendChild(heatScript);

    return () => {
      try {
        document.head.removeChild(link);
        document.head.removeChild(script);
        document.head.removeChild(clusterCSS);
        document.head.removeChild(clusterDefaultCSS);
        document.head.removeChild(clusterScript);
        document.head.removeChild(heatScript);
      } catch (e) {
        // Elements may have been removed already
      }
    };
  }, []);

  return null;
};

export default DashboardPage;