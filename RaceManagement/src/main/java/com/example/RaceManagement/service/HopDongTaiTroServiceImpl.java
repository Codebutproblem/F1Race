package com.example.RaceManagement.service;

import com.example.RaceManagement.models.HopDongTaiTro;
import com.example.RaceManagement.repositories.HopDongTaiTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HopDongTaiTroServiceImpl implements HopDongTaiTroService{

    @Autowired
    private HopDongTaiTroRepository hopDongTaiTroRepository;

    @Override
    public List<HopDongTaiTro> getAllHopDongTaiTro() {
        return hopDongTaiTroRepository.findAll();
    }

    @Override
    public List<HopDongTaiTro> getDsHopDongByNhaTaiTroId(Long nhaTaiTroId) {
        return hopDongTaiTroRepository.findByNhaTaiTroId(nhaTaiTroId);
    }

    @Override
    public HopDongTaiTro updateHopDongTaiTro(Long id, String trangThai) {
        if(hopDongTaiTroRepository.existsById(id)){
            HopDongTaiTro hopDongTaiTro = hopDongTaiTroRepository.findById(id).orElse(null);
            if(hopDongTaiTro != null) {
                hopDongTaiTro.setTrangThai(trangThai);
                return hopDongTaiTroRepository.save(hopDongTaiTro);
            }
        }
        return null;
    }

    @Override
    public HopDongTaiTro createHopDongTaiTro(HopDongTaiTro hopDongTaiTro) {
        return hopDongTaiTroRepository.save(hopDongTaiTro);
    }

    @Override
    public boolean deleteHongDong(Long id) {
        if(hopDongTaiTroRepository.existsById(id)){
            hopDongTaiTroRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
