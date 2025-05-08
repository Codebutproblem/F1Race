package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.PhuongThucThanhToan;
import com.example.RaceManagement.service.PhuongThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pttt")
public class PhuongThucThanhToanRestController {

    @Autowired
    private PhuongThucThanhToanService phuongThucThanhToanService;

    @GetMapping
    public ResponseEntity<List<PhuongThucThanhToan>> getAllPhuongThucThanhToan() {
        return ResponseEntity.ok(phuongThucThanhToanService.getAllPhuongThucThanhToan());
    }
}
