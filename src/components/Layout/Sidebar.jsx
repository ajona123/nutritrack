import React from 'react';
import { Map, X, Home, ChevronRight } from 'lucide-react';
import { SIDEBAR_MENU_GROUPS } from '../../utils/constants';

function Sidebar({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) {
  const iconMap = {
    'Home': '🏠',
    'Map': '🗺️',
    'Building2': '🏢',
    'Database': '💾',
    'Shield': '🛡️',
    'BarChart3': '📊',
    'TrendingUp': '📈',
    'MapPin': '📍',
    'Target': '🎯',
    'Activity': '📊',
    'Scale': '⚖️',
    'Zap': '⚡',
    'AlertTriangle': '⚠️',
    'FileText': '📄',
    'Eye': '👁️',
    'BookOpen': '📚',
    'Settings': '⚙️',
    'Users': '👥',
    'Award': '🏆',
    'Layers': '📚',
    'TrendingDown': '📉',
    'DollarSign': '💰',
    'Gauge': '📏',
  };

  const getDynamicIcon = (iconName) => {
    return iconMap[iconName] || '•';
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Map className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">WebGIS MBG</div>
              <div className="text-xs text-blue-100">Research Platform</div>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {SIDEBAR_MENU_GROUPS.map((group, idx) => (
            <div key={idx}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                <span>{group.title}</span>
                <div className="h-px flex-1 bg-gradient-to-l from-gray-200 to-transparent"></div>
              </div>
              <div className="space-y-1">
                {group.items.map(item => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-[1.02]' 
                          : 'text-gray-700 hover:bg-gray-50 hover:scale-[1.01]'
                      }`}
                    >
                      <span className="text-lg">{getDynamicIcon(item.icon)}</span>
                      <span className="flex-1 text-left font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          isActive 
                            ? 'bg-white bg-opacity-25 text-white' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-b from-transparent to-gray-50">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🛡️</span>
              <span className="text-xs font-semibold text-blue-900">Rendiajona Grade</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Research-grade analytical system for academic publication
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
