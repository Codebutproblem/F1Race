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

    @Column(name = "tblGiaiDuaId")
    private Long giaiDuaId;

    @ManyToOne
    @JoinColumn(name = "tblGiaiDuaId", insertable = false, updatable = false)
    private GiaiDua giaiDua;

    @ManyToOne
    @JoinColumn(name = "tblHopDongTaiTroId", insertable = false, updatable = false)
    private HopDongTaiTro hopDongTaiTro;
}