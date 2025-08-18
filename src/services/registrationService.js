import { apiService } from './api';

// Registration Service
export const registrationService = {
  /**
   * Submit registration form
   * @param {FormData} formData - Registration form data
   * @returns {Promise<Object>} Response object with success status and data/error
   */
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
          'Content-Type': 'application/json',
        },
      };

      console.log("Making API call to /awakenLimitlessHuman with config:", config);
      const response = await apiService.post('/awakenLimitlessHuman', jsonData, config);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registration submitted successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Registration failed',
        };
      }
    } catch (error) {
      console.error('Registration service error:', error);
      return {
        success: false,
        error: error.message || 'Registration service error',
        message: 'Failed to submit registration',
      };
    }
  },

  /**
   * Get registration details by ID
   * @param {string} registrationId - Registration ID
   * @returns {Promise<Object>} Response object with registration details
   */
  getRegistrationById: async (registrationId) => {
    try {
      const response = await apiService.get(`/awakenLimitlessHuman/${registrationId}`);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registration details retrieved successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Failed to retrieve registration details',
        };
      }
    } catch (error) {
      console.error('Get registration service error:', error);
      return {
        success: false,
        error: error.message || 'Get registration service error',
        message: 'Failed to retrieve registration details',
      };
    }
  },

  /**
   * Update registration details
   * @param {string} registrationId - Registration ID
   * @param {FormData} formData - Updated registration data
   * @returns {Promise<Object>} Response object with success status and data/error
   */
  updateRegistration: async (registrationId, formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await apiService.put(`/awakenLimitlessHuman/${registrationId}`, formData, config);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registration updated successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Failed to update registration',
        };
      }
    } catch (error) {
      console.error('Update registration service error:', error);
      return {
        success: false,
        error: error.message || 'Update registration service error',
        message: 'Failed to update registration',
      };
    }
  },

  /**
   * Cancel registration
   * @param {string} registrationId - Registration ID
   * @param {Object} cancellationData - Cancellation reason and details
   * @returns {Promise<Object>} Response object with success status and data/error
   */
  cancelRegistration: async (registrationId, cancellationData = {}) => {
    try {
      const response = await apiService.patch(`/awakenLimitlessHuman/${registrationId}/cancel`, cancellationData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registration cancelled successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Failed to cancel registration',
        };
      }
    } catch (error) {
      console.error('Cancel registration service error:', error);
      return {
        success: false,
        error: error.message || 'Cancel registration service error',
        message: 'Failed to cancel registration',
      };
    }
  },

  /**
   * Get user's registration history
   * @param {string} userId - User ID
   * @param {Object} filters - Optional filters (status, date range, etc.)
   * @returns {Promise<Object>} Response object with registration history
   */
  getUserRegistrations: async (userId, filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/awakenLimitlessHuman/user/${userId}${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await apiService.get(url);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registration history retrieved successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Failed to retrieve registration history',
        };
      }
    } catch (error) {
      console.error('Get user registrations service error:', error);
      return {
        success: false,
        error: error.message || 'Get user registrations service error',
        message: 'Failed to retrieve registration history',
      };
    }
  },

  /**
   * Get all awakenLimitlessHuman registrations with pagination
   * @param {Object} pagination - Pagination parameters (page, limit)
   * @param {Object} filters - Optional filters (status, date range, level, city, etc.)
   * @returns {Promise<Object>} Response object with registrations and pagination info
   */
  getAwakenLimitlessHumanRegistrations: async (pagination = { page: 1, limit: 10 }, filters = {}) => {
    try {
      // Combine pagination and filters
      const queryParams = new URLSearchParams({
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        ...filters
      }).toString();
      
      const url = `/awakenLimitlessHuman?${queryParams}`;
      
      console.log("Fetching awakenLimitlessHuman registrations from:", url);
      const response = await apiService.get(url);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registrations retrieved successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Failed to retrieve registrations',
        };
      }
    } catch (error) {
      console.error('Get awakenLimitlessHuman registrations service error:', error);
      return {
        success: false,
        error: error.message || 'Get awakenLimitlessHuman registrations service error',
        message: 'Failed to retrieve registrations',
      };
    }
  },

  /**
   * Check registration status
   * @param {string} registrationId - Registration ID
   * @returns {Promise<Object>} Response object with registration status
   */
  checkRegistrationStatus: async (registrationId) => {
    try {
      const response = await apiService.get(`/awakenLimitlessHuman/${registrationId}/status`);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Registration status retrieved successfully',
        };
      } else {
        return {
          success: false,
          error: response.error,
          message: 'Failed to retrieve registration status',
        };
      }
    } catch (error) {
      console.error('Check registration status service error:', error);
      return {
        success: false,
        error: error.message || 'Check registration status service error',
        message: 'Failed to retrieve registration status',
      };
    }
  },
};

export default registrationService;
