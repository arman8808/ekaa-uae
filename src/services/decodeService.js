import { apiService } from './api';

export const decodeService = {
  // Get all programs with pagination and search (admin)
  getPrograms: async (pagination = { page: 1, limit: 10 }, filters = {}) => {
    try {
      const query = new URLSearchParams({
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        ...filters,
      }).toString();
      const url = `/decode${query ? `?${query}` : ''}`;
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
      const url = `/decode/user${query ? `?${query}` : ''}`;
      const response = await apiService.get(url);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch user programs' };
    }
  },

  // Create new program - UPDATED FOR FORMDATA
  createProgram: async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await apiService.post('/decode', formData, config);
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

  // Update program - UPDATED FOR FORMDATA
  updateProgram: async (id, formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await apiService.put(`/decode/${id}`, formData, config);
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
      const response = await apiService.delete(`/decode/${id}`);
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
      const response = await apiService.get(`/decode/${id}`);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch program' };
    }
  },

  // Get single program for user (with filters)
  getUserProgramById: async (id) => {
    try {
      const response = await apiService.get(`/decode/user/${id}`);
      if (response.success) return { success: true, data: response.data };
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to fetch user program' };
    }
  }
};

export default decodeService;