package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.MuaGiai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MuaGiaiRepository extends JpaRepository<MuaGiai, Long> {
}
