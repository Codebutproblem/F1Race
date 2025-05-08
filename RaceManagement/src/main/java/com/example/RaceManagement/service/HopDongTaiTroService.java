package com.example.RaceManagement.service;

import com.example.RaceManagement.models.HopDongTaiTro;

import java.util.List;

public interface HopDongTaiTroService {
    List<HopDongTaiTro> getAllHopDongTaiTro();
    List<HopDongTaiTro> getDsHopDongByNhaTaiTroId(Long nhaTaiTroId);
    HopDongTaiTro updateHopDongTaiTro(Long id, String trangThai);
    HopDongTaiTro createHopDongTaiTro(HopDongTaiTro hopDongTaiTro);
    boolean deleteHongDong(Long id);

}
