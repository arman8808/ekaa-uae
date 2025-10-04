import { apiService } from "./api";

export const managedEventsService = {
  /**
   * Create a managed event
   * @param {Object} payload
   */
  createManagedEvent: async (payload) => {
    try {
      const response = await apiService.post("/managed-events", payload);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to create event",
      };
    }
  },

  /**
   * Get managed events with pagination and optional search
   * @param {Object} opts
   * @param {number} opts.page
   * @param {number} opts.limit
   * @param {string} [opts.search]
   */
  getManagedEvents: async ({ page = 1, limit = 10, search = "" } = {}) => {
    try {
      const query = new URLSearchParams({
        page,
        limit,
        ...(search ? { search } : {}),
      }).toString();
      const url = `/managed-events${query ? `?${query}` : ""}`;
      const response = await apiService.get(url);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to fetch events",
      };
    }
  },
  getPublicEvents: async () => {
    try {
      
      const url = `/managed-events/public/list`;
      const response = await apiService.get(url);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to fetch events",
      };
    }
  },

  /**
   * Get single managed event
   * @param {string} id
   */
  getManagedEventById: async (id) => {
    try {
      const response = await apiService.get(`/managed-events/${id}`);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || "Failed to get event" };
    }
  },

  /**
   * Update managed event
   * @param {string} id
   * @param {Object} payload
   */
  updateManagedEvent: async (id, payload) => {
    try {
      const response = await apiService.put(`/managed-events/${id}`, payload);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to update event",
      };
    }
  },

  /**
   * Soft delete managed event
   * @param {string} id
   */
  softDeleteManagedEvent: async (id) => {
    try {
      const response = await apiService.delete(`/managed-events/${id}`);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to delete event",
      };
    }
  },
};

export default managedEventsService;
