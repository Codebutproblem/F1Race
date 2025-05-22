package com.example.RaceManagement.models;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "tblDiaChi")
@Data
public class DiaChi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "chiTiet")
    private String chiTiet;

    @Column(name = "ghiChu")
    private String ghiChu;

    @Column(name = "dienThoai", length = 20)
    private String dienThoai;

    @ManyToOne
    @JoinColumn(name = "quanHuyenId", insertable = false, updatable = false)
    private QuanHuyen quanHuyen;
}
