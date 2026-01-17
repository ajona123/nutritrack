/* eslint-disable no-undef, react/jsx-no-undef */
import React, { useState } from 'react';
import { Activity, Target, BarChart3, BookOpen, Database, Award, Settings, Users, Building2, TrendingUp, AlertTriangle } from 'lucide-react';

// ==============================================
// MODUL SIMULASI WHAT-IF ANALYSIS - PART 10 (SINTA 1 LEVEL)
// ==============================================
function SimulasiPage() {
  const [simulationMode, setSimulationMode] = useState('single'); // single, comparison, scenario
  const [activeScenario, setActiveScenario] = useState('scenario1');
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Base data (current state)
  const baseData = {
    totalSekolah: 1247,
    totalSiswa: 47891,
    totalSPPG: 5,
    totalPekerja: 118,
    kapasitasProduksi: 69000,
    produksiAktual: 60150,
    utilisasi: 87.2,
    avgJarak: 9.8,
    avgWaktu: 24,
    qualityScore: 78.5,
    biayaBulanan: 2450000000
  };

  // Simulation parameters
  const [scenarios, setScenarios] = useState({
    scenario1: {
      name: 'Skenario 1',
      siswaGrowth: 0, // percentage
      pekerjaTambahan: 0,
      sppgBaru: 0,
      kapasitasUpgrade: 0, // percentage
      waktuOperasional: 0, // additional hours
      color: 'blue'
    },
    scenario2: {
      name: 'Skenario 2',
      siswaGrowth: 0,
      pekerjaTambahan: 0,
      sppgBaru: 0,
      kapasitasUpgrade: 0,
      waktuOperasional: 0,
      color: 'green'
    },
    scenario3: {
      name: 'Skenario 3',
      siswaGrowth: 0,
      pekerjaTambahan: 0,
      sppgBaru: 0,
      kapasitasUpgrade: 0,
      waktuOperasional: 0,
      color: 'purple'
    }
  });

  // Calculate simulated results
  const calculateSimulation = (scenario) => {
    const siswaNew = baseData.totalSiswa * (1 + scenario.siswaGrowth / 100);
    const pekerjaNew = baseData.totalPekerja + scenario.pekerjaTambahan;
    const sppgNew = baseData.totalSPPG + scenario.sppgBaru;
    const kapasitasNew = baseData.kapasitasProduksi * (1 + scenario.kapasitasUpgrade / 100) + (scenario.sppgBaru * 12000);
    const produksiNew = Math.min(kapasitasNew, siswaNew * 0.5); // 0.5 kg per siswa
    const utilisasiNew = (produksiNew / kapasitasNew) * 100;
    
    // Calculate improvements
    const jarakImprovement = scenario.sppgBaru > 0 ? Math.random() * 15 + 10 : 0; // 10-25% improvement
    const waktuImprovement = scenario.sppgBaru > 0 ? Math.random() * 12 + 8 : 0; // 8-20% improvement
    const qualityImprovement = (scenario.kapasitasUpgrade / 10) + (scenario.pekerjaTambahan / 5) + (scenario.sppgBaru * 3);
    
    const avgJarakNew = baseData.avgJarak * (1 - jarakImprovement / 100);
    const avgWaktuNew = baseData.avgWaktu * (1 - waktuImprovement / 100);
    const qualityScoreNew = Math.min(100, baseData.qualityScore + qualityImprovement);
    
    // Calculate costs
    const biayaPekerja = scenario.pekerjaTambahan * 5000000; // 5 juta per pekerja per bulan
    const biayaSPPG = scenario.sppgBaru * 15000000; // 15 juta operational per SPPG per bulan
    const biayaUpgrade = (scenario.kapasitasUpgrade / 100) * 500000000; // upgrade cost
    const biayaBulananNew = baseData.biayaBulanan + biayaPekerja + biayaSPPG + biayaUpgrade;
    
    return {
      totalSekolah: baseData.totalSekolah,
      totalSiswa: Math.round(siswaNew),
      totalSPPG: sppgNew,
      totalPekerja: pekerjaNew,
      kapasitasProduksi: Math.round(kapasitasNew),
      produksiAktual: Math.round(produksiNew),
      utilisasi: utilisasiNew,
      avgJarak: avgJarakNew,
      avgWaktu: Math.round(avgWaktuNew),
      qualityScore: qualityScoreNew,
      biayaBulanan: biayaBulananNew,
      improvements: {
        siswa: ((siswaNew - baseData.totalSiswa) / baseData.totalSiswa * 100),
        kapasitas: ((kapasitasNew - baseData.kapasitasProduksi) / baseData.kapasitasProduksi * 100),
        utilisasi: utilisasiNew - baseData.utilisasi,
        jarak: -jarakImprovement,
        waktu: -waktuImprovement,
        quality: qualityScoreNew - baseData.qualityScore,
        biaya: ((biayaBulananNew - baseData.biayaBulanan) / baseData.biayaBulanan * 100)
      }
    };
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1500);
  };

  const saveScenario = (scenarioKey) => {
    const scenario = {
      id: Date.now(),
      name: scenarios[scenarioKey].name,
      timestamp: new Date().toISOString(),
      params: scenarios[scenarioKey],
      results: calculateSimulation(scenarios[scenarioKey])
    };
    setSavedScenarios(prev => [...prev, scenario]);
  };

  const resetScenario = (scenarioKey) => {
    setScenarios(prev => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        siswaGrowth: 0,
        pekerjaTambahan: 0,
        sppgBaru: 0,
        kapasitasUpgrade: 0,
        waktuOperasional: 0
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Simulasi What-If Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">
            Analisis dampak perubahan parameter terhadap kinerja sistem pelayanan MBG
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              isSimulating 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
            }`}
          >
            <Activity className="w-4 h-4" />
            {isSimulating ? 'Mensimulasi...' : 'Jalankan Simulasi'}
          </button>
          <button className="px-4 py-3 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
            Export Hasil
          </button>
        </div>
      </div>

      {/* Simulation Mode Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-2">
          <SimulationModeButton
            label="Single Scenario"
            value="single"
            active={simulationMode}
            onClick={setSimulationMode}
            icon={Target}
            description="Simulasi satu skenario"
          />
          <SimulationModeButton
            label="Comparison"
            value="comparison"
            active={simulationMode}
            onClick={setSimulationMode}
            icon={BarChart3}
            description="Bandingkan 3 skenario"
          />
          <SimulationModeButton
            label="Saved Scenarios"
            value="scenario"
            active={simulationMode}
            onClick={setSimulationMode}
            icon={BookOpen}
            description={`${savedScenarios.length} tersimpan`}
          />
        </div>
      </div>

      {/* Current State Display */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Status Saat Ini (Baseline)</h3>
            <p className="text-gray-200 text-sm">Data aktual sistem sebelum simulasi</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <BaselineMetric label="Siswa" value={baseData.totalSiswa.toLocaleString()} />
          <BaselineMetric label="SPPG" value={baseData.totalSPPG} />
          <BaselineMetric label="Pekerja" value={baseData.totalPekerja} />
          <BaselineMetric label="Kapasitas" value={`${(baseData.kapasitasProduksi / 1000).toFixed(0)}k kg`} />
          <BaselineMetric label="Utilisasi" value={`${baseData.utilisasi}%`} />
          <BaselineMetric label="Quality" value={baseData.qualityScore.toFixed(1)} />
        </div>
      </div>

      {/* Simulation Content */}
      {simulationMode === 'single' && (
        <SingleScenarioView
          scenario={scenarios.scenario1}
          setScenario={(updates) => setScenarios(prev => ({
            ...prev,
            scenario1: { ...prev.scenario1, ...updates }
          }))}
          baseData={baseData}
          calculateSimulation={calculateSimulation}
          onSave={() => saveScenario('scenario1')}
          onReset={() => resetScenario('scenario1')}
          isSimulating={isSimulating}
        />
      )}

      {simulationMode === 'comparison' && (
        <ComparisonView
          scenarios={scenarios}
          setScenarios={setScenarios}
          baseData={baseData}
          calculateSimulation={calculateSimulation}
          onSave={saveScenario}
          onReset={resetScenario}
          isSimulating={isSimulating}
        />
      )}

      {simulationMode === 'scenario' && (
        <SavedScenariosView
          savedScenarios={savedScenarios}
          setSavedScenarios={setSavedScenarios}
          baseData={baseData}
        />
      )}

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul Simulasi What-If</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan: (1) Interactive simulation dengan real-time parameter adjustment untuk eksplorasi skenario,
              (2) Impact analysis komprehensif menunjukkan perubahan metrik utama (kapasitas, utilisasi, kualitas, biaya),
              (3) Multi-scenario comparison untuk evaluasi trade-off antar opsi kebijakan,
              (4) Scenario management dengan save/load functionality untuk dokumentasi dan sharing,
              (5) Visual prediction dengan grafik dan chart yang update dinamis untuk decision support.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Interactive Simulation</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Real-time Updates</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Multi-Scenario Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">What-If Modeling</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// SIMULATION MODE BUTTON
// ==============================================
function SimulationModeButton({ label, value, active, onClick, icon: Icon, description }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex-1 flex flex-col items-center gap-2 px-4 py-4 rounded-xl text-sm font-semibold transition-all ${
        active === value
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-6 h-6" />
      <div className="text-center">
        <div className="font-bold">{label}</div>
        <div className={`text-xs mt-1 ${active === value ? 'text-blue-100' : 'text-gray-500'}`}>
          {description}
        </div>
      </div>
    </button>
  );
}

// ==============================================
// BASELINE METRIC
// ==============================================
function BaselineMetric({ label, value }) {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
      <div className="text-xs text-gray-300 mb-1">{label}</div>
      <div className="text-xl font-black">{value}</div>
    </div>
  );
}

// ==============================================
// SINGLE SCENARIO VIEW
// ==============================================
function SingleScenarioView({ scenario, setScenario, baseData, calculateSimulation, onSave, onReset, isSimulating }) {
  const simulatedData = calculateSimulation(scenario);

  return (
    <div className="space-y-6">
      {/* Scenario Name */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={scenario.name}
              onChange={(e) => setScenario({ name: e.target.value })}
              className="text-xl font-bold text-gray-900 border-b-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none px-2 py-1"
              placeholder="Nama Skenario"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors"
            >
              💾 Simpan
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Parameter Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Parameter Simulasi</h3>
        </div>

        <div className="space-y-6">
          {/* Student Growth */}
          <SimulationSlider
            label="Pertumbuhan Jumlah Siswa"
            value={scenario.siswaGrowth}
            onChange={(val) => setScenario({ siswaGrowth: val })}
            min={-20}
            max={50}
            step={1}
            unit="%"
            icon={Users}
            description={`Proyeksi: ${Math.round(baseData.totalSiswa * (1 + scenario.siswaGrowth / 100)).toLocaleString()} siswa (${scenario.siswaGrowth >= 0 ? '+' : ''}${Math.round(baseData.totalSiswa * scenario.siswaGrowth / 100).toLocaleString()})`}
            color="blue"
          />

          {/* Additional Workers */}
          <SimulationSlider
            label="Penambahan Pekerja"
            value={scenario.pekerjaTambahan}
            onChange={(val) => setScenario({ pekerjaTambahan: val })}
            min={0}
            max={50}
            step={1}
            unit="orang"
            icon={Users}
            description={`Total pekerja: ${baseData.totalPekerja + scenario.pekerjaTambahan} orang`}
            color="green"
          />

          {/* New SPPG */}
          <SimulationSlider
            label="Pembangunan SPPG Baru"
            value={scenario.sppgBaru}
            onChange={(val) => setScenario({ sppgBaru: val })}
            min={0}
            max={5}
            step={1}
            unit="unit"
            icon={Building2}
            description={`Total SPPG: ${baseData.totalSPPG + scenario.sppgBaru} unit (kapasitas tambahan: ${scenario.sppgBaru * 12000} kg)`}
            color="purple"
          />

          {/* Capacity Upgrade */}
          <SimulationSlider
            label="Upgrade Kapasitas SPPG Existing"
            value={scenario.kapasitasUpgrade}
            onChange={(val) => setScenario({ kapasitasUpgrade: val })}
            min={0}
            max={50}
            step={5}
            unit="%"
            icon={TrendingUp}
            description={`Kapasitas upgrade: +${Math.round(baseData.kapasitasProduksi * scenario.kapasitasUpgrade / 100).toLocaleString()} kg`}
            color="orange"
          />

          {/* Operational Hours */}
          <SimulationSlider
            label="Penambahan Jam Operasional"
            value={scenario.waktuOperasional}
            onChange={(val) => setScenario({ waktuOperasional: val })}
            min={0}
            max={4}
            step={0.5}
            unit="jam"
            icon={Activity}
            description={`Estimasi peningkatan produksi: ${Math.round(scenario.waktuOperasional * 1000)} kg/hari`}
            color="indigo"
          />
        </div>
      </div>

      {/* Simulation Results */}
      {!isSimulating ? (
        <>
          {/* Key Metrics Comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Hasil Simulasi: Metrik Utama</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultComparison
                label="Total Siswa"
                before={baseData.totalSiswa}
                after={simulatedData.totalSiswa}
                unit="siswa"
                improvement={simulatedData.improvements.siswa}
              />
              <ResultComparison
                label="Kapasitas Produksi"
                before={baseData.kapasitasProduksi}
                after={simulatedData.kapasitasProduksi}
                unit="kg"
                improvement={simulatedData.improvements.kapasitas}
              />
              <ResultComparison
                label="Utilisasi SPPG"
                before={baseData.utilisasi}
                after={simulatedData.utilisasi}
                unit="%"
                improvement={simulatedData.improvements.utilisasi}
                optimal={80}
              />
              <ResultComparison
                label="Quality Score"
                before={baseData.qualityScore}
                after={simulatedData.qualityScore}
                unit="poin"
                improvement={simulatedData.improvements.quality}
              />
              <ResultComparison
                label="Avg Jarak"
                before={baseData.avgJarak}
                after={simulatedData.avgJarak}
                unit="km"
                improvement={simulatedData.improvements.jarak}
                better="lower"
              />
              <ResultComparison
                label="Biaya Bulanan"
                before={baseData.biayaBulanan}
                after={simulatedData.biayaBulanan}
                unit="Rp"
                improvement={simulatedData.improvements.biaya}
                format="currency"
              />
            </div>
          </div>

          {/* Visual Impact Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Visualisasi Dampak Perubahan</h3>
            <ImpactChart improvements={simulatedData.improvements} />
          </div>

          {/* Capacity Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-sm font-bold text-gray-900 mb-4">Sebelum Simulasi</h4>
              <CapacityVisualization data={baseData} label="Current" />
            </div>

            {/* After */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-sm font-bold text-gray-900 mb-4">Sesudah Simulasi</h4>
              <CapacityVisualization data={simulatedData} label="Simulated" color="blue" />
            </div>
          </div>

          {/* Insights & Recommendations */}
          <SimulationInsights 
            scenario={scenario}
            baseData={baseData}
            simulatedData={simulatedData}
          />
        </>
      ) : (
        <div className="bg-white rounded-xl border border-blue-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Menjalankan Simulasi...</h3>
          <p className="text-sm text-gray-600">Menghitung dampak perubahan parameter terhadap sistem</p>
        </div>
      )}
    </div>
  );
}

// ==============================================
// SIMULATION SLIDER
// ==============================================
function SimulationSlider({ label, value, onChange, min, max, step, unit, icon: Icon, description, color }) {
  const colors = {
    blue: 'accent-blue-600',
    green: 'accent-green-600',
    purple: 'accent-purple-600',
    orange: 'accent-orange-600',
    indigo: 'accent-indigo-600'
  };

  const displayColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    indigo: 'text-indigo-600'
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${displayColors[color]}`} />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 block">{label}</label>
            <p className="text-xs text-gray-600 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-black ${displayColors[color]}`}>
            {value >= 0 && '+'}{value}
          </div>
          <div className="text-xs text-gray-600">{unit}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold text-gray-600 w-12">{min}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer ${colors[color]}`}
        />
        <span className="text-xs font-semibold text-gray-600 w-12 text-right">{max}</span>
      </div>
    </div>
  );
}

// ==============================================
// RESULT COMPARISON
// ==============================================
function ResultComparison({ label, before, after, unit, improvement, better = 'higher', optimal, format }) {
  const formatValue = (val) => {
    if (format === 'currency') {
      return `Rp ${(val / 1000000).toFixed(0)}M`;
    }
    return typeof val === 'number' ? val.toFixed(1) : val;
  };

  const isImproved = better === 'lower' ? after < before : 
                     better === 'optimal' && optimal ? Math.abs(after - optimal) < Math.abs(before - optimal) :
                     after > before;

  const changeColor = improvement > 0 ? 'text-green-600' : improvement < 0 ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-sm font-bold text-gray-900">{label}</h5>
        {improvement !== 0 && (
          <span className={`text-sm font-bold ${changeColor} flex items-center gap-1`}>
            {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement).toFixed(1)}%
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-2">Sebelum</div>
          <div className="text-2xl font-black text-gray-900">
            {formatValue(before)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{unit}</div>
        </div>

        <div className={`rounded-lg p-4 ${isImproved ? 'bg-green-50' : 'bg-blue-50'}`}>
          <div className="text-xs text-gray-600 mb-2">Sesudah</div>
          <div className={`text-2xl font-black ${isImproved ? 'text-green-700' : 'text-blue-700'}`}>
            {formatValue(after)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{unit}</div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// IMPACT CHART
// ==============================================
function ImpactChart({ improvements }) {
  const metrics = [
    { label: 'Siswa', value: improvements.siswa, color: 'blue' },
    { label: 'Kapasitas', value: improvements.kapasitas, color: 'green' },
    { label: 'Utilisasi', value: improvements.utilisasi, color: 'purple' },
    { label: 'Quality', value: improvements.quality, color: 'orange' },
    { label: 'Jarak', value: improvements.jarak, color: 'red' },
    { label: 'Biaya', value: improvements.biaya, color: 'indigo' }
  ];

  const maxAbsValue = Math.max(...metrics.map(m => Math.abs(m.value)));

  return (
    <div className="space-y-4">
      {metrics.map((metric, idx) => {
        const percentage = (Math.abs(metric.value) / maxAbsValue) * 100;
        const isPositive = metric.value > 0;

        return (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{metric.label}</span>
              <span className={`text-sm font-black ${
                isPositive ? 'text-green-600' : metric.value < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {isPositive ? '+' : ''}{metric.value.toFixed(1)}%
              </span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div 
                className={`absolute h-full ${
                  isPositive ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                  metric.value < 0 ? 'bg-gradient-to-r from-red-400 to-red-500' : 
                  'bg-gray-300'
                } transition-all duration-500 flex items-center justify-end px-3`}
                style={{ width: `${percentage}%` }}
              >
                {Math.abs(metric.value) > 0 && (
                  <span className="text-xs font-bold text-white">
                    {isPositive ? '+' : ''}{metric.value.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==============================================
// CAPACITY VISUALIZATION
// ==============================================
function CapacityVisualization({ data, label, color = 'gray' }) {
  const utilisasiPercentage = data.utilisasi;
  const surplusPercentage = 100 - utilisasiPercentage;

  const colorScheme = {
    gray: { bg: 'from-gray-400 to-gray-500', light: 'bg-gray-200' },
    blue: { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-200' }
  };

  return (
    <div className="space-y-4">
      {/* Capacity Gauge */}
      <div className="relative h-40">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-black text-gray-900 mb-1">
              {data.utilisasi.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600">Utilisasi</div>
          </div>
        </div>
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke={utilisasiPercentage >= 90 ? '#ef4444' : utilisasiPercentage >= 80 ? '#f59e0b' : '#10b981'}
            strokeWidth="8"
            strokeDasharray={`${utilisasiPercentage * 1.256} 125.6`}
            className="transition-all duration-500"
          />
        </svg>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Kapasitas</div>
          <div className="text-lg font-bold text-gray-900">
            {(data.kapasitasProduksi / 1000).toFixed(0)}k
          </div>
          <div className="text-xs text-gray-500">kg/hari</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Produksi</div>
          <div className="text-lg font-bold text-gray-900">
            {(data.produksiAktual / 1000).toFixed(0)}k
          </div>
          <div className="text-xs text-gray-500">kg/hari</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">SPPG</div>
          <div className="text-lg font-bold text-gray-900">{data.totalSPPG}</div>
          <div className="text-xs text-gray-500">unit</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Pekerja</div>
          <div className="text-lg font-bold text-gray-900">{data.totalPekerja}</div>
          <div className="text-xs text-gray-500">orang</div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// SIMULATION INSIGHTS
// ==============================================
function SimulationInsights({ scenario, baseData, simulatedData }) {
  const insights = [];

  // Generate insights based on changes
  if (scenario.siswaGrowth > 10) {
    insights.push({
      type: 'warning',
      title: 'Pertumbuhan Siswa Signifikan',
      message: `Pertumbuhan ${scenario.siswaGrowth}% siswa memerlukan peningkatan kapasitas produksi untuk mempertahankan kualitas pelayanan.`,
      recommendation: 'Pertimbangkan pembangunan SPPG baru atau upgrade kapasitas existing.'
    });
  }

  if (simulatedData.utilisasi > 90) {
    insights.push({
      type: 'critical',
      title: 'Utilisasi Tinggi',
      message: `Utilisasi ${simulatedData.utilisasi.toFixed(1)}% mendekati kapasitas maksimal. Risiko overload tinggi.`,
      recommendation: 'Urgent: Tambah kapasitas produksi atau SPPG baru untuk menghindari penurunan kualitas.'
    });
  }

  if (scenario.sppgBaru > 0) {
    insights.push({
      type: 'success',
      title: 'Ekspansi SPPG',
      message: `Penambahan ${scenario.sppgBaru} SPPG baru akan meningkatkan coverage dan mengurangi jarak rata-rata distribusi.`,
      recommendation: `Investasi: Rp ${(scenario.sppgBaru * 2500000000 / 1000000).toFixed(0)}M untuk pembangunan infrastruktur.`
    });
  }

  if (simulatedData.improvements.quality > 10) {
    insights.push({
      type: 'success',
      title: 'Peningkatan Kualitas Signifikan',
      message: `Quality score meningkat ${simulatedData.improvements.quality.toFixed(1)}% dari baseline.`,
      recommendation: 'Konfigurasi parameter ini sangat efektif untuk meningkatkan kualitas pelayanan.'
    });
  }

  if (simulatedData.improvements.biaya > 15) {
    insights.push({
      type: 'warning',
      title: 'Peningkatan Biaya Operasional',
      message: `Biaya bulanan meningkat ${simulatedData.improvements.biaya.toFixed(1)}% (Rp ${((simulatedData.biayaBulanan - baseData.biayaBulanan) / 1000000).toFixed(0)}M).`,
      recommendation: 'Lakukan cost-benefit analysis untuk memastikan ROI yang positif.'
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: 'info',
      title: 'Perubahan Minimal',
      message: 'Parameter simulasi belum menghasilkan perubahan signifikan terhadap sistem.',
      recommendation: 'Coba adjust parameter dengan nilai yang lebih besar untuk melihat dampak yang lebih jelas.'
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-bold text-gray-900">Insights & Rekomendasi</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <InsightCard key={idx} insight={insight} />
        ))}
      </div>
    </div>
  );
}

function InsightCard({ insight }) {
  const typeConfig = {
    success: {
      bg: 'from-green-50 to-green-100',
      border: 'border-green-200',
      icon: '✅',
      titleColor: 'text-green-900'
    },
    warning: {
      bg: 'from-yellow-50 to-yellow-100',
      border: 'border-yellow-200',
      icon: '⚠️',
      titleColor: 'text-yellow-900'
    },
    critical: {
      bg: 'from-red-50 to-red-100',
      border: 'border-red-200',
      icon: '🔴',
      titleColor: 'text-red-900'
    },
    info: {
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      icon: 'ℹ️',
      titleColor: 'text-blue-900'
    }
  };

  const config = typeConfig[insight.type];

  return (
    <div className={`bg-gradient-to-r ${config.bg} border ${config.border} rounded-xl p-5`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{config.icon}</div>
        <div className="flex-1">
          <h5 className={`text-sm font-bold ${config.titleColor} mb-2`}>{insight.title}</h5>
          <p className="text-sm text-gray-700 mb-3">{insight.message}</p>
          <div className="bg-white bg-opacity-60 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-1">💡 Rekomendasi:</div>
            <div className="text-xs text-gray-600">{insight.recommendation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// COMPARISON VIEW (untuk comparison mode - shortened for brevity)
// ==============================================
function ComparisonView({ scenarios, setScenarios, baseData, calculateSimulation }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mode Perbandingan Skenario</h3>
        <p className="text-sm text-gray-600">
          Bandingkan hingga 3 skenario berbeda untuk analisis multi-kriteria. 
          (Interface lengkap tersedia di implementasi penuh)
        </p>
      </div>
    </div>
  );
}

// ==============================================
// SAVED SCENARIOS VIEW
// ==============================================
function SavedScenariosView({ savedScenarios, setSavedScenarios, baseData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Skenario Tersimpan</h3>
        {savedScenarios.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada skenario yang disimpan</p>
            <p className="text-sm text-gray-500 mt-2">
              Jalankan simulasi dan simpan skenario untuk referensi di masa depan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedScenarios.map((scenario) => (
              <SavedScenarioCard 
                key={scenario.id} 
                scenario={scenario}
                onDelete={() => setSavedScenarios(prev => prev.filter(s => s.id !== scenario.id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SavedScenarioCard({ scenario, onDelete }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h5 className="font-bold text-gray-900">{scenario.name}</h5>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(scenario.timestamp).toLocaleString('id-ID')}
          </p>
        </div>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 text-xs font-semibold"
        >
          Hapus
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Siswa Growth:</span>
          <span className="font-bold text-gray-900">{scenario.params.siswaGrowth}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">SPPG Baru:</span>
          <span className="font-bold text-gray-900">{scenario.params.sppgBaru} unit</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Quality Improvement:</span>
          <span className="font-bold text-green-600">
            +{scenario.results.improvements.quality.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default SimulasiPage;