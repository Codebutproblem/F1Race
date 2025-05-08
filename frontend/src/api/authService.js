// src/api/authService.js
import ApiService from './apiService';

class AuthService extends ApiService {
  constructor() {
    super('/api/nv'); // Use the NhanVien API endpoint
  }

  async login(username, password) {
    try {
      const response = await this.postWithParams('/login', { username, password });
      
      if (response) {
        // For a real app, you'd store a JWT token here
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}

export default new AuthService();