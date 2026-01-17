/**
 * API Service Layer untuk menghubungkan Frontend ke Backend Golang
 * Base URL: http://localhost:8080/api/v1
 */

const API_BASE_URL = 'http://localhost:8080/api/v1';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Fetch wrapper dengan error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    
    // Backend returns array directly or object
    // Convert to standard format { success: true, data: ... }
    return { success: true, data: jsonResponse };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};

// ==========================================
// SEKOLAH ENDPOINTS
// ==========================================

export const sekolahService = {
  // Get semua sekolah
  getAll: async () => {
    return fetchAPI('/sekolah');
  },

  // Get sekolah by ID
  getById: async (id) => {
    return fetchAPI(`/sekolah/${id}`);
  },

  // Create sekolah baru
  create: async (sekolahData) => {
    return fetchAPI('/sekolah', {
      method: 'POST',
      body: JSON.stringify(sekolahData),
    });
  },

  // Update sekolah
  update: async (id, sekolahData) => {
    return fetchAPI(`/sekolah/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sekolahData),
    });
  },

  // Delete sekolah
  delete: async (id) => {
    return fetchAPI(`/sekolah/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==========================================
// SPPG ENDPOINTS
// ==========================================

export const sppgService = {
  // Get semua SPPG
  getAll: async () => {
    return fetchAPI('/sppg');
  },

  // Get SPPG by ID
  getById: async (id) => {
    return fetchAPI(`/sppg/${id}`);
  },

  // Create SPPG baru
  create: async (sppgData) => {
    return fetchAPI('/sppg', {
      method: 'POST',
      body: JSON.stringify(sppgData),
    });
  },

  // Update SPPG
  update: async (id, sppgData) => {
    return fetchAPI(`/sppg/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sppgData),
    });
  },

  // Delete SPPG
  delete: async (id) => {
    return fetchAPI(`/sppg/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==========================================
// DASHBOARD ENDPOINTS
// ==========================================

export const dashboardService = {
  // Get dashboard stats
  getStats: async () => {
    return fetchAPI('/dashboard/stats');
  },

  // Get dashboard charts data
  getCharts: async () => {
    return fetchAPI('/dashboard/charts');
  },
};

// ==========================================
// HEALTH CHECK
// ==========================================

export const healthCheck = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/health`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Backend not available:', error);
    return { success: false, error: 'Backend tidak tersedia' };
  }
};

export default {
  sekolahService,
  sppgService,
  dashboardService,
  healthCheck,
};
