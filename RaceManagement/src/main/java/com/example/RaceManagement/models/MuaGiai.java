package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tblMuaGiai")
@Data
public class MuaGiai {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100)
    private String ten;

    @Column(name = "ngayBatDau")
    @Temporal(TemporalType.DATE)
    private Date ngayBatDau;

    @Column(name = "ngayKetThuc")
    @Temporal(TemporalType.DATE)
    private Date ngayKetThuc;

    @Column(name = "nam")
    private Integer nam;

    @Column(name = "moTa")
    private String moTa;

    @OneToMany(mappedBy = "muaGiai")
    private List<GiaiDua> giaiDuas;
}