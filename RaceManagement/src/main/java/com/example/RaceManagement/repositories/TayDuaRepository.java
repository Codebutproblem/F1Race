package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.TayDua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TayDuaRepository extends JpaRepository<TayDua, Long> {
}
