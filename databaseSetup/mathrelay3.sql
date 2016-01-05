-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2016 at 08:21 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mathrelay3`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_log`
--

CREATE TABLE IF NOT EXISTS `admin_log` (
  `team_id` int(8) NOT NULL,
  `series_number` int(8) NOT NULL,
  `answer_3` varchar(8) NOT NULL,
  `check_3` int(8) NOT NULL,
  `answer_2` varchar(8) NOT NULL,
  `check_2` int(8) NOT NULL,
  `answer_1` varchar(8) NOT NULL,
  `check_1` int(8) NOT NULL,
  `timestamp` bigint(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `answer_key`
--

CREATE TABLE IF NOT EXISTS `answer_key` (
  `series_number` int(8) NOT NULL,
  `level_number` int(8) NOT NULL,
  `answer` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `relay_options`
--

CREATE TABLE IF NOT EXISTS `relay_options` (
  `class` varchar(12) NOT NULL,
  `name` varchar(12) NOT NULL,
  `value` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `team_data`
--

CREATE TABLE IF NOT EXISTS `team_data` (
  `team_id` int(8) NOT NULL,
  `team_nickname` varchar(8) NOT NULL,
  `password` varchar(8) NOT NULL,
  `level_3` int(8) NOT NULL,
  `level_2` int(8) NOT NULL,
  `level_1` int(8) NOT NULL,
  `rank_freetime` int(8) NOT NULL,
  `last_checkin_time` int(18) NOT NULL,
  `last_point` int(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

CREATE TABLE IF NOT EXISTS `user_log` (
  `team_id` int(8) NOT NULL,
  `history` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
