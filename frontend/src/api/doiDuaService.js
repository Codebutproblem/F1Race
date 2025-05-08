// src/api/doiDuaService.js
import ApiService from './apiService';

class DoiDuaService extends ApiService {
  constructor() {
    super('/api/dd'); // Use the DoiDua API endpoint
  }

  async getAllDoiDua() {
    return await this.get('');
  }
}

export default new DoiDuaService();