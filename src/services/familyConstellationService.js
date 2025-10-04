import { apiService } from './api';

export const familyConstellationService = {
  getRegistrations: async (pagination = { page: 1, limit: 10 }, filters = {}) => {
    try {
      const query = new URLSearchParams({
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        ...filters,
      }).toString();
      const url = `/family-constellation${query ? `?${query}` : ''}`;
      const response = await apiService.get(url);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch family registrations' };
    }
  },

  getById: async (id) => {
    try {
      const response = await apiService.get(`/family-constellation/${id}`);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch family registration' };
    }
  },

  downloadCSV: async ({ startDate, endDate } = {}) => {
    try {
      const query = new URLSearchParams({
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      }).toString();
      const url = `/family-constellation/download${query ? `?${query}` : ''}`;
      const response = await apiService.get(url, { responseType: 'blob' });
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to download CSV' };
    }
  },
  submitRegistration: async (formData) => {
    try {
      console.log("Registration service called with formData:", formData);

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

      console.log("Converted to JSON with proper types:", jsonData);

      // Send as JSON instead of FormData
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(
        "Making API call to /family-constellation with config:",
        config
      );
      const response = await apiService.post(
        "/family-constellation",
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

export default familyConstellationService;


