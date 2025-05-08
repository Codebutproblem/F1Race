package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.NhanVien;
import com.example.RaceManagement.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nv")
public class NhanVienRestController {

    @Autowired
    private NhanVienService nhanVienService;

    @PostMapping("/login")
    public ResponseEntity<NhanVien> checkLogin(@RequestParam String username, @RequestParam String password) {
        return nhanVienService.checkLogin(username, password)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
