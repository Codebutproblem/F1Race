package com.example.RaceManagement.controllers;

import com.example.RaceManagement.models.HopDongTaiTro;
import com.example.RaceManagement.service.HopDongTaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hdtt")
public class HopDongTaiTroRestController {


    @Autowired
    private HopDongTaiTroService hopDongTaiTroService;

    @GetMapping
    public ResponseEntity<List<HopDongTaiTro>> getAllHopDongTaiTro(){
        return ResponseEntity.ok(hopDongTaiTroService.getAllHopDongTaiTro());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HopDongTaiTro> getHopDongById(@PathVariable Long id){
        HopDongTaiTro hopDongTaiTro = hopDongTaiTroService.getHopDongTaiTroById(id);
        if(hopDongTaiTro != null){
            return ResponseEntity.ok(hopDongTaiTro);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ntt/{nhaTaiTroId}")
    public ResponseEntity<List<HopDongTaiTro>> getDsHopDongByNhaTaiTroId(@PathVariable Long nhaTaiTroId){
        return ResponseEntity.ok(hopDongTaiTroService.getDsHopDongByNhaTaiTroId(nhaTaiTroId));
    }

    @PostMapping("/create")
    public ResponseEntity<HopDongTaiTro> createHopDong(@RequestBody HopDongTaiTro hopDongTaiTro){
        return ResponseEntity.status(HttpStatus.CREATED).body(hopDongTaiTroService.createHopDongTaiTro(hopDongTaiTro));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHopDong(@PathVariable Long id){
        boolean deleted = hopDongTaiTroService.deleteHongDong(id);
        if(deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HopDongTaiTro> updateHopDong(@PathVariable Long id, @RequestBody HopDongTaiTro hopDongTaiTro){
        return ResponseEntity.ok(hopDongTaiTroService.updateHopDongTaiTro(id, hopDongTaiTro));
    }
}
