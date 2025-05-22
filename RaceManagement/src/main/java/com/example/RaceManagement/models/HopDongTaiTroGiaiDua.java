package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "HopDongTaiTroGiaiDua")
@Data
public class HopDongTaiTroGiaiDua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "giaiDuaId", insertable = false, updatable = false)
    private GiaiDua giaiDua;

    @ManyToOne
    @JoinColumn(name = "hopDongTaiTroId", insertable = false, updatable = false)
    private HopDongTaiTro hopDongTaiTro;
}