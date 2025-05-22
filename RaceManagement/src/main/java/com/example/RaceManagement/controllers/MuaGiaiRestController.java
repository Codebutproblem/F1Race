package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.MuaGiai;
import com.example.RaceManagement.service.MuaGiaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mg")
public class MuaGiaiRestController {

    @Autowired
    private MuaGiaiService muaGiaiService;

    @GetMapping
    public ResponseEntity<List<MuaGiai>> getAllMuaGiai() {
        return ResponseEntity.ok(muaGiaiService.getAllMuaGiai());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MuaGiai> getMuaGiaiById(@PathVariable Long id) {
        MuaGiai muaGiai = muaGiaiService.getMuaGiaiById(id);
        if(muaGiai == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(muaGiai);
    }
}
