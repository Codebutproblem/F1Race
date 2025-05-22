import React, { useState } from 'react';

const SponsorEditModal = ({ sponsor, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    ten: sponsor.ten,
    linhVuc: sponsor.linhVuc,
    email: sponsor.email,
    dienThoai: sponsor.dienThoai,
    tenNguoiDaiDien: sponsor.tenNguoiDaiDien,
    ghiChu: sponsor.ghiChu || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API call
    console.log('Updating sponsor:', formData);
    // Close modal after submission
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chỉnh sửa nhà tài trợ</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="ten" className="block text-sm font-medium text-gray-700 mb-1">Tên nhà tài trợ</label>
              <input
                type="text"
                id="ten"
                name="ten"
                value={formData.ten}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="linhVuc" className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực</label>
              <input
                type="text"
                id="linhVuc"
                name="linhVuc"
                value={formData.linhVuc}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="dienThoai" className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
              <input
                type="text"
                id="dienThoai"
                name="dienThoai"
                value={formData.dienThoai}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="tenNguoiDaiDien" className="block text-sm font-medium text-gray-700 mb-1">Người đại diện</label>
              <input
                type="text"
                id="tenNguoiDaiDien"
                name="tenNguoiDaiDien"
                value={formData.tenNguoiDaiDien}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="ghiChu" className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea
              id="ghiChu"
              name="ghiChu"
              value={formData.ghiChu}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default SponsorEditModal;