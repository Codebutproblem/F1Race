package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tblTaiKhoanNganHang")
@Data
public class TaiKhoanNganHang {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "soTaiKhoan")
    private String soTaiKhoan;

    @Column(name = "tenNganHang")
    private String tenNganHang;
}
