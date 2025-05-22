package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.NhaTaiTro;
import com.example.RaceManagement.service.NhaTaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ntt")
public class NhaTaiTroRestController {

    @Autowired
    private NhaTaiTroService nhaTaiTroService;

    @GetMapping
    public ResponseEntity<List<NhaTaiTro>> getAllNhaTaiTro() {
        return ResponseEntity.ok(nhaTaiTroService.getAllNhaTaiTro());
    }

    @PostMapping("/create")
    public ResponseEntity<NhaTaiTro> createNhaTaiTro(@RequestBody NhaTaiTro nhaTaiTro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nhaTaiTroService.createNhaTaiTro(nhaTaiTro));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<NhaTaiTro> updateNhaTaiTro(@PathVariable Long id, @RequestBody NhaTaiTro nhaTaiTro) {
        return ResponseEntity.ok(nhaTaiTroService.updateNhaTaiTro(id, nhaTaiTro));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhaTaiTro> getNhaTaiTroById(@PathVariable Long id) {
        NhaTaiTro nhaTaiTro = nhaTaiTroService.getNhaTaiTroById(id);
        if (nhaTaiTro != null) {
            return ResponseEntity.ok(nhaTaiTro);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNhaTaiTro(@PathVariable Long id) {
        boolean deleted = nhaTaiTroService.deleteNhaTaiTro(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
