// src/pages/GiaiThuongDoiDuaPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import doiDuaService from '../api/doiDuaService';
import thanhToanService from '../api/thanhToanService';
import phuongThucThanhToanService from '../api/phuongThucThanhToanService';

const GiaiThuongDoiDuaPage = () => {
  const { id } = useParams();
  const [doiDua, setDoiDua] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showThanhToanForm, setShowThanhToanForm] = useState(false);
  const [selectedGiaiThuong, setSelectedGiaiThuong] = useState(null);
  const [phuongThucThanhToans, setPhuongThucThanhToans] = useState([]);
  const [thanhToanFormData, setThanhToanFormData] = useState({
    id: '', // This will be the ID for both ThanhToan and ThanhToanGiaiThuong
    soTien: '',
    ngayThanhToan: new Date().toISOString().split('T')[0],
    noiDung: '',
    phuongThucThanhToanId: '',
    giaiThuongId: ''
  });
  
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
      
      // Get the specific team
      const allDoiDuas = await doiDuaService.getAllDoiDua();
      const doiDuaData = allDoiDuas.find(dd => dd.id == id);
      
      if (!doiDuaData) {
        setError('Không tìm thấy thông tin đội đua');
        setLoading(false);
        return;
      }
      
      setDoiDua(doiDuaData);
      
      // Fetch payment methods
      const paymentMethods = await phuongThucThanhToanService.getAllPhuongThucThanhToan();
      setPhuongThucThanhToans(paymentMethods || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenThanhToanForm = (giaiThuong) => {
    setSelectedGiaiThuong(giaiThuong);
    setThanhToanFormData({
      ...thanhToanFormData,
      id: '', // Will be filled by user or generated
      giaiThuongId: giaiThuong.giaiThuong?.id || '',
      soTien: giaiThuong.giaiThuong?.giaTri || 0,
      noiDung: `Thanh toán giải thưởng "${giaiThuong.giaiThuong?.ten || ''}" cho đội đua "${doiDua.ten}"`,
      ngayThanhToan: new Date().toISOString().split('T')[0],
      phuongThucThanhToanId: phuongThucThanhToans.length > 0 ? phuongThucThanhToans[0].id : ''
    });
    setShowThanhToanForm(true);
  };
  
  const handleCreateThanhToan = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Structure the nested payload as expected by the server
      const thanhToanGiaiThuongData = {
        id: thanhToanFormData.id,
        thanhToan: {
          id: thanhToanFormData.id,
          soTien: thanhToanFormData.soTien,
          ngayThanhToan: thanhToanFormData.ngayThanhToan,
          noiDung: thanhToanFormData.noiDung,
          phuongThucThanhToanId: thanhToanFormData.phuongThucThanhToanId
        },
        giaiThuongId: thanhToanFormData.giaiThuongId
      };
      
      await thanhToanService.createThanhToanGiaiThuong(thanhToanGiaiThuongData);
      setShowThanhToanForm(false);
      setThanhToanFormData({
        id: '',
        soTien: '',
        ngayThanhToan: new Date().toISOString().split('T')[0],
        noiDung: '',
        phuongThucThanhToanId: phuongThucThanhToans.length > 0 ? phuongThucThanhToans[0].id : '',
        giaiThuongId: ''
      });
      
      // Show success message
      alert('Thanh toán giải thưởng thành công!');
    } catch (error) {
      console.error("Error creating thanh toán:", error);
      setError('Không thể tạo thanh toán giải thưởng');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setThanhToanFormData({
      ...thanhToanFormData,
      [name]: value
    });
  };
  
  const handleBack = () => {
    navigate('/giaithuong');
  };

  // For displaying payment history (mock data for now)
  const mockPaymentHistory = (giaiThuongId) => [
    { id: 1, ngayThanhToan: '2023-05-15', soTien: 30000000, noiDung: 'Thanh toán đợt 1', phuongThucThanhToan: { ten: 'Chuyển khoản' } },
    { id: 2, ngayThanhToan: '2023-06-20', soTien: 20000000, noiDung: 'Thanh toán đợt 2', phuongThucThanhToan: { ten: 'Chuyển khoản' } }
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
              Giải thưởng của đội đua: {doiDua?.ten || ''}
            </h1>
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
          ) : doiDua ? (
            <>
              {/* Thông tin đội đua */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Thông tin đội đua</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">ID:</p>
                    <p className="font-medium">{doiDua.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Tên đội:</p>
                    <p className="font-medium">{doiDua.ten}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Quận/Huyện ID:</p>
                    <p className="font-medium">{doiDua.quanHuyenId}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-1">Mô tả:</p>
                    <p className="font-medium">{doiDua.moTa || 'Không có mô tả'}</p>
                  </div>
                </div>
              </div>
              
              {/* Hiển thị form thanh toán nếu được mở */}
              {showThanhToanForm && selectedGiaiThuong && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Thanh toán giải thưởng: {selectedGiaiThuong.giaiThuong?.ten}
                  </h2>
                  <form onSubmit={handleCreateThanhToan}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Số tiền
                        </label>
                        <input
                          type="number"
                          name="soTien"
                          value={thanhToanFormData.soTien}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Ngày thanh toán
                        </label>
                        <input
                          type="date"
                          name="ngayThanhToan"
                          value={thanhToanFormData.ngayThanhToan}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                    
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Phương thức thanh toán
                        </label>
                        <select
                          name="phuongThucThanhToanId"
                          value={thanhToanFormData.phuongThucThanhToanId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        >
                          {phuongThucThanhToans.map(pttt => (
                            <option key={pttt.id} value={pttt.id}>
                              {pttt.ten} - {pttt.moTa}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Nội dung
                        </label>
                        <textarea
                          name="noiDung"
                          value={thanhToanFormData.noiDung}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          rows="3"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowThanhToanForm(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        disabled={loading}
                      >
                        {loading ? 'Đang xử lý...' : 'Thanh toán'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Danh sách giải thưởng */}
              {doiDua.giaiThuongDoiDuas && doiDua.giaiThuongDoiDuas.length > 0 ? (
                <div className="space-y-6">
                  {doiDua.giaiThuongDoiDuas.map((giaiThuong) => (
                    <div key={giaiThuong.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="bg-green-500 text-white py-3 px-6">
                        <h2 className="text-lg font-semibold">{giaiThuong.giaiThuong?.ten || 'Giải thưởng'}</h2>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-600 mb-1">ID:</p>
                            <p className="font-medium">{giaiThuong.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Giá trị:</p>
                            <p className="font-medium">{giaiThuong.giaiThuong?.giaTri?.toLocaleString() || 0} VNĐ</p>
                          </div>
                          {giaiThuong.giaiThuong?.moTa && (
                            <div className="md:col-span-2">
                              <p className="text-gray-600 mb-1">Mô tả:</p>
                              <p className="font-medium">{giaiThuong.giaiThuong.moTa}</p>
                            </div>
                          )}
                          
                          {giaiThuong.giaiThuong?.giaiDua && (
                            <div className="md:col-span-2">
                              <p className="text-gray-600 mb-1">Thuộc giải đua:</p>
                              <p className="font-medium">{giaiThuong.giaiThuong.giaiDua.ten}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => handleOpenThanhToanForm(giaiThuong)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                          >
                            Tạo thanh toán
                          </button>
                        </div>
                        
                        {/* Hiển thị lịch sử thanh toán */}
                        <div className="mt-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">Lịch sử thanh toán</h3>
                          {mockPaymentHistory(giaiThuong.id).length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày thanh toán</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {mockPaymentHistory(giaiThuong.id).map((payment) => (
                                  <tr key={payment.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{payment.id}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(payment.ngayThanhToan).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {payment.soTien.toLocaleString()} VNĐ
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{payment.noiDung}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{payment.phuongThucThanhToan.ten}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center py-4 text-gray-500">Chưa có lịch sử thanh toán</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-500">Đội đua này chưa có giải thưởng nào</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              Không tìm thấy thông tin đội đua với ID: {id}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GiaiThuongDoiDuaPage;