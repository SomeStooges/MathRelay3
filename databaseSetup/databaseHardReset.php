<?php
	//TO RUN THIS PAGE:
	//In the browser and with WAMPserver running, go to 'mathrelay3/databaseSetup/databaseHardReset.php'
	print "<h1> THIS PAGE RESETS YOUR DATABASE </h1>";
	print "<p>We hire only the best trolls to do our work, so give us a moment and their make sure everything is as good as new!<p>";

	$con = mysqli_connect('localhost','root','','mathrelay3');
	if(!$con){
		print "<br> <h1>Our trolls don't know where to look for that database!</h1>";
		print "<br> Make sure that you have a database called EXACTLY 'mathrelay3' by checking the under the 'Database' tab of 'localhost/phpmyadmin'";
		print "<br> Refresh this page once that's been done.";
		mysqli_close($con);
		die();
	}
	
	//DROP ALL TABLES THAT ARE USED IN THE PROGRAM
	print "<p> We connected to the database, so the trolls will clear all relevant tables from the old one!</p>";
	mysqli_query($con, 'DROP TABLE admin_log,answer_key,relay_options,team_data,user_log');
	
	
	//RECREATE ALL THE TABLES THAT ARE USED IN THE PROGRAM
	print "<p> Now that everything's clear, we'll build the new tables! </p>";
	mysqli_query($con, 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";');
	mysqli_query($con, 'SET time_zone = "+00:00";');
	
	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `admin_log` (
		`team_id` int(8) NOT NULL,
		`series_number` int(8) NOT NULL,
		`answer_3` varchar(8) NOT NULL,
		`check_3` int(8) NOT NULL,
		`answer_2` varchar(8) NOT NULL,
		`check_2` int(8) NOT NULL,
		`answer_1` varchar(8) NOT NULL,
		`check_1` int(8) NOT NULL,
		`timestamp` varchar(35) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');
	
	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `answer_key` (
		  `series_number` int(8) NOT NULL,
		  `level_number` int(8) NOT NULL,
		  `correct_index` int(8) NOT NULL,
		  `choice_1` varchar(16) NOT NULL,
		  `choice_2` varchar(16) NOT NULL,
		  `choice_3` varchar(16) NOT NULL,
		  `choice_4` varchar(16) NOT NULL,
		  `choice_5` varchar(16) NOT NULL,
		  `choice_6` varchar(16) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');
	
	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `relay_options` (
		  `class` varchar(12) NOT NULL,
		  `name` varchar(24) NOT NULL,
		  `value` varchar(12) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');
	
	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `team_data` (
		  `team_id` int(8) NOT NULL,
		  `team_nickname` varchar(50) NOT NULL,
		  `password` varchar(8) NOT NULL,
		  `points` int(8) NOT NULL,
		  `rank_freetime` int(8) NOT NULL,
		  `last_checkin_time` int(18) NOT NULL,
		  `last_point` int(18) NOT NULL,
		  `history` varchar(150) NOT NULL,
		  `attempts` varchar(150) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');
	
	//Adds records to the tables, especially configuration infroatmion to relay_options.
	print "<p> Our wonderful trolls will even fill the database with some important information for the teams!</p>";
	mysqli_query($con, "INSERT INTO `team_data` (`team_id`, `team_nickname`, `password`, `points`, `rank_freetime`, `last_checkin_time`, `last_point`, `history`,`attempts`) VALUES
		(1, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(2, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(3, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(4, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(5, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(6, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(7, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(8, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(9, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(10, '', 'AAAAAA', 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0');");
	
	//ADDS RECORDS TO RELAY_OPTIONS
	print "<p> ...and those ever important relay options!";
	mysqli_query($con, "INSERT INTO `relay_options`(`class`, `name`, `value`) VALUES 
	('event','currentEvent','none'),
	('admin','adminPassword','admin'),
	('admin','adminLastAction','0'),
	('display','idColumn','false'),
	('display','nicknameColumn','true'),
	('display','totalPoints','false'),
	('display','level3PointsColumn','true'),
	('display','level2PointsColumn','true'),
	('display','level1PointsColumn','true'),
	('display','numTeams','7'),
	('reset','numTeams','10'),
	('reset','passwordLength','6'),
	('answerkey','numQuestion','40');
	");
	
	mysqli_query($con, "INSERT INTO `answer_key`(`series_number`, `level_number`, `correct_index`, `choice_1`,`choice_2`,`choice_3`,`choice_4`,`choice_5`,`choice_6`) VALUES
	('1','1','1','A','A','A','A','A','A'),
	('1','2','1','B','B','B','B','B','B'),
	('1','3','1','C','C','C','C','C','C'),
	('2','1','1','A','B','C','D','E','F'),
	('2','2','1','G','H','I','J','K','L'),
	('2','3','1','M','N','O','P','Q','R'),
	('3','1','1','-17','-6','1','12','35','100'),
	('3','2','1','Linear','Quadratic','Cubic','Logrithmic','Exponential','Differential'),
	('3','3','1','pi','2pi','4pi','5pi','7pi','10pi');
	");
	//Closes the connection
	print "<p> And now we'll close the connection and be on our way.</p>";
	mysqli_close($con);
	
	print "<p> You have a wonderful day sir and/or ma'am!</p>";
?>