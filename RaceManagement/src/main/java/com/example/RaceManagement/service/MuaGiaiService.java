package com.example.RaceManagement.service;

import com.example.RaceManagement.models.MuaGiai;

import java.util.List;

public interface MuaGiaiService {
    List<MuaGiai> getAllMuaGiai();
    MuaGiai getMuaGiaiById(Long id);
}
