package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

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

    @Column(name = "moTa", length = 255, nullable = true)
    private String moTa;

    @Column(name = "trangThai")
    private Integer trangThai;

    @Column(name = "tblTinhThanhId")
    private Long tinhThanhId;

    @Column(name = "MuaGiaiId")
    private Long muaGiaiId;

    @ManyToOne
    @JoinColumn(name = "tblTinhThanhId", insertable = false, updatable = false)
    private TinhThanh tinhThanh;

    @ManyToOne
    @JoinColumn(name = "MuaGiaiId", insertable = false, updatable = false)
    private MuaGiai muaGiai;
}