package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tblQuanHuyen")
@Data
public class QuanHuyen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100, unique = true)
    private String ten;

    @Column(name = "moTa")
    private String moTa;

    @ManyToOne
    @JoinColumn(name = "tinhThanhId", insertable = false, updatable = false)
    private TinhThanh tinhThanh;
}