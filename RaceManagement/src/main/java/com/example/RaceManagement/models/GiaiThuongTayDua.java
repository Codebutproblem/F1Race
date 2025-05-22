package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tblGiaiThuongTayDua")
@Data
public class GiaiThuongTayDua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "giaiThuongId", insertable = false, updatable = false)
    private GiaiThuong giaiThuong;

    @ManyToOne
    @JoinColumn(name = "tayDuaId", insertable = false, updatable = false)
    private TayDua tayDua;
}
