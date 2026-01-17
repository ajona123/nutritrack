import React, { useState, useEffect } from 'react';
import { MapPin, Users, Building2, TrendingUp, ArrowRight, Database, Activity, Layers, Globe } from 'lucide-react';

export default function LandingPage({ onEnter }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">WebGIS MBG</div>
                <div className="text-xs text-slate-500">Sistem Informasi Geografis</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">Fitur</a>
              <a href="#methodology" className="text-sm text-slate-600 hover:text-slate-900">Metodologi</a>
              <a href="#data" className="text-sm text-slate-600 hover:text-slate-900">Data</a>
              <button 
                onClick={onEnter}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buka Sistem
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-white to-slate-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-6">
              <Database className="w-3 h-3" />
              <span>Research Project 2025</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Optimalisasi Distribusi
              <span className="text-blue-600"> Program MBG</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Platform analisis spasial berbasis GIS untuk evaluasi kelayakan pelayanan 
              Makanan Bergizi Gratis dengan pendekatan multi-criteria decision analysis.
            </p>

            <div className="flex items-center space-x-4">
              <button 
                onClick={onEnter}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Mulai Analisis</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="inline-flex items-center px-6 py-3 text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors">
                Dokumentasi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard 
              value="1,247" 
              label="Sekolah Sasaran"
              sublabel="SD/MI se-Indonesia"
              icon={Building2}
              mounted={mounted}
            />
            <StatCard 
              value="342,891" 
              label="Total Penerima"
              sublabel="Siswa aktif"
              icon={Users}
              mounted={mounted}
            />
            <StatCard 
              value="47" 
              label="SPPG Aktif"
              sublabel="Satuan produksi"
              icon={MapPin}
              mounted={mounted}
            />
            <StatCard 
              value="87.3%" 
              label="Coverage Rate"
              sublabel="Tingkat jangkauan"
              icon={TrendingUp}
              mounted={mounted}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Kemampuan Sistem
            </h2>
            <p className="text-lg text-slate-600">
              Platform terintegrasi dengan algoritma spatial analysis dan machine learning 
              untuk pengambilan keputusan berbasis data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Globe}
              title="Spatial Analysis"
              description="Network routing, proximity analysis, dan service area calculation menggunakan algoritma Dijkstra dan A* pathfinding untuk optimasi distribusi."
            />
            <FeatureCard
              icon={Activity}
              title="Predictive Analytics"
              description="Time series forecasting dengan ARIMA dan machine learning models untuk prediksi demand dan capacity planning berdasarkan data historis."
            />
            <FeatureCard
              icon={Database}
              title="Data Integration"
              description="ETL pipeline untuk integrasi data geospasial dari multiple sources dengan automated quality control dan validation checks."
            />
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Metodologi Penelitian
              </h2>
              <div className="space-y-4">
                <MethodItem
                  number="01"
                  title="Data Collection & Preprocessing"
                  description="Pengumpulan data spasial sekolah, SPPG, dan populasi dengan data cleaning dan normalization."
                />
                <MethodItem
                  number="02"
                  title="Spatial Network Analysis"
                  description="Implementasi algoritma shortest path dan network analysis untuk optimasi rute distribusi."
                />
                <MethodItem
                  number="03"
                  title="Multi-Criteria Evaluation"
                  description="Analytic Hierarchy Process (AHP) untuk scoring kelayakan dengan weighted criteria."
                />
                <MethodItem
                  number="04"
                  title="Validation & Testing"
                  description="Cross-validation dengan ground truth data dan sensitivity analysis untuk model robustness."
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Output & Deliverables
              </h2>
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <ul className="space-y-4">
                  <OutputItem text="Interactive thematic maps dengan multi-layer visualization" />
                  <OutputItem text="Suitability index (0-100) untuk setiap sekolah sasaran" />
                  <OutputItem text="Optimized routing recommendations untuk distribusi" />
                  <OutputItem text="Real-time monitoring dashboard dengan KPI metrics" />
                  <OutputItem text="Automated reporting system dengan data export capabilities" />
                  <OutputItem text="Statistical analysis reports untuk evidence-based policy" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Technology Stack</h3>
            <p className="text-slate-600">Built with modern geospatial technologies</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <TechBadge name="PostgreSQL + PostGIS" />
            <TechBadge name="Python (GeoPandas)" />
            <TechBadge name="React + Leaflet" />
            <TechBadge name="QGIS Processing" />
            <TechBadge name="Scikit-learn" />
            <TechBadge name="FastAPI" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
            <div>© 2025 WebGIS MBG System. Research Project.</div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span>SINTA 1 Standard</span>
              <span>•</span>
              <span>Publication Ready</span>
              <span>•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ value, label, sublabel, icon: Icon, mounted }) {
  return (
    <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
          <div className="text-sm font-medium text-slate-900">{label}</div>
          <div className="text-xs text-slate-500">{sublabel}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function MethodItem({ number, title, description }) {
  return (
    <div className="flex space-x-4">
      <div className="text-2xl font-bold text-blue-600 flex-shrink-0">{number}</div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function OutputItem({ text }) {
  return (
    <li className="flex items-start space-x-3">
      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
      <span className="text-sm text-slate-700">{text}</span>
    </li>
  );
}

function TechBadge({ name }) {
  return (
    <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700">
      {name}
    </div>
  );
}