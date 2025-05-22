// components/awards/PaymentModal.js (Updated)
import React, { useEffect, useState } from 'react';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const PaymentModal = ({ giaiThuong, remainingAmount, recipient, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    soTien: remainingAmount,
    ngayThanhToan: new Date().toISOString().split('T')[0],
    noiDung: 'Thanh toán giải thưởng',
    phuongThucThanhToanId: ''
  });

  const [paymentMethods, setPaymentMethods] = useState([]);

  const fetchData = async () => {
    try {
      const data = await apiService.get('/pttt');
      setPaymentMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulating API call
    console.log('Creating payment for award ID:', giaiThuong.id, formData);

    const { phuongThucThanhToanId, ...thanhToan } = formData;
    paymentMethods.forEach(method => {
      if (method.id === parseInt(phuongThucThanhToanId)) {
        thanhToan.phuongThucThanhToan = method;
      }
    });
    thanhToan.soTien = parseInt(thanhToan.soTien);
    const thanhToanGiaiThuong = {
      giaiThuong: { id: giaiThuong.id },
      thanhToan: thanhToan
    }

    console.log('Payment data:', thanhToanGiaiThuong);

    try {
      const response = await apiService.post('/ttgt/create', thanhToanGiaiThuong);
      if(response) {
        console.log('Payment created successfully:', response);
        onSubmit();
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }finally {
      onClose();
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thanh toán giải thưởng</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Thông tin giải thưởng */}
        <div className="mb-4 bg-gray-100 p-3 rounded">
          <p className="font-medium">{giaiThuong?.ten} - {giaiThuong.giaiDua?.ten}</p>
          <div className="flex justify-between mt-1">
            <span>Số tiền còn lại:</span>
            <span className="font-bold">{formatCurrency(remainingAmount)}</span>
          </div>
        </div>

        {/* Thông tin người nhận */}
        <div className="mb-4 bg-blue-50 p-3 rounded">
          <h3 className="font-semibold mb-2">Thông tin người nhận</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tên:</span>
              <span className="text-sm font-medium">
                {recipient.type === 'racer' ? recipient.thanhVien?.ten : recipient.ten}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Số tài khoản:</span>
              <span className="text-sm font-medium">{recipient.taiKhoanNganHang?.soTaiKhoan || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Ngân hàng:</span>
              <span className="text-sm font-medium">{recipient.taiKhoanNganHang?.tenNganHang || 'N/A'}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-4">
            <div>
              <label htmlFor="soTien" className="block text-sm font-medium text-gray-700 mb-1">Số tiền thanh toán</label>
              <input
                type="number"
                id="soTien"
                name="soTien"
                max={remainingAmount}
                value={formData.soTien}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Số tiền tối đa có thể thanh toán: {formatCurrency(remainingAmount)}
              </p>
            </div>

            <div>
              <label htmlFor="phuongThucThanhToanId" className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
              <select
                id="phuongThucThanhToanId"
                name="phuongThucThanhToanId"
                value={formData.phuongThucThanhToanId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Chọn phương thức thanh toán --</option>
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>{method.ten}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ngayThanhToan" className="block text-sm font-medium text-gray-700 mb-1">Ngày thanh toán</label>
              <input
                type="date"
                id="ngayThanhToan"
                name="ngayThanhToan"
                value={formData.ngayThanhToan}
                onChange={handleChange}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="noiDung" className="block text-sm font-medium text-gray-700 mb-1">Nội dung thanh toán</label>
              <textarea
                id="noiDung"
                name="noiDung"
                value={formData.noiDung}
                onChange={handleChange}
                rows="2"
                placeholder="Thanh toán giải thưởng..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
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
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;