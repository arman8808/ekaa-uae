import { apiService } from './api';

export const adminService = {
  // Admin Login
  login: async (credentials) => {
    try {
 
      
      const response = await apiService.post('admin/login', credentials);
      
      if (response.success) {
        return { 
          success: true, 
          data: response.data, 
          message: 'Login successful' 
        };
      } else {
        return { 
          success: false, 
          error: response.error, 
          message: 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Admin login service error:', error);
      return { 
        success: false, 
        error: error.message || 'Admin login service error', 
        message: 'Failed to login' 
      };
    }
  },

  // Get Admin Profile
  getProfile: async () => {
    try {
      const response = await apiService.get('admin/profile');
      
      if (response.success) {
        return { 
          success: true, 
          data: response.data, 
          message: 'Profile retrieved successfully' 
        };
      } else {
        return { 
          success: false, 
          error: response.error, 
          message: 'Failed to retrieve profile' 
        };
      }
    } catch (error) {
      console.error('Get admin profile error:', error);
      return { 
        success: false, 
        error: error.message || 'Get profile service error', 
        message: 'Failed to get profile' 
      };
    }
  },

  // Update Admin Profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiService.put('admin/profile', profileData);
      
      if (response.success) {
        return { 
          success: true, 
          data: response.data, 
          message: 'Profile updated successfully' 
        };
      } else {
        return { 
          success: false, 
          error: response.error, 
          message: 'Failed to update profile' 
        };
      }
    } catch (error) {
      console.error('Update admin profile error:', error);
      return { 
        success: false, 
        error: error.message || 'Update profile service error', 
        message: 'Failed to update profile' 
      };
    }
  },

  // Change Admin Password
  changePassword: async (passwordData) => {
    try {
      const response = await apiService.put('admin/change-password', passwordData);
      
      if (response.success) {
        return { 
          success: true, 
          data: response.data, 
          message: 'Password changed successfully' 
        };
      } else {
        return { 
          success: false, 
          error: response.error, 
          message: 'Failed to change password' 
        };
      }
    } catch (error) {
      console.error('Change admin password error:', error);
      return { 
        success: false, 
        error: error.message || 'Change password service error', 
        message: 'Failed to change password' 
      };
    }
  },

  // Admin Logout
  logout: async () => {
    try {
      const response = await apiService.post('admin/logout');
      
      if (response.success) {
        return { 
          success: true, 
          data: response.data, 
          message: 'Logout successful' 
        };
      } else {
        return { 
          success: false, 
          error: response.error, 
          message: 'Logout failed' 
        };
      }
    } catch (error) {
      console.error('Admin logout error:', error);
      return { 
        success: false, 
        error: error.message || 'Logout service error', 
        message: 'Failed to logout' 
      };
    }
  },

  // Verify Admin Token
  verifyToken: async () => {
    try {
      const response = await apiService.get('admin/verify-token');
      
      if (response.success) {
        return { 
          success: true, 
          data: response.data, 
          message: 'Token verified successfully' 
        };
      } else {
        return { 
          success: false, 
          error: response.error, 
          message: 'Token verification failed' 
        };
      }
    } catch (error) {
      console.error('Verify admin token error:', error);
      return { 
        success: false, 
        error: error.message || 'Token verification service error', 
        message: 'Failed to verify token' 
      };
    }
  }
};

export default adminService;
