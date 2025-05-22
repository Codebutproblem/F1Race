package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tblThanhToanGiaiThuong")
@Data
public class ThanhToanGiaiThuong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "thanhToanId")
    private ThanhToan thanhToan;

    @ManyToOne
    @JoinColumn(name = "giaiThuongId")
    private GiaiThuong giaiThuong;
}