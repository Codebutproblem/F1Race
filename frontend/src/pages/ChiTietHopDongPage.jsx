// src/pages/ChiTietHopDongPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import hopDongService from '../api/hopDongService';

const ChiTietHopDongPage = () => {
  const { id } = useParams();
  const [hopDong, setHopDong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedTrangThai, setUpdatedTrangThai] = useState('');
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchData();
  }, [isAuthenticated, navigate, id]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // For a real app, we would have an API to get a specific contract by ID
      // Here we're getting all contracts and filtering
      // This is a mock solution - in production, add a proper endpoint
      const hopDongs = await hopDongService.getAllHopDong(); // Just using any nhaTaiTroId to get contracts
      const hopDongData = hopDongs.find(hd => hd.id == id);
      console.log(hopDongs);
      if (hopDongData) {
        setHopDong(hopDongData);
        setUpdatedTrangThai(hopDongData.trangThai || '');
      } else {
        setError('Không tìm thấy thông tin hợp đồng');
      }
    } catch (error) {
      console.error("Error fetching hợp đồng:", error);
      setError('Không thể tải dữ liệu hợp đồng');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateStatus = async () => {
    if (!updatedTrangThai) return;
    
    try {
      setLoading(true);
      const updatedHopDong = await hopDongService.updateHopDong(id, updatedTrangThai);
      
      if (updatedHopDong) {
        setHopDong({
          ...hopDong,
          trangThai: updatedTrangThai
        });
        alert('Cập nhật trạng thái thành công!');
      }
    } catch (error) {
      console.error("Error updating hợp đồng:", error);
      setError('Không thể cập nhật trạng thái hợp đồng');
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate('/hopdong');
  };
  
  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này không?')) {
      try {
        await hopDongService.deleteHopDong(id);
        alert('Xóa hợp đồng thành công!');
        navigate('/hopdong');
      } catch (error) {
        console.error("Error deleting hợp đồng:", error);
        setError('Không thể xóa hợp đồng');
      }
    }
  };

  // Mock data for thanh toán (in a real app, you would fetch this)
  const mockThanhToans = [
    { id: 1, ngayThanhToan: '2023-05-15', soTien: 50000000, noiDung: 'Thanh toán đợt 1', phuongThucThanhToan: { ten: 'Chuyển khoản' } },
    { id: 2, ngayThanhToan: '2023-08-20', soTien: 50000000, noiDung: 'Thanh toán đợt 2', phuongThucThanhToan: { ten: 'Chuyển khoản' } }
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <button
            onClick={handleBack}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-1">←</span> Quay lại
          </button>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Chi tiết hợp đồng #{id}
            </h1>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Xóa hợp đồng
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : hopDong ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Thông tin hợp đồng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 mb-1">ID:</p>
                    <p className="font-medium">{hopDong.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Ngày ký:</p>
                    <p className="font-medium">{new Date(hopDong.ngayKy).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Ngày bắt đầu:</p>
                    <p className="font-medium">{new Date(hopDong.ngayBatDau).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Ngày kết thúc:</p>
                    <p className="font-medium">{new Date(hopDong.ngayKetThuc).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Giá trị:</p>
                    <p className="font-medium">{hopDong.giaTri?.toLocaleString()} VNĐ</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Trạng thái:</p>
                    <p className={`font-medium ${
                      hopDong.trangThai === 'Đang hiệu lực' ? 'text-green-600' : 
                      hopDong.trangThai === 'Hết hạn' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>{hopDong.trangThai}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2">Nội dung:</p>
                  <p className="whitespace-pre-line">{hopDong.noiDung}</p>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium text-gray-800 mb-2">Cập nhật trạng thái:</h3>
                  <div className="flex items-center">
                    <select
                      className="border border-gray-300 rounded px-3 py-2 mr-3"
                      value={updatedTrangThai}
                      onChange={(e) => setUpdatedTrangThai(e.target.value)}
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="Mới">Mới</option>
                      <option value="Đang hiệu lực">Đang hiệu lực</option>
                      <option value="Hết hạn">Hết hạn</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                    <button
                      onClick={handleUpdateStatus}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      disabled={!updatedTrangThai || updatedTrangThai === hopDong.trangThai}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                  <h2 className="text-xl font-semibold text-gray-700">Lịch sử thanh toán</h2>
                </div>
                {mockThanhToans.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày thanh toán
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số tiền
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nội dung
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phương thức
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockThanhToans.map((thanhToan) => (
                        <tr key={thanhToan.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {thanhToan.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(thanhToan.ngayThanhToan).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {thanhToan.soTien.toLocaleString()} VNĐ
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {thanhToan.noiDung}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {thanhToan.phuongThucThanhToan.ten}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Chưa có lịch sử thanh toán
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Thêm thanh toán mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Số tiền
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Nhập số tiền"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ngày thanh toán
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phương thức thanh toán
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded">
                      <option value="">Chọn phương thức</option>
                      <option value="1">Chuyển khoản</option>
                      <option value="2">Tiền mặt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nội dung
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Nhập nội dung thanh toán"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Thêm thanh toán
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              Không tìm thấy thông tin hợp đồng với ID: {id}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChiTietHopDongPage;