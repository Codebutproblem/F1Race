package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.LoaiTaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiTaiTroRepository extends JpaRepository<LoaiTaiTro, Long> {
}
