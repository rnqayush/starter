/**
 * API Debugger Utility
 * Helps diagnose API connection and endpoint issues
 */

import { API_CONFIG } from '../api/config/config';
import { WEBSITE_ENDPOINTS } from '../api/config/endpoints';

class APIDebugger {
  static async checkBackendConnection() {
    console.log('🔍 API Debugger: Checking backend connection...');
    console.log('📍 Base URL:', API_CONFIG.baseURL);
    
    try {
      // Test health endpoint
      const healthUrl = `${API_CONFIG.baseURL}/health`;
      console.log('🏥 Testing health endpoint:', healthUrl);
      
      const response = await fetch(healthUrl);
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Backend is healthy:', data);
        return { success: true, data };
      } else {
        console.error('❌ Backend health check failed:', response.status, data);
        return { success: false, error: `Health check failed: ${response.status}` };
      }
    } catch (error) {
      console.error('❌ Backend connection failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  static async testStartBuildingEndpoint() {
    console.log('🔍 API Debugger: Testing start-building endpoint...');
    
    const endpoint = WEBSITE_ENDPOINTS.CREATE_FROM_START_BUILDING;
    const fullUrl = `${API_CONFIG.baseURL}${endpoint}`;
    
    console.log('📍 Endpoint:', endpoint);
    console.log('🔗 Full URL:', fullUrl);
    
    // Test with a dummy payload
    const testPayload = {
      websiteName: 'test-debug-website',
      websiteType: 'business',
      businessName: 'Test Business',
      description: 'Test description'
    };
    
    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || 'no-token'}`
        },
        body: JSON.stringify(testPayload)
      });
      
      const data = await response.json();
      
      console.log('📊 Response status:', response.status);
      console.log('📦 Response data:', data);
      
      if (response.ok) {
        console.log('✅ Start-building endpoint is working!');
        return { success: true, data };
      } else {
        console.error('❌ Start-building endpoint failed:', response.status, data);
        return { success: false, error: data.message || `HTTP ${response.status}` };
      }
    } catch (error) {
      console.error('❌ Start-building endpoint error:', error.message);
      return { success: false, error: error.message };
    }
  }

  static logRequestDetails(method, url, data = null) {
    console.group(`🚀 API Request: ${method} ${url}`);
    console.log('🕐 Timestamp:', new Date().toISOString());
    console.log('🔗 Full URL:', url);
    if (data) {
      console.log('📦 Request Data:', data);
    }
    console.log('🔑 Auth Token:', localStorage.getItem('authToken') ? 'Present' : 'Missing');
    console.groupEnd();
  }

  static logResponseDetails(response, data) {
    console.group(`📥 API Response: ${response.status} ${response.statusText}`);
    console.log('🕐 Timestamp:', new Date().toISOString());
    console.log('📊 Status:', response.status);
    console.log('🔗 URL:', response.url);
    console.log('📦 Data:', data);
    console.groupEnd();
  }

  static async runFullDiagnostic() {
    console.log('🔍 Running full API diagnostic...');
    
    const results = {
      backendConnection: await this.checkBackendConnection(),
      startBuildingEndpoint: await this.testStartBuildingEndpoint()
    };
    
    console.log('📊 Diagnostic Results:', results);
    
    // Summary
    const allPassed = Object.values(results).every(result => result.success);
    if (allPassed) {
      console.log('✅ All API tests passed! Backend is working correctly.');
    } else {
      console.error('❌ Some API tests failed. Check the results above.');
    }
    
    return results;
  }
}

// Add to window for easy debugging in browser console
if (typeof window !== 'undefined') {
  window.APIDebugger = APIDebugger;
}

export default APIDebugger;
