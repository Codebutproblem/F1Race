// src/pages/HopDongPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import hopDongService from '../api/hopDongService';
import nhaTaiTroService from '../api/nhaTaiTroService';

const HopDongPage = () => {
  const [hopDongs, setHopDongs] = useState([]);
  const [nhaTaiTros, setNhaTaiTros] = useState([]);
  const [selectedNhaTaiTro, setSelectedNhaTaiTro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ngayBatDau: '',
    ngayKetThuc: '',
    giaTri: '',
    noiDung: '',
    trangThai: 'Mới',
    ngayKy: '',
    loaiTaiTroId: '',
    nhaTaiTroId: ''
  });
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchData();
  }, [isAuthenticated, navigate]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch nhà tài trợ list
      const nhaTaiTroData = await nhaTaiTroService.getAllNhaTaiTro();
      setNhaTaiTros(nhaTaiTroData || []);
      
      // If there are any nhà tài trợ, select the first one
      if (nhaTaiTroData && nhaTaiTroData.length > 0) {
        const firstNhaTaiTro = nhaTaiTroData[0];
        setSelectedNhaTaiTro(firstNhaTaiTro.id);
        
        // Fetch contracts for the selected nhà tài trợ
        const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(firstNhaTaiTro.id);
        setHopDongs(hopDongData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  
  const handleNhaTaiTroChange = async (nhaTaiTroId) => {
    try {
      setLoading(true);
      setSelectedNhaTaiTro(nhaTaiTroId);
      
      const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(nhaTaiTroId);
      setHopDongs(hopDongData || []);
    } catch (error) {
      console.error("Error fetching hợp đồng:", error);
      setError('Không thể tải danh sách hợp đồng');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateHopDong = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Add the selected nhà tài trợ ID to form data
      const submitData = {
        ...formData,
        nhaTaiTroId: selectedNhaTaiTro
      };
      
      await hopDongService.createHopDong(submitData);
      setShowForm(false);
      setFormData({
        ngayBatDau: '',
        ngayKetThuc: '',
        giaTri: '',
        noiDung: '',
        trangThai: 'Mới',
        ngayKy: '',
        loaiTaiTroId: '',
        nhaTaiTroId: ''
      });
      
      // Refresh hợp đồng list
      const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(selectedNhaTaiTro);
      setHopDongs(hopDongData || []);
    } catch (error) {
      console.error("Error creating hợp đồng:", error);
      setError('Không thể tạo hợp đồng mới');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteHopDong = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?')) {
      try {
        setLoading(true);
        await hopDongService.deleteHopDong(id);
        
        // Refresh hợp đồng list
        const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(selectedNhaTaiTro);
        setHopDongs(hopDongData || []);
      } catch (error) {
        console.error("Error deleting hợp đồng:", error);
        setError('Không thể xóa hợp đồng');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleUpdateStatus = async (id, trangThai) => {
    try {
      setLoading(true);
      await hopDongService.updateHopDong(id, trangThai);
      
      // Refresh hợp đồng list
      const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(selectedNhaTaiTro);
      setHopDongs(hopDongData || []);
    } catch (error) {
      console.error("Error updating hợp đồng:", error);
      setError('Không thể cập nhật trạng thái hợp đồng');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleViewDetails = (hopDongId) => {
    navigate(`/chitiethopdong/${hopDongId}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý hợp đồng tài trợ</h1>
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
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center">
              <label className="block text-gray-700 font-bold mr-4">
                Chọn nhà tài trợ:
              </label>
              <select
                className="border border-gray-300 rounded px-3 py-2 min-w-[200px]"
                value={selectedNhaTaiTro || ''}
                onChange={(e) => handleNhaTaiTroChange(e.target.value)}
              >
                {nhaTaiTros.map((nhaTaiTro) => (
                  <option key={nhaTaiTro.id} value={nhaTaiTro.id}>
                    {nhaTaiTro.ten}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Thêm hợp đồng mới</h2>
              <form onSubmit={handleCreateHopDong}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      name="ngayBatDau"
                      value={formData.ngayBatDau}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      name="ngayKetThuc"
                      value={formData.ngayKetThuc}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Giá trị
                    </label>
                    <input
                      type="number"
                      name="giaTri"
                      value={formData.giaTri}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ngày ký
                    </label>
                    <input
                      type="date"
                      name="ngayKy"
                      value={formData.ngayKy}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Loại tài trợ ID
                    </label>
                    <input
                      type="number"
                      name="loaiTaiTroId"
                      value={formData.loaiTaiTroId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nội dung
                    </label>
                    <textarea
                      name="noiDung"
                      value={formData.noiDung}
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
                      Ngày ký
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời hạn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá trị
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hopDongs.length > 0 ? (
                    hopDongs.map((hopDong) => (
                      <tr key={hopDong.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hopDong.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(hopDong.ngayKy).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(hopDong.ngayBatDau).toLocaleDateString()} - {new Date(hopDong.ngayKetThuc).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {hopDong.giaTri?.toLocaleString()} VNĐ
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${hopDong.trangThai === 'Đang hiệu lực' ? 'bg-green-100 text-green-800' : 
                              hopDong.trangThai === 'Hết hạn' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                            {hopDong.trangThai}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(hopDong.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Chi tiết
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(hopDong.id, 'Đang hiệu lực')}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleDeleteHopDong(hopDong.id)}
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

export default HopDongPage;