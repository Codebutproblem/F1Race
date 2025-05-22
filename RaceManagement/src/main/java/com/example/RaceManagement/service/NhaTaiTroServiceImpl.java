package com.example.RaceManagement.service;

import com.example.RaceManagement.models.HopDongTaiTro;
import com.example.RaceManagement.models.NhaTaiTro;
import com.example.RaceManagement.repositories.HopDongTaiTroRepository;
import com.example.RaceManagement.repositories.NhaTaiTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhaTaiTroServiceImpl implements NhaTaiTroService{

    @Autowired
    private NhaTaiTroRepository nhaTaiTroRepository;

    @Autowired
    private HopDongTaiTroRepository hopDongTaiTroRepository;

    @Override
    public List<NhaTaiTro> getAllNhaTaiTro() {
        return nhaTaiTroRepository.findAll();
    }

    @Override
    public NhaTaiTro getNhaTaiTroById(Long id) {
        return nhaTaiTroRepository.findById(id).orElse(null);
    }

    @Override
    public NhaTaiTro createNhaTaiTro(NhaTaiTro nhaTaiTro) {
        return nhaTaiTroRepository.save(nhaTaiTro);
    }

    @Override
    public NhaTaiTro updateNhaTaiTro(Long id, NhaTaiTro nhaTaiTro) {
        NhaTaiTro existingNhaTaiTro = nhaTaiTroRepository.findById(id).orElse(null);
        if (existingNhaTaiTro != null) {
            if(nhaTaiTro.getDienThoai() != null) {
                existingNhaTaiTro.setDienThoai(nhaTaiTro.getDienThoai());
            }
            if(nhaTaiTro.getTen() != null) {
                existingNhaTaiTro.setTen(nhaTaiTro.getTen());
            }
            if(nhaTaiTro.getEmail() != null){
                existingNhaTaiTro.setEmail(nhaTaiTro.getEmail());
            }
            if(nhaTaiTro.getGhiChu() != null){
                existingNhaTaiTro.setGhiChu(nhaTaiTro.getGhiChu());
            }
            if(nhaTaiTro.getLinhVuc() != null){
                existingNhaTaiTro.setLinhVuc(nhaTaiTro.getLinhVuc());
            }
            if(nhaTaiTro.getDienThoai() != null){
                existingNhaTaiTro.setDienThoai(nhaTaiTro.getDienThoai());
            }
            if(nhaTaiTro.getTenNguoiDaiDien() != null){
                existingNhaTaiTro.setTenNguoiDaiDien(nhaTaiTro.getTenNguoiDaiDien());
            }
            return nhaTaiTroRepository.save(existingNhaTaiTro);
        }
        throw new IllegalArgumentException("Nha Tai Tro not found with id: " + id);
    }

    @Override
    public Boolean deleteNhaTaiTro(Long id) {
        if(nhaTaiTroRepository.existsById(id)){
            if(enableToDeleteNhaTaiTro(id)){
                nhaTaiTroRepository.deleteById(id);
                return true;
            }else{
                throw new IllegalArgumentException("Nha Tai Tro cannot be deleted because it has active contracts.");
            }
        }
        return false;
    }

    private boolean enableToDeleteNhaTaiTro(Long id) {
        List<HopDongTaiTro> hopDongTaiTroList = hopDongTaiTroRepository.findByNhaTaiTroId(id);
        if(hopDongTaiTroList != null && !hopDongTaiTroList.isEmpty()){
            for(HopDongTaiTro hopDongTaiTro : hopDongTaiTroList){
                if(hopDongTaiTro.getTrangThai().equals("completed")){
                    return false;
                }
            }
        }
        return true;
    }
}
