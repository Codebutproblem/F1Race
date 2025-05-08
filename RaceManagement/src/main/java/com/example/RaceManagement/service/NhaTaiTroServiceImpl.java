package com.example.RaceManagement.service;

import com.example.RaceManagement.models.NhaTaiTro;
import com.example.RaceManagement.repositories.NhaTaiTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhaTaiTroServiceImpl implements NhaTaiTroService{

    @Autowired
    private NhaTaiTroRepository nhaTaiTroRepository;

    @Override
    public List<NhaTaiTro> getAllNhaTaiTro() {
        return nhaTaiTroRepository.findAll();
    }

    @Override
    public NhaTaiTro createNhaTaiTro(NhaTaiTro nhaTaiTro) {
        return nhaTaiTroRepository.save(nhaTaiTro);
    }

    @Override
    public Boolean deleteNhaTaiTro(Long id) {
        if(nhaTaiTroRepository.existsById(id)){
            nhaTaiTroRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
