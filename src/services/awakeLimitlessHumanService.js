import { apiService } from './api';

export const awakeLimitlessHumanService = {
  // Get all programs with pagination and search (admin)
  getPrograms: async (pagination = { page: 1, limit: 10 }, filters = {}) => {
    try {
      const query = new URLSearchParams({
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        ...filters,
      }).toString();
      const url = `/awake-limitless-human${query ? `?${query}` : ''}`;
      const response = await apiService.get(url);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch programs' };
    }
  },

  // Get all programs for users (with filters)
  getUserPrograms: async (pagination = { page: 1, limit: 10 }, filters = {}) => {
    try {
      const query = new URLSearchParams({
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        ...filters,
      }).toString();
      const url = `/awake-limitless-human/user${query ? `?${query}` : ''}`;
      const response = await apiService.get(url);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch user programs' };
    }
  },

  // Create new program
  createProgram: async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await apiService.post('/awake-limitless-human', formData, config);
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Program created successfully',
        };
      }
      return {
        success: false,
        error: response.error,
        message: 'Failed to create program',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create program',
        message: 'Failed to create program',
      };
    }
  },

  // Update program
  updateProgram: async (id, formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await apiService.put(`/awake-limitless-human/${id}`, formData, config);
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Program updated successfully',
        };
      }
      return {
        success: false,
        error: response.error,
        message: 'Failed to update program',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update program',
        message: 'Failed to update program',
      };
    }
  },

  // Delete program
  deleteProgram: async (id) => {
    try {
      const response = await apiService.delete(`/awake-limitless-human/${id}`);
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Program deleted successfully',
        };
      }
      return {
        success: false,
        error: response.error,
        message: 'Failed to delete program',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete program',
        message: 'Failed to delete program',
      };
    }
  },

  // Get single program
  getProgramById: async (id) => {
    try {
      const response = await apiService.get(`/awake-limitless-human/${id}`);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch program' };
    }
  },

  // Get single program for user (with filters)
  getUserProgramById: async (id) => {
    try {
      const response = await apiService.get(`/awake-limitless-human/user/${id}`);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch user program' };
    }
  }
};

export default awakeLimitlessHumanService;