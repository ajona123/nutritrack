import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Download, FileSpreadsheet, Layers, Activity, Zap, Maximize2, X, ChevronUp, ChevronDown, MapPin, Building2, Gauge, Users, Truck, AlertCircle, TrendingUp, Info, Search, Settings, RefreshCw, Navigation, Award, Database, BarChart3 } from 'lucide-react';
import { useSchool } from '../contexts/SchoolContext';

// ==============================================
// WEBGIS PAGE - SINTA 1 LEVEL (CORE MODULE)
// ==============================================
function WebGISPage() {
  const [activeLayer, setActiveLayer] = useState({
    sekolah: true,
    sppg: true,
    wilayah: true,
    rute: false
  });
  const [selectedFilter, setSelectedFilter] = useState({
    jenjang: 'all',
    status: 'all'
  });
  const [mapMode, setMapMode] = useState('overview');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSPPG, setSelectedSPPG] = useState(null);
  const [mapStyle, setMapStyle] = useState('street');
  const [showMapStyles, setShowMapStyles] = useState(false);
  const [measureMode, setMeasureMode] = useState(false);
  const [measureType, setMeasureType] = useState('distance'); // 'distance' or 'area'
  const [coordinates, setCoordinates] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const toggleLayer = (layer) => {
    setActiveLayer(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  useEffect(() => {
    // Simulate analysis when mode changes
    if (mapMode === 'cluster') {
      setAnalysisResults({
        clusters: 5,
        silhouette: 0.73,
        avgSize: 249
      });
    } else if (mapMode === 'heatmap') {
      setAnalysisResults({
        hotspot: 'Kec. Lembang',
        coldspot: 'Kec. Soreang',
        bandwidth: '2 km'
      });
    } else if (mapMode === 'network') {
      setAnalysisResults({
        routes: 547,
        avgDistance: '8.3 km',
        maxTime: '45 min'
      });
    }
  }, [mapMode]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <LeafletLoader />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Map className="w-6 h-6 text-white" />
                </div>
                WebGIS Interaktif - Analisis Spasial MBG
              </h2>
              <p className="text-sm text-gray-600 mt-1 ml-13">
                Real-time geospatial analysis dengan clustering, heatmap & network routing optimization
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export PNG
              </button>
              <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2 transition-colors">
                <FileSpreadsheet className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Map Mode Selector & Style Selector - DALAM 1 BARIS */}
          <div className="flex items-center justify-between gap-4 pb-2">
            {/* Mode Buttons - Kiri */}
            <div className="flex gap-2 overflow-x-auto">
              <MapModeButton
                mode="overview"
                label="Overview Map"
                icon={Map}
                isActive={mapMode === 'overview'}
                onClick={() => setMapMode('overview')}
              />
              <MapModeButton
                mode="cluster"
                label="Cluster Analysis"
                icon={Layers}
                isActive={mapMode === 'cluster'}
                onClick={() => setMapMode('cluster')}
              />
              <MapModeButton
                mode="heatmap"
                label="Heatmap Density"
                icon={Activity}
                isActive={mapMode === 'heatmap'}
                onClick={() => setMapMode('heatmap')}
              />
              <MapModeButton
                mode="network"
                label="Network Routing"
                icon={MapPin}
                isActive={mapMode === 'network'}
                onClick={() => setMapMode('network')}
              />
            </div>

            {/* Style Selector - Kanan */}
            <div className="relative">
              <button
                onClick={() => setShowMapStyles(!showMapStyles)}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow border-2 border-gray-200 hover:border-blue-500 transition-all whitespace-nowrap"
              >
                <span className="text-lg">
                  {mapStyle === 'street' && '🗺️'}
                  {mapStyle === 'satellite' && '🛰️'}
                  {mapStyle === 'terrain' && '⛰️'}
                  {mapStyle === 'cartodb' && '📄'}
                  {mapStyle === 'dark' && '🌙'}
                  {mapStyle === 'topo' && '🗻'}
                </span>
                <span className="text-xs font-bold text-gray-700 capitalize">{mapStyle}</span>
                <ChevronDown className={`w-3 h-3 text-gray-600 transition-transform ${showMapStyles ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {showMapStyles && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden animate-slide-down">
                  <MapStyleOptionCompact
                    name="Street"
                    icon="🗺️"
                    active={mapStyle === 'street'}
                    onClick={() => {
                      setMapStyle('street');
                      setShowMapStyles(false);
                    }}
                  />
                  <MapStyleOptionCompact
                    name="Satellite"
                    icon="🛰️"
                    active={mapStyle === 'satellite'}
                    onClick={() => {
                      setMapStyle('satellite');
                      setShowMapStyles(false);
                    }}
                  />
                  <MapStyleOptionCompact
                    name="Terrain"
                    icon="⛰️"
                    active={mapStyle === 'terrain'}
                    onClick={() => {
                      setMapStyle('terrain');
                      setShowMapStyles(false);
                    }}
                  />
                  <MapStyleOptionCompact
                    name="CartoDB"
                    icon="📄"
                    active={mapStyle === 'cartodb'}
                    onClick={() => {
                      setMapStyle('cartodb');
                      setShowMapStyles(false);
                    }}
                  />
                  <MapStyleOptionCompact
                    name="Dark"
                    icon="🌙"
                    active={mapStyle === 'dark'}
                    onClick={() => {
                      setMapStyle('dark');
                      setShowMapStyles(false);
                    }}
                  />
                  <MapStyleOptionCompact
                    name="Topo"
                    icon="🗻"
                    active={mapStyle === 'topo'}
                    onClick={() => {
                      setMapStyle('topo');
                      setShowMapStyles(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative">
          <InteractiveLeafletMap
            mode={mapMode}
            layers={activeLayer}
            filters={selectedFilter}
            mapStyle={mapStyle}
            measureMode={measureMode}
            onSelectSchool={setSelectedSchool}
            onSelectSPPG={setSelectedSPPG}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center" style={{ zIndex: 2000 }}>
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-sm font-bold text-gray-700">Loading map data...</p>
              </div>
            </div>
          )}


          {/* Measure Tool */}
          <button
            onClick={() => setMeasureMode(!measureMode)}
            className={`absolute top-4 left-64 px-4 py-2 rounded-xl shadow-xl text-xs font-bold transition-all flex items-center gap-2 ${
              measureMode ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            style={{ zIndex: 1000 }}
          >
            <Navigation className="w-4 h-4" />
            Measure Distance
          </button>

          {/* Legend */}
          <MapLegend mode={mapMode} layers={activeLayer} activeLayer={activeLayer} />
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-xl">
          {/* Search/Locate Feature */}
          <div className="p-5 border-b border-gray-200">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari sekolah atau SPPG..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border-2 border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Layer Control */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Layer Control
            </h3>
            <div className="space-y-2">
              <LayerToggle
                label="Sekolah Sasaran"
                isActive={activeLayer.sekolah}
                onChange={() => toggleLayer('sekolah')}
              />
              <LayerToggle
                label="Satuan Produksi (SPPG)"
                isActive={activeLayer.sppg}
                onChange={() => toggleLayer('sppg')}
              />
              <LayerToggle
                label="Batas Wilayah"
                isActive={activeLayer.wilayah}
                onChange={() => toggleLayer('wilayah')}
              />
              <LayerToggle
                label="Network Routes"
                isActive={activeLayer.rute}
                onChange={() => toggleLayer('rute')}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Filter & Query
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">
                  Jenjang Sekolah
                </label>
                <select 
                  value={selectedFilter.jenjang}
                  onChange={(e) => setSelectedFilter(prev => ({ ...prev, jenjang: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">Semua Jenjang</option>
                  <option value="sd">SD</option>
                  <option value="mi">MI</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">
                  Status Kelayakan
                </label>
                <select 
                  value={selectedFilter.status}
                  onChange={(e) => setSelectedFilter(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">Semua Status</option>
                  <option value="layak">✓ Layak</option>
                  <option value="waspada">⚠ Waspada</option>
                  <option value="kritis">✕ Kritis</option>
                </select>
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">
                Apply Filter
              </button>
            </div>
          </div>

          {/* Spatial Query Tools */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Spatial Query</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl text-xs font-bold text-left transition-all text-blue-900">
                📍 Find Nearest SPPG
              </button>
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl text-xs font-bold text-left transition-all text-green-900">
                🎯 Buffer Analysis
              </button>
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl text-xs font-bold text-left transition-all text-orange-900">
                🔍 Hotspot Detection
              </button>
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl text-xs font-bold text-left transition-all text-purple-900">
                📊 Cluster Statistics
              </button>
            </div>
          </div>

          {/* Statistics & Analysis Results */}
          <div className="flex-1 overflow-y-auto p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Map Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Visible Features" value="1,294" color="blue" />
              <StatItem label="Selected Objects" value="0" color="green" />
              <StatItem label="Active Filters" value="2" color="orange" />
              <StatItem label="Zoom Level" value="12" color="purple" />
            </div>

            {/* Dynamic Analysis Results */}
            {analysisResults && mapMode === 'cluster' && (
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-700" />
                  <div className="text-sm font-bold text-blue-900">Cluster Analysis</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Clusters Detected</span>
                    <span className="font-bold text-blue-900">{analysisResults.clusters}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Silhouette Score</span>
                    <span className="font-bold text-blue-900">{analysisResults.silhouette}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Avg Cluster Size</span>
                    <span className="font-bold text-blue-900">{analysisResults.avgSize} schools</span>
                  </div>
                </div>
              </div>
            )}

            {analysisResults && mapMode === 'heatmap' && (
              <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-orange-700" />
                  <div className="text-sm font-bold text-orange-900">Density Analysis</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Hotspot Area</span>
                    <span className="font-bold text-orange-900">{analysisResults.hotspot}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Coldspot Area</span>
                    <span className="font-bold text-orange-900">{analysisResults.coldspot}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Kernel Bandwidth</span>
                    <span className="font-bold text-orange-900">{analysisResults.bandwidth}</span>
                  </div>
                </div>
              </div>
            )}

            {analysisResults && mapMode === 'network' && (
              <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-700" />
                  <div className="text-sm font-bold text-green-900">Network Analysis</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Total Routes</span>
                    <span className="font-bold text-green-900">{analysisResults.routes}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Avg Distance</span>
                    <span className="font-bold text-green-900">{analysisResults.avgDistance}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">Max Travel Time</span>
                    <span className="font-bold text-green-900">{analysisResults.maxTime}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {(selectedSchool || selectedSPPG) && (
        <DetailPanel
          type={selectedSchool ? 'sekolah' : 'sppg'}
          data={selectedSchool || selectedSPPG}
          onClose={() => {
            setSelectedSchool(null);
            setSelectedSPPG(null);
          }}
        />
      )}

      {/* Output Info */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-5 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-start gap-4 flex-1">
            <Award className="w-6 h-6 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="font-bold text-base mb-2">Output Modul WebGIS Interaktif</div>
              <div className="text-sm text-blue-100 leading-relaxed">
                Modul ini menghasilkan: (1) Peta interaktif real-time dengan OpenStreetMap, (2) Clustering otomatis dengan marker aggregation, 
                (3) Heatmap density visualization, (4) Network routing analysis dengan distance calculation, (5) Multi-layer spatial query tools, 
                (6) Interactive popup dengan data visualization.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white">Live Data</span>
            <span className="text-xs text-blue-100">Updated now</span>
          </div>
        </div>
      </div>
    </div>
  );
}



// ==============================================
// INTERACTIVE LEAFLET MAP COMPONENT
// ==============================================
function InteractiveLeafletMap({ mode, layers, filters, mapStyle, measureMode, onSelectSchool, onSelectSPPG }) {
  // Use Context API untuk real-time sync dengan SekolahPage ✨
  const { schools: contextSchools } = useSchool();
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({ sekolah: null, sppg: null, routes: [] });
  const heatLayerRef = useRef(null);
  const clustersRef = useRef(null);

  // ========================================
  // FUNGSI HELPER: KALKULASI JARAK & ROUTING
  // ========================================
  
  // Hitung jarak antara dua koordinat (Haversine formula)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius Earth dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Fungsi untuk mendistribusikan sekolah ke SPPG secara merata & dekat
  const distributeSchoolsToSPPG = () => {
    const schoolBySPPG = {};
    
    // Initialize empty array untuk setiap SPPG
    sppgData.forEach(sppg => {
      schoolBySPPG[sppg.nama] = [];
    });

    // Buat array dengan info jarak setiap sekolah ke setiap SPPG
    const schoolDistances = sekolahData.map(sekolah => {
      const distances = sppgData.map(sppg => ({
        sppgNama: sppg.nama,
        distance: calculateDistance(sekolah.lat, sekolah.lng, sppg.lat, sppg.lng)
      }));
      return {
        schoolId: sekolah.id,
        schoolName: sekolah.nama,
        distances: distances.sort((a, b) => a.distance - b.distance)
      };
    });

    // Distribusi sekolah ke SPPG dengan load balancing
    // Target: setiap SPPG dapat ~3-4 sekolah
    const targetPerSPPG = Math.ceil(sekolahData.length / sppgData.length);
    
    // Sort sekolah berdasarkan jarak ke SPPG terdekat
    schoolDistances.sort((a, b) => a.distances[0].distance - b.distances[0].distance);
    
    // Assign setiap sekolah ke SPPG terdekat yang belum penuh
    schoolDistances.forEach(school => {
      let assigned = false;
      for (let sppgOption of school.distances) {
        if (schoolBySPPG[sppgOption.sppgNama].length < targetPerSPPG) {
          schoolBySPPG[sppgOption.sppgNama].push({
            schoolId: school.schoolId,
            schoolName: school.schoolName,
            distance: sppgOption.distance
          });
          assigned = true;
          break;
        }
      }
      // Jika semua SPPG sudah penuh, assign ke SPPG dengan beban paling ringan
      if (!assigned) {
        let minLoadSPPG = Object.entries(schoolBySPPG)
          .reduce((min, [sppg, schools]) => 
            schools.length < schoolBySPPG[min].length ? sppg : min
          );
        schoolBySPPG[minLoadSPPG].push({
          schoolId: school.schoolId,
          schoolName: school.schoolName,
          distance: school.distances.find(d => d.sppgNama === minLoadSPPG)?.distance || 0
        });
      }
    });

    return schoolBySPPG;
  };

  // Color palette untuk setiap SPPG
  const sppgColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
    '#d946ef', '#ec4899', '#f43f5e', '#e11d48', '#7c3aed',
    '#06b6d4', '#059669', '#dc2626', '#ea580c', '#d97706'
  ];

  // ========================================
  // CUSTOM ICON UNTUK SEKOLAH (Bangunan)
  // ========================================
  const schoolIconSVG = `<svg width="40" height="48" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="46" rx="12" ry="2" fill="rgba(0,0,0,0.2)"/><rect x="8" y="20" width="24" height="24" fill="#2563eb" stroke="#1e40af" stroke-width="1.5"/><path d="M 4 20 L 20 8 L 36 20 Z" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/><rect x="16" y="32" width="8" height="12" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/><circle cx="19" cy="38" r="0.8" fill="#92400e"/><rect x="11" y="24" width="5" height="5" fill="#93c5fd" stroke="#1e40af" stroke-width="0.8"/><rect x="24" y="24" width="5" height="5" fill="#93c5fd" stroke="#1e40af" stroke-width="0.8"/><rect x="11" y="31" width="3" height="3" fill="#93c5fd" stroke="#1e40af" stroke-width="0.8"/><rect x="26" y="31" width="3" height="3" fill="#93c5fd" stroke="#1e40af" stroke-width="0.8"/><line x1="20" y1="8" x2="20" y2="3" stroke="#64748b" stroke-width="1"/><path d="M 20 3 L 26 5 L 20 7 Z" fill="#ef4444"/></svg>`;

  const schoolIcon = L.divIcon({
    className: 'custom-school-icon',
    html: schoolIconSVG,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48]
  });

  // ========================================
  // CUSTOM ICON UNTUK SPPG/MOBIL (Production)
  // ========================================
  const sppgIconSVG = `<svg width="42" height="62" viewBox="0 0 42 62" xmlns="http://www.w3.org/2000/svg"><ellipse cx="21" cy="60" rx="14" ry="2" fill="rgba(0,0,0,0.2)"/><ellipse cx="21" cy="16" rx="7" ry="2.5" fill="#ffffff" stroke="#d1d5db" stroke-width="1"/><path d="M 14 16 L 12 10 Q 12 6 14 4 Q 16 2 19 1 Q 20 0 21 0 Q 22 0 23 1 Q 26 2 28 4 Q 30 6 30 10 L 28 16 Z" fill="#ffffff" stroke="#d1d5db" stroke-width="1"/><path d="M 14 16 Q 14 12 16 8 Q 18 5 21 3 Q 24 5 26 8 Q 28 12 28 16 Z" fill="#f5f5f5" stroke="#d1d5db" stroke-width="0.5"/><rect x="6" y="26" width="30" height="24" rx="2" fill="#f97316" stroke="#ea580c" stroke-width="1.5"/><path d="M 3 26 L 21 14 L 39 26 Z" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/><rect x="28" y="16" width="6" height="10" fill="#7c2d12" stroke="#451a03" stroke-width="1"/><path d="M 29 12 Q 30 10 31 12 Q 32 10 33 12 Q 34 10 35 12" stroke="#94a3b8" stroke-width="1.5" fill="none" opacity="0.7"/><path d="M 29.5 9 Q 30.5 7 31.5 9 Q 32.5 7 33.5 9 Q 34.5 7 35.5 9" stroke="#cbd5e1" stroke-width="1.2" fill="none" opacity="0.5"/><rect x="17" y="38" width="8" height="12" rx="1" fill="#78350f" stroke="#451a03" stroke-width="1"/><circle cx="20" cy="44" r="0.8" fill="#fbbf24"/><rect x="9" y="30" width="6" height="6" rx="0.5" fill="#fed7aa" stroke="#ea580c" stroke-width="1"/><line x1="12" y1="30" x2="12" y2="36" stroke="#ea580c" stroke-width="0.8"/><line x1="9" y1="33" x2="15" y2="33" stroke="#ea580c" stroke-width="0.8"/><rect x="27" y="30" width="6" height="6" rx="0.5" fill="#fed7aa" stroke="#ea580c" stroke-width="1"/><line x1="30" y1="30" x2="30" y2="36" stroke="#ea580c" stroke-width="0.8"/><line x1="27" y1="33" x2="33" y2="33" stroke="#ea580c" stroke-width="0.8"/><circle cx="21" cy="43" r="7" fill="#ffffff" stroke="#ea580c" stroke-width="1.5"/><path d="M 18 41 Q 18 39 19 38 Q 19 37 21 37 Q 23 37 23 38 Q 24 39 24 41 L 24 44 Q 24 45 21 45 Q 18 45 18 44 Z" fill="#dc2626"/><ellipse cx="21" cy="44" rx="3.5" ry="1.5" fill="#991b1b"/><line x1="9" y1="42" x2="11" y2="42" stroke="#ea580c" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="42" r="1" fill="#ea580c"/><line x1="31" y1="42" x2="33" y2="42" stroke="#ea580c" stroke-width="1.5" stroke-linecap="round"/><path d="M 33 41 L 33 43 M 32.5 41.5 L 32.5 42.5 M 33.5 41.5 L 33.5 42.5" stroke="#ea580c" stroke-width="0.5"/></svg>`;

  const sppgIcon = L.divIcon({
    className: 'custom-sppg-icon',
    html: sppgIconSVG,
    iconSize: [42, 62],
    iconAnchor: [21, 60],
    popupAnchor: [0, -60]
  });

  // Add CSS for hover effects
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-school-icon,
      .custom-sppg-icon {
        background: transparent !important;
        border: none !important;
        cursor: pointer;
      }
      
      .custom-school-icon:hover,
      .custom-sppg-icon:hover {
        transform: scale(1.15);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
      }
    `;
    document.head.appendChild(style);
    
    return () => style.remove();
  }, []);

  // Sample Rancaekek schools data - MERGED dengan Context API data ✨
  // Ini adalah fallback data jika context masih kosong
  const fallbackSekolahData = [
    { id: 1, nama: 'SDN ABDI NEGARA', lat: -6.955170, lng: 107.756844, siswa: 441, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 01' },
    { id: 2, nama: 'SDN ADIYASA', lat: -6.993000, lng: 107.741096, siswa: 163, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 01' },
    { id: 3, nama: 'SDN BABAKAN SUKAMULYA', lat: -6.988070, lng: 107.755081, siswa: 283, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 01' },
    { id: 4, nama: 'SDN BOJONGBRAJA', lat: -6.974310, lng: 107.751953, siswa: 149, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 02' },
    { id: 5, nama: 'SDN BOJONGLOA 01', lat: -6.953355, lng: 107.765778, siswa: 193, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 02' },
    { id: 6, nama: 'SDN BOJONGLOA 02', lat: -6.958760, lng: 107.764587, siswa: 216, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 02' },
    { id: 7, nama: 'SDN BOJONGLOA 03', lat: -6.953240, lng: 107.765648, siswa: 262, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 03' },
    { id: 8, nama: 'SDN BOJONGSALAM 01', lat: -6.994710, lng: 107.800873, siswa: 340, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 03' },
    { id: 9, nama: 'SDN BOJONGSALAM 02', lat: -6.994740, lng: 107.800507, siswa: 270, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 03' },
    { id: 10, nama: 'SDN BOJONGSALAM 04', lat: -7.000100, lng: 107.788498, siswa: 353, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 04' },
    { id: 11, nama: 'SDN BOJONGSALAM 05', lat: -7.003920, lng: 107.779701, siswa: 168, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 04' },
    { id: 12, nama: 'SDN BUAHDUA', lat: -6.956090, lng: 107.761513, siswa: 150, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 05' },
    { id: 13, nama: 'SDN CANGKUANG 01', lat: -6.970850, lng: 107.802422, siswa: 361, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 05' },
    { id: 14, nama: 'SDN CANGKUANG 02', lat: -6.971060, lng: 107.802620, siswa: 284, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 06' },
    { id: 15, nama: 'SDN CANGKUANG 03', lat: -6.972780, lng: 107.802208, siswa: 385, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 06' },
    { id: 16, nama: 'SDN CIHERANG', lat: -6.971400, lng: 107.769897, siswa: 533, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 06' },
    { id: 17, nama: 'SDN CILUNCAT 01', lat: -6.975850, lng: 107.719582, siswa: 306, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 07' },
    { id: 18, nama: 'SDN HAURPUGUR 01', lat: -6.980900, lng: 107.802498, siswa: 96, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 07' },
    { id: 19, nama: 'SDN HAURPUGUR 02', lat: -6.980938, lng: 107.802727, siswa: 167, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 07' },
    { id: 20, nama: 'SDN HAURPUGUR 03', lat: -6.981990, lng: 107.802116, siswa: 348, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 08' },
    { id: 21, nama: 'SDN JELEGONG 01', lat: -6.958400, lng: 107.774696, siswa: 192, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 08' },
    { id: 22, nama: 'SDN JELEGONG 02', lat: -6.958300, lng: 107.774521, siswa: 322, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 08' },
    { id: 23, nama: 'SDN KARAPIAK 01', lat: -6.967540, lng: 107.817833, siswa: 323, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 09' },
    { id: 24, nama: 'SDN KARAPIAK 02', lat: -6.967400, lng: 107.818001, siswa: 219, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 09' },
    { id: 25, nama: 'SDN KENCANA INDAH 01', lat: -6.976400, lng: 107.754898, siswa: 559, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 09' },
    { id: 26, nama: 'SDN KENCANA INDAH 02', lat: -6.975200, lng: 107.759232, siswa: 570, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 10' },
    { id: 27, nama: 'SDN KENCANA INDAH 03', lat: -6.969080, lng: 107.759888, siswa: 423, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 10' },
    { id: 28, nama: 'SDN KORPRI', lat: -6.955100, lng: 107.757004, siswa: 226, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 10' },
    { id: 29, nama: 'SDN LEUWILAYUNG', lat: -6.983950, lng: 107.803513, siswa: 426, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 11' },
    { id: 30, nama: 'SDN LINGGAR 01', lat: -6.965470, lng: 107.797882, siswa: 162, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 11' },
    { id: 31, nama: 'SDN LINGGAR 02', lat: -6.965900, lng: 107.797798, siswa: 242, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 11' },
    { id: 32, nama: 'SDN LINGGAR 03', lat: -6.965430, lng: 107.797630, siswa: 200, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 12' },
    { id: 33, nama: 'SDN LINGGAR 04', lat: -6.966800, lng: 107.797900, siswa: 182, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 12' },
    { id: 34, nama: 'SDN LINGGAR 05', lat: -6.966500, lng: 107.797500, siswa: 148, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 12' },
    { id: 35, nama: 'SDN NANJUNGMEKAR', lat: -6.967200, lng: 107.818300, siswa: 247, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 13' },
    { id: 36, nama: 'SDN NUSA INDAH', lat: -6.973120, lng: 107.759369, siswa: 180, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 13' },
    { id: 37, nama: 'SDN PERMATA HIJAU', lat: -6.961500, lng: 107.776901, siswa: 624, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 13' },
    { id: 38, nama: 'SDN RANCABANGO', lat: -6.969480, lng: 107.732933, siswa: 353, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 14' },
    { id: 39, nama: 'SDN RANCABOGO', lat: -6.981760, lng: 107.768852, siswa: 301, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 14' },
    { id: 40, nama: 'SDN RANCAEKEK 01', lat: -6.958910, lng: 107.765129, siswa: 469, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 14' },
    { id: 41, nama: 'SDN RANCAEKEK 02', lat: -6.960100, lng: 107.756500, siswa: 447, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 15' },
    { id: 42, nama: 'SDN RANCAEKEK 03', lat: -6.961820, lng: 107.757011, siswa: 250, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 15' },
    { id: 43, nama: 'SDN RANCAEKEK 04', lat: -6.959600, lng: 107.760422, siswa: 355, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 15' },
    { id: 44, nama: 'SDN RANCAEKEK 05', lat: -6.963690, lng: 107.744682, siswa: 230, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 16' },
    { id: 45, nama: 'SDN RANCAEKEK 06', lat: -6.961950, lng: 107.756950, siswa: 96, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 16' },
    { id: 46, nama: 'SDN RANCAEKEK 07', lat: -6.961140, lng: 107.751106, siswa: 511, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 16' },
    { id: 47, nama: 'SDN RANCAEKEK 09', lat: -6.963770, lng: 107.744530, siswa: 179, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 17' },
    { id: 48, nama: 'SDN RANCAKENDAL', lat: -6.967970, lng: 107.774658, siswa: 240, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 17' },
    { id: 49, nama: 'SDN RANCANILEM', lat: -6.970630, lng: 107.763191, siswa: 193, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 17' },
    { id: 50, nama: 'SDN SUKAMAJU', lat: -6.993800, lng: 107.726700, siswa: 226, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 18' },
    { id: 51, nama: 'SDN SUKAMANAH', lat: -6.974290, lng: 107.751671, siswa: 294, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 18' },
    { id: 52, nama: 'SDN SUKAMULYA 01', lat: -6.973210, lng: 107.789757, siswa: 278, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 18' },
    { id: 53, nama: 'SDN SUKAWANGI', lat: -6.974670, lng: 107.764687, siswa: 176, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 19' },
    { id: 54, nama: 'SDN YASAADI', lat: -6.992890, lng: 107.740791, siswa: 285, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 19' },
    { id: 55, nama: 'SDIK NUR ALIFA', lat: -6.9720, lng: 107.7530, siswa: 204, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 19' },
    { id: 56, nama: 'SD ALAM PELOPOR', lat: -6.97589, lng: 107.77312, siswa: 216, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 20' },
    { id: 57, nama: 'SD DARUL HIKAM 2', lat: -6.98021, lng: 107.77884, siswa: 375, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 20' },
    { id: 58, nama: 'SD INSAN UNGGUL', lat: -6.9648, lng: 107.7465, siswa: 180, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 20' },
    { id: 59, nama: 'SD IT ADDZIMAT DAI INDONESIA', lat: -6.9695, lng: 107.7398, siswa: 204, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 20' },
    { id: 60, nama: 'SD IT AL MUBAROKAH', lat: -6.9662, lng: 107.7479, siswa: 258, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 01' },
    { id: 61, nama: 'SD IT AL-KHAWARIZMI', lat: -6.9678, lng: 107.7423, siswa: 99, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 01' },
    { id: 62, nama: 'SD IT ATTAQWA', lat: -6.97152, lng: 107.77943, siswa: 147, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 02' },
    { id: 63, nama: 'SD IT INSAN RAHAYU', lat: -6.9701, lng: 107.7415, siswa: 567, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 03' },
    { id: 64, nama: 'SD IT LUGINA', lat: -6.9689, lng: 107.7402, siswa: 93, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 04' },
    { id: 65, nama: 'SD IT QORDOVA', lat: -6.97395, lng: 107.76442, siswa: 620, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 05' },
    { id: 66, nama: 'SD IT Rabbani', lat: -6.9599, lng: 107.7368, siswa: 140, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 06' },
    { id: 67, nama: 'SD KIFAYATUL AZHAR', lat: -6.9738, lng: 107.7346, siswa: 304, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 07' },
    { id: 68, nama: 'SD PLUS ARAFAH', lat: -6.97914, lng: 107.77701, siswa: 335, status: 'layak', jenjang: 'sd', sppg: 'SPPG Rancaekek 08' },
  ];

  // REAL-TIME SYNC: Gabung context schools dengan fallback data
  // Priority: contextSchools lebih baru, fallback untuk data lama
  const sekolahData = contextSchools && contextSchools.length > 0 
    ? [
        ...fallbackSekolahData,
        ...contextSchools.map(s => ({
          ...s,
          jenjang: s.jenjang || 'sd',
          sppg: s.sppg || 'Unknown SPPG'
        }))
      ]
    : fallbackSekolahData;

  // DEBUG: Log contextSchools dan sekolahData
  console.log('[WebGIS] contextSchools:', contextSchools);
  console.log('[WebGIS] Total sekolahData:', sekolahData?.length, 'schools');
  if (contextSchools?.length > 0) {
    console.log('[WebGIS] New schools from context:', contextSchools);
  }

  // Sample SPPG Rancaekek data - 20 Unit
  const sppgData = [
    { id: 1, nama: 'SPPG Rancaekek 01', lat: -6.9690, lng: 107.7770, kapasitas: 1000, produksi: 967, sekolah: 5 },
    { id: 2, nama: 'SPPG Rancaekek 02', lat: -6.9700, lng: 107.7880, kapasitas: 1000, produksi: 958, sekolah: 4 },
    { id: 3, nama: 'SPPG Rancaekek 03', lat: -6.9750, lng: 107.7930, kapasitas: 1000, produksi: 872, sekolah: 3 },
    { id: 4, nama: 'SPPG Rancaekek 04', lat: -6.9800, lng: 107.8010, kapasitas: 1000, produksi: 963, sekolah: 4 },
    { id: 5, nama: 'SPPG Rancaekek 05', lat: -6.9850, lng: 107.8030, kapasitas: 1000, produksi: 1000, sekolah: 4 },
    { id: 6, nama: 'SPPG Rancaekek 06', lat: -6.9900, lng: 107.8080, kapasitas: 1000, produksi: 938, sekolah: 3 },
    { id: 7, nama: 'SPPG Rancaekek 07', lat: -6.9650, lng: 107.7700, kapasitas: 1000, produksi: 961, sekolah: 5 },
    { id: 8, nama: 'SPPG Rancaekek 08', lat: -6.9730, lng: 107.7820, kapasitas: 1000, produksi: 890, sekolah: 4 },
    { id: 9, nama: 'SPPG Rancaekek 09', lat: -6.9770, lng: 107.7880, kapasitas: 1000, produksi: 996, sekolah: 3 },
    { id: 10, nama: 'SPPG Rancaekek 10', lat: -6.9830, lng: 107.7970, kapasitas: 1000, produksi: 925, sekolah: 4 },
    { id: 11, nama: 'SPPG Rancaekek 11', lat: -6.9890, lng: 107.8060, kapasitas: 1000, produksi: 943, sekolah: 3 },
    { id: 12, nama: 'SPPG Rancaekek 12', lat: -6.9950, lng: 107.8150, kapasitas: 1000, produksi: 982, sekolah: 3 },
    { id: 13, nama: 'SPPG Rancaekek 13', lat: -6.9610, lng: 107.7640, kapasitas: 1000, produksi: 876, sekolah: 3 },
    { id: 14, nama: 'SPPG Rancaekek 14', lat: -6.9670, lng: 107.7730, kapasitas: 1000, produksi: 1000, sekolah: 4 },
    { id: 15, nama: 'SPPG Rancaekek 15', lat: -6.9730, lng: 107.7820, kapasitas: 1000, produksi: 951, sekolah: 3 },
    { id: 16, nama: 'SPPG Rancaekek 16', lat: -6.9790, lng: 107.7910, kapasitas: 1000, produksi: 917, sekolah: 4 },
    { id: 17, nama: 'SPPG Rancaekek 17', lat: -6.9850, lng: 107.8000, kapasitas: 1000, produksi: 988, sekolah: 3 },
    { id: 18, nama: 'SPPG Rancaekek 18', lat: -6.9910, lng: 107.8090, kapasitas: 1000, produksi: 945, sekolah: 3 },
    { id: 19, nama: 'SPPG Rancaekek 19', lat: -6.9970, lng: 107.8180, kapasitas: 1000, produksi: 962, sekolah: 4 },
    { id: 20, nama: 'SPPG Rancaekek 20', lat: -6.9630, lng: 107.7670, kapasitas: 1000, produksi: 1000, sekolah: 4 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'layak': return { color: '#22c55e', hex: '#22c55e' };
      case 'waspada': return { color: '#eab308', hex: '#eab308' };
      case 'kritis': return { color: '#ef4444', hex: '#ef4444' };
      default: return { color: '#6b7280', hex: '#6b7280' };
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'layak': return 'bg-green-500';
      case 'waspada': return 'bg-yellow-500';
      case 'kritis': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Initialize map
  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([-6.97, 107.78], 12);

    // Base layers
    const baseLayers = {
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
      }),
      terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '© OpenTopoMap'
      }),
      cartodb: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© CartoDB'
      }),
      dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© CartoDB'
      }),
      topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '© OpenTopoMap'
      })
    };

    // Add default layer
    baseLayers.street.addTo(map);

    mapInstanceRef.current = map;
    mapInstanceRef.current.baseLayers = baseLayers;
    mapInstanceRef.current.mapStyle = mapStyle;

    // Add markers
    updateMarkers(map);

    // Handle map click for measure tool
    if (measureMode) {
      map.on('click', (e) => {
        console.log('Map clicked at:', e.latlng);
      });
    }
  }, [mapStyle, measureMode]);

  // Update base layer
  const updateBaseLayer = useCallback((map, style) => {
    if (!map || !map.baseLayers) return;

    const { street, satellite, terrain, cartodb, dark, topo } = map.baseLayers;

    // Remove all layers
    [street, satellite, terrain, cartodb, dark, topo].forEach(layer => {
      if (map._layers[layer._leaflet_id]) map.removeLayer(layer);
    });

    // Add selected layer
    switch(style) {
      case 'street':
        street.addTo(map);
        break;
      case 'satellite':
        satellite.addTo(map);
        break;
      case 'terrain':
        terrain.addTo(map);
        break;
      case 'cartodb':
        cartodb.addTo(map);
        break;
      case 'dark':
        dark.addTo(map);
        break;
      case 'topo':
        topo.addTo(map);
        break;
      default:
        street.addTo(map);
    }
  }, []);

  // Update markers based on mode and filters
  const updateMarkers = useCallback((map) => {
    if (!map) map = mapInstanceRef.current;
    if (!map) return;

    const L = window.L;
    if (!L) return;

    console.log('[updateMarkers] Called with sekolahData.length =', sekolahData?.length);
    console.log('[updateMarkers] sekolahData sample:', sekolahData?.slice(0, 2));

    // Clear existing markers
    if (markersRef.current.sekolah) map.removeLayer(markersRef.current.sekolah);
    if (markersRef.current.sppg) map.removeLayer(markersRef.current.sppg);
    markersRef.current.routes.forEach(route => map.removeLayer(route));
    markersRef.current.routes = [];
    if (heatLayerRef.current) map.removeLayer(heatLayerRef.current);
    if (clustersRef.current) map.removeLayer(clustersRef.current);

    if (mode === 'cluster' && layers.sekolah) {
      // Cluster mode
      const markerClusterGroup = L.markerClusterGroup({
        maxClusterRadius: 50,
        disableClusteringAtZoom: 16
      });

      sekolahData.forEach(sekolah => {
        if (filters.jenjang !== 'all' && sekolah.jenjang !== filters.jenjang) return;
        if (filters.status !== 'all' && sekolah.status !== filters.status) return;

        const marker = L.marker([sekolah.lat, sekolah.lng], { icon: schoolIcon });

        marker.bindPopup(`
          <div style="font-weight: bold; margin-bottom: 5px;">${sekolah.nama}</div>
          <div style="font-size: 12px; color: #666;">Siswa: ${sekolah.siswa}</div>
          <div style="font-size: 12px; color: #666;">Status: ${sekolah.status}</div>
        `);

        marker.on('click', () => onSelectSchool(sekolah));
        markerClusterGroup.addLayer(marker);
      });

      map.addLayer(markerClusterGroup);
      clustersRef.current = markerClusterGroup;
    } else if (mode === 'heatmap' && layers.sekolah) {
      // Heatmap mode
      const heatData = sekolahData
        .filter(s => filters.jenjang === 'all' || s.jenjang === filters.jenjang)
        .filter(s => filters.status === 'all' || s.status === filters.status)
        .map(s => [s.lat, s.lng, 0.5]);

      const heatLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 1,
        gradient: { 0.4: 'blue', 0.55: 'lime', 0.7: 'yellow', 0.85: 'orange', 1.0: 'red' }
      });

      map.addLayer(heatLayer);
      heatLayerRef.current = heatLayer;
    } else if (mode === 'network' && layers.rute) {
      // Network mode - draw routes dengan distribusi merata
      const schoolBySPPG = distributeSchoolsToSPPG();
      
      // Draw routes untuk setiap SPPG dengan warna berbeda
      sppgData.forEach((sppg, sppgIndex) => {
        const assignedSchools = schoolBySPPG[sppg.nama] || [];
        const routeColor = sppgColors[sppgIndex % sppgColors.length];
        
        assignedSchools.forEach(schoolInfo => {
          const sekolah = sekolahData.find(s => s.id === schoolInfo.schoolId);
          if (!sekolah) return;
          
          if (filters.jenjang !== 'all' && sekolah.jenjang !== filters.jenjang) return;
          if (filters.status !== 'all' && sekolah.status !== filters.status) return;

          // Buat polyline dari SPPG ke sekolah
          const polyline = L.polyline([
            [sppg.lat, sppg.lng],
            [sekolah.lat, sekolah.lng]
          ], {
            color: routeColor,
            weight: 2.5,
            opacity: 0.7,
            dashArray: '5, 3'
          });

          // Add popup dengan info rute
          const distance = calculateDistance(sppg.lat, sppg.lng, sekolah.lat, sekolah.lng);
          polyline.bindPopup(`
            <div style="font-size: 12px; font-weight: bold; margin-bottom: 5px;">
              ${sppg.nama} → ${sekolah.nama}
            </div>
            <div style="font-size: 11px;">Jarak: ${distance.toFixed(2)} km</div>
          `);

          map.addLayer(polyline);
          markersRef.current.routes.push(polyline);
        });
      });
    }

    // Add sekolah markers (not in cluster mode)
    if (mode !== 'cluster' && layers.sekolah) {
      const sekolahGroup = L.featureGroup();

      sekolahData.forEach(sekolah => {
        if (filters.jenjang !== 'all' && sekolah.jenjang !== filters.jenjang) return;
        if (filters.status !== 'all' && sekolah.status !== filters.status) return;

        const marker = L.marker([sekolah.lat, sekolah.lng], { icon: schoolIcon });

        marker.bindPopup(`
          <div style="font-weight: bold; margin-bottom: 5px;">${sekolah.nama}</div>
          <div style="font-size: 12px; color: #666;">Siswa: ${sekolah.siswa}</div>
          <div style="font-size: 12px; color: #666;">SPPG: ${sekolah.sppg}</div>
          <div style="font-size: 12px; color: #666;">Status: ${sekolah.status}</div>
        `);

        marker.on('click', () => onSelectSchool(sekolah));
        sekolahGroup.addLayer(marker);
      });

      map.addLayer(sekolahGroup);
      markersRef.current.sekolah = sekolahGroup;
    }

    // Add SPPG markers
    if (layers.sppg) {
      const sppgGroup = L.featureGroup();

      sppgData.forEach(sppg => {
        const marker = L.marker([sppg.lat, sppg.lng], { icon: sppgIcon });

        marker.bindPopup(`
          <div style="font-weight: bold; margin-bottom: 5px;">${sppg.nama}</div>
          <div style="font-size: 12px; color: #666;">Kapasitas: ${sppg.kapasitas.toLocaleString()}</div>
          <div style="font-size: 12px; color: #666;">Produksi: ${sppg.produksi.toLocaleString()}</div>
        `);

        marker.on('click', () => onSelectSPPG(sppg));
        sppgGroup.addLayer(marker);
      });

      map.addLayer(sppgGroup);
      markersRef.current.sppg = sppgGroup;
    }

    // Add wilayah boundaries (simplified)
    if (layers.wilayah) {
      const polygon = L.polygon([
        [-6.9500, 107.3500],
        [-7.1500, 107.3500],
        [-7.1500, 107.7000],
        [-6.9500, 107.7000]
      ], {
        color: '#3b82f6',
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.1,
        dashArray: '5, 5'
      });

      map.addLayer(polygon);
    }
  }, [mode, layers, filters, onSelectSchool, onSelectSPPG, sekolahData, sppgData, distributeSchoolsToSPPG]);

  // Initialize on mount
  useEffect(() => {
    setTimeout(() => {
      initMap();
    }, 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when mode, layers, or filters change
  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers(mapInstanceRef.current);
    }
  }, [mode, layers, filters, onSelectSchool, onSelectSPPG, sekolahData]);

  // Update base layer when mapStyle changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      updateBaseLayer(mapInstanceRef.current, mapStyle);
    }
  }, [mapStyle, updateBaseLayer]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100"
      style={{ minHeight: '400px' }}
    />
  );
}

// ==============================================
// MAP MODE BUTTON COMPONENT
// ==============================================
function MapModeButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

// ==============================================
// MAP STYLE OPTION COMPACT COMPONENT (Simpler version for inline)
// ==============================================
function MapStyleOptionCompact({ name, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-all border-b border-gray-100 last:border-b-0 ${
        active ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-sm font-bold flex-1 text-left ${active ? 'text-blue-900' : 'text-gray-900'}`}>
        {name}
      </span>
      {active && (
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
      )}
    </button>
  );
}

// ==============================================
// MAP STYLE OPTION COMPONENT (Full version with descriptions)
// ==============================================
function MapStyleOption({ name, icon, description, active, onClick, gradient }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 hover:bg-blue-50 transition-all border-b border-gray-100 last:border-b-0 ${
        active ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
      }`}
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl border-2 ${
        active ? 'border-blue-500 shadow-lg' : 'border-gray-300'
      }`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className={`text-sm font-bold ${active ? 'text-blue-900' : 'text-gray-900'}`}>
          {name}
        </div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      {active && (
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
      )}
    </button>
  );
}

// ==============================================
// MAP STYLE BUTTON COMPONENT
// ==============================================
// LAYER TOGGLE COMPONENT
// ==============================================
function LayerToggle({ label, isActive, onChange }) {
  return (
    <label className="flex items-center gap-3 p-2 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors">
      <input
        type="checkbox"
        checked={isActive}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
      />
      <span className={`text-sm font-medium ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  );
}

// ==============================================
// STAT ITEM COMPONENT
// ==============================================
function StatItem({ label, value, trend }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
      <div className="text-xs text-gray-600 font-medium mb-1">{label}</div>
      <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
        {value}
      </div>
      {trend && (
        <div className={`text-xs font-semibold mt-1 ${trend > 0 ? 'text-green-700' : 'text-red-700'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

// ==============================================
// MAP LEGEND COMPONENT (ENHANCED)
// ==============================================
function MapLegend({ mode, layers, activeLayer }) {
  return (
    <div className="absolute top-4 left-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-72 max-h-96 overflow-y-auto" style={{ zIndex: 20 }}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <Layers className="w-4 h-4 text-blue-600" />
        <h4 className="text-sm font-bold text-gray-900">Legend</h4>
      </div>

      {/* Mode Info */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs font-semibold text-blue-900 mb-1">Current Mode</div>
        <div className="text-sm font-bold text-blue-700 capitalize">{mode}</div>
      </div>

      {/* Sekolah Legend */}
      {layers.sekolah && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Building2 className="w-3 h-3" />
            Sekolah Status
          </div>
          <div className="space-y-2">
            <LegendItem color="bg-green-500" label="Layak" />
            <LegendItem color="bg-yellow-500" label="Waspada" />
            <LegendItem color="bg-red-500" label="Kritis" />
          </div>
        </div>
      )}

      {/* SPPG Legend */}
      {layers.sppg && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Database className="w-3 h-3" />
            SPPG
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span className="text-xs text-gray-600">Satuan Produksi Pangan</span>
          </div>
        </div>
      )}

      {/* Routes Legend */}
      {layers.rute && mode === 'network' && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Network Routes</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-green-500"></div>
              <span className="text-xs text-gray-600">Layak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Waspada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-red-500"></div>
              <span className="text-xs text-gray-600">Kritis</span>
            </div>
          </div>
        </div>
      )}

      {/* Wilayah Legend */}
      {layers.wilayah && (
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-2">Boundaries</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 border-2 border-blue-500" style={{ borderStyle: 'dashed' }}></div>
            <span className="text-xs text-gray-600">Kecamatan</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${color} rounded-full border-2 border-white shadow`}></div>
      <span className="text-xs text-gray-700 font-medium">{label}</span>
    </div>
  );
}

// ==============================================
// DETAIL PANEL COMPONENT (ENHANCED)
// ==============================================
function DetailPanel({ type, data, onClose }) {
  if (!data) return null;

  return (
    <div className="absolute bottom-6 right-[25rem] w-96 bg-white rounded-2xl shadow-2xl border-2 border-blue-500 overflow-hidden animate-slide-up" style={{ zIndex: 1100 }}>
      {/* Header dengan gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          {type === 'sekolah' ? (
            <div className={`w-12 h-12 ${
              data.status === 'layak' ? 'bg-green-400' :
              data.status === 'waspada' ? 'bg-yellow-400' :
              'bg-red-400'
            } rounded-xl flex items-center justify-center shadow-lg`}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-base font-bold text-white truncate">{data.nama}</h3>
            <p className="text-xs text-blue-100">
              {type === 'sekolah' ? `${data.jenjang?.toUpperCase()} - ${data.siswa} siswa` : `${data.sekolah} sekolah dilayani`}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {type === 'sekolah' ? (
          <div className="grid grid-cols-2 gap-3">
            <DetailMetricCompact label="Siswa" value={data.siswa?.toString()} icon={Users} />
            <DetailMetricCompact label="Jenjang" value={data.jenjang?.toUpperCase()} icon={Building2} />
            <DetailMetricCompact label="Status" value={data.status?.toUpperCase()} icon={Award} color={data.status} />
            <DetailMetricCompact label="SPPG" value={
              typeof data.sppg === 'string' 
                ? data.sppg.split(' ').slice(-2).join(' ')
                : `SPPG Rancaekek ${data.sppg || 'N/A'}`
            } icon={Database} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <DetailMetricCompact label="Kapasitas" value={data.kapasitas?.toLocaleString()} icon={BarChart3} />
            <DetailMetricCompact label="Produksi" value={data.produksi?.toLocaleString()} icon={TrendingUp} />
            <DetailMetricCompact label="Utilization" value={`${((data.produksi / data.kapasitas) * 100).toFixed(1)}%`} icon={Activity} color="blue" />
            <DetailMetricCompact label="Sekolah" value={data.sekolah?.toString()} icon={Building2} />
          </div>
        )}
      </div>
    </div>
  );
}

function DetailMetricCompact({ label, value, icon: Icon, color }) {
  const colorStyles = {
    layak: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    waspada: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    kritis: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    default: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
  };

  const style = colorStyles[color] || colorStyles.default;

  return (
    <div className={`p-3 rounded-lg border-2 ${style.bg} ${style.border}`}>
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon className={`w-3.5 h-3.5 ${style.text}`} />}
        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">{label}</div>
      </div>
      <div className={`text-base font-black ${style.text} truncate`}>
        {value || '-'}
      </div>
    </div>
  );
}

function DetailMetric({ label, value, icon: Icon, color }) {
  const colorStyles = {
    green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    default: { bg: 'bg-gray-50', text: 'text-gray-900', border: 'border-gray-200' }
  };

  const style = colorStyles[color] || colorStyles.default;

  return (
    <div className={`p-3 rounded-lg border ${style.bg} ${style.border}`}>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className={`w-3 h-3 ${style.text}`} />}
        <div className="text-xs font-medium text-gray-600">{label}</div>
      </div>
      <div className={`text-lg font-bold ${style.text}`}>
        {value}
      </div>
    </div>
  );
}

// ==============================================
// LEAFLET LOADER COMPONENT
// ==============================================
function LeafletLoader() {
  return (
    <div style={{ display: 'none' }}>
      {/* Leaflet CSS & JS are loaded via index.html or CDN */}
    </div>
  );
}

export default WebGISPage;