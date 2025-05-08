package com.example.RaceManagement.service;

import com.example.RaceManagement.models.LoaiTaiTro;
import com.example.RaceManagement.repositories.LoaiTaiTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiTaiTroServiceImpl implements LoaiTaiTroService{

    @Autowired
    private LoaiTaiTroRepository loaiTaiTroRepository;

    @Override
    public List<LoaiTaiTro> getAllLoaiTaiTro() {
        return loaiTaiTroRepository.findAll();
    }
}
