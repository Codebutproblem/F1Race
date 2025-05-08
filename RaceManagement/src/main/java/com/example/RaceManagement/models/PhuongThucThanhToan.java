package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tblPhuongThucThanhToan")
@Data
public class PhuongThucThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 50)
    private String ten;

    @Column(name = "moTa")
    private String moTa;

}