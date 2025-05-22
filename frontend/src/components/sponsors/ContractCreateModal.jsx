import React, { useEffect, useState } from 'react';
import ApiService from '../../api/apiService';
const apiService = new ApiService();

const ContractCreateModal = ({ sponsorId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    ngayBatDau: '',
    ngayKetThuc: '',
    giaTri: '',
    noiDung: '',
    trangThai: 'in_progress',
    ngayKy: '',
    loaiTaiTroId: ''
  });
  const [sponsorshipTypes, setSponsorshipTypes] = useState([]);

  const fetchData = async () => {
    try {
      const types = await apiService.get('/ltt');
      if (types) {
        setSponsorshipTypes(types);
      }
    } catch (error) {
      console.error('Error fetching sponsorship types:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Fixed data simulating API response
  // const sponsorshipTypes = [
  //   { id: 1, ten: 'Tài trợ chính' },
  //   { id: 2, ten: 'Tài trợ phụ' },
  //   { id: 3, ten: 'Tài trợ kỹ thuật' },
  //   { id: 4, ten: 'Tài trợ truyền thông' }
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API call
    console.log('Creating contract for sponsor ID:', sponsorId, formData);
    // Close modal after submission
    const {loaiTaiTroId, ...contract} = formData;
    sponsorshipTypes.forEach(type => {
      if (type.id === parseInt(loaiTaiTroId)) {
        contract.loaiTaiTro = {id: type.id};
      }
    })
    contract.nhaTaiTro = {id: sponsorId};
    contract.giaTri = parseInt(contract.giaTri);
    onSubmit(contract);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thêm hợp đồng tài trợ mới</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="loaiTaiTroId" className="block text-sm font-medium text-gray-700 mb-1">Loại tài trợ</label>
              <select
                id="loaiTaiTroId"
                name="loaiTaiTroId"
                value={formData.loaiTaiTroId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Chọn loại tài trợ --</option>
                {sponsorshipTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.ten}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="giaTri" className="block text-sm font-medium text-gray-700 mb-1">Giá trị hợp đồng (VNĐ)</label>
              <input
                type="number"
                id="giaTri"
                name="giaTri"
                value={formData.giaTri}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="ngayBatDau" className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
              <input
                type="date"
                id="ngayBatDau"
                name="ngayBatDau"
                value={formData.ngayBatDau}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="ngayKetThuc" className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
              <input
                type="date"
                id="ngayKetThuc"
                name="ngayKetThuc"
                value={formData.ngayKetThuc}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="trangThai" className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select
                id="trangThai"
                name="trangThai"
                value={formData.trangThai}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="in_progress">Chưa ký</option>
                <option value="completed">Đã ký</option>
              </select>
            </div>
            <div>
              <label htmlFor="ngayKy" className="block text-sm font-medium text-gray-700 mb-1">Ngày ký</label>
              <input
                type="date"
                id="ngayKy"
                name="ngayKy"
                value={formData.ngayKy}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={formData.trangThai !== 'completed'}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="noiDung" className="block text-sm font-medium text-gray-700 mb-1">Nội dung hợp đồng</label>
            <textarea
              id="noiDung"
              name="noiDung"
              value={formData.noiDung}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractCreateModal;