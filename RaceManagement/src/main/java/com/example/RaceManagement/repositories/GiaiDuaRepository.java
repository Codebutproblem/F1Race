package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.GiaiDua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiaiDuaRepository extends JpaRepository<GiaiDua, Long> {
}
