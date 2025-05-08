// src/api/loaiTaiTroService.js
import ApiService from './apiService';

class LoaiTaiTroService extends ApiService {
  constructor() {
    super('/api/ltt'); // Use the LoaiTaiTro API endpoint
  }

  async getAllLoaiTaiTro() {
    return await this.get('');
  }
}

export default new LoaiTaiTroService();