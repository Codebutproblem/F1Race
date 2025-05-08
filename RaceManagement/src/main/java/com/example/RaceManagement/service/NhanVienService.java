package com.example.RaceManagement.service;

import com.example.RaceManagement.models.NhanVien;

import java.util.Optional;

public interface NhanVienService {
    Optional<NhanVien> checkLogin(String username, String password);
}
