import React from 'react';
import { Activity, Award, TrendingUp } from 'lucide-react';

export default function MonitoringEvaluasiPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Monitoring & Evaluasi</h2>
        <p className="text-sm text-gray-600 mt-1">Pemantauan real-time dan evaluasi performa program MBG</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard label="Status Monitor" value="Online" color="blue" icon={Activity} />
        <MetricCard label="Uptime" value="99.9%" color="green" icon={Award} />
        <MetricCard label="Performance" value="Optimal" color="orange" icon={TrendingUp} />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Monitoring & Evaluation</h3>
        <p className="text-gray-600 text-sm">Sistem monitoring real-time untuk mengawasi performa dan evaluasi rutin program</p>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Activity className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Output Modul</h3>
            <p className="text-blue-100 text-sm">Real-time monitoring dashboard, alert system, dan evaluation reports</p>
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
