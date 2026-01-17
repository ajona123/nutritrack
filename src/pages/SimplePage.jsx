import React from 'react';
import { AlertTriangle, Award, TrendingDown } from 'lucide-react';

const SimplePage = ({ title, desc, metric1, metric2, metric3, icon: Icon }) => (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <MetricCard {...metric1} />
      <MetricCard {...metric2} />
      <MetricCard {...metric3} />
    </div>
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-sm">{desc} - Analisis komprehensif dengan visualisasi data dan rekomendasi kebijakan.</p>
    </div>
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
      <div className="flex items-start gap-4">
        <Icon className="w-6 h-6 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-2">Output Modul</h3>
          <p className="text-blue-100 text-sm">Laporan analisis komprehensif dengan metrik performa dan rekomendasi optimasi system</p>
        </div>
      </div>
    </div>
  </div>
);

function MetricCard({ label, value, color, icon: Icon }) {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    orange: 'from-orange-600 to-orange-700',
    red: 'from-red-600 to-red-700',
    purple: 'from-purple-600 to-purple-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default SimplePage;
