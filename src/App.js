import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import TopNav from './components/Layout/TopNav';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import { WebGISPage, SekolahPage, SPPGPage, PlaceholderPage } from './pages/index';
import { SchoolProvider } from './contexts/SchoolContext';
import AnalisisGiziPage from './pages/AnalisisGiziPage';
import AnalisisKapasitasPage from './pages/AnalisisKapasitasPage';
import AnalisisJarakPage from './pages/AnalisisJarakPage';
import OptimasiPelayananPage from './pages/OptimasiPelayananPage';
import AnalisisSensitivitasPage from './pages/AnalisisSensitivitasPage';
import PenilaianRisikoPage from './pages/PenilaianRisikoPage';
import RekomendasiKebijakanPage from './pages/RekomendasiKebijakanPage';
import SimulasiWhatIfPage from './pages/SimulasiWhatIfPage';
import LaporanVisualisasiPage from './pages/LaporanVisualisasiPage';
import MonitoringEvaluasiPage from './pages/MonitoringEvaluasiPage';
import KualitasDataPage from './pages/KualitasDataPage';
import AnalisisKeadilanPage from './pages/AnalisisKeadilanPage';
import EvaluasiKinerjaPage from './pages/EvaluasiKinerjaPage';
import SkenarioKebijakanPage from './pages/SkenarioKebijakanPage';
import BenchmarkingPage from './pages/BenchmarkingPage';
import IndeksKelayakanPage from './pages/IndeksKelayakanPage';
import ProfilSistemPage from './pages/ProfilSistemPage';
import DokumentasiPage from './pages/DokumentasiPage';

export default function MBGWebGISSystem() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage onEnter={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'webgis':
        return <WebGISPage />;
      case 'sekolah':
        return <SekolahPage />;
      case 'sppg':
        return <SPPGPage />;
      
      // Analisis & Optimasi Pages
      case 'analisis-gizi':
        return <AnalisisGiziPage />;
      case 'analisis-kapasitas':
        return <AnalisisKapasitasPage />;
      case 'analisis-jarak':
        return <AnalisisJarakPage />;
      case 'optimasi':
        return <OptimasiPelayananPage />;
      case 'sensitivitas':
        return <AnalisisSensitivitasPage />;
      case 'risiko':
        return <PenilaianRisikoPage />;
      
      // Kebijakan & Evaluasi Pages
      case 'rekomendasi':
        return <RekomendasiKebijakanPage />;
      case 'simulasi':
        return <SimulasiWhatIfPage />;
      case 'kinerja':
        return <EvaluasiKinerjaPage />;
      case 'equity':
        return <AnalisisKeadilanPage />;
      case 'skenario':
        return <SkenarioKebijakanPage />;
      case 'benchmarking':
        return <BenchmarkingPage />;
      case 'indeks':
        return <IndeksKelayakanPage />;
      
      // Laporan & Sistem Pages
      case 'laporan':
        return <LaporanVisualisasiPage />;
      case 'monitoring':
        return <MonitoringEvaluasiPage />;
      case 'kualitas-data':
        return <KualitasDataPage />;
      case 'profil':
        return <ProfilSistemPage />;
      case 'help':
        return <DokumentasiPage />;
      
      default:
        return <LandingPage onEnter={() => setCurrentPage('dashboard')} />;
    }
  };

  // Landing page tidak perlu layout
  if (currentPage === 'landing') {
    return renderPage();
  }

  // Main app dengan sidebar & topnav
  return (
    <SchoolProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav 
            setSidebarOpen={setSidebarOpen}
            currentPage={currentPage}
          />
          
          <main className="flex-1 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </SchoolProvider>
  );
}
