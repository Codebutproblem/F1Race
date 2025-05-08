package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.LoaiTaiTro;
import com.example.RaceManagement.service.LoaiTaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ltt")
public class LoaiTaiTroController {

    @Autowired
    private LoaiTaiTroService loaiTaiTroService;


    @GetMapping
    public ResponseEntity<List<LoaiTaiTro>> getAllLoaiTaiTro() {
        return ResponseEntity.ok(loaiTaiTroService.getAllLoaiTaiTro());
    }
}
