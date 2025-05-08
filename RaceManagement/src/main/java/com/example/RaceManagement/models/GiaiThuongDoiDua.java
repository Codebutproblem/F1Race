package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tblGiaiThuongDoiDua")
@Data
public class GiaiThuongDoiDua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tblGiaiThuongId", insertable = false, updatable = false)
    private GiaiThuong giaiThuong;

    @ManyToOne
    @JoinColumn(name = "tblDoiDuaId", insertable = false, updatable = false)
    private DoiDua doiDua;
}