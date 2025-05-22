package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tblTayDua")
@Data
public class TayDua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "namKinhNghiem")
    private Integer namKinhNghiem;

    @ManyToOne
    @JoinColumn(name = "thanhVienId", insertable = false, updatable = false)
    private ThanhVien thanhVien;

    @ManyToOne
    @JoinColumn(name = "taiKhoanNganHangId")
    private TaiKhoanNganHang taiKhoanNganHang;

    @OneToMany(mappedBy = "tayDua")
    private List<GiaiThuongTayDua> giaiThuongTayDuas;
}