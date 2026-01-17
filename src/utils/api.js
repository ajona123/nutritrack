// API configuration & helper functions

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper untuk fetch dengan error handling
async function apiCall(endpoint, options = {}) {
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

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Sekolah API
export const sekolahAPI = {
  getAll: () => apiCall('/sekolah'),
  getById: (id) => apiCall(`/sekolah/${id}`),
  create: (data) => apiCall('/sekolah', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/sekolah/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/sekolah/${id}`, { method: 'DELETE' }),
};

// SPPG API
export const sppgAPI = {
  getAll: () => apiCall('/sppg'),
  getById: (id) => apiCall(`/sppg/${id}`),
  create: (data) => apiCall('/sppg', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/sppg/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/sppg/${id}`, { method: 'DELETE' }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => apiCall('/dashboard/stats'),
  getCharts: () => apiCall('/dashboard/charts'),
};

// Health check
export const healthCheck = () => apiCall('/health');
