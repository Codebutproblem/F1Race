package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tblGiaiThuong")
@Data
public class GiaiThuong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten", length = 100)
    private String ten;

    @Column(name = "giaTri")
    private Integer giaTri;

    @Column(name = "moTa")
    private String moTa;

    @Column(name = "doiTuongNhan", length = 100)
    private String doiTuongNhan;

    @ManyToOne
    @JoinColumn(name = "hopDongTaiTroId", insertable = false, updatable = false)
    private HopDongTaiTro hopDongTaiTro;


    @ManyToOne
    @JoinColumn(name = "giaiDuaId", insertable = false, updatable = false)
    private GiaiDua giaiDua;

    @OneToMany(mappedBy = "giaiThuong")
    private List<ThanhToanGiaiThuong> thanhToanGiaiThuongs;
}