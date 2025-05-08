// src/api/hopDongService.js
import ApiService from './apiService';

class HopDongService extends ApiService {
  constructor() {
    super('/api/hdtt'); // Use the HopDongTaiTro API endpoint
  }

  async getAllHopDong() {
    return await this.get('');
  }

  async getHopDongByNhaTaiTroId(nhaTaiTroId) {
    return await this.get(`/nhataitro/${nhaTaiTroId}`);
  }

  async createHopDong(hopDongData) {
    return await this.post('/create', hopDongData);
  }

  async updateHopDong(id, trangThai) {
    return await this.put(`/update/${id}?trangThai=${trangThai}`);
  }

  async deleteHopDong(id) {
    return await this.delete(`/delete/${id}`);
  }
}

export default new HopDongService();