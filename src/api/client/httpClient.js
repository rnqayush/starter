// Enhanced HTTP Client with interceptors, error handling, and advanced features
import {
  API_CONFIG,
  HTTP_STATUS,
  ERROR_MESSAGES,
  AUTH_CONFIG,
  FEATURE_FLAGS,
  RETRY_CONFIG,
  TIMEOUTS,
} from '../config/config';

// Custom error class for API errors
export class APIError extends Error {
  constructor(message, status, response = null, code = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.response = response;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }

  // Check if error is a specific type
  isNetworkError() {
    return this.status === 0;
  }

  isTimeoutError() {
    return this.code === 'TIMEOUT_ERROR';
  }

  isAuthError() {
    return (
      this.status === HTTP_STATUS.UNAUTHORIZED ||
      this.status === HTTP_STATUS.FORBIDDEN
    );
  }

  isValidationError() {
    return (
      this.status === HTTP_STATUS.BAD_REQUEST ||
      this.status === HTTP_STATUS.UNPROCESSABLE_ENTITY
    );
  }

  isServerError() {
    return this.status >= 500;
  }
}

// Request cache for avoiding duplicate requests
class RequestCache {
  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  generateKey(url, method, data) {
    const key = `${method}:${url}`;
    return data ? `${key}:${JSON.stringify(data)}` : key;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key, data, ttl = this.defaultTTL) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl,
    });
  }

  clear() {
    this.cache.clear();
  }

  delete(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// Main HTTP Client class
class HttpClient {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.timeout = API_CONFIG.timeout;
    this.cache = new RequestCache();
    this.pendingRequests = new Map();
    this.retryCount = new Map();

    // Default headers
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    this.interceptors = {
      request: [],
      response: [],
      error: [],
    };

    this._setupDefaultInterceptors();
  }

  // Setup default interceptors
  _setupDefaultInterceptors() {
    // Request interceptor for authentication
    this.addRequestInterceptor(this._authInterceptor.bind(this));

    // Request interceptor for logging
    if (FEATURE_FLAGS.enableLogging) {
      this.addRequestInterceptor(this._requestLogInterceptor.bind(this));
    }

    // Response interceptor for logging
    if (FEATURE_FLAGS.enableLogging) {
      this.addResponseInterceptor(this._responseLogInterceptor.bind(this));
    }

    // Error interceptor for handling common errors
    this.addErrorInterceptor(this._errorHandlerInterceptor.bind(this));
  }

  // Add request interceptor
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  // Add response interceptor
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  // Add error interceptor
  addErrorInterceptor(interceptor) {
    this.interceptors.error.push(interceptor);
  }

  // Authentication interceptor
  async _authInterceptor(config) {
    const token = this.getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `${AUTH_CONFIG.tokenPrefix} ${token}`,
      };
    }
    return config;
  }

  // Request logging interceptor
  async _requestLogInterceptor(config) {
    if (FEATURE_FLAGS.enableLogging) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          headers: config.headers,
          data: config.body ? JSON.parse(config.body) : null,
        }
      );
    }
    return config;
  }

  // Response logging interceptor
  async _responseLogInterceptor(response) {
    if (FEATURE_FLAGS.enableLogging) {
      console.log(`✅ API Response: ${response.status}`, {
        url: response.url,
        data: response.data,
      });
    }
    return response;
  }

  // Error handling interceptor
  async _errorHandlerInterceptor(error) {
    if (FEATURE_FLAGS.enableLogging) {
      console.error('❌ API Error:', error);
    }

    // Handle token refresh for 401 errors
    if (error.status === HTTP_STATUS.UNAUTHORIZED && AUTH_CONFIG.autoRefresh) {
      return this._handleTokenRefresh(error);
    }

    return Promise.reject(error);
  }

  // Handle token refresh
  async _handleTokenRefresh(originalError) {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        this.clearAuth();
        throw originalError;
      }

      // Attempt to refresh token
      const newTokens = await this._refreshAuthToken(refreshToken);

      if (newTokens) {
        this.setAuthToken(newTokens.token);
        if (newTokens.refreshToken) {
          this.setRefreshToken(newTokens.refreshToken);
        }

        // Retry original request
        return this._retryRequest(originalError.config);
      }
    } catch (refreshError) {
      this.clearAuth();
      throw originalError;
    }
  }

  // Retry failed request
  async _retryRequest(config) {
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `${AUTH_CONFIG.tokenPrefix} ${token}`;
    }
    return this.request(config.url, config);
  }

  // Refresh auth token
  async _refreshAuthToken(refreshToken) {
    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return null;
  }

  // Auth token management
  getAuthToken() {
    return localStorage.getItem(AUTH_CONFIG.tokenStorageKey);
  }

  setAuthToken(token) {
    localStorage.setItem(AUTH_CONFIG.tokenStorageKey, token);
  }

  getRefreshToken() {
    return localStorage.getItem(AUTH_CONFIG.refreshTokenStorageKey);
  }

  setRefreshToken(token) {
    localStorage.setItem(AUTH_CONFIG.refreshTokenStorageKey, token);
  }

  clearAuth() {
    localStorage.removeItem(AUTH_CONFIG.tokenStorageKey);
    localStorage.removeItem(AUTH_CONFIG.refreshTokenStorageKey);
    localStorage.removeItem(AUTH_CONFIG.userStorageKey);
  }

  // Run request interceptors
  async _runRequestInterceptors(config) {
    let modifiedConfig = config;
    for (const interceptor of this.interceptors.request) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  // Run response interceptors
  async _runResponseInterceptors(response) {
    let modifiedResponse = response;
    for (const interceptor of this.interceptors.response) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  // Run error interceptors
  async _runErrorInterceptors(error) {
    let finalError = error;
    for (const interceptor of this.interceptors.error) {
      try {
        const result = await interceptor(finalError);
        if (result) return result; // If interceptor handles the error, return result
      } catch (interceptorError) {
        finalError = interceptorError;
      }
    }
    throw finalError;
  }

  // Handle API response
  async _handleResponse(response) {
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    const processedResponse = {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      url: response.url,
    };

    if (response.ok) {
      return this._runResponseInterceptors(processedResponse);
    }

    // Create error and run error interceptors
    const errorMessage =
      data?.message ||
      data?.error ||
      `HTTP ${response.status}: ${response.statusText}`;
    const error = new APIError(errorMessage, response.status, data);
    error.config = { url: response.url };

    return this._runErrorInterceptors(error);
  }

  // Generic request method with retry logic
  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseURL}${endpoint}`;

    // Check cache for GET requests
    if (options.method === 'GET' || !options.method) {
      const cacheKey = this.cache.generateKey(url, 'GET', null);
      const cachedResponse = this.cache.get(cacheKey);
      if (cachedResponse && FEATURE_FLAGS.enableCaching) {
        return cachedResponse;
      }
    }

    // Prevent duplicate requests
    const requestKey = `${options.method || 'GET'}:${url}`;
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const config = {
      url,
      method: 'GET',
      headers: { ...this.defaultHeaders },
      ...options,
    };

    // Run request interceptors
    const modifiedConfig = await this._runRequestInterceptors(config);

    // Create fetch options
    const fetchOptions = {
      method: modifiedConfig.method,
      headers: modifiedConfig.headers,
      signal: AbortSignal.timeout(this.timeout),
    };

    if (modifiedConfig.body && modifiedConfig.method !== 'GET') {
      fetchOptions.body = modifiedConfig.body;
    }

    const requestPromise = this._executeRequest(url, fetchOptions, config);
    this.pendingRequests.set(requestKey, requestPromise);

    try {
      const response = await requestPromise;

      // Cache GET responses
      if (config.method === 'GET' && FEATURE_FLAGS.enableCaching) {
        const cacheKey = this.cache.generateKey(url, 'GET', null);
        this.cache.set(cacheKey, response);
      }

      return response;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }

  // Execute request with retry logic
  async _executeRequest(url, fetchOptions, config) {
    const maxRetries = RETRY_CONFIG.maxRetries;
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, fetchOptions);
        this.retryCount.delete(url);
        return await this._handleResponse(response);
      } catch (error) {
        lastError = this._createAPIError(error);

        if (attempt === maxRetries || !RETRY_CONFIG.retryCondition(lastError)) {
          break;
        }

        // Wait before retry
        await this._delay(RETRY_CONFIG.retryDelay * Math.pow(2, attempt));
      }
    }

    return this._runErrorInterceptors(lastError);
  }

  // Create appropriate API error
  _createAPIError(error) {
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return new APIError(
        ERROR_MESSAGES.TIMEOUT_ERROR,
        0,
        null,
        'TIMEOUT_ERROR'
      );
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new APIError(
        ERROR_MESSAGES.NETWORK_ERROR,
        0,
        null,
        'NETWORK_ERROR'
      );
    }

    if (error instanceof APIError) {
      return error;
    }

    return new APIError(
      error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      0,
      null,
      'UNKNOWN_ERROR'
    );
  }

  // Utility delay function
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // HTTP method shortcuts
  async get(endpoint, params = {}, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: 'GET',
      ...options,
    });
  }

  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
  }

  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
  }

  async patch(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  // File upload method
  async upload(endpoint, formData, options = {}) {
    const headers = { ...this.defaultHeaders, ...options.headers };
    delete headers['Content-Type']; // Let browser set boundary for FormData

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers,
      timeout: TIMEOUTS.UPLOAD,
      ...options,
    });
  }

  // Clear cache methods
  clearCache() {
    this.cache.clear();
  }

  clearCacheByPattern(pattern) {
    this.cache.delete(pattern);
  }
}

// Create and export singleton instance
const httpClient = new HttpClient();

export { HttpClient };
export default httpClient;
