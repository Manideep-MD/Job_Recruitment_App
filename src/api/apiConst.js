import axios from 'axios';
import axiosRetry from 'axios-retry';
import NetInfo from '@react-native-community/netinfo';

class APIError extends Error {
  constructor(message, status, data, originalError) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
    this.originalError = originalError;
  }
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      throw new APIError(
        'No internet connection',
        'NETWORK_ERROR',
        null,
        new Error('No internet connection'),
      );
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    let errorMessage = 'An unexpected error occurred';
    let errorStatus = error.response?.status || 'UNKNOWN';
    let errorData = error.response?.data || null;

    if (error.response) {
      switch (error.response.status) {
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          break;
        case 403:
          errorMessage = 'Forbidden access';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage =
            error.response.data?.message || 'Server error occurred';
      }
    } else if (error.request) {
      errorMessage = 'No response from server';
      errorStatus = 'NO_RESPONSE';
    } else {
      errorMessage = error.message;
      errorStatus = 'REQUEST_ERROR';
    }

    return Promise.reject(
      new APIError(errorMessage, errorStatus, errorData, error),
    );
  },
);

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: retryCount => retryCount * 1000,
  retryCondition: async error => {
    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      console.log('No network connection, skipping retry');
      return false;
    }

    const status = error.status || error.response?.status;

    const shouldRetry =
      !status || status === 500 || status === 503 || status === 'NETWORK_ERROR';

    console.log(`Retry attempt for ${status} status: ${shouldRetry}`);
    return shouldRetry;
  },
  onRetry: (retryCount, error) => {
    console.log(`Retry attempt ${retryCount}/3:`, {
      status: error.status || error.response?.status,
      message: error.message,
      data: error.data,
    });
  },
});

export const handleErrors = (error, source) => {
  const errorDetails = {
    source,
    message: error.message,
    status: error.status,
    data: error.data,
    timestamp: new Date().toISOString(),
  };

  console.log('API Error:', errorDetails);
  return errorDetails;
};

export default apiClient;
