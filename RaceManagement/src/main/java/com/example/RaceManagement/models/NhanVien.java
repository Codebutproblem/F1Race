package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tblNhanVien")
@Data
public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "viTri", length = 50)
    private String viTri;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password", length = 200)
    private String password;

    @OneToOne
    @JoinColumn(name = "tblThanhVienId", insertable = false, updatable = false)
    private ThanhVien thanhVien;
}