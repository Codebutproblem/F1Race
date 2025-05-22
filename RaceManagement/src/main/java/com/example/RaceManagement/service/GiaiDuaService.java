package com.example.RaceManagement.service;

import com.example.RaceManagement.models.GiaiDua;

import java.util.List;

public interface GiaiDuaService {
    List<GiaiDua> getAllGiaiDua();
    List<GiaiDua> getGiaiDuasByMuaGiaiId(Long muaGiaiId);

    GiaiDua getGiaiDuaById(Long id);
}
