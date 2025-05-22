package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.GiaiDua;
import com.example.RaceManagement.service.GiaiDuaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gd")
public class GiaiDuaRestController {

    @Autowired
    private GiaiDuaService giaiDuaService;

    @GetMapping
    public ResponseEntity<List<GiaiDua>> getAllGiaiDua() {
        return ResponseEntity.ok(giaiDuaService.getAllGiaiDua());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GiaiDua> getGiaiDuaById(@PathVariable Long id) {
        GiaiDua giaiDua = giaiDuaService.getGiaiDuaById(id);
        if (giaiDua == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(giaiDua);
    }

    @GetMapping("/mg/{id}")
    public ResponseEntity<List<GiaiDua>> getGiaiDuaByMuaGiaiId(@PathVariable Long id) {
        List<GiaiDua> giaiDuas = giaiDuaService.getGiaiDuasByMuaGiaiId(id);
        return ResponseEntity.ok(giaiDuas);
    }
}
