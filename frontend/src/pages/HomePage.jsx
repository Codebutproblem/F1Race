import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Hệ thống Quản lý Đua xe</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          to="/sponsors" 
          className="bg-blue-600 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">Quản lý Nhà tài trợ</h2>
          <p>Xem danh sách nhà tài trợ, thông tin chi tiết và hợp đồng tài trợ</p>
        </Link>
        
        <Link 
          to="/seasons" 
          className="bg-green-600 text-white p-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">Quản lý Giải thưởng</h2>
          <p>Xem danh sách mùa giải, giải đua và quản lý giải thưởng</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
