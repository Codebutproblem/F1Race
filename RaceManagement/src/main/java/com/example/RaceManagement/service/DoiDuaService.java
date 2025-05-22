package com.example.RaceManagement.service;

import com.example.RaceManagement.models.DoiDua;

import java.util.List;

public interface DoiDuaService {

    List<DoiDua> getAllDoiDua();

    List<DoiDua> getAllDoiDuaIdIfOwnGiaiThuongByGiaiDua(Long giaiDuaId);

    DoiDua getDoiDuaById(Long id);
}
