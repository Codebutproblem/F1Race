package com.example.RaceManagement.controllers;


import com.example.RaceManagement.models.DoiDua;
import com.example.RaceManagement.service.DoiDuaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dd")
public class DoiDuaRestController {

    @Autowired
    private DoiDuaService doiDuaService;

    @GetMapping
    public ResponseEntity<List<DoiDua>> getAllDoiDua(){
        return ResponseEntity.ok(doiDuaService.getAllDoiDua());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoiDua> getDoiDuaById(@PathVariable Long id) {
        DoiDua doiDua = doiDuaService.getDoiDuaById(id);
        if(doiDua == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(doiDua);
    }

    @GetMapping("/gd/{giaiDuaId}")
    public ResponseEntity<List<DoiDua>> getAllDoiDuaIdIfOwnGiaiThuongByGiaiDuaId(@PathVariable Long giaiDuaId) {
        return ResponseEntity.ok(doiDuaService.getAllDoiDuaIdIfOwnGiaiThuongByGiaiDua(giaiDuaId));
    }
}
