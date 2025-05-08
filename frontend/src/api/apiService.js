// src/api/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

class ApiService {
  constructor(endpoint) {
    this.axios = axios.create({
      baseURL: API_URL + endpoint,
    });

    // Add request interceptor for auth token
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Generic GET request
  async get(endpoint, params = {}) {
    try {
      const response = await this.axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic POST request
  async post(endpoint, data = {}) {
    try {
      const response = await this.axios.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async postWithParams(endpoint, params = {}) {
    try {
      const response = await this.axios.post(endpoint, null, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic PUT request
  async put(endpoint, data = {}) {
    try {
      const response = await this.axios.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await this.axios.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Error handling
  handleError(error) {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error("Response error:", error.response.data);
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Request error:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }
  }
}

export default ApiService;