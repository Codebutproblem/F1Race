package com.example.RaceManagement.service;

import com.example.RaceManagement.models.DoiDua;
import com.example.RaceManagement.models.GiaiThuongDoiDua;
import com.example.RaceManagement.repositories.DoiDuaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                    for(GiaiThuongDoiDua giaiThuongDoiDua: doiDua.getGiaiThuongDoiDuas()){
                        if(giaiThuongDoiDua.getGiaiThuong().getGiaiDua() != null){
                            giaiThuongDoiDua.getGiaiThuong().getGiaiDua().setTinhThanh(null);
                            giaiThuongDoiDua.getGiaiThuong().getGiaiDua().setMuaGiai(null);
                        }
                        giaiThuongDoiDua.setDoiDua(null);
                    }
                }).collect(Collectors.toList());
    }
}
