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
      
      if (result.success) {
        setSchools(result.data || []);
        setError(null);
      } else {
        // Fallback ke dummy data
        setError(`Failed to fetch: ${result.error}`);
        const dummyData = [
          { id: 1, npsn: '20203001', nama: 'SDN 1 Bandung', jenjang: 'SD', kecamatan: 'Bandung', siswa: 245, sppg: 'SPPG Bandung Pusat', jarak: 7.2, waktu: 18, status: 'layak', lat: -7.0050, lng: 107.6500 },
          { id: 2, npsn: '20203002', nama: 'MIN 1 Bandung', jenjang: 'MI', kecamatan: 'Bandung', siswa: 198, sppg: 'SPPG Bandung Pusat', jarak: 12.4, waktu: 28, status: 'waspada', lat: -7.0100, lng: 107.6550 },
          { id: 3, npsn: '20203003', nama: 'SDN 2 Cimahi', jenjang: 'SD', kecamatan: 'Cimahi', siswa: 312, sppg: 'SPPG Bandung Utara', jarak: 5.8, waktu: 14, status: 'layak', lat: -6.9950, lng: 107.6600 },
          { id: 4, npsn: '20203004', nama: 'SDN 3 Lembang', jenjang: 'SD', kecamatan: 'Lembang', siswa: 278, sppg: 'SPPG Bandung Selatan', jarak: 16.7, waktu: 42, status: 'kritis', lat: -7.0250, lng: 107.6300 },
          { id: 5, npsn: '20203005', nama: 'MIN 2 Cimahi', jenjang: 'MI', kecamatan: 'Cimahi', siswa: 189, sppg: 'SPPG Bandung Utara', jarak: 8.1, waktu: 20, status: 'layak', lat: -6.9900, lng: 107.6650 },
          { id: 6, npsn: '20203006', nama: 'SDN 4 Cibeunying', jenjang: 'SD', kecamatan: 'Cibeunying', siswa: 156, sppg: 'SPPG Bandung Utara', jarak: 11.9, waktu: 26, status: 'waspada', lat: -6.9850, lng: 107.6700 },
          { id: 7, npsn: '20203007', nama: 'SDN 5 Soreang', jenjang: 'SD', kecamatan: 'Soreang', siswa: 223, sppg: 'SPPG Bandung Selatan', jarak: 6.4, waktu: 16, status: 'layak', lat: -7.0350, lng: 107.6200 },
          { id: 8, npsn: '20203008', nama: 'MIN 3 Lembang', jenjang: 'MI', kecamatan: 'Lembang', siswa: 201, sppg: 'SPPG Bandung Selatan', jarak: 18.2, waktu: 48, status: 'kritis', lat: -7.0300, lng: 107.6250 },
          { id: 9, npsn: '20203009', nama: 'SDN 6 Ujungjaya', jenjang: 'SD', kecamatan: 'Ujungjaya', siswa: 267, sppg: 'SPPG Bandung Timur', jarak: 9.3, waktu: 22, status: 'layak', lat: -7.0050, lng: 107.6800 },
          { id: 10, npsn: '20203010', nama: 'SDN 7 Pengalengan', jenjang: 'SD', kecamatan: 'Pengalengan', siswa: 289, sppg: 'SPPG Bandung Barat', jarak: 13.1, waktu: 30, status: 'waspada', lat: -7.0450, lng: 107.6100 },
          { id: 11, npsn: '20203011', nama: 'MIN 4 Ujungjaya', jenjang: 'MI', kecamatan: 'Ujungjaya', siswa: 178, sppg: 'SPPG Bandung Timur', jarak: 7.8, waktu: 19, status: 'layak', lat: -7.0100, lng: 107.6850 },
          { id: 12, npsn: '20203012', nama: 'SDN 8 Bandung', jenjang: 'SD', kecamatan: 'Bandung', siswa: 234, sppg: 'SPPG Bandung Pusat', jarak: 15.3, waktu: 38, status: 'kritis', lat: -7.0150, lng: 107.6450 },
        ];
        setSchools(dummyData);
      }
    } catch (err) {
      setError(err.message);
      const dummyData = [
        { id: 1, npsn: '20203001', nama: 'SDN 1 Bandung', jenjang: 'SD', kecamatan: 'Bandung', siswa: 245, sppg: 'SPPG Bandung Pusat', jarak: 7.2, waktu: 18, status: 'layak', lat: -7.0050, lng: 107.6500 },
        { id: 2, npsn: '20203002', nama: 'MIN 1 Bandung', jenjang: 'MI', kecamatan: 'Bandung', siswa: 198, sppg: 'SPPG Bandung Pusat', jarak: 12.4, waktu: 28, status: 'waspada', lat: -7.0100, lng: 107.6550 },
        { id: 3, npsn: '20203003', nama: 'SDN 2 Cimahi', jenjang: 'SD', kecamatan: 'Cimahi', siswa: 312, sppg: 'SPPG Bandung Utara', jarak: 5.8, waktu: 14, status: 'layak', lat: -6.9950, lng: 107.6600 },
        { id: 4, npsn: '20203004', nama: 'SDN 3 Lembang', jenjang: 'SD', kecamatan: 'Lembang', siswa: 278, sppg: 'SPPG Bandung Selatan', jarak: 16.7, waktu: 42, status: 'kritis', lat: -7.0250, lng: 107.6300 },
        { id: 5, npsn: '20203005', nama: 'MIN 2 Cimahi', jenjang: 'MI', kecamatan: 'Cimahi', siswa: 189, sppg: 'SPPG Bandung Utara', jarak: 8.1, waktu: 20, status: 'layak', lat: -6.9900, lng: 107.6650 },
        { id: 6, npsn: '20203006', nama: 'SDN 4 Cibeunying', jenjang: 'SD', kecamatan: 'Cibeunying', siswa: 156, sppg: 'SPPG Bandung Utara', jarak: 11.9, waktu: 26, status: 'waspada', lat: -6.9850, lng: 107.6700 },
        { id: 7, npsn: '20203007', nama: 'SDN 5 Soreang', jenjang: 'SD', kecamatan: 'Soreang', siswa: 223, sppg: 'SPPG Bandung Selatan', jarak: 6.4, waktu: 16, status: 'layak', lat: -7.0350, lng: 107.6200 },
        { id: 8, npsn: '20203008', nama: 'MIN 3 Lembang', jenjang: 'MI', kecamatan: 'Lembang', siswa: 201, sppg: 'SPPG Bandung Selatan', jarak: 18.2, waktu: 48, status: 'kritis', lat: -7.0300, lng: 107.6250 },
        { id: 9, npsn: '20203009', nama: 'SDN 6 Ujungjaya', jenjang: 'SD', kecamatan: 'Ujungjaya', siswa: 267, sppg: 'SPPG Bandung Timur', jarak: 9.3, waktu: 22, status: 'layak', lat: -7.0050, lng: 107.6800 },
        { id: 10, npsn: '20203010', nama: 'SDN 7 Pengalengan', jenjang: 'SD', kecamatan: 'Pengalengan', siswa: 289, sppg: 'SPPG Bandung Barat', jarak: 13.1, waktu: 30, status: 'waspada', lat: -7.0450, lng: 107.6100 },
        { id: 11, npsn: '20203011', nama: 'MIN 4 Ujungjaya', jenjang: 'MI', kecamatan: 'Ujungjaya', siswa: 178, sppg: 'SPPG Bandung Timur', jarak: 7.8, waktu: 19, status: 'layak', lat: -7.0100, lng: 107.6850 },
        { id: 12, npsn: '20203012', nama: 'SDN 8 Bandung', jenjang: 'SD', kecamatan: 'Bandung', siswa: 234, sppg: 'SPPG Bandung Pusat', jarak: 15.3, waktu: 38, status: 'kritis', lat: -7.0150, lng: 107.6450 },
      ];
      setSchools(dummyData);
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
