package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tblThanhToanHopDong")
@Data
public class ThanhToanHopDong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "thanhToanId", insertable = false, updatable = false)
    private ThanhToan thanhToan;

    @ManyToOne
    @JoinColumn(name = "hopDongTaiTroId", insertable = false, updatable = false)
    private HopDongTaiTro hopDongTaiTro;
}