package com.example.RaceManagement.service;

import com.example.RaceManagement.models.ThanhToan;
import com.example.RaceManagement.models.ThanhToanGiaiThuong;
import com.example.RaceManagement.repositories.ThanhToanGiaiThuongRepository;
import com.example.RaceManagement.repositories.ThanhToanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThanhToanGiaiThuongServiceImpl implements ThanhToanGiaiThuongService{

    @Autowired
    private ThanhToanGiaiThuongRepository thanhToanGiaiThuongRepository;

    @Autowired
    private ThanhToanRepository thanhToanRepository;

    @Override
    @Transactional
    public ThanhToanGiaiThuong createThanhToanGiaiThuong(ThanhToanGiaiThuong thanhToanGiaiThuong) {
        ThanhToan thanhToan = thanhToanGiaiThuong.getThanhToan();
        thanhToan = thanhToanRepository.save(thanhToan);
        thanhToanGiaiThuong.setThanhToan(thanhToan);
        return thanhToanGiaiThuongRepository.save(thanhToanGiaiThuong);
    }
}
