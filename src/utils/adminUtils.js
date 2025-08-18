import Cookies from 'js-cookie';

// Admin utility functions
export const adminUtils = {
  // Logout admin user
  logout: () => {
    try {
      // Remove admin token from cookies
      Cookies.remove('adminToken');
      
      // Clear any other admin-related storage
      localStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminUser');
      
      // Redirect to admin login
      window.location.href = '/admin/login';
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Check if admin is logged in
  isLoggedIn: () => {
    const token = Cookies.get('adminToken');
    return !!token;
  },

  // Get admin token
  getToken: () => {
    return Cookies.get('adminToken');
  },

  // Set admin token
  setToken: (token) => {
    Cookies.set('adminToken', token, {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict'
    });
  },

  // Clear admin token
  clearToken: () => {
    Cookies.remove('adminToken');
  }
};

export default adminUtils;
