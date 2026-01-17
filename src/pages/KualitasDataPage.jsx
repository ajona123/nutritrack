import React from 'react';
import { CheckCircle, Award } from 'lucide-react';

export default function KualitasDataPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Kualitas Data</h2>
        <p className="text-sm text-gray-600 mt-1">Monitoring integritas dan validitas data sistem</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard label="Data Validity" value="98.7%" color="blue" icon={CheckCircle} />
        <MetricCard label="Completeness" value="99.2%" color="green" icon={Award} />
        <MetricCard label="Consistency" value="97.9%" color="orange" icon={CheckCircle} />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Data Quality Analysis</h3>
        <p className="text-gray-600 text-sm">Monitoring kualitas data dengan metrik completeness, consistency, dan validity</p>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul</h3>
            <p className="text-blue-100 text-sm">Data quality report, anomaly detection, dan data cleaning recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color, icon: Icon }) {
  const colors = { blue: 'from-blue-600 to-blue-700', green: 'from-green-600 to-green-700', orange: 'from-orange-600 to-orange-700' };
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
