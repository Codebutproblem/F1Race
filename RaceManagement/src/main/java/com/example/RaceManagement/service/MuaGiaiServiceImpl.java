package com.example.RaceManagement.service;

import com.example.RaceManagement.models.MuaGiai;
import com.example.RaceManagement.repositories.MuaGiaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MuaGiaiServiceImpl implements MuaGiaiService{

    @Autowired
    private MuaGiaiRepository muaGiaiRepository;

    @Override
    public List<MuaGiai> getAllMuaGiai() {
        return muaGiaiRepository.findAll().stream().peek(muaGiai -> {
            muaGiai.setGiaiDuas(Collections.emptyList());
        }).collect(Collectors.toList());
    }

    @Override
    public MuaGiai getMuaGiaiById(Long id) {
        MuaGiai muaGiai = muaGiaiRepository.findById(id).orElse(null);
        if(muaGiai != null){
            muaGiai.setGiaiDuas(Collections.emptyList());
        }
        return muaGiai;
    }
}
