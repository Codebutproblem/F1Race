package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tblHopDongTaiTro")
@Data
public class HopDongTaiTro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ngayBatDau")
    @Temporal(TemporalType.DATE)
    private Date ngayBatDau;

    @Column(name = "ngayKetThuc")
    @Temporal(TemporalType.DATE)
    private Date ngayKetThuc;

    @Column(name = "giaTri")
    private Integer giaTri;

    @Column(name = "noiDung")
    private String noiDung;

    @Column(name = "trangThai", length = 50, nullable = true)
    private String trangThai;

    @Column(name = "ngayKy")
    @Temporal(TemporalType.DATE)
    private Date ngayKy;

    @Column(name = "tblLoaiTaiTroId")
    private Long loaiTaiTroId;

    @ManyToOne
    @JoinColumn(name = "tblLoaiTaiTroId", insertable = false, updatable = false)
    private LoaiTaiTro loaiTaiTro;

    @Column(name = "tblNhaTaiTroId")
    private Long nhaTaiTroId;

    @ManyToOne
    @JoinColumn(name = "tblNhaTaiTroId", insertable = false, updatable = false)
    private NhaTaiTro nhaTaiTro;
}