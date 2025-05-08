// src/api/thanhToanService.js
import ApiService from './apiService';

class ThanhToanGiaiThuongService extends ApiService {
  constructor() {
    super('/api/ttgt');
  }

  async createThanhToanGiaiThuong(thanhToanGiaiThuongData) {
    return await this.post('/create', thanhToanGiaiThuongData);
  }
}

export default new ThanhToanGiaiThuongService();