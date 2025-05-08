package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.HopDongTaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HopDongTaiTroRepository extends JpaRepository<HopDongTaiTro, Long> {
    List<HopDongTaiTro> findByNhaTaiTroId(Long nhaTaiTroId);
}
