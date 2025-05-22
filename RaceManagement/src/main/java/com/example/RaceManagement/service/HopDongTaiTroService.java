package com.example.RaceManagement.service;

import com.example.RaceManagement.models.HopDongTaiTro;

import java.util.List;

public interface HopDongTaiTroService {
    List<HopDongTaiTro> getAllHopDongTaiTro();
    List<HopDongTaiTro> getDsHopDongByNhaTaiTroId(Long nhaTaiTroId);
    HopDongTaiTro getHopDongTaiTroById(Long id);
    HopDongTaiTro updateHopDongTaiTro(Long id, HopDongTaiTro hopDongTaiTro);
    HopDongTaiTro createHopDongTaiTro(HopDongTaiTro hopDongTaiTro);
    boolean deleteHongDong(Long id);

}
