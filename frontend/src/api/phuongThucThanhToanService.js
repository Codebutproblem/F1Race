// src/api/phuongThucThanhToanService.js
import ApiService from './apiService';

class PhuongThucThanhToanService extends ApiService {
  constructor() {
    super('/api/pttt'); // Use the PhuongThucThanhToan API endpoint
  }

  async getAllPhuongThucThanhToan() {
    return await this.get('');
  }
}

export default new PhuongThucThanhToanService();