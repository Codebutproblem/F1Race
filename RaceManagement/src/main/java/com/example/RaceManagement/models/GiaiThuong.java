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

    @Column(name = "moTa", length = 255, nullable = true)
    private String moTa;

    @Column(name = "teTayDuatoiThanhVienId")
    private Long tayDuatoiThanhVienId;

    @Column(name = "toiTuongNhan", length = 100)
    private String doiTuongNhan;

    @Column(name = "tblHopDongTaiTroId")
    private Long hopDongTaiTroId;

    @ManyToOne
    @JoinColumn(name = "tblHopDongTaiTroId", insertable = false, updatable = false)
    private HopDongTaiTro hopDongTaiTro;


    @Column(name = "tblGiaiDuaId")
    private Long giaiDuaId;

    @ManyToOne
    @JoinColumn(name = "tblGiaiDuaId", insertable = false, updatable = false)
    private GiaiDua giaiDua;
}