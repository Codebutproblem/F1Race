package com.example.RaceManagement.service;

import com.example.RaceManagement.models.NhanVien;
import com.example.RaceManagement.repositories.NhanVienRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NhanVienServiceImpl implements NhanVienService{

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Override
    @Transactional
    public Optional<NhanVien> checkLogin(String username, String password) {
        return  nhanVienRepository.findByUsername(username)
                .filter(nhanVien -> nhanVien.getPassword().equals(password))
                .map(nhanVien -> {
                    nhanVien.getThanhVien().setDiaChi(null);
                    return nhanVien;
                });
    }
}
