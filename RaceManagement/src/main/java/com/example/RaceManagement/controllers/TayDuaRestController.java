package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.TayDua;
import com.example.RaceManagement.service.TayDuaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/td")
public class TayDuaRestController {

    @Autowired
    private TayDuaService tayDuaService;

    @GetMapping
    public ResponseEntity<List<TayDua>> getAllTayDua() {
        return ResponseEntity.ok(tayDuaService.getAllTayDua());
    }
}
