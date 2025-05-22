package com.example.RaceManagement.service;

import com.example.RaceManagement.models.TayDua;

import java.util.List;

public interface TayDuaService {

    List<TayDua> getAllTayDua();

    TayDua getTayDuaById(Long id);

    List<TayDua> getAllTayDuaIdIfOwnGiaiThuongByGiaiDua(Long giaiDuaId);
}
