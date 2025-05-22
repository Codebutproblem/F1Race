package com.example.RaceManagement.models;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(timezone = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date ngayThanhToan;

    @Column(name = "noiDung")
    private String noiDung;

    @ManyToOne
    @JoinColumn(name = "phuongThucThanhToanId", insertable = false, updatable = false)
    private PhuongThucThanhToan phuongThucThanhToan;
}
