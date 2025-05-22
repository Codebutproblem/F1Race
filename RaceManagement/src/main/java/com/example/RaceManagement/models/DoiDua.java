package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Table(name = "tblDoiDua")
@Data
public class DoiDua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100)
    private String ten;

    @Column(name = "moTa")
    private String moTa;

    @ManyToOne
    @JoinColumn(name = "tblQuanHuyenId", insertable = false, updatable = false)
    private QuanHuyen quanHuyen;

    @ManyToOne
    @JoinColumn(name = "taiKhoanNganHangId")
    private TaiKhoanNganHang taiKhoanNganHang;

    @OneToMany(mappedBy = "doiDua")
    private List<GiaiThuongDoiDua> giaiThuongDoiDuas;
}
