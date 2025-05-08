package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.GiaiThuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiaiThuongRepository extends JpaRepository<GiaiThuong, Long> {
}
