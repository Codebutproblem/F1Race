package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tblNhaTaiTro")
@Data
public class NhaTaiTro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100)
    private String ten;

    @Column(name = "linhVuc", length = 100)
    private String linhVuc;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "dienThoai", length = 20)
    private String dienThoai;

    @Column(name = "ghiChu", length = 255, nullable = true)
    private String ghiChu;

    @Column(name = "tenNguoiDaiDien", length = 100)
    private String tenNguoiDaiDien;

}
