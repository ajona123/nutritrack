/* eslint-disable no-undef, react/jsx-no-undef */
import React, { useState } from 'react';
import { Zap, Award, TrendingUp, Target, Activity, BarChart3, MapPin, Settings } from 'lucide-react';

// ==============================================
// MODUL OPTIMASI PELAYANAN - PART 9 (SINTA 1 LEVEL)
// ==============================================
function OptimasiPage() {
  const [viewMode, setViewMode] = useState('overview'); // overview, optimization, comparison, recommendations
  const [optimizationParams, setOptimizationParams] = useState({
    maxDistance: 15, // km
    maxTravelTime: 30, // minutes
    minUtilization: 70, // %
    maxUtilization: 90, // %
    priorityWeight: {
      distance: 40,
      capacity: 30,
      quality: 20,
      cost: 10
    }
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState('current');

  // Current state data (before optimization)
  const currentState = {
    totalSekolah: 1247,
    totalSPPG: 5,
    avgDistance: 9.8,
    avgTravelTime: 24,
    avgUtilization: 87.3,
    suboptimalRoutes: 127,
    overloadedSPPG: 2,
    totalCost: 2450000000, // per month
    qualityScore: 78.5,
    equity: {
      giniIndex: 0.32,
      coverage: 91.2
    },
    distribution: {
      optimal: 892,
      suboptimal: 228,
      critical: 127
    }
  };

  // Optimization algorithm
  const runOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      const optimizedState = {
        totalSekolah: 1247,
        totalSPPG: 6, // +1 new SPPG recommended
        avgDistance: 7.2,
        avgTravelTime: 18,
        avgUtilization: 78.5,
        suboptimalRoutes: 34,
        overloadedSPPG: 0,
        totalCost: 2680000000, // increased due to new SPPG
        qualityScore: 91.8,
        equity: {
          giniIndex: 0.18,
          coverage: 98.7
        },
        distribution: {
          optimal: 1189,
          suboptimal: 46,
          critical: 12
        },
        improvements: {
          distanceReduction: 26.5, // %
          timeReduction: 25.0, // %
          qualityIncrease: 16.9, // %
          equityIncrease: 43.8, // %
          costIncrease: 9.4 // %
        },
        actions: [
          {
            type: 'new_sppg',
            title: 'Pembangunan SPPG Baru',
            location: 'Kec. Lembang Timur',
            impact: 'Melayani 284 sekolah, mengurangi jarak rata-rata 3.2 km',
            priority: 'high',
            cost: 2500000000,
            timeline: '6-8 bulan'
          },
          {
            type: 'reassignment',
            title: 'Realokasi 47 Sekolah',
            description: 'Reassign ke SPPG terdekat',
            impact: 'Pengurangan waktu tempuh rata-rata 8 menit',
            priority: 'high',
            cost: 0,
            timeline: '1 bulan'
          },
          {
            type: 'capacity',
            title: 'Peningkatan Kapasitas SPPG Soreang',
            description: 'Penambahan 1 shift produksi',
            impact: 'Kapasitas +3000 kg/hari',
            priority: 'medium',
            cost: 250000000,
            timeline: '2 bulan'
          },
          {
            type: 'route',
            title: 'Optimasi 12 Rute Kritis',
            description: 'Perbaikan jalan dan alternatif rute',
            impact: 'Pengurangan waktu tempuh 15-20 menit',
            priority: 'medium',
            cost: 180000000,
            timeline: '3-4 bulan'
          }
        ],
        routeChanges: [
          { sekolah: 'SDN 2 Lembang', from: 'SPPG Lembang', to: 'SPPG Lembang Timur (Baru)', distanceBefore: 16.7, distanceAfter: 5.2 },
          { sekolah: 'MIN 3 Lembang', from: 'SPPG Lembang', to: 'SPPG Lembang Timur (Baru)', distanceBefore: 18.2, distanceAfter: 4.8 },
          { sekolah: 'SDN 4 Soreang', from: 'SPPG Soreang', to: 'SPPG Cibeunying', distanceBefore: 11.9, distanceAfter: 8.3 }
        ]
      };

      setOptimizationResult(optimizedState);
      setIsOptimizing(false);
    }, 2500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Optimasi Pelayanan MBG</h2>
          <p className="text-sm text-gray-600 mt-1">
            Multi-criteria decision analysis untuk optimalisasi distribusi dan alokasi sumber daya
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={runOptimization}
            disabled={isOptimizing}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              isOptimizing 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg'
            }`}
          >
            <Target className="w-4 h-4" />
            {isOptimizing ? 'Mengoptimasi...' : 'Jalankan Optimasi'}
          </button>
          {optimizationResult && (
            <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
              Export Hasil
            </button>
          )}
        </div>
      </div>

      {/* Optimization Status */}
      {isOptimizing && (
        <div className="bg-white rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Proses Optimasi Berjalan...</h3>
              <p className="text-sm text-gray-600">
                Menganalisis {currentState.totalSekolah} sekolah dan {currentState.totalSPPG} SPPG dengan algoritma multi-objective optimization
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      )}

      {/* Current State Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Status Pelayanan Saat Ini</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CurrentStateCard
            label="Avg Jarak"
            value={`${currentState.avgDistance} km`}
            status={currentState.avgDistance > 10 ? 'warning' : 'good'}
            icon={MapPin}
          />
          <CurrentStateCard
            label="Avg Waktu"
            value={`${currentState.avgTravelTime} mnt`}
            status={currentState.avgTravelTime > 25 ? 'warning' : 'good'}
            icon={Activity}
          />
          <CurrentStateCard
            label="Utilisasi"
            value={`${currentState.avgUtilization}%`}
            status={currentState.avgUtilization > 85 ? 'warning' : 'good'}
            icon={TrendingUp}
          />
          <CurrentStateCard
            label="Quality Score"
            value={currentState.qualityScore.toFixed(1)}
            status={currentState.qualityScore < 80 ? 'warning' : 'good'}
            icon={Award}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-black text-green-600">{currentState.distribution.optimal}</div>
            <div className="text-xs text-gray-600 mt-1">Optimal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-yellow-600">{currentState.distribution.suboptimal}</div>
            <div className="text-xs text-gray-600 mt-1">Suboptimal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-red-600">{currentState.distribution.critical}</div>
            <div className="text-xs text-gray-600 mt-1">Kritis</div>
          </div>
        </div>
      </div>

      {/* Optimization Parameters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Parameter Optimasi</h3>
        </div>

        <div className="space-y-6">
          {/* Distance Threshold */}
          <OptimizationSlider
            label="Threshold Jarak Maksimal"
            value={optimizationParams.maxDistance}
            onChange={(val) => setOptimizationParams(prev => ({ ...prev, maxDistance: val }))}
            min={10}
            max={20}
            unit="km"
            description="Batas maksimal jarak sekolah ke SPPG"
          />

          {/* Travel Time Threshold */}
          <OptimizationSlider
            label="Threshold Waktu Tempuh"
            value={optimizationParams.maxTravelTime}
            onChange={(val) => setOptimizationParams(prev => ({ ...prev, maxTravelTime: val }))}
            min={20}
            max={45}
            unit="menit"
            description="Batas maksimal waktu perjalanan untuk menjaga kualitas"
          />

          {/* Utilization Range */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-3">
              Target Range Utilisasi SPPG
            </label>
            <div className="grid grid-cols-2 gap-4">
              <OptimizationSlider
                label="Minimum"
                value={optimizationParams.minUtilization}
                onChange={(val) => setOptimizationParams(prev => ({ ...prev, minUtilization: val }))}
                min={60}
                max={80}
                unit="%"
                description="Utilisasi minimum untuk efisiensi"
              />
              <OptimizationSlider
                label="Maksimum"
                value={optimizationParams.maxUtilization}
                onChange={(val) => setOptimizationParams(prev => ({ ...prev, maxUtilization: val }))}
                min={80}
                max={95}
                unit="%"
                description="Utilisasi maksimum untuk menghindari overload"
              />
            </div>
          </div>

          {/* Priority Weights */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-3">
              Bobot Prioritas Kriteria (Total: 100%)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <PriorityWeightSlider
                label="Jarak & Waktu"
                value={optimizationParams.priorityWeight.distance}
                onChange={(val) => setOptimizationParams(prev => ({
                  ...prev,
                  priorityWeight: { ...prev.priorityWeight, distance: val }
                }))}
                color="blue"
              />
              <PriorityWeightSlider
                label="Kapasitas"
                value={optimizationParams.priorityWeight.capacity}
                onChange={(val) => setOptimizationParams(prev => ({
                  ...prev,
                  priorityWeight: { ...prev.priorityWeight, capacity: val }
                }))}
                color="purple"
              />
              <PriorityWeightSlider
                label="Kualitas"
                value={optimizationParams.priorityWeight.quality}
                onChange={(val) => setOptimizationParams(prev => ({
                  ...prev,
                  priorityWeight: { ...prev.priorityWeight, quality: val }
                }))}
                color="green"
              />
              <PriorityWeightSlider
                label="Biaya"
                value={optimizationParams.priorityWeight.cost}
                onChange={(val) => setOptimizationParams(prev => ({
                  ...prev,
                  priorityWeight: { ...prev.priorityWeight, cost: val }
                }))}
                color="orange"
              />
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600">
                Total Bobot: <span className="font-bold text-gray-900">
                  {Object.values(optimizationParams.priorityWeight).reduce((a, b) => a + b, 0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Results */}
      {optimizationResult && (
        <>
          {/* Improvement Summary */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Hasil Optimasi</h3>
                <p className="text-green-100 text-sm">Peningkatan signifikan pada seluruh metrik pelayanan</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <ImprovementCard
                label="Jarak"
                value={`-${optimizationResult.improvements.distanceReduction}%`}
                icon="↓"
              />
              <ImprovementCard
                label="Waktu"
                value={`-${optimizationResult.improvements.timeReduction}%`}
                icon="↓"
              />
              <ImprovementCard
                label="Kualitas"
                value={`+${optimizationResult.improvements.qualityIncrease}%`}
                icon="↑"
              />
              <ImprovementCard
                label="Pemerataan"
                value={`+${optimizationResult.improvements.equityIncrease}%`}
                icon="↑"
              />
              <ImprovementCard
                label="Biaya"
                value={`+${optimizationResult.improvements.costIncrease}%`}
                icon="↑"
              />
            </div>
          </div>

          {/* Before vs After Comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Perbandingan: Sebelum vs Sesudah Optimasi</h3>
            
            <div className="space-y-6">
              <ComparisonMetric
                label="Rata-rata Jarak"
                before={currentState.avgDistance}
                after={optimizationResult.avgDistance}
                unit="km"
                better="lower"
              />
              <ComparisonMetric
                label="Rata-rata Waktu Tempuh"
                before={currentState.avgTravelTime}
                after={optimizationResult.avgTravelTime}
                unit="menit"
                better="lower"
              />
              <ComparisonMetric
                label="Utilisasi SPPG"
                before={currentState.avgUtilization}
                after={optimizationResult.avgUtilization}
                unit="%"
                better="optimal"
                optimal={80}
              />
              <ComparisonMetric
                label="Quality Score"
                before={currentState.qualityScore}
                after={optimizationResult.qualityScore}
                unit="poin"
                better="higher"
              />
              <ComparisonMetric
                label="Gini Index (Pemerataan)"
                before={currentState.equity.giniIndex}
                after={optimizationResult.equity.giniIndex}
                unit=""
                better="lower"
                decimals={2}
              />
            </div>
          </div>

          {/* Distribution Comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Distribusi Status Pelayanan</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Sebelum Optimasi</h4>
                <DistributionChart data={currentState.distribution} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Sesudah Optimasi</h4>
                <DistributionChart data={optimizationResult.distribution} />
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-green-700 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-green-900 mb-1">Peningkatan Signifikan</div>
                  <div className="text-xs text-gray-700">
                    Status optimal meningkat dari {currentState.distribution.optimal} menjadi {optimizationResult.distribution.optimal} sekolah 
                    (+{optimizationResult.distribution.optimal - currentState.distribution.optimal} sekolah atau +{(((optimizationResult.distribution.optimal - currentState.distribution.optimal) / currentState.distribution.optimal) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Rekomendasi Aksi</h3>
            
            <div className="space-y-4">
              {optimizationResult.actions.map((action, idx) => (
                <ActionCard key={idx} action={action} index={idx + 1} />
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-700 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-blue-900 mb-2">Prioritas Implementasi</div>
                  <ol className="space-y-1 text-xs text-gray-700">
                    <li>1. Realokasi 47 sekolah (dapat dilakukan segera, tanpa biaya)</li>
                    <li>2. Pembangunan SPPG baru di Lembang Timur (dampak terbesar)</li>
                    <li>3. Peningkatan kapasitas SPPG Soreang (menurunkan overload)</li>
                    <li>4. Optimasi rute kritis (perbaikan jalan akses)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Route Changes Detail */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Perubahan Rute (Sample)</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Sekolah</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">SPPG Lama</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">SPPG Baru</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Jarak Lama</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Jarak Baru</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {optimizationResult.routeChanges.map((change, idx) => (
                    <tr key={idx} className="hover:bg-green-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{change.sekolah}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{change.from}</td>
                      <td className="px-4 py-3 text-sm text-blue-700 font-semibold">{change.to}</td>
                      <td className="px-4 py-3 text-sm text-red-600 font-bold">{change.distanceBefore} km</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-bold">{change.distanceAfter} km</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                          -{((change.distanceBefore - change.distanceAfter) / change.distanceBefore * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-gray-600 text-center">
              Menampilkan 3 dari {optimizationResult.actions.find(a => a.type === 'reassignment')?.description.match(/\d+/)?.[0] || 0} perubahan rute yang direkomendasikan
            </div>
          </div>

          {/* Cost-Benefit Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Analisis Biaya-Manfaat</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Biaya Implementasi</h4>
                <div className="space-y-3">
                  {optimizationResult.actions.map((action, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-700">{action.title}</div>
                      <div className="text-sm font-bold text-gray-900">
                        Rp {(action.cost / 1000000).toFixed(0)}M
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg border border-blue-200">
                    <div className="text-sm font-bold text-blue-900">Total Investasi</div>
                    <div className="text-lg font-black text-blue-900">
                      Rp {(optimizationResult.actions.reduce((sum, a) => sum + a.cost, 0) / 1000000).toFixed(0)}M
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Manfaat yang Diperoleh</h4>
                <div className="space-y-3">
                  <BenefitItem
                    label="Peningkatan Kualitas Pelayanan"
                    value={`+${optimizationResult.improvements.qualityIncrease}%`}
                    impact="high"
                  />
                  <BenefitItem
                    label="Pengurangan Jarak Distribusi"
                    value={`-${optimizationResult.improvements.distanceReduction}%`}
                    impact="high"
                  />
                  <BenefitItem
                    label="Pemerataan Layanan"
                    value={`+${optimizationResult.improvements.equityIncrease}%`}
                    impact="high"
                  />
                  <BenefitItem
                    label="Efisiensi Utilisasi SPPG"
                    value="Optimal"
                    impact="medium"
                  />
                  <BenefitItem
                    label="Cakupan Layanan"
                    value={`${optimizationResult.equity.coverage}%`}
                    impact="medium"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-green-700 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-green-900 mb-2">Return on Investment (ROI)</div>
                  <div className="text-xs text-gray-700 leading-relaxed">
                    Investasi total Rp {(optimizationResult.actions.reduce((sum, a) => sum + a.cost, 0) / 1000000000).toFixed(2)} miliar 
                    akan menghasilkan peningkatan kualitas pelayanan sebesar {optimizationResult.improvements.qualityIncrease}% dan 
                    menjangkau {(optimizationResult.equity.coverage - currentState.equity.coverage).toFixed(1)}% siswa tambahan.
                    Estimasi ROI tercapai dalam 18-24 bulan melalui efisiensi operasional dan peningkatan outcome gizi siswa.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Timeline Implementasi</h3>
            
            <div className="space-y-4">
              {optimizationResult.actions.map((action, idx) => (
                <TimelineItem key={idx} action={action} index={idx} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Output Info Panel */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul Optimasi Pelayanan</h3>
            <p className="text-green-100 text-sm leading-relaxed mb-3">
              Modul ini menghasilkan: (1) Multi-criteria decision analysis dengan optimasi simultan jarak, kapasitas, kualitas, dan biaya,
              (2) Rekomendasi aksi konkret (pembangunan SPPG baru, realokasi sekolah, peningkatan kapasitas),
              (3) Analisis before-after dengan visualisasi improvement pada seluruh metrik,
              (4) Cost-benefit analysis untuk mendukung pengambilan keputusan investasi,
              (5) Implementation roadmap dengan prioritas dan timeline yang jelas untuk eksekusi optimal.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Multi-Objective Optimization</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Decision Support</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Cost-Benefit Analysis</span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">Implementation Planning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// HELPER COMPONENTS FOR OPTIMIZATION MODULE
// ==============================================
function CurrentStateCard({ label, value, status, icon: Icon }) {
  const statusColors = {
    good: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    critical: 'bg-red-50 border-red-200 text-red-700'
  };

  return (
    <div className={`${statusColors[status]} border rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  );
}

function OptimizationSlider({ label, value, onChange, min, max, unit, description }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-blue-600">{value}</span>
          <span className="text-sm text-gray-600">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
}

function PriorityWeightSlider({ label, value, onChange, color }) {
  const colors = {
    blue: 'accent-blue-600',
    purple: 'accent-purple-600',
    green: 'accent-green-600',
    orange: 'accent-orange-600'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-lg font-black text-gray-900">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={50}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${colors[color]}`}
      />
    </div>
  );
}

function ImprovementCard({ label, value, icon }) {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl font-black mb-1">{icon} {value}</div>
      <div className="text-xs text-green-100">{label}</div>
    </div>
  );
}

function ComparisonMetric({ label, before, after, unit, better, optimal, decimals = 1 }) {
  const improvement = better === 'lower' 
    ? ((before - after) / before * 100)
    : better === 'higher'
    ? ((after - before) / before * 100)
    : null;

  const isImproved = better === 'optimal' 
    ? Math.abs(after - optimal) < Math.abs(before - optimal)
    : improvement > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {improvement !== null && (
          <span className={`text-sm font-bold ${isImproved ? 'text-green-600' : 'text-red-600'}`}>
            {isImproved ? '↓' : '↑'} {Math.abs(improvement).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Sebelum</div>
          <div className="text-xl font-black text-red-700">
            {typeof before === 'number' ? before.toFixed(decimals) : before} {unit}
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Sesudah</div>
          <div className="text-xl font-black text-green-700">
            {typeof after === 'number' ? after.toFixed(decimals) : after} {unit}
          </div>
        </div>
      </div>
    </div>
  );
}

function DistributionChart({ data }) {
  const total = data.optimal + data.suboptimal + data.critical;
  const percentages = {
    optimal: (data.optimal / total) * 100,
    suboptimal: (data.suboptimal / total) * 100,
    critical: (data.critical / total) * 100
  };

  return (
    <div>
      <div className="h-8 flex rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
        <div 
          className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
          style={{ width: `${percentages.optimal}%` }}
        >
          {data.optimal > 0 && data.optimal}
        </div>
        <div 
          className="bg-yellow-500 flex items-center justify-center text-white text-xs font-bold"
          style={{ width: `${percentages.suboptimal}%` }}
        >
          {data.suboptimal > 0 && data.suboptimal}
        </div>
        <div 
          className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
          style={{ width: `${percentages.critical}%` }}
        >
          {data.critical > 0 && data.critical}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">Optimal</span>
          </div>
          <span className="font-bold text-gray-900">{data.optimal} ({percentages.optimal.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-700">Suboptimal</span>
          </div>
          <span className="font-bold text-gray-900">{data.suboptimal} ({percentages.suboptimal.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-700">Kritis</span>
          </div>
          <span className="font-bold text-gray-900">{data.critical} ({percentages.critical.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ action, index }) {
  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-blue-200 bg-blue-50'
  };

  const typeIcons = {
    new_sppg: '🏗️',
    reassignment: '🔄',
    capacity: '📈',
    route: '🛣️'
  };

  return (
    <div className={`${priorityColors[action.priority]} border-2 rounded-xl p-5`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl">{typeIcons[action.type]}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg font-bold text-gray-900">#{index}</span>
            <h4 className="text-lg font-bold text-gray-900">{action.title}</h4>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
              action.priority === 'high' ? 'bg-red-200 text-red-800' :
              action.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
              'bg-blue-200 text-blue-800'
            }`}>
              {action.priority.toUpperCase()}
            </span>
          </div>
          
          {action.description && (
            <p className="text-sm text-gray-700 mb-3">{action.description}</p>
          )}
          {action.location && (
            <p className="text-sm text-gray-700 mb-3">📍 {action.location}</p>
          )}
          
          <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-3">
            <div className="text-xs font-semibold text-gray-700 mb-1">Dampak:</div>
            <div className="text-sm text-gray-900">{action.impact}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white bg-opacity-60 rounded-lg p-2">
              <div className="text-xs text-gray-600">Biaya</div>
              <div className="text-sm font-bold text-gray-900">
                Rp {(action.cost / 1000000).toFixed(0)}M
              </div>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-2">
              <div className="text-xs text-gray-600">Timeline</div>
              <div className="text-sm font-bold text-gray-900">{action.timeline}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ label, value, impact }) {
  const impactColors = {
    high: 'bg-green-100 border-green-300',
    medium: 'bg-blue-100 border-blue-300',
    low: 'bg-gray-100 border-gray-300'
  };

  return (
    <div className={`${impactColors[impact]} border rounded-lg p-3 flex items-center justify-between`}>
      <span className="text-sm text-gray-700">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value}</span>
    </div>
  );
}

function TimelineItem({ action, index }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          {index + 1}
        </div>
        {index < 3 && <div className="w-0.5 h-16 bg-blue-300"></div>}
      </div>
      <div className="flex-1 pb-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-bold text-gray-900">{action.title}</h5>
            <span className="text-xs font-semibold text-blue-600">{action.timeline}</span>
          </div>
          <p className="text-sm text-gray-600">{action.impact}</p>
        </div>
      </div>
    </div>
  );
}

export default OptimasiPage;