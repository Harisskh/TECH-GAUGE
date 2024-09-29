-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2024 at 01:34 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tech-gauge`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_akun`
--

CREATE TABLE `tbl_akun` (
  `id` int(11) NOT NULL,
  `email` varchar(35) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `role` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_akun`
--

INSERT INTO `tbl_akun` (`id`, `email`, `username`, `password`, `role`) VALUES
(1, 'user1@example.com', 'user1', 'pass1', 'admin'),
(2, 'user2@example.com', 'user2', 'pass2', 'user'),
(3, 'user3@example.com', 'user3', 'pass3', 'user'),
(4, 'user4@example.com', 'user4', 'pass4', 'moderator'),
(5, 'user5@example.com', 'user5', 'pass5', 'admin'),
(6, 'testuser@example.com', 'testuser', 'testuser123', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_brand`
--

CREATE TABLE `tbl_brand` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `processor_name` varchar(50) NOT NULL,
  `memory_name` varchar(50) NOT NULL,
  `ram_gb` int(20) NOT NULL,
  `battery_hours` int(20) NOT NULL,
  `storage_name` varchar(50) NOT NULL,
  `storage_gb` int(20) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `screensize_inch` float NOT NULL,
  `resolution_height_px` int(20) NOT NULL,
  `resolution_width_px` int(20) NOT NULL,
  `display_type` varchar(50) NOT NULL,
  `has_a_touch_screen_1_or_0` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_brand`
--

INSERT INTO `tbl_brand` (`id`, `name`, `brand`, `processor_name`, `memory_name`, `ram_gb`, `battery_hours`, `storage_name`, `storage_gb`, `display_name`, `screensize_inch`, `resolution_height_px`, `resolution_width_px`, `display_type`, `has_a_touch_screen_1_or_0`) VALUES
(1, 'Model A', 'BrandX', 'Intel i5', 'DDR4', 8, 10, 'SSD', 512, 'IPS', 15.6, 1080, 1920, 'LCD', 1),
(2, 'Model B', 'BrandY', 'Intel i7', 'DDR4', 16, 12, 'SSD', 256, 'OLED', 13.3, 1440, 2560, 'LED', 0),
(3, 'Model C', 'BrandZ', 'AMD Ryzen 5', 'DDR3', 12, 8, 'HDD', 1024, 'VA', 17.3, 720, 1280, 'LCD', 1),
(4, 'Model D', 'BrandX', 'Intel i3', 'DDR4', 4, 7, 'SSD', 128, 'IPS', 14, 900, 1600, 'LED', 0),
(6, 'Model B', 'BrandX', 'Intel i5', 'DDR4', 8, 10, 'SSD', 512, 'IPS', 15.6, 1080, 1920, 'LCD', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback`
--

CREATE TABLE `tbl_feedback` (
  `id` int(11) NOT NULL,
  `id_brand` int(11) NOT NULL,
  `id_akun` int(11) NOT NULL,
  `create_at` varchar(50) DEFAULT current_timestamp(),
  `rate` float NOT NULL,
  `review` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_feedback`
--

INSERT INTO `tbl_feedback` (`id`, `id_brand`, `id_akun`, `create_at`, `rate`, `review`) VALUES
(1, 1, 1, '2024-09-29 18:24:37', 3.5, 'Produk ini bagus, namun ada beberapa kekurangan di sisi performa.'),
(2, 2, 2, '2024-09-29 18:24:37', 4.5, 'Sangat memuaskan! Kualitas layar dan baterai sangat baik.'),
(3, 3, 3, '2024-09-29 18:24:37', 3.5, 'Laptop ini cukup baik, namun ada masalah pada kecepatan prosesornya.'),
(4, 1, 4, '2024-09-29 18:24:37', 4.5, 'Fitur-fiturnya lengkap dan nyaman digunakan untuk pekerjaan sehari-hari.'),
(5, 2, 4, '2024-09-29 18:24:37', 3.5, 'Desain menarik tapi daya tahan baterai kurang memuaskan.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_akun`
--
ALTER TABLE `tbl_akun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_brand`
--
ALTER TABLE `tbl_brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_akun`
--
ALTER TABLE `tbl_akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_brand`
--
ALTER TABLE `tbl_brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
