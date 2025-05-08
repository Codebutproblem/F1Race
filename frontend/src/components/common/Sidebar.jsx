// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Navigation items
  const navItems = [
    { path: '/home', name: 'Trang chủ'},
    { path: '/nhataitro', name: 'Nhà tài trợ'},
    { path: '/hopdong', name: 'Hợp đồng tài trợ'},
    { path: '/giaithuong', name: 'Giải thưởng'},
  ];

  // Icon components (simplified for this example)

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Quản lý đua xe</h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;