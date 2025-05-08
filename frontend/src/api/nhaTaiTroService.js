// src/api/nhaTaiTroService.js
import ApiService from './apiService';

class NhaTaiTroService extends ApiService {
  constructor() {
    super('/api/ntt'); // Use the NhaTaiTro API endpoint
  }

  async getAllNhaTaiTro() {
    return await this.get('');
  }

  async createNhaTaiTro(nhaTaiTroData) {
    return await this.post('/create', nhaTaiTroData);
  }

  async deleteNhaTaiTro(id) {
    return await this.delete(`/delete/${id}`);
  }
}

export default new NhaTaiTroService();