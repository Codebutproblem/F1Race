package com.example.RaceManagement.service;

import com.example.RaceManagement.models.HopDongTaiTro;
import com.example.RaceManagement.models.LoaiTaiTro;
import com.example.RaceManagement.models.NhaTaiTro;
import com.example.RaceManagement.repositories.HopDongTaiTroRepository;
import com.example.RaceManagement.repositories.LoaiTaiTroRepository;
import com.example.RaceManagement.repositories.NhaTaiTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HopDongTaiTroServiceImpl implements HopDongTaiTroService{

    @Autowired
    private HopDongTaiTroRepository hopDongTaiTroRepository;

    @Autowired
    private LoaiTaiTroRepository loaiTaiTroRepository;

    @Autowired
    private NhaTaiTroRepository nhaTaiTroRepository;

    @Override
    public List<HopDongTaiTro> getAllHopDongTaiTro() {
        return hopDongTaiTroRepository.findAll();
    }

    @Override
    public List<HopDongTaiTro> getDsHopDongByNhaTaiTroId(Long nhaTaiTroId) {
        return hopDongTaiTroRepository.findByNhaTaiTroId(nhaTaiTroId);
    }

    @Override
    public HopDongTaiTro getHopDongTaiTroById(Long id) {
        return hopDongTaiTroRepository.findById(id).orElse(null);
    }

    @Override
    public HopDongTaiTro updateHopDongTaiTro(Long id, HopDongTaiTro hopDongTaiTro) {
        HopDongTaiTro existingHopDong = hopDongTaiTroRepository.findById(id).orElse(null);
        if(existingHopDong != null && !existingHopDong.getTrangThai().equalsIgnoreCase("completed")){
            if(hopDongTaiTro.getLoaiTaiTro() != null){
                existingHopDong.setLoaiTaiTro(hopDongTaiTro.getLoaiTaiTro());
            }
            if(hopDongTaiTro.getNhaTaiTro() != null){
                existingHopDong.setNhaTaiTro(hopDongTaiTro.getNhaTaiTro());
            }
            if(hopDongTaiTro.getNgayBatDau() != null){
                existingHopDong.setNgayBatDau(hopDongTaiTro.getNgayBatDau());
            }
            if(hopDongTaiTro.getNgayKetThuc() != null){
                existingHopDong.setNgayKetThuc(hopDongTaiTro.getNgayKetThuc());
            }
            if(hopDongTaiTro.getGiaTri() != null){
                existingHopDong.setGiaTri(hopDongTaiTro.getGiaTri());
            }
            if(hopDongTaiTro.getNoiDung() != null){
                existingHopDong.setNoiDung(hopDongTaiTro.getNoiDung());
            }
            if(hopDongTaiTro.getNgayKy() != null){
                existingHopDong.setNgayKy(hopDongTaiTro.getNgayKy());
            }
            if(hopDongTaiTro.getTrangThai() != null){
                existingHopDong.setTrangThai(hopDongTaiTro.getTrangThai());
            }
            return hopDongTaiTroRepository.save(existingHopDong);
        }
        throw new IllegalArgumentException("Cannot update HopDongTaiTro with id " + id + " because it is not in Completed status.");
    }

    @Override
    public HopDongTaiTro createHopDongTaiTro(HopDongTaiTro hopDongTaiTro) {
        if(!hopDongTaiTro.getTrangThai().equalsIgnoreCase("completed")
                && !hopDongTaiTro.getTrangThai().equalsIgnoreCase("in_progress")){
            throw new IllegalArgumentException("Invalid status: " + hopDongTaiTro.getTrangThai());
        }
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
