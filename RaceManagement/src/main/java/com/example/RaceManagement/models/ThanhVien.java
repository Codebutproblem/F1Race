package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "tblThanhVien")
@Data
public class ThanhVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100)
    private String ten;

    @Column(name = "ngaySinh")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "dienThoai", length = 20)
    private String dienThoai;

    @Column(name = "ghiChu")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "tblDiaChiId", insertable = false, updatable = false)
    private DiaChi diaChi;
}
