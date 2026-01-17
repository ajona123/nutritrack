import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { sekolahService } from '../services/apiService';

/**
 * SchoolContext - Global state management untuk data sekolah
 * Memungkinkan real-time sync data antar pages (SekolahPage & WebGISPage)
 */
const SchoolContext = createContext();

/**
 * SchoolProvider Component
 * Wrap aplikasi dengan ini untuk enable context API
 */
export const SchoolProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  /**
   * Fetch semua data sekolah saat pertama kali mount
   */
  const fetchSchools = useCallback(async () => {
    try {
      setLoading(true);
      const result = await sekolahService.getAll();
      
      if (result.success && result.data && Array.isArray(result.data)) {
        // Set semua data sekolah dari database
        setSchools(result.data);
        setError(null);
      } else {
        // Tidak ada fallback dummy data - pastikan user tahu
        setError(`Gagal memuat data sekolah dari server`);
        setSchools([]);
      }
    } catch (err) {
      setError(err.message || 'Gagal menghubungi server');
      setSchools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch schools on mount
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  /**
   * Tambah sekolah baru ke context
   * INSTANT UPDATE - tidak perlu refresh atau API call lagi
   */
  const addSchool = useCallback((newSchool) => {
    const id = schools.length > 0 ? Math.max(...schools.map(s => s.id || 0)) + 1 : 1;
    const schoolWithId = { id, ...newSchool };
    setSchools(prev => [...prev, schoolWithId]);
    setLastUpdated(new Date());
    return schoolWithId;
  }, [schools]);

  /**
   * Update sekolah di context
   */
  const updateSchool = useCallback((id, updatedData) => {
    setSchools(prev => 
      prev.map(school => school.id === id ? { ...school, ...updatedData } : school)
    );
    setLastUpdated(new Date());
  }, []);

  /**
   * Hapus sekolah dari context
   */
  const deleteSchool = useCallback((id) => {
    setSchools(prev => prev.filter(school => school.id !== id));
    setLastUpdated(new Date());
  }, []);

  /**
   * Clear semua data (untuk reset)
   */
  const clearSchools = useCallback(() => {
    setSchools([]);
    setLastUpdated(new Date());
  }, []);

  const value = {
    schools,
    loading,
    error,
    lastUpdated,
    addSchool,
    updateSchool,
    deleteSchool,
    clearSchools,
    fetchSchools,
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};

/**
 * Custom Hook untuk menggunakan SchoolContext
 * Usage: const { schools, addSchool } = useSchool();
 */
export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool harus digunakan dalam SchoolProvider');
  }
  return context;
};

export default SchoolContext;
