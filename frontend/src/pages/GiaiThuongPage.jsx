// src/pages/GiaiThuongPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import doiDuaService from '../api/doiDuaService';
import tayDuaService from '../api/tayDuaService';

const GiaiThuongPage = () => {
  const [activeTab, setActiveTab] = useState('doiDua');
  const [doiDuas, setDoiDuas] = useState([]);
  const [tayDuas, setTayDuas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchData();
  }, [isAuthenticated, navigate, activeTab]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (activeTab === 'doiDua' || activeTab === 'all') {
        const doiDuaData = await doiDuaService.getAllDoiDua();
        setDoiDuas(doiDuaData || []);
      }
      
      if (activeTab === 'tayDua' || activeTab === 'all') {
        const tayDuaData = await tayDuaService.getAllTayDua();
        setTayDuas(tayDuaData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewGiaiThuongDoiDua = (doiDuaId) => {
    navigate(`/giaithuongdoidua/${doiDuaId}`);
  };
  
  const handleViewGiaiThuongTayDua = (tayDuaId) => {
    navigate(`/giaithuongtaydua/${tayDuaId}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý giải thưởng</h1>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 text-lg font-medium ${
                  activeTab === 'doiDua' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('doiDua')}
              >
                Đội đua
              </button>
              <button
                className={`px-6 py-3 text-lg font-medium ${
                  activeTab === 'tayDua' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('tayDua')}
              >
                Tay đua
              </button>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Đang tải dữ liệu...</p>
                </div>
              ) : (
                <>
                  {/* Đội đua tab */}
                  {activeTab === 'doiDua' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {doiDuas.length > 0 ? (
                        doiDuas.map((doiDua) => (
                          <div 
                            key={doiDua.id}
                            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
                            onClick={() => handleViewGiaiThuongDoiDua(doiDua.id)}
                          >
                            <div className="bg-green-500 text-white py-3 px-4">
                              <h2 className="font-semibold text-lg">{doiDua.ten}</h2>
                            </div>
                            <div className="p-4">
                              <div className="mb-2">
                                <span className="text-gray-700 font-medium">ID:</span> {doiDua.id}
                              </div>
                              <div className="mb-4">
                                <span className="text-gray-700 font-medium">Mô tả:</span>
                                <p className="text-gray-600 mt-1">
                                  {doiDua.moTa || 'Không có mô tả'}
                                </p>
                              </div>
                              <div className="mt-4">
                                <span className="text-gray-700 font-medium">Số giải thưởng:</span> {doiDua.giaiThuongDoiDuas?.length || 0}
                              </div>
                              {doiDua.giaiThuongDoiDuas && doiDua.giaiThuongDoiDuas.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-green-500 font-medium">Có giải thưởng</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="md:col-span-3 text-center py-8 text-gray-500">
                          Không có dữ liệu đội đua
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Tay đua tab */}
                  {activeTab === 'tayDua' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tayDuas.length > 0 ? (
                        tayDuas.map((tayDua) => (
                          <div 
                            key={tayDua.id}
                            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
                            onClick={() => handleViewGiaiThuongTayDua(tayDua.id)}
                          >
                            <div className="bg-blue-500 text-white py-3 px-4">
                              <h2 className="font-semibold text-lg">{tayDua.thanhVien?.ten || 'Tay đua'}</h2>
                            </div>
                            <div className="p-4">
                              <div className="mb-2">
                                <span className="text-gray-700 font-medium">ID:</span> {tayDua.id}
                              </div>
                              <div className="mb-2">
                                <span className="text-gray-700 font-medium">Số năm kinh nghiệm:</span> {tayDua.namKinhNghiem} năm
                              </div>
                              <div className="mt-4">
                                <span className="text-gray-700 font-medium">Số giải thưởng:</span> {tayDua.giaiThuongTayDuas?.length || 0}
                              </div>
                              {tayDua.giaiThuongTayDuas && tayDua.giaiThuongTayDuas.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-blue-500 font-medium">Có giải thưởng</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="md:col-span-3 text-center py-8 text-gray-500">
                          Không có dữ liệu tay đua
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GiaiThuongPage;