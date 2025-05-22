package com.example.RaceManagement.service;

import com.example.RaceManagement.models.DoiDua;
import com.example.RaceManagement.models.GiaiThuongDoiDua;
import com.example.RaceManagement.models.ThanhToanGiaiThuong;
import com.example.RaceManagement.repositories.DoiDuaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoiDuaServiceImpl implements DoiDuaService {

    @Autowired
    private DoiDuaRepository doiDuaRepository;

    @Override
    public List<DoiDua> getAllDoiDua() {
        return doiDuaRepository
                .findAll()
                .stream()
                .peek(doiDua -> {
                    doiDua.getQuanHuyen().getTinhThanh().setQuanHuyens(Collections.emptyList());
                    for (GiaiThuongDoiDua giaiThuongDoiDua : doiDua.getGiaiThuongDoiDuas()){
                        giaiThuongDoiDua.setDoiDua(null);
                        giaiThuongDoiDua.getGiaiThuong().setGiaiDua(null);
                        giaiThuongDoiDua.getGiaiThuong().setHopDongTaiTro(null);
                        List<ThanhToanGiaiThuong> thanhToanGiaiThuongs = giaiThuongDoiDua.getGiaiThuong().getThanhToanGiaiThuongs();
                        for(ThanhToanGiaiThuong thanhToanGiaiThuong : thanhToanGiaiThuongs){
                            thanhToanGiaiThuong.setGiaiThuong(null);
                        }
                    }
                }).collect(Collectors.toList());
    }

    @Override
    public List<DoiDua> getAllDoiDuaIdIfOwnGiaiThuongByGiaiDua(Long giaiDuaId) {
        List<DoiDua> doiDuas = doiDuaRepository.findAll();
        return doiDuas.stream().filter(doiDua -> {
            List<GiaiThuongDoiDua> giaiThuongDoiDuaList = doiDua.getGiaiThuongDoiDuas();
            for (GiaiThuongDoiDua giaiThuongDoiDua : giaiThuongDoiDuaList){
                if (giaiThuongDoiDua.getGiaiThuong().getGiaiDua().getId().equals(giaiDuaId)) {
                    return true;
                }
            }
            return false;
        }).peek(doiDua -> {
            doiDua.getQuanHuyen().getTinhThanh().setQuanHuyens(Collections.emptyList());
            for (GiaiThuongDoiDua giaiThuongDoiDua : doiDua.getGiaiThuongDoiDuas()){
                giaiThuongDoiDua.setDoiDua(null);
                giaiThuongDoiDua.getGiaiThuong().getGiaiDua().setMuaGiai(null);
                giaiThuongDoiDua.getGiaiThuong().getGiaiDua().setTinhThanh(null);
                giaiThuongDoiDua.getGiaiThuong().setHopDongTaiTro(null);
                List<ThanhToanGiaiThuong> thanhToanGiaiThuongs = giaiThuongDoiDua.getGiaiThuong().getThanhToanGiaiThuongs();
                for(ThanhToanGiaiThuong thanhToanGiaiThuong : thanhToanGiaiThuongs){
                    thanhToanGiaiThuong.setGiaiThuong(null);
                }
            }
        }).collect(Collectors.toList());
    }

    @Override
    public DoiDua getDoiDuaById(Long id) {
        DoiDua doiDua = doiDuaRepository.findById(id).orElse(null);
        if (doiDua != null) {
            doiDua.getQuanHuyen().getTinhThanh().setQuanHuyens(Collections.emptyList());
            doiDua.getQuanHuyen().getTinhThanh().setQuanHuyens(Collections.emptyList());
            for (GiaiThuongDoiDua giaiThuongDoiDua : doiDua.getGiaiThuongDoiDuas()){
                giaiThuongDoiDua.setDoiDua(null);
                giaiThuongDoiDua.getGiaiThuong().setGiaiDua(null);
                giaiThuongDoiDua.getGiaiThuong().setHopDongTaiTro(null);
                List<ThanhToanGiaiThuong> thanhToanGiaiThuongs = giaiThuongDoiDua.getGiaiThuong().getThanhToanGiaiThuongs();
                for(ThanhToanGiaiThuong thanhToanGiaiThuong : thanhToanGiaiThuongs){
                    thanhToanGiaiThuong.setGiaiThuong(null);
                }
            }
        }
        return doiDua;
    }
}
