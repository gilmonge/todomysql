-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mariadbtodolist:3306
-- Generation Time: Jun 17, 2022 at 01:30 AM
-- Server version: 10.7.3-MariaDB-1:10.7.3+maria~focal
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `proc_category_create` (`var_id` INT(9), `var_name` VARCHAR(50))   BEGIN
        INSERT INTO `tbl_category_list` SET 
            `name` = var_name,
            `fk_user` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_category_delete` (`var_id` INT(9))   BEGIN
        DELETE FROM `tbl_items` 
        WHERE `fk_category_list` = var_id;

        DELETE FROM `tbl_category_list`
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_category_select_by_id` (`var_id` INT(9))   BEGIN
        SELECT * FROM `tbl_category_list`
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_category_select_by_user_id` (`var_id` INT(9))   BEGIN
        SELECT * FROM `tbl_category_list`
        WHERE `fk_user` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_category_update` (`var_id` INT(9), `var_name` VARCHAR(50))   BEGIN
        UPDATE `tbl_category_list` SET 
            `name` = var_name
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_item_create` (`var_id` INT(9), `var_title` VARCHAR(50), `var_detail` VARCHAR(100))   BEGIN
        INSERT INTO `tbl_items` SET 
            `title` = var_title,
            `detail` = var_detail,
            `status` = 0,
            `fk_category_list` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_item_delete` (`var_id` INT(9))   BEGIN
        DELETE FROM `tbl_items` 
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_item_select_by_category_id` (`var_id` INT(9))   BEGIN
        SELECT * FROM `tbl_items` 
        WHERE `fk_category_list` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_item_select_by_id` (`var_id` INT(9))   BEGIN
        SELECT * FROM `tbl_items` 
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_item_update` (`var_id` INT(9), `var_title` VARCHAR(50), `var_detail` VARCHAR(100), `var_status` CHAR(1))   BEGIN
        UPDATE `tbl_items` SET 
            `title` = var_title,
            `detail` = var_detail,
            `status` = var_status
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_profile_by_id` (`var_id` INT(9))   BEGIN
        SELECT * FROM `tbl_profile`
        WHERE `fk_user` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_user_by_email` (`email` VARCHAR(80))   BEGIN
        SELECT * FROM `tbl_user`
        WHERE `email` = email 
        LIMIT 1;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_user_create` (`var_email` VARCHAR(80), `var_password` VARCHAR(50), `var_token` VARCHAR(15), `var_firstName` VARCHAR(50), `var_lastName` VARCHAR(50), `var_dateOfBirth` DATE)   BEGIN
    INSERT INTO `tbl_user` SET 
        `email` = var_email,
        `password` = var_password,
        `token` = var_token;

    INSERT INTO `tbl_profile` SET
        `firstName` = var_firstName,
        `lastName` = var_lastName,
        `dateOfBirth` = var_dateOfBirth,
        `fk_user` = ( SELECT LAST_INSERT_ID() );
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_user_delete` (`var_id` INT(9))   BEGIN
        DELETE FROM `tbl_items` 
        WHERE `fk_category_list` IN (
            SELECT id FROM `tbl_category_list` WHERE `fk_user` = var_id
        );

        DELETE FROM `tbl_category_list`
        WHERE `fk_user` = var_id;

        DELETE FROM `tbl_profile`
        WHERE `fk_user` = var_id;

        DELETE FROM `tbl_user`
        WHERE `id` = var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_user_update` (`var_id` INT(9), `var_firstName` VARCHAR(50), `var_lastName` VARCHAR(50), `var_dateOfBirth` DATE)   BEGIN
        UPDATE `tbl_profile` SET 
            `firstName` = var_firstName,
            `lastName` = var_lastName,
            `dateOfBirth` = var_dateOfBirth
        WHERE `fk_user`=var_id;
    END$$

CREATE DEFINER=`root`@`%` PROCEDURE `proc_user_update_pass` (`var_id` INT(9), `var_password` VARCHAR(50), `var_token` VARCHAR(15))   BEGIN
    UPDATE `tbl_user` SET 
        `password`=var_password,
        `token`=var_token
    WHERE `id`=var_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category_list`
--

CREATE TABLE `tbl_category_list` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `fk_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_items`
--

CREATE TABLE `tbl_items` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `detail` varchar(100) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '0',
  `fk_category_list` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profile`
--

CREATE TABLE `tbl_profile` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `fk_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(50) NOT NULL,
  `token` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_category_list`
--
ALTER TABLE `tbl_category_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_category_list_tbl_user1_idx` (`fk_user`);

--
-- Indexes for table `tbl_items`
--
ALTER TABLE `tbl_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_items_tbl_category_list1_idx` (`fk_category_list`);

--
-- Indexes for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  ADD PRIMARY KEY (`id`,`fk_user`),
  ADD KEY `fk_tbl_profile_tbl_user1_idx` (`fk_user`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_category_list`
--
ALTER TABLE `tbl_category_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_items`
--
ALTER TABLE `tbl_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_category_list`
--
ALTER TABLE `tbl_category_list`
  ADD CONSTRAINT `fk_tbl_category_list_tbl_user1` FOREIGN KEY (`fk_user`) REFERENCES `tbl_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_items`
--
ALTER TABLE `tbl_items`
  ADD CONSTRAINT `fk_tbl_items_tbl_category_list1` FOREIGN KEY (`fk_category_list`) REFERENCES `tbl_category_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  ADD CONSTRAINT `fk_tbl_profile_tbl_user1` FOREIGN KEY (`fk_user`) REFERENCES `tbl_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
