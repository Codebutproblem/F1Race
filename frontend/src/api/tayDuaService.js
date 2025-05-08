// src/api/tayDuaService.js
import ApiService from './apiService';

class TayDuaService extends ApiService {
  constructor() {
    super('/api/td'); // Use the TayDua API endpoint
  }

  async getAllTayDua() {
    return await this.get('');
  }
}

export default new TayDuaService();