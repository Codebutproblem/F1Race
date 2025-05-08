package com.example.RaceManagement.service;

import com.example.RaceManagement.models.NhaTaiTro;

import java.util.List;

public interface NhaTaiTroService {
    List<NhaTaiTro> getAllNhaTaiTro();
    NhaTaiTro createNhaTaiTro(NhaTaiTro nhaTaiTro);
    Boolean deleteNhaTaiTro(Long id);
}
