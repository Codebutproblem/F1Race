package com.example.RaceManagement.service;

import com.example.RaceManagement.models.GiaiThuongTayDua;
import com.example.RaceManagement.models.TayDua;
import com.example.RaceManagement.models.ThanhToanGiaiThuong;
import com.example.RaceManagement.repositories.TayDuaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TayDuaServiceImpl implements TayDuaService{

    @Autowired
    private TayDuaRepository tayDuaRepository;

    @Override
    public List<TayDua> getAllTayDua() {
        return tayDuaRepository.findAll()
                .stream()
                .peek(tayDua -> {
                    tayDua.getThanhVien().setDiaChi(null);
                    for (GiaiThuongTayDua giaiThuongTayDua : tayDua.getGiaiThuongTayDuas()){
                        giaiThuongTayDua.setTayDua(null);
                        giaiThuongTayDua.getGiaiThuong().setGiaiDua(null);
                        giaiThuongTayDua.getGiaiThuong().setHopDongTaiTro(null);
                        List<ThanhToanGiaiThuong> thanhToanGiaiThuongs = giaiThuongTayDua.getGiaiThuong().getThanhToanGiaiThuongs();
                        for(ThanhToanGiaiThuong thanhToanGiaiThuong : thanhToanGiaiThuongs){
                            thanhToanGiaiThuong.setGiaiThuong(null);
                        }
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public TayDua getTayDuaById(Long id) {
        TayDua tayDua = tayDuaRepository.findById(id).orElse(null);
        if(tayDua != null) {
            tayDua.getThanhVien().setDiaChi(null);
            for (GiaiThuongTayDua giaiThuongTayDua : tayDua.getGiaiThuongTayDuas()){
                giaiThuongTayDua.setTayDua(null);
                giaiThuongTayDua.getGiaiThuong().setGiaiDua(null);
                giaiThuongTayDua.getGiaiThuong().setHopDongTaiTro(null);
                List<ThanhToanGiaiThuong> thanhToanGiaiThuongs = giaiThuongTayDua.getGiaiThuong().getThanhToanGiaiThuongs();
                for(ThanhToanGiaiThuong thanhToanGiaiThuong : thanhToanGiaiThuongs){
                    thanhToanGiaiThuong.setGiaiThuong(null);
                }
            }
        }
        return tayDua;
    }

    @Override
    public List<TayDua> getAllTayDuaIdIfOwnGiaiThuongByGiaiDua(Long giaiDuaId) {
        List<TayDua> tayDuas = tayDuaRepository.findAll();
        return tayDuas.stream().filter(tayDua -> {
            List<GiaiThuongTayDua> giaiThuongTayDuas = tayDua.getGiaiThuongTayDuas();
            for (GiaiThuongTayDua giaiThuongTayDua : giaiThuongTayDuas){
                if (giaiThuongTayDua.getGiaiThuong().getGiaiDua().getId().equals(giaiDuaId)) {
                    return true;
                }
            }
            return false;
        }).peek(tayDua -> {
            tayDua.getThanhVien().setDiaChi(null);
            for (GiaiThuongTayDua giaiThuongTayDua : tayDua.getGiaiThuongTayDuas()){
                giaiThuongTayDua.setTayDua(null);
                giaiThuongTayDua.getGiaiThuong().getGiaiDua().setMuaGiai(null);
                giaiThuongTayDua.getGiaiThuong().getGiaiDua().setTinhThanh(null);
                giaiThuongTayDua.getGiaiThuong().setHopDongTaiTro(null);
                List<ThanhToanGiaiThuong> thanhToanGiaiThuongs = giaiThuongTayDua.getGiaiThuong().getThanhToanGiaiThuongs();
                for(ThanhToanGiaiThuong thanhToanGiaiThuong : thanhToanGiaiThuongs){
                    thanhToanGiaiThuong.setGiaiThuong(null);
                }
            }
        }).collect(Collectors.toList());
    }
}
