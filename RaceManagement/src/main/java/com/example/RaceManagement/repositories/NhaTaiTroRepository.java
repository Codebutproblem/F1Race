package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.NhaTaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaTaiTroRepository extends JpaRepository<NhaTaiTro, Long> {
}
