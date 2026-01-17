// API Service - Central hub for all backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data; // Return data field if it exists
  } catch (error) {
    console.error(`API Call Failed (${endpoint}):`, error);
    throw error;
  }
};

// ========== SEKOLAH ENDPOINTS ==========
export const sekolahAPI = {
  // Get all schools
  getAll: () => apiCall('/sekolah'),

  // Get school by ID
  getById: (id) => apiCall(`/sekolah/${id}`),

  // Create new school
  create: (data) =>
    apiCall('/sekolah', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update school
  update: (id, data) =>
    apiCall(`/sekolah/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete school
  delete: (id) =>
    apiCall(`/sekolah/${id}`, {
      method: 'DELETE',
    }),
};

// ========== SPPG ENDPOINTS ==========
export const sppgAPI = {
  // Get all SPPG
  getAll: () => apiCall('/sppg'),

  // Get SPPG by ID
  getById: (id) => apiCall(`/sppg/${id}`),

  // Create new SPPG
  create: (data) =>
    apiCall('/sppg', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update SPPG
  update: (id, data) =>
    apiCall(`/sppg/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete SPPG
  delete: (id) =>
    apiCall(`/sppg/${id}`, {
      method: 'DELETE',
    }),
};

// ========== DASHBOARD ENDPOINTS ==========
export const dashboardAPI = {
  // Get dashboard statistics
  getStats: () => apiCall('/dashboard/stats'),

  // Get dashboard charts data
  getCharts: () => apiCall('/dashboard/charts'),
};

// ========== HEALTH CHECK ==========
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api/v1', '')}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
};

export default {
  sekolahAPI,
  sppgAPI,
  dashboardAPI,
  healthCheck,
};
