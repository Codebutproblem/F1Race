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
    @JoinColumn(name = "ThanhToanId", insertable = false, updatable = false)
    private ThanhToan thanhToan;

    @Column(name = "tblGiaiThuongId")
    private Long giaiThuongId;

    @ManyToOne
    @JoinColumn(name = "tblGiaiThuongId", insertable = false, updatable = false)
    private GiaiThuong giaiThuong;
}