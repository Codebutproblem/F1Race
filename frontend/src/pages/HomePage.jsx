// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import doiDuaService from '../api/doiDuaService';
import tayDuaService from '../api/tayDuaService';
import nhaTaiTroService from '../api/nhaTaiTroService';

const HomePage = () => {
  const [stats, setStats] = useState({
    doiDuaCount: 0,
    tayDuaCount: 0,
    nhaTaiTroCount: 0
  });
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Fetch summary data for dashboard
    const fetchData = async () => {
      try {
        const [doiDuaData, tayDuaData, nhaTaiTroData] = await Promise.all([
          doiDuaService.getAllDoiDua(),
          tayDuaService.getAllTayDua(),
          nhaTaiTroService.getAllNhaTaiTro()
        ]);
        
        setStats({
          doiDuaCount: doiDuaData?.length || 0,
          tayDuaCount: tayDuaData?.length || 0,
          nhaTaiTroCount: nhaTaiTroData?.length || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated, navigate]);
  
  const handleNav = (destination) => {
    navigate(destination);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => handleNav('/doidua')}
                >
                  <h2 className="text-xl font-semibold text-gray-700">Đội đua</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.doiDuaCount}</p>
                </div>
                
                <div 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => handleNav('/taydua')}
                >
                  <h2 className="text-xl font-semibold text-gray-700">Tay đua</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.tayDuaCount}</p>
                </div>
                
                <div 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => handleNav('/nhataitro')}
                >
                  <h2 className="text-xl font-semibold text-gray-700">Nhà tài trợ</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.nhaTaiTroCount}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Chức năng chính</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button 
                    onClick={() => handleNav('/nhataitro')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md"
                  >
                    Quản lý nhà tài trợ
                  </button>
                  
                  <button 
                    onClick={() => handleNav('/hopdong')}
                    className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md"
                  >
                    Quản lý hợp đồng
                  </button>
                  
                  <button 
                    onClick={() => handleNav('/giaithuong')}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-md"
                  >
                    Quản lý giải thưởng
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;