-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2025 at 06:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `f1_management_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `hop_dong_tai_tro_giai_dua`
--

CREATE TABLE `hop_dong_tai_tro_giai_dua` (
  `id` bigint(20) NOT NULL,
  `tbl_giai_dua_id` bigint(20) DEFAULT NULL,
  `tbl_hop_dong_tai_tro_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dia_chi`
--

CREATE TABLE `tbl_dia_chi` (
  `id` bigint(20) NOT NULL,
  `chi_tiet` varchar(255) DEFAULT NULL,
  `dien_thoai` varchar(20) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `tbl_quan_huyen_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_doi_dua`
--

CREATE TABLE `tbl_doi_dua` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `tbl_quan_huyen_id` bigint(20) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_giai_dua`
--

CREATE TABLE `tbl_giai_dua` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `mua_giai_id` bigint(20) DEFAULT NULL,
  `ngay_bat_dau` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `tbl_tinh_thanh_id` bigint(20) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_giai_thuong`
--

CREATE TABLE `tbl_giai_thuong` (
  `id` bigint(20) NOT NULL,
  `toi_tuong_nhan` varchar(100) DEFAULT NULL,
  `gia_tri` int(11) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `te_tay_duatoi_thanh_vien_id` bigint(20) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `tbl_giai_dua_id` bigint(20) DEFAULT NULL,
  `tbl_hop_dong_tai_tro_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_giai_thuong_doi_dua`
--

CREATE TABLE `tbl_giai_thuong_doi_dua` (
  `id` bigint(20) NOT NULL,
  `tbl_doi_dua_id` bigint(20) DEFAULT NULL,
  `tbl_giai_thuong_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_giai_thuong_tay_dua`
--

CREATE TABLE `tbl_giai_thuong_tay_dua` (
  `id` bigint(20) NOT NULL,
  `tbl_giai_thuong_id` bigint(20) DEFAULT NULL,
  `tbl_tay_dua_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hop_dong_tai_tro`
--

CREATE TABLE `tbl_hop_dong_tai_tro` (
  `id` bigint(20) NOT NULL,
  `gia_tri` int(11) DEFAULT NULL,
  `ngay_bat_dau` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `ngay_ky` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT NULL,
  `tbl_loai_tai_tro_id` bigint(20) DEFAULT NULL,
  `tbl_nha_tai_tro_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_loai_tai_tro`
--

CREATE TABLE `tbl_loai_tai_tro` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mua_giai`
--

CREATE TABLE `tbl_mua_giai` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nam` int(11) DEFAULT NULL,
  `ngay_bat_dau` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nhan_vien`
--

CREATE TABLE `tbl_nhan_vien` (
  `id` bigint(20) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `vi_tri` varchar(50) DEFAULT NULL,
  `tbl_thanh_vien_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nha_tai_tro`
--

CREATE TABLE `tbl_nha_tai_tro` (
  `id` bigint(20) NOT NULL,
  `dien_thoai` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `linh_vuc` varchar(100) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `ten_nguoi_dai_dien` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_phuong_thuc_thanh_toan`
--

CREATE TABLE `tbl_phuong_thuc_thanh_toan` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ten` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quan_huyen`
--

CREATE TABLE `tbl_quan_huyen` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `tbl_tinh_thanh_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tay_dua`
--

CREATE TABLE `tbl_tay_dua` (
  `id` bigint(20) NOT NULL,
  `nam_kinh_nghiem` int(11) DEFAULT NULL,
  `tbl_thanh_vien_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_thanh_toan`
--

CREATE TABLE `tbl_thanh_toan` (
  `id` bigint(20) NOT NULL,
  `ngay_thanh_toan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `so_tien` int(11) DEFAULT NULL,
  `tbl_phuong_thuc_thanh_toan_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_thanh_toan_giai_thuong`
--

CREATE TABLE `tbl_thanh_toan_giai_thuong` (
  `id` bigint(20) NOT NULL,
  `tbl_giai_thuong_id` bigint(20) DEFAULT NULL,
  `thanh_toan_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_thanh_toan_hop_dong`
--

CREATE TABLE `tbl_thanh_toan_hop_dong` (
  `id` bigint(20) NOT NULL,
  `tbl_hop_dong_tai_tro_id` bigint(20) DEFAULT NULL,
  `tbl_thanh_toan_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_thanh_vien`
--

CREATE TABLE `tbl_thanh_vien` (
  `id` bigint(20) NOT NULL,
  `dien_thoai` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `tbl_dia_chi_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tinh_thanh`
--

CREATE TABLE `tbl_tinh_thanh` (
  `id` bigint(20) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hop_dong_tai_tro_giai_dua`
--
ALTER TABLE `hop_dong_tai_tro_giai_dua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKb90nkup2dm6pa3jvtqfi7ot1b` (`tbl_giai_dua_id`),
  ADD KEY `FKcxx71j8bd0mhirdo6xd3n25tu` (`tbl_hop_dong_tai_tro_id`);

--
-- Indexes for table `tbl_dia_chi`
--
ALTER TABLE `tbl_dia_chi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2f2iykhv18ekdim5ffhr91ags` (`tbl_quan_huyen_id`);

--
-- Indexes for table `tbl_doi_dua`
--
ALTER TABLE `tbl_doi_dua`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_giai_dua`
--
ALTER TABLE `tbl_giai_dua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1ov1mtl1vjxqxso42burvmjb5` (`mua_giai_id`),
  ADD KEY `FKh3ax4o1f72rm51hv2ls2rd5u2` (`tbl_tinh_thanh_id`);

--
-- Indexes for table `tbl_giai_thuong`
--
ALTER TABLE `tbl_giai_thuong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK505sxu57dfnkcv5a645nqde9v` (`tbl_giai_dua_id`),
  ADD KEY `FKih38yfvy9rsxhsiud2omcxsy3` (`tbl_hop_dong_tai_tro_id`);

--
-- Indexes for table `tbl_giai_thuong_doi_dua`
--
ALTER TABLE `tbl_giai_thuong_doi_dua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkemhhgemitvemlhqe4pc3u58k` (`tbl_doi_dua_id`),
  ADD KEY `FK1int2wumuid3d5gbr32lse7ht` (`tbl_giai_thuong_id`);

--
-- Indexes for table `tbl_giai_thuong_tay_dua`
--
ALTER TABLE `tbl_giai_thuong_tay_dua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7xh773knwmnw3t9uyoode5lk` (`tbl_giai_thuong_id`),
  ADD KEY `FKpe6n9xi905nila56eu6vl0smr` (`tbl_tay_dua_id`);

--
-- Indexes for table `tbl_hop_dong_tai_tro`
--
ALTER TABLE `tbl_hop_dong_tai_tro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmb0daywkg31vj3u946905gc0a` (`tbl_loai_tai_tro_id`),
  ADD KEY `FK2yb6mv5b24wjla07axivnydd2` (`tbl_nha_tai_tro_id`);

--
-- Indexes for table `tbl_loai_tai_tro`
--
ALTER TABLE `tbl_loai_tai_tro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_mua_giai`
--
ALTER TABLE `tbl_mua_giai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_nhan_vien`
--
ALTER TABLE `tbl_nhan_vien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKpe92cix3vx1aq7kj9wm7rpkx2` (`tbl_thanh_vien_id`);

--
-- Indexes for table `tbl_nha_tai_tro`
--
ALTER TABLE `tbl_nha_tai_tro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_phuong_thuc_thanh_toan`
--
ALTER TABLE `tbl_phuong_thuc_thanh_toan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_quan_huyen`
--
ALTER TABLE `tbl_quan_huyen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKlelbhx05qeu66aco7vsb7c2m5` (`ten`),
  ADD KEY `FK6m8jtg4h8gwftvnu1iy4ymtt` (`tbl_tinh_thanh_id`);

--
-- Indexes for table `tbl_tay_dua`
--
ALTER TABLE `tbl_tay_dua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjb9qpo9qun89hx8kkfu799ls3` (`tbl_thanh_vien_id`);

--
-- Indexes for table `tbl_thanh_toan`
--
ALTER TABLE `tbl_thanh_toan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK55upawxm98udmgyw379caafww` (`tbl_phuong_thuc_thanh_toan_id`);

--
-- Indexes for table `tbl_thanh_toan_giai_thuong`
--
ALTER TABLE `tbl_thanh_toan_giai_thuong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjf61o4lvghpyopax46n0cjdwc` (`tbl_giai_thuong_id`),
  ADD KEY `FKfca28ylp31gq15s1t3qi4f3rc` (`thanh_toan_id`);

--
-- Indexes for table `tbl_thanh_toan_hop_dong`
--
ALTER TABLE `tbl_thanh_toan_hop_dong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmj2il2mco2j2i4q57wyol4qwl` (`tbl_hop_dong_tai_tro_id`),
  ADD KEY `FK53q99quyb1kl4opprybttgmol` (`tbl_thanh_toan_id`);

--
-- Indexes for table `tbl_thanh_vien`
--
ALTER TABLE `tbl_thanh_vien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfhed112likr94obyfnww9wjkc` (`tbl_dia_chi_id`);

--
-- Indexes for table `tbl_tinh_thanh`
--
ALTER TABLE `tbl_tinh_thanh`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK3o1s8h2sqdhibnsyxv6wpr5x5` (`ten`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hop_dong_tai_tro_giai_dua`
--
ALTER TABLE `hop_dong_tai_tro_giai_dua`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_dia_chi`
--
ALTER TABLE `tbl_dia_chi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_doi_dua`
--
ALTER TABLE `tbl_doi_dua`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_giai_dua`
--
ALTER TABLE `tbl_giai_dua`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_giai_thuong`
--
ALTER TABLE `tbl_giai_thuong`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_giai_thuong_doi_dua`
--
ALTER TABLE `tbl_giai_thuong_doi_dua`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_giai_thuong_tay_dua`
--
ALTER TABLE `tbl_giai_thuong_tay_dua`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_hop_dong_tai_tro`
--
ALTER TABLE `tbl_hop_dong_tai_tro`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_loai_tai_tro`
--
ALTER TABLE `tbl_loai_tai_tro`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_mua_giai`
--
ALTER TABLE `tbl_mua_giai`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_nhan_vien`
--
ALTER TABLE `tbl_nhan_vien`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_nha_tai_tro`
--
ALTER TABLE `tbl_nha_tai_tro`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_phuong_thuc_thanh_toan`
--
ALTER TABLE `tbl_phuong_thuc_thanh_toan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_quan_huyen`
--
ALTER TABLE `tbl_quan_huyen`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tay_dua`
--
ALTER TABLE `tbl_tay_dua`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_thanh_toan`
--
ALTER TABLE `tbl_thanh_toan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_thanh_toan_giai_thuong`
--
ALTER TABLE `tbl_thanh_toan_giai_thuong`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_thanh_toan_hop_dong`
--
ALTER TABLE `tbl_thanh_toan_hop_dong`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_thanh_vien`
--
ALTER TABLE `tbl_thanh_vien`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tinh_thanh`
--
ALTER TABLE `tbl_tinh_thanh`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hop_dong_tai_tro_giai_dua`
--
ALTER TABLE `hop_dong_tai_tro_giai_dua`
  ADD CONSTRAINT `FKb90nkup2dm6pa3jvtqfi7ot1b` FOREIGN KEY (`tbl_giai_dua_id`) REFERENCES `tbl_giai_dua` (`id`),
  ADD CONSTRAINT `FKcxx71j8bd0mhirdo6xd3n25tu` FOREIGN KEY (`tbl_hop_dong_tai_tro_id`) REFERENCES `tbl_hop_dong_tai_tro` (`id`);

--
-- Constraints for table `tbl_dia_chi`
--
ALTER TABLE `tbl_dia_chi`
  ADD CONSTRAINT `FK2f2iykhv18ekdim5ffhr91ags` FOREIGN KEY (`tbl_quan_huyen_id`) REFERENCES `tbl_quan_huyen` (`id`);

--
-- Constraints for table `tbl_giai_dua`
--
ALTER TABLE `tbl_giai_dua`
  ADD CONSTRAINT `FK1ov1mtl1vjxqxso42burvmjb5` FOREIGN KEY (`mua_giai_id`) REFERENCES `tbl_mua_giai` (`id`),
  ADD CONSTRAINT `FKh3ax4o1f72rm51hv2ls2rd5u2` FOREIGN KEY (`tbl_tinh_thanh_id`) REFERENCES `tbl_tinh_thanh` (`id`);

--
-- Constraints for table `tbl_giai_thuong`
--
ALTER TABLE `tbl_giai_thuong`
  ADD CONSTRAINT `FK505sxu57dfnkcv5a645nqde9v` FOREIGN KEY (`tbl_giai_dua_id`) REFERENCES `tbl_giai_dua` (`id`),
  ADD CONSTRAINT `FKih38yfvy9rsxhsiud2omcxsy3` FOREIGN KEY (`tbl_hop_dong_tai_tro_id`) REFERENCES `tbl_hop_dong_tai_tro` (`id`);

--
-- Constraints for table `tbl_giai_thuong_doi_dua`
--
ALTER TABLE `tbl_giai_thuong_doi_dua`
  ADD CONSTRAINT `FK1int2wumuid3d5gbr32lse7ht` FOREIGN KEY (`tbl_giai_thuong_id`) REFERENCES `tbl_giai_thuong` (`id`),
  ADD CONSTRAINT `FKkemhhgemitvemlhqe4pc3u58k` FOREIGN KEY (`tbl_doi_dua_id`) REFERENCES `tbl_doi_dua` (`id`);

--
-- Constraints for table `tbl_giai_thuong_tay_dua`
--
ALTER TABLE `tbl_giai_thuong_tay_dua`
  ADD CONSTRAINT `FK7xh773knwmnw3t9uyoode5lk` FOREIGN KEY (`tbl_giai_thuong_id`) REFERENCES `tbl_giai_thuong` (`id`),
  ADD CONSTRAINT `FKpe6n9xi905nila56eu6vl0smr` FOREIGN KEY (`tbl_tay_dua_id`) REFERENCES `tbl_tay_dua` (`id`);

--
-- Constraints for table `tbl_hop_dong_tai_tro`
--
ALTER TABLE `tbl_hop_dong_tai_tro`
  ADD CONSTRAINT `FK2yb6mv5b24wjla07axivnydd2` FOREIGN KEY (`tbl_nha_tai_tro_id`) REFERENCES `tbl_nha_tai_tro` (`id`),
  ADD CONSTRAINT `FKmb0daywkg31vj3u946905gc0a` FOREIGN KEY (`tbl_loai_tai_tro_id`) REFERENCES `tbl_loai_tai_tro` (`id`);

--
-- Constraints for table `tbl_nhan_vien`
--
ALTER TABLE `tbl_nhan_vien`
  ADD CONSTRAINT `FK4oh44l5o899igub1a67dkem07` FOREIGN KEY (`tbl_thanh_vien_id`) REFERENCES `tbl_thanh_vien` (`id`);

--
-- Constraints for table `tbl_quan_huyen`
--
ALTER TABLE `tbl_quan_huyen`
  ADD CONSTRAINT `FK6m8jtg4h8gwftvnu1iy4ymtt` FOREIGN KEY (`tbl_tinh_thanh_id`) REFERENCES `tbl_tinh_thanh` (`id`);

--
-- Constraints for table `tbl_tay_dua`
--
ALTER TABLE `tbl_tay_dua`
  ADD CONSTRAINT `FKjb9qpo9qun89hx8kkfu799ls3` FOREIGN KEY (`tbl_thanh_vien_id`) REFERENCES `tbl_thanh_vien` (`id`);

--
-- Constraints for table `tbl_thanh_toan`
--
ALTER TABLE `tbl_thanh_toan`
  ADD CONSTRAINT `FK55upawxm98udmgyw379caafww` FOREIGN KEY (`tbl_phuong_thuc_thanh_toan_id`) REFERENCES `tbl_phuong_thuc_thanh_toan` (`id`);

--
-- Constraints for table `tbl_thanh_toan_giai_thuong`
--
ALTER TABLE `tbl_thanh_toan_giai_thuong`
  ADD CONSTRAINT `FKfca28ylp31gq15s1t3qi4f3rc` FOREIGN KEY (`thanh_toan_id`) REFERENCES `tbl_thanh_toan` (`id`),
  ADD CONSTRAINT `FKjf61o4lvghpyopax46n0cjdwc` FOREIGN KEY (`tbl_giai_thuong_id`) REFERENCES `tbl_giai_thuong` (`id`);

--
-- Constraints for table `tbl_thanh_toan_hop_dong`
--
ALTER TABLE `tbl_thanh_toan_hop_dong`
  ADD CONSTRAINT `FK53q99quyb1kl4opprybttgmol` FOREIGN KEY (`tbl_thanh_toan_id`) REFERENCES `tbl_thanh_toan` (`id`),
  ADD CONSTRAINT `FKmj2il2mco2j2i4q57wyol4qwl` FOREIGN KEY (`tbl_hop_dong_tai_tro_id`) REFERENCES `tbl_hop_dong_tai_tro` (`id`);

--
-- Constraints for table `tbl_thanh_vien`
--
ALTER TABLE `tbl_thanh_vien`
  ADD CONSTRAINT `FKfhed112likr94obyfnww9wjkc` FOREIGN KEY (`tbl_dia_chi_id`) REFERENCES `tbl_dia_chi` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
