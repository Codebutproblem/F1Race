// src/pages/NhaTaiTroPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import nhaTaiTroService from '../api/nhaTaiTroService';

const NhaTaiTroPage = () => {
  const [nhaTaiTros, setNhaTaiTros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ten: '',
    linhVuc: '',
    email: '',
    dienThoai: '',
    ghiChu: '',
    tenNguoiDaiDien: ''
  });
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchNhaTaiTros();
  }, [isAuthenticated, navigate]);
  
  const fetchNhaTaiTros = async () => {
    try {
      setLoading(true);
      const data = await nhaTaiTroService.getAllNhaTaiTro();
      setNhaTaiTros(data || []);
    } catch (error) {
      console.error("Error fetching nhà tài trợ:", error);
      setError('Không thể tải danh sách nhà tài trợ');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateNhaTaiTro = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await nhaTaiTroService.createNhaTaiTro(formData);
      setShowForm(false);
      setFormData({
        ten: '',
        linhVuc: '',
        email: '',
        dienThoai: '',
        ghiChu: '',
        tenNguoiDaiDien: ''
      });
      await fetchNhaTaiTros();
    } catch (error) {
      console.error("Error creating nhà tài trợ:", error);
      setError('Không thể tạo nhà tài trợ mới');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteNhaTaiTro = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà tài trợ này?')) {
      try {
        setLoading(true);
        await nhaTaiTroService.deleteNhaTaiTro(id);
        await fetchNhaTaiTros();
      } catch (error) {
        console.error("Error deleting nhà tài trợ:", error);
        setError('Không thể xóa nhà tài trợ');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleViewHopDong = (nhaTaiTroId) => {
    navigate(`/chitietnhataitro/${nhaTaiTroId}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý nhà tài trợ</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {showForm ? 'Đóng' : 'Thêm mới'}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Thêm nhà tài trợ mới</h2>
              <form onSubmit={handleCreateNhaTaiTro}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Tên nhà tài trợ
                    </label>
                    <input
                      type="text"
                      name="ten"
                      value={formData.ten}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Lĩnh vực
                    </label>
                    <input
                      type="text"
                      name="linhVuc"
                      value={formData.linhVuc}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Điện thoại
                    </label>
                    <input
                      type="text"
                      name="dienThoai"
                      value={formData.dienThoai}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Tên người đại diện
                    </label>
                    <input
                      type="text"
                      name="tenNguoiDaiDien"
                      value={formData.tenNguoiDaiDien}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ghi chú
                    </label>
                    <input
                      type="text"
                      name="ghiChu"
                      value={formData.ghiChu}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {loading && !showForm ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lĩnh vực
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người đại diện
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Liên hệ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {nhaTaiTros.length > 0 ? (
                    nhaTaiTros.map((nhaTaiTro) => (
                      <tr key={nhaTaiTro.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nhaTaiTro.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {nhaTaiTro.ten}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nhaTaiTro.linhVuc}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nhaTaiTro.tenNguoiDaiDien}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{nhaTaiTro.email}</div>
                          <div>{nhaTaiTro.dienThoai}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewHopDong(nhaTaiTro.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Xem hợp đồng
                          </button>
                          <button
                            onClick={() => handleDeleteNhaTaiTro(nhaTaiTro.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NhaTaiTroPage;