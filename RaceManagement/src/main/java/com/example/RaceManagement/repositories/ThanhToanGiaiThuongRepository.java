package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.ThanhToanGiaiThuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThanhToanGiaiThuongRepository extends JpaRepository<ThanhToanGiaiThuong, Long> {

}
