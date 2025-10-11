import { apiService } from './api';

export const decodeRegistrationService = {
  getRegistrations: async (pagination = { page: 1, limit: 10 }, filters = {}) => {
    try {
      const query = new URLSearchParams({
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        ...filters,
      }).toString();
      const url = `/decode-registration${query ? `?${query}` : ''}`;
      const response = await apiService.get(url);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch decode registrations' };
    }
  },

  getById: async (id) => {
    try {
      const response = await apiService.get(`/decode-registration/${id}`);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch decode registration' };
    }
  },

  downloadCSV: async ({ startDate, endDate } = {}) => {
    try {
      const query = new URLSearchParams({
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      }).toString();
      const url = `/decode-registration/download${query ? `?${query}` : ''}`;
      const response = await apiService.get(url, { responseType: 'blob' });
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to download CSV' };
    }
  },
  submitRegistration: async (formData) => {
    try {
     
      // Convert FormData to JSON object for the API with proper data types
      const jsonData = {};
      for (let [key, value] of formData.entries()) {
        // Convert string booleans back to actual booleans
        if (value === "true") {
          jsonData[key] = true;
        } else if (value === "false") {
          jsonData[key] = false;
        } else {
          jsonData[key] = value;
        }
      }

     
      // Send as JSON instead of FormData
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    
      const response = await apiService.post(
        "/decode-registration",
        jsonData,
        config
      );

      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: "Registration submitted successfully",
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration service error:", error);
      return {
        success: false,
        error: error.message || "Registration service error",
        message: "Failed to submit registration",
      };
    }
  },
};

export default decodeRegistrationService;


