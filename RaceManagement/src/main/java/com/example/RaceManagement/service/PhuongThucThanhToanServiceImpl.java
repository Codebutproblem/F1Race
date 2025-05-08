package com.example.RaceManagement.service;

import com.example.RaceManagement.models.PhuongThucThanhToan;
import com.example.RaceManagement.repositories.PhuongThucThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhuongThucThanhToanServiceImpl implements PhuongThucThanhToanService{

    @Autowired
    private PhuongThucThanhToanRepository phuongThucThanhToanRepository;

    @Override
    public List<PhuongThucThanhToan> getAllPhuongThucThanhToan() {
        return phuongThucThanhToanRepository.findAll();
    }
}
