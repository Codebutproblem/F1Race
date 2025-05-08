package com.example.RaceManagement.service;

import com.example.RaceManagement.models.GiaiThuongTayDua;
import com.example.RaceManagement.models.TayDua;
import com.example.RaceManagement.repositories.TayDuaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                    for (GiaiThuongTayDua giaiThuongTayDua : tayDua.getGiaiThuongTayDuas()) {
                        giaiThuongTayDua.getGiaiThuong().getGiaiDua().setTinhThanh(null);
                        giaiThuongTayDua.getGiaiThuong().getGiaiDua().setMuaGiai(null);
                        giaiThuongTayDua.setTayDua(null);
                    }
                })
                .collect(Collectors.toList());
    }
}
