package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tblThanhToan")
@Data
public class ThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "soTien")
    private Integer soTien;

    @Column(name = "ngayThanhToan")
    @Temporal(TemporalType.DATE)
    private Date ngayThanhToan;

    @Column(name = "noiDung")
    private String noiDung;

    @Column(name = "tblPhuongThucThanhToanId")
    private Long phuongThucThanhToanId;

    @ManyToOne
    @JoinColumn(name = "tblPhuongThucThanhToanId", insertable = false, updatable = false)
    private PhuongThucThanhToan phuongThucThanhToan;
}
