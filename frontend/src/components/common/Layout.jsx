import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Quản lý Đua xe</Link>
          
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className={`hover:text-blue-200 ${location.pathname === '/' ? 'text-white font-semibold' : 'text-blue-200'}`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/sponsors" 
              className={`hover:text-blue-200 ${location.pathname.includes('/sponsors') || location.pathname.includes('/contracts') ? 'text-white font-semibold' : 'text-blue-200'}`}
            >
              Nhà tài trợ
            </Link>
            <Link 
              to="/seasons" 
              className={`hover:text-blue-200 ${location.pathname.includes('/seasons') || location.pathname.includes('/races') || location.pathname.includes('/race-awards') ? 'text-white font-semibold' : 'text-blue-200'}`}
            >
              Giải thưởng
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="py-6">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Hệ thống Quản lý Đua xe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;