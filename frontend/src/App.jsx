// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NhaTaiTroPage from './pages/NhaTaiTroPage';
import ChiTietNhaTaiTroPage from './pages/ChiTietNhaTaiTroPage';
import HopDongPage from './pages/HopDongPage';
import ChiTietHopDongPage from './pages/ChiTietHopDongPage';
import GiaiThuongPage from './pages/GiaiThuongPage';
import GiaiThuongDoiDuaPage from './pages/GiaiThuongDoiDuaPage';
import GiaiThuongTayDuaPage from './pages/GiaiThuongTayDuaPage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/nhataitro" 
            element={
              <ProtectedRoute>
                <NhaTaiTroPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/chitietnhataitro/:id" 
            element={
              <ProtectedRoute>
                <ChiTietNhaTaiTroPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/hopdong" 
            element={
              <ProtectedRoute>
                <HopDongPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/chitiethopdong/:id" 
            element={
              <ProtectedRoute>
                <ChiTietHopDongPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/giaithuong" 
            element={
              <ProtectedRoute>
                <GiaiThuongPage />
              </ProtectedRoute>
            } 
          />
          
          {/* New prize detail and payment routes */}
          <Route 
            path="/giaithuongdoidua/:id" 
            element={
              <ProtectedRoute>
                <GiaiThuongDoiDuaPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/giaithuongtaydua/:id" 
            element={
              <ProtectedRoute>
                <GiaiThuongTayDuaPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect root to login or home based on auth status */}
          <Route 
            path="/" 
            element={
              localStorage.getItem('isAuthenticated') === 'true' 
                ? <Navigate to="/home" /> 
                : <Navigate to="/login" />
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;