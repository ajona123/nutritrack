import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, ComposedChart
} from 'recharts';
import {
  Building2, Users, Database, Target, AlertTriangle, Map,
  Activity, TrendingUp, Award, MapPin, Download, FileSpreadsheet,
  Settings, Shield, AlertCircle, ChevronDown, Filter, Clock,
  CheckCircle, XCircle, AlertCircle as AlertCircleIcon, Home,
  BarChart3, Layers
} from 'lucide-react';

// =====================================
// DASHBOARD HELPER COMPONENTS
// =====================================

/**
 * DashboardMetricCard Component
 * Displays a single metric with icon, value, and trend indicator
 */
export function DashboardMetricCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  change, 
  changeLabel, 
  color = 'blue', 
  trend = 'up' 
}) {
  const colors = {
    blue: { bg: 'from-blue-600 to-blue-700', light: 'bg-blue-50', text: 'text-blue-700' },
    green: { bg: 'from-green-600 to-green-700', light: 'bg-green-50', text: 'text-green-700' },
    purple: { bg: 'from-purple-600 to-purple-700', light: 'bg-purple-50', text: 'text-purple-700' },
    orange: { bg: 'from-orange-600 to-orange-700', light: 'bg-orange-50', text: 'text-orange-700' }
  };

  const colorStyle = colors[color] || colors.blue;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorStyle.bg} rounded-xl flex items-center justify-center shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`px-2 py-1 ${colorStyle.light} ${colorStyle.text} rounded-lg text-xs font-bold flex items-center gap-1`}>
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

/**
 * BarChartComponent
 * Stacked bar chart showing distribution by Kecamatan
 */
export function BarChartComponent({ data, title = 'Distribusi Status Kelayakan' }) {
  const defaultData = [
    { name: 'Bandung', layak: 45, waspada: 12, kritis: 3 },
    { name: 'Cimahi', layak: 38, waspada: 8, kritis: 2 },
    { name: 'Lembang', layak: 52, waspada: 15, kritis: 5 },
    { name: 'Cibeunying', layak: 41, waspada: 10, kritis: 4 },
    { name: 'Soreang', layak: 35, waspada: 9, kritis: 2 }
  ];

  const chartData = data || defaultData;
  const maxValue = Math.max(...chartData.map(d => d.layak + d.waspada + d.kritis));

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      {chartData.map((item, idx) => (
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

/**
 * LineChartComponent
 * Line chart showing trends over months
 */
export function LineChartComponent({ 
  data, 
  months = ['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  values = [82.5, 83.8, 84.2, 85.1, 86.4, 87.3],
  title = 'Tren Kelayakan 6 Bulan'
}) {
  const chartData = data || months.map((month, idx) => ({
    month,
    value: values[idx]
  }));

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <div className="h-48 flex items-end justify-between gap-4 pb-8">
        {(data ? chartData : months).map((item, idx) => {
          const month = data ? item.month : item;
          const val = data ? item.value : values[idx];
          const height = (val / 100) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="text-xs font-bold text-blue-700 mb-2">{val.toFixed(1)}%</div>
              <div 
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                style={{ height: `${height}%` }}
              />
              <div className="text-xs font-semibold text-gray-600 mt-2">{month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * CapacityBar Component
 * Horizontal bar showing capacity utilization
 */
export function CapacityBar({ 
  label, 
  current, 
  max, 
  color = 'blue', 
  isPercentage = false 
}) {
  const percentage = isPercentage ? current : (current / max) * 100;
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700',
    red: 'from-red-600 to-red-700'
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

/**
 * ActivityItem Component
 * Display a single activity/event with icon and timestamp
 */
export function ActivityItem({ 
  title, 
  time, 
  icon: Icon, 
  color = 'blue' 
}) {
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

/**
 * AlertItem Component
 * Display an alert with severity level and description
 */
export function AlertItem({ 
  title, 
  description, 
  severity = 'high' 
}) {
  const severityConfig = {
    high: { color: 'red', icon: AlertTriangle, label: 'Tinggi' },
    medium: { color: 'yellow', icon: AlertTriangle, label: 'Sedang' },
    low: { color: 'blue', icon: AlertCircleIcon, label: 'Rendah' }
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

// =====================================
// NUTRITION ANALYSIS COMPONENTS
// =====================================

/**
 * NutritionStatCard Component
 * Display nutrition statistics with icons and values
 */
export function NutritionStatCard({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  color = 'blue' 
}) {
  const colors = {
    blue: { bg: 'from-blue-600 to-blue-700', light: 'bg-blue-50', text: 'text-blue-700' },
    green: { bg: 'from-green-600 to-green-700', light: 'bg-green-50', text: 'text-green-700' },
    orange: { bg: 'from-orange-600 to-orange-700', light: 'bg-orange-50', text: 'text-orange-700' },
    red: { bg: 'from-red-600 to-red-700', light: 'bg-red-50', text: 'text-red-700' }
  };

  const colorStyle = colors[color] || colors.blue;

  return (
    <div className={`${colorStyle.light} border-2 border-gray-200 rounded-xl p-4 text-center`}>
      <div className={`w-12 h-12 bg-gradient-to-br ${colorStyle.bg} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs font-semibold text-gray-600 mb-1">{title}</div>
      <div className={`text-3xl font-black ${colorStyle.text} mb-1`}>{value}</div>
      <div className="text-xs text-gray-600">{unit}</div>
    </div>
  );
}

/**
 * ViewModeButton Component
 * Tab-style button for switching between different view modes
 */
export function ViewModeButton({ 
  label, 
  isActive, 
  onClick, 
  icon: Icon 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
}

// =====================================
// NUTRITION VIEW COMPONENTS
// =====================================

/**
 * OverviewNutritionView Component
 * Display overview of nutrition data with summary statistics
 */
export function OverviewNutritionView({ data, kebutuhanData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(kebutuhanData || {}).slice(0, 4).map(([key, value]) => (
          <NutritionStatCard
            key={key}
            title={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
            value={value.value}
            unit={value.unit}
            color={value.color}
            icon={value.icon || Target}
          />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Kebutuhan Nutrisi</h4>
        <div className="space-y-3">
          {/* Add nutrition summary items here */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700">Total Energi Harian</span>
            <span className="text-lg font-bold text-blue-700">~700 kkal/siswa</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700">Total Protein Harian</span>
            <span className="text-lg font-bold text-green-700">~20g/siswa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DetailNutritionView Component
 * Display detailed nutrition breakdown
 */
export function DetailNutritionView({ data, kebutuhanData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Breakdown Nutrisi Detail</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="font-semibold text-gray-700">Karbohidrat</span>
            <span className="text-sm font-bold text-blue-700">50-60% dari total energi</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="font-semibold text-gray-700">Protein</span>
            <span className="text-sm font-bold text-green-700">10-15% dari total energi</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <span className="font-semibold text-gray-700">Lemak</span>
            <span className="text-sm font-bold text-orange-700">25-35% dari total energi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * HeatmapNutritionView Component
 * Display nutrition data as heatmap by region
 */
export function HeatmapNutritionView({ data, kebutuhanPerWilayah }) {
  const wilayahData = kebutuhanPerWilayah || [
    { wilayah: 'Bandung', siswa: 1200, energi: 840000, protein: 24000 },
    { wilayah: 'Cimahi', siswa: 980, energi: 686000, protein: 19600 },
    { wilayah: 'Lembang', siswa: 1450, energi: 1015000, protein: 29000 },
  ];

  const maxEnergi = Math.max(...wilayahData.map(w => w.energi));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Heatmap Kebutuhan Energi per Wilayah</h4>
        <div className="space-y-3">
          {wilayahData.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{item.wilayah}</span>
                <span className="text-sm font-bold text-gray-900">{(item.energi / 1000).toLocaleString()} kkal</span>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 flex items-center px-3"
                  style={{ width: `${(item.energi / maxEnergi) * 100}%` }}
                >
                  <span className="text-xs font-bold text-white">{item.siswa} siswa</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================
// DATA FILTERING & SORTING COMPONENTS
// =====================================

/**
 * DataFilterPanel Component
 * Generic filter panel for data queries
 */
export function DataFilterPanel({ 
  onFilter, 
  filterOptions = [],
  showAdvanced = false 
}) {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">Filter Data</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterOptions.map((option) => (
          <div key={option.key}>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              {option.label}
            </label>
            {option.type === 'select' ? (
              <select
                value={filters[option.key] || 'all'}
                onChange={(e) => handleFilterChange(option.key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua</option>
                {option.values?.map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            ) : (
              <input
                type={option.type}
                placeholder={option.placeholder}
                value={filters[option.key] || ''}
                onChange={(e) => handleFilterChange(option.key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            + Tampilkan Filter Lanjutan
          </button>
        </div>
      )}
    </div>
  );
}

// =====================================
// RECHARTS WRAPPER COMPONENTS
// =====================================

/**
 * RechartsBarChart Component
 * Wrapper for Recharts bar chart with common styling
 */
export function RechartsBarChart({ data, keys, colors = [], title }) {
  return (
    <div>
      {title && <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          {keys.map((key, idx) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={colors[idx] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * RechartsLineChart Component
 * Wrapper for Recharts line chart
 */
export function RechartsLineChart({ data, keys, colors = [], title }) {
  return (
    <div>
      {title && <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          {keys.map((key, idx) => (
            <Line 
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[idx] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              strokeWidth={2}
              dot={{ fill: colors[idx] }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * RechartsPieChart Component
 * Wrapper for Recharts pie chart
 */
export function RechartsPieChart({ data, colors = [], title }) {
  const COLORS = colors.length > 0 ? colors : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  
  return (
    <div>
      {title && <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * RechartsRadarChart Component
 * Wrapper for Recharts radar chart
 */
export function RechartsRadarChart({ data, keys, colors = [], title }) {
  return (
    <div>
      {title && <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Radar name={keys[0]} dataKey={keys[0]} stroke={colors[0] || '#3b82f6'} fill={colors[0] || '#3b82f6'} fillOpacity={0.6} />
          {keys.slice(1).map((key, idx) => (
            <Radar 
              key={key}
              name={key}
              dataKey={key}
              stroke={colors[idx + 1] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              fill={colors[idx + 1]}
              fillOpacity={0.1}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * RechartsAreaChart Component
 * Wrapper for Recharts area chart
 */
export function RechartsAreaChart({ data, keys, colors = [], title }) {
  return (
    <div>
      {title && <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          {keys.map((key, idx) => (
            <Area 
              key={key}
              type="monotone"
              dataKey={key}
              fill={colors[idx] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              fillOpacity={0.6}
              stroke={colors[idx]}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * RechartsComposedChart Component
 * Wrapper for Recharts composed chart (mix of bar, line, area)
 */
export function RechartsComposedChart({ data, bars = [], lines = [], title }) {
  return (
    <div>
      {title && <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          {bars.map((bar) => (
            <Bar 
              key={bar.key}
              dataKey={bar.key}
              fill={bar.color || '#3b82f6'}
              radius={[8, 8, 0, 0]}
            />
          ))}
          {lines.map((line) => (
            <Line 
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color || '#10b981'}
              strokeWidth={2}
              dot={{ fill: line.color }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// =====================================
// COMMON UTILITY COMPONENTS
// =====================================

/**
 * EmptyState Component
 * Show when no data is available
 */
export function EmptyState({ title, description, icon: Icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      {Icon && <Icon className="w-16 h-16 text-gray-300 mb-4" />}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center mb-4">{description}</p>
      {action && (
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          {action.label}
        </button>
      )}
    </div>
  );
}

/**
 * LoadingState Component
 * Show loading indicator with message
 */
export function LoadingState({ message = 'Loading data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

/**
 * ErrorState Component
 * Show error message with retry option
 */
export function ErrorState({ title, message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-red-50 rounded-xl border-2 border-red-200">
      <AlertTriangle className="w-16 h-16 text-red-600 mb-4" />
      <h3 className="text-lg font-bold text-red-900 mb-2">{title}</h3>
      <p className="text-sm text-red-700 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

/**
 * StatCard Component
 * Generic statistic card
 */
export function StatCard({ label, value, trend, color = 'blue', icon: Icon }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700',
    red: 'from-red-600 to-red-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
        {Icon && <Icon className="w-5 h-5 text-white" />}
      </div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600">{label}</div>
      {trend && (
        <div className={`text-xs font-semibold mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
