package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tblTinhThanh")
@Data
public class TinhThanh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100, unique = true)
    private String ten;

    @Column(name = "moTa")
    private String moTa;

    @OneToMany(mappedBy = "tinhThanh")
    private List<QuanHuyen> quanHuyens;

}