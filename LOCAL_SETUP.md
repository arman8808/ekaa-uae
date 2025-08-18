# Local Development Setup

## Environment Configuration

For local testing, the application is configured to use `localhost:8001` as the default API endpoint.

### Option 1: Use Default Configuration
The application will automatically use `http://localhost:8001/api/` if no environment variables are set.

### Option 2: Create Environment File (Recommended)
Create a `.env.local` file in your project root with the following content:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8001/api/
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=EKAA UAE
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false

# Development
VITE_ENABLE_MOCK_API=false
VITE_MOCK_API_DELAY=1000
```

## API Endpoints

With the local configuration, your API calls will be made to:

- **Base URL**: `http://localhost:8001/api/`
- **Registration**: `http://localhost:8001/api/awakenLimitlessHuman`
- **Get Registration**: `http://localhost:8001/api/awakenLimitlessHuman/{id}`
- **Update Registration**: `http://localhost:8001/api/awakenLimitlessHuman/{id}`
- **Cancel Registration**: `http://localhost:8001/api/awakenLimitlessHuman/{id}/cancel`
- **User Registrations**: `http://localhost:8001/api/awakenLimitlessHuman/user/{userId}`
- **Check Status**: `http://localhost:8001/api/awakenLimitlessHuman/{id}/status`

## Starting Local Development

1. **Start your backend server** on port 8001
2. **Start the React application**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Switching to Production

To switch to production, either:
1. Remove the `.env.local` file (will use production defaults)
2. Or set `VITE_API_BASE_URL=https://api.ekaausa.com/api/` in your production environment

## Troubleshooting

- **CORS Issues**: Ensure your backend server allows requests from your React app's origin
- **Port Conflicts**: If port 8001 is busy, change it in both your backend server and the `.env.local` file
- **API Errors**: Check the browser console for detailed error logs from the axios interceptors
