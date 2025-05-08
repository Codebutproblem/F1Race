// src/pages/ChiTietNhaTaiTroPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import nhaTaiTroService from '../api/nhaTaiTroService';
import hopDongService from '../api/hopDongService';
import loaiTaiTroService from '../api/loaiTaiTroService';

const ChiTietNhaTaiTroPage = () => {
  const { id } = useParams();
  const [nhaTaiTro, setNhaTaiTro] = useState(null);
  const [hopDongs, setHopDongs] = useState([]);
  const [loaiTaiTros, setLoaiTaiTros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ngayBatDau: '',
    ngayKetThuc: '',
    giaTri: '',
    noiDung: '',
    trangThai: 'Mới',
    ngayKy: '',
    loaiTaiTroId: '',
    nhaTaiTroId: id
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
      
      // In a real app, you would fetch the specific nhaTaiTro by ID
      // For now, we'll get all and filter
      const allNhaTaiTros = await nhaTaiTroService.getAllNhaTaiTro();
      const nhaTaiTroData = allNhaTaiTros.find(ntt => ntt.id == id);
      
      if (!nhaTaiTroData) {
        setError('Không tìm thấy thông tin nhà tài trợ');
        setLoading(false);
        return;
      }
      
      setNhaTaiTro(nhaTaiTroData);
      
      // Fetch contracts for this sponsor
      const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(id);
      setHopDongs(hopDongData || []);
      
      // Fetch sponsorship types
      const loaiTaiTroData = await loaiTaiTroService.getAllLoaiTaiTro();
      setLoaiTaiTros(loaiTaiTroData || []);
      
      // Set default loaiTaiTroId if available
      if (loaiTaiTroData && loaiTaiTroData.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          loaiTaiTroId: loaiTaiTroData[0].id
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewHopDong = (hopDongId) => {
    navigate(`/chitiethopdong/${hopDongId}`);
  };
  
  const handleBack = () => {
    navigate('/nhataitro');
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCreateHopDong = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await hopDongService.createHopDong(formData);
      
      // Clear form and hide it
      setFormData({
        ngayBatDau: '',
        ngayKetThuc: '',
        giaTri: '',
        noiDung: '',
        trangThai: 'Mới',
        ngayKy: '',
        loaiTaiTroId: loaiTaiTros.length > 0 ? loaiTaiTros[0].id : '',
        nhaTaiTroId: id
      });
      setShowForm(false);
      
      // Refresh contracts list
      const hopDongData = await hopDongService.getHopDongByNhaTaiTroId(id);
      setHopDongs(hopDongData || []);
      
      // Show success message
      alert('Tạo hợp đồng tài trợ thành công!');
    } catch (error) {
      console.error("Error creating contract:", error);
      setError('Không thể tạo hợp đồng tài trợ');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to find sponsorship type name by ID
  const getLoaiTaiTroName = (loaiTaiTroId) => {
    const loaiTaiTro = loaiTaiTros.find(lt => lt.id === loaiTaiTroId);
    return loaiTaiTro ? loaiTaiTro.ten : 'Không xác định';
  };

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
              Chi tiết nhà tài trợ {nhaTaiTro?.ten || ''}
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {showForm ? 'Đóng' : 'Thêm hợp đồng mới'}
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
          ) : nhaTaiTro ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Thông tin nhà tài trợ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">ID:</p>
                    <p className="font-medium">{nhaTaiTro.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Tên nhà tài trợ:</p>
                    <p className="font-medium">{nhaTaiTro.ten}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Lĩnh vực:</p>
                    <p className="font-medium">{nhaTaiTro.linhVuc}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Người đại diện:</p>
                    <p className="font-medium">{nhaTaiTro.tenNguoiDaiDien}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Email:</p>
                    <p className="font-medium">{nhaTaiTro.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Điện thoại:</p>
                    <p className="font-medium">{nhaTaiTro.dienThoai}</p>
                  </div>
                  {nhaTaiTro.ghiChu && (
                    <div className="md:col-span-2">
                      <p className="text-gray-600 mb-1">Ghi chú:</p>
                      <p className="font-medium">{nhaTaiTro.ghiChu}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Form to create new sponsorship contract */}
              {showForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Tạo hợp đồng tài trợ mới</h2>
                  <form onSubmit={handleCreateHopDong}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Loại tài trợ
                        </label>
                        <select
                          name="loaiTaiTroId"
                          value={formData.loaiTaiTroId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        >
                          {loaiTaiTros.map(loaiTaiTro => (
                            <option key={loaiTaiTro.id} value={loaiTaiTro.id}>
                              {loaiTaiTro.ten} - {loaiTaiTro.moTa || 'Không có mô tả'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Giá trị hợp đồng (VNĐ)
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
                          Trạng thái
                        </label>
                        <select
                          name="trangThai"
                          value={formData.trangThai}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        >
                          <option value="Mới">Mới</option>
                          <option value="Đang hiệu lực">Đang hiệu lực</option>
                          <option value="Hết hạn">Hết hạn</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
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
                        {loading ? 'Đang xử lý...' : 'Tạo hợp đồng'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                  <h2 className="text-xl font-semibold text-gray-700">Danh sách hợp đồng</h2>
                </div>
                {hopDongs.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại tài trợ
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
                      {hopDongs.map((hopDong) => (
                        <tr key={hopDong.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hopDong.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {hopDong.loaiTaiTro?.ten || getLoaiTaiTroName(hopDong.loaiTaiTroId) || 'Không xác định'}
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
                              onClick={() => handleViewHopDong(hopDong.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Nhà tài trợ này chưa có hợp đồng nào
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              Không tìm thấy thông tin nhà tài trợ với ID: {id}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChiTietNhaTaiTroPage;