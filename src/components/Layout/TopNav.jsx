import React from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import { PAGE_NAMES } from '../../utils/constants';

function TopNav({ setSidebarOpen, currentPage }) {
  return (
    <header className="h-20 bg-white shadow-sm border-b border-gray-100 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">
              {PAGE_NAMES[currentPage] || 'Dashboard'}
            </h1>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-blue-700">Live Data</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Optimalisasi Pelayanan Pemenuhan Gizi - Program MBG
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <div className="text-xs text-gray-500 font-medium">Last Update</div>
          <div className="text-sm font-bold text-gray-900">14 Des 2025, 09:30</div>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">A</span>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
