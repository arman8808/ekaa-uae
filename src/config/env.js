// Environment Configuration
export const ENV_CONFIG = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'EKAA UAE',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  NODE_ENV: import.meta.env.MODE || 'development',
  
  // Feature Flags
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === 'true' || false,
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || false,
  
  // External Services
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  
  // Development
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true' || false,
  MOCK_API_DELAY: parseInt(import.meta.env.VITE_MOCK_API_DELAY) || 1000,
};

// Environment-specific configurations
export const getEnvConfig = () => {
  const isDevelopment = ENV_CONFIG.NODE_ENV === 'development';
  const isProduction = ENV_CONFIG.NODE_ENV === 'production';
  const isTest = ENV_CONFIG.NODE_ENV === 'test';

  return {
    ...ENV_CONFIG,
    isDevelopment,
    isProduction,
    isTest,
    
    // Development-specific settings
    enableDebugLogging: isDevelopment && ENV_CONFIG.ENABLE_LOGGING,
    enableMockAPI: isDevelopment && ENV_CONFIG.ENABLE_MOCK_API,
    
    // Production-specific settings
    enableAnalytics: isProduction && ENV_CONFIG.ENABLE_ANALYTICS,
    enableErrorTracking: isProduction && !!ENV_CONFIG.SENTRY_DSN,
  };
};

// Validate required environment variables
export const validateEnvConfig = () => {
  const requiredVars = [
    'VITE_API_BASE_URL',
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing required environment variables:', missingVars);
    console.warn('Using fallback values. Please check your .env file.');
  }

  return missingVars.length === 0;
};

// Export default configuration
export default getEnvConfig();
