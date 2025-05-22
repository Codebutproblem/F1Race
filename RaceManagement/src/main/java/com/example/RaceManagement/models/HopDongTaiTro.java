package com.example.RaceManagement.models;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(timezone = "yyyy-MM-dd")
    @Column(name = "ngayBatDau")
    @Temporal(TemporalType.DATE)
    private Date ngayBatDau;

    @JsonFormat(timezone = "yyyy-MM-dd")
    @Column(name = "ngayKetThuc")
    @Temporal(TemporalType.DATE)
    private Date ngayKetThuc;

    @Column(name = "giaTri")
    private Integer giaTri;

    @Column(name = "noiDung")
    private String noiDung;

    @Column(name = "trangThai", length = 50)
    private String trangThai;

    @JsonFormat(timezone = "yyyy-MM-dd")
    @Column(name = "ngayKy")
    @Temporal(TemporalType.DATE)
    private Date ngayKy;

    @ManyToOne
    @JoinColumn(name = "loaiTaiTroId")
    private LoaiTaiTro loaiTaiTro;

    @ManyToOne
    @JoinColumn(name = "nhaTaiTroId")
    private NhaTaiTro nhaTaiTro;
}