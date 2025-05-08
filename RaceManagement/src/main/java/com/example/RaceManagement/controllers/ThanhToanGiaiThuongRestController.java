package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.ThanhToanGiaiThuong;
import com.example.RaceManagement.repositories.ThanhToanGiaiThuongRepository;
import com.example.RaceManagement.service.ThanhToanGiaiThuongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/ttgt")
public class ThanhToanGiaiThuongRestController {

    @Autowired
    private ThanhToanGiaiThuongService thanhToanGiaiThuongService;

    @PostMapping("/create")
    public ResponseEntity<ThanhToanGiaiThuong> createThanhToanGiaiThuong(@RequestBody ThanhToanGiaiThuong thanhToanGiaiThuong) {
        return ResponseEntity.status(CREATED).body(thanhToanGiaiThuongService.createThanhToanGiaiThuong(thanhToanGiaiThuong));
    }
}
