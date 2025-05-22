package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "tblGiaiDua")
@Data
public class GiaiDua {

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

    @Column(name = "moTa")
    private String moTa;

    @Column(name = "trangThai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "tinhThanhId", insertable = false, updatable = false)
    private TinhThanh tinhThanh;

    @ManyToOne
    @JoinColumn(name = "muaGiaiId", insertable = false, updatable = false)
    private MuaGiai muaGiai;
}