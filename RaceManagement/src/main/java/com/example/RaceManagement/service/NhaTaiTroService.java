package com.example.RaceManagement.service;

import com.example.RaceManagement.models.NhaTaiTro;

import java.util.List;

public interface NhaTaiTroService {
    List<NhaTaiTro> getAllNhaTaiTro();
    NhaTaiTro getNhaTaiTroById(Long id);
    NhaTaiTro createNhaTaiTro(NhaTaiTro nhaTaiTro);
    NhaTaiTro updateNhaTaiTro(Long id, NhaTaiTro nhaTaiTro);
    Boolean deleteNhaTaiTro(Long id);
}
