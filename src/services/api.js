import axios from 'axios';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Debug: Log the API configuration
console.log('API Configuration loaded:', {
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  env: import.meta.env.VITE_API_BASE_URL,
  fallback: 'http://localhost:8001/api/'
});

// Create axios instance
const apiClient = axios.create(API_CONFIG);

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor triggered');
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful response for debugging
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });

    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        data: error.response.data,
      });

      // Handle specific error statuses
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          // You can add redirect logic here if needed
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Internal server error
          console.error('Internal server error');
          break;
        default:
          console.error('API error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', {
        message: 'No response received from server',
        request: error.request,
      });
    } else {
      // Something else happened
      console.error('Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API Service Methods
export const apiService = {
  // Generic GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Request failed',
        status: error.response?.status,
      };
    }
  },

  // Generic POST request
  post: async (url, data = {}, config = {}) => {
    try {
      console.log("API service POST called with:", { url, data, config });
      
      // Log the actual data being sent
      if (typeof data === 'object') {
        console.log("Data being sent (keys):", Object.keys(data));
        console.log("Data being sent (values):", Object.values(data));
      }
      
      const response = await apiClient.post(url, data, config);
      console.log("API service POST response:", response);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("API service POST error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Request failed',
        status: error.response?.status,
      };
    }
  },

  // Generic PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Request failed',
        status: error.response?.status,
      };
    }
  },

  // Generic DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Request failed',
        status: error.response?.status,
      };
    }
  },

  // Generic PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Request failed',
        status: error.response?.status,
      };
    }
  },
};

// Export the axios instance for custom configurations
export { apiClient };

// Export configuration
export { API_CONFIG };
