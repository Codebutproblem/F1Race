package com.example.RaceManagement.service;

import com.example.RaceManagement.models.GiaiDua;
import com.example.RaceManagement.models.MuaGiai;
import com.example.RaceManagement.repositories.GiaiDuaRepository;
import com.example.RaceManagement.repositories.MuaGiaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class GiaiDuaServiceImpl implements GiaiDuaService{

    @Autowired
    private GiaiDuaRepository giaiDuaRepository;

    @Override
    public List<GiaiDua> getAllGiaiDua() {
        return giaiDuaRepository.findAll().stream().peek(giaiDua -> {
            giaiDua.getTinhThanh().setQuanHuyens(Collections.emptyList());
            giaiDua.getMuaGiai().setGiaiDuas(Collections.emptyList());
        }).collect(Collectors.toList());
    }

    @Override
    public List<GiaiDua> getGiaiDuasByMuaGiaiId(Long muaGiaiId) {
        return giaiDuaRepository.findAll()
                .stream()
                .filter(giaiDua -> giaiDua.getMuaGiai().getId().equals(muaGiaiId))
                .peek(giaiDua -> {
                    giaiDua.getTinhThanh().setQuanHuyens(Collections.emptyList());
                    giaiDua.getMuaGiai().setGiaiDuas(Collections.emptyList());
                })
                .collect(Collectors.toList());
    }

    @Override
    public GiaiDua getGiaiDuaById(Long id) {
        GiaiDua giaiDua = giaiDuaRepository.findById(id).orElse(null);
        if (giaiDua != null) {
            giaiDua.getTinhThanh().setQuanHuyens(Collections.emptyList());
            giaiDua.getMuaGiai().setGiaiDuas(Collections.emptyList());
        }
        return giaiDua;
    }
}
