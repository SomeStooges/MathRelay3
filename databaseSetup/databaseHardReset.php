<?php
	//TO RUN THIS PAGE:
	//In the browser and with WAMPserver running, go to 'mathrelay3/databaseSetup/databaseHardReset.php'
	print "<h1> THIS PAGE RESETS YOUR DATABASE </h1>";
	print "<p>We hire only the best trolls to do our work, so give us a moment and their make sure everything is as good as new!<p>";

	$con = mysqli_connect('localhost','root','root','mathrelay3');
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
		`timestamp` varchar(35) NOT NULL,
		`question_number` int(8) NOT NULL,
		`award` int(8) NOT NULL,
		`total` int(8) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');

	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `answer_key` (
		  `series_number` int(8) NOT NULL,
		  `level_number` int(8) NOT NULL,
		  `correct_index` int(8) NOT NULL,
		  `choice_2` varchar(32) NOT NULL,
			`choice_1` varchar(32) NOT NULL,
		  `choice_3` varchar(32) NOT NULL,
		  `choice_4` varchar(32) NOT NULL,
		  `choice_5` varchar(32) NOT NULL,
		  `choice_6` varchar(32) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');

	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `relay_options` (
		  `class` varchar(12) NOT NULL,
		  `name` varchar(24) NOT NULL,
		  `value` varchar(20) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');

	mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `team_data` (
		  `team_id` int(8) NOT NULL,
		  `team_nickname` varchar(50) NOT NULL,
		  `password` varchar(8) NOT NULL,
		  `points` int(8) NOT NULL,
		  `rank_freetime` int(8) NOT NULL,
		  `last_checkin_time` int(18) NOT NULL,
		  `last_point` int(18) NOT NULL,
		  `rank_final` int(8) NOT NULL,
		  `history` varchar(150) NOT NULL,
		  `attempts` varchar(150) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;');

		mysqli_query($con, 'CREATE TABLE IF NOT EXISTS `stat_log` (
			  `team_id` int(8) NOT NULL,
			  `series_number` int(8) NOT NULL,
			  `level_3_result` int(8) NOT NULL,
			  `level_2_result` int(8) NOT NULL,
			  `level_1_result` int(8) NOT NULL,
			  `attempt` int(8) NOT NULL,
				`timesptamp` int(30) NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=latin1;');

	//Adds records to the tables, especially configuration infroatmion to relay_options.
	print "<p> Our wonderful trolls will even fill the database with some important information for the teams!</p>";
	mysqli_query($con, "INSERT INTO `team_data` (`team_id`, `team_nickname`, `password`, `points`, `rank_freetime`, `last_checkin_time`, `last_point`, `rank_final`, `history`,`attempts`) VALUES
		(1, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(2, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(3, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(4, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(5, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(6, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(7, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(8, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(9, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0'),
		(10, '', 'AAAAAA', 0, 0, 0, 0, 0, '0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0','0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0');");

	//ADDS RECORDS TO RELAY_OPTIONS
	print "<p> ...and those ever important relay options!";
	mysqli_query($con, "INSERT INTO `relay_options`(`class`, `name`, `value`) VALUES
	('event','currentEvent','none'),
	('event','startTime','0'),
	('event','stopTime','0'),
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
	('3','3','1','pi','2pi','4pi','5pi','7pi','10pi'),

	(4,1,3,3,191,130,-32,-20,-26), (4,2,3,149,60,-13,14,-23,16), (4,3,3,18,197,-3,48,138,173),
	(5,1,2,79,83,148,2,60,190), (5,2,1,199,43,170,192,14,-40), (5,3,4,119,-29,115,-36,14,-32),
	(6,1,6,77,-6,30,-20,156,53), (6,2,3,177,37,57,64,79,182), (6,3,2,-42,118,175,-9,10,98),
	(7,1,1,33,118,199,179,-13,56), (7,2,1,-16,98,-29,104,-16,-20), (7,3,5,145,137,129,-45,24,30),
	(8,1,6,196,48,124,65,8,145), (8,2,2,-38,166,121,132,93,66), (8,3,5,93,75,-16,51,99,150),
	(9,1,3,-10,-16,186,90,27,-38), (9,2,6,-50,90,117,-18,172,-15), (9,3,6,102,152,141,177,152,164),
	(10,1,4,129,122,108,80,102,132), (10,2,2,98,56,172,8,96,79), (10,3,4,136,129,131,188,39,125),
	(11,1,3,23,-10,141,39,108,139), (11,2,4,193,59,6,74,-31,120), (11,3,2,-26,-47,157,123,114,108),
	(12,1,6,42,170,17,1,25,199), (12,2,5,170,-29,129,71,32,153), (12,3,2,12,82,-31,39,53,187),
	(13,1,6,3,154,86,-28,88,150), (13,2,5,82,98,3,120,170,-38), (13,3,3,113,8,-13,-1,121,-3),
	(14,1,4,190,10,160,109,80,25), (14,2,5,191,7,31,-28,151,182), (14,3,2,46,170,190,113,136,50),
	(15,1,2,47,141,-26,176,193,86), (15,2,2,200,40,118,42,151,-43), (15,3,2,172,-10,188,162,62,54),
	(16,1,4,97,18,53,176,-38,-30), (16,2,3,44,33,-28,75,194,-44), (16,3,1,145,-9,6,-29,-7,179),
	(17,1,4,-48,-44,124,-46,-48,-5), (17,2,3,24,152,196,129,64,104), (17,3,2,48,-27,-11,50,195,24),
	(18,1,4,1,59,115,154,-43,8), (18,2,2,167,131,36,139,81,106), (18,3,2,-8,-48,94,167,-21,-41),
	(19,1,6,131,126,159,78,140,77), (19,2,1,122,63,109,-29,22,143), (19,3,5,71,115,-6,129,80,112),
	(20,1,4,39,179,99,111,124,171), (20,2,3,-15,29,-13,9,101,30), (20,3,6,-19,-50,25,185,36,151),
	(21,1,3,49,136,195,-36,-43,116), (21,2,6,81,-38,187,157,34,-6), (21,3,6,184,99,108,72,22,173),
	(22,1,1,183,40,29,174,-22,-21), (22,2,3,110,45,-43,59,96,94), (22,3,1,155,63,-40,123,126,64),
	(23,1,4,170,123,29,116,-26,168), (23,2,2,-49,27,160,198,199,199), (23,3,5,134,69,-23,-48,4,147),
	(24,1,1,176,112,145,-44,189,137), (24,2,5,15,15,134,118,152,55), (24,3,2,140,-17,81,139,175,2),
	(25,1,1,131,59,75,58,64,3), (25,2,6,182,117,93,-24,135,96), (25,3,3,165,66,180,181,127,-1),
	(26,1,6,-26,103,81,5,7,-39), (26,2,4,-18,-9,196,165,33,12), (26,3,6,88,-39,31,129,4,199),
	(27,1,5,190,189,48,29,93,37), (27,2,6,56,-44,76,181,174,22), (27,3,1,197,-31,159,188,44,153),
	(28,1,4,184,154,60,-16,-39,79), (28,2,5,33,172,-1,16,121,86), (28,3,1,112,-12,103,172,25,5),
	(29,1,2,157,-33,161,165,107,24), (29,2,3,132,76,158,-13,45,-7), (29,3,1,17,180,165,119,156,182),
	(30,1,2,-7,20,77,111,38,104), (30,2,2,120,89,22,11,102,105), (30,3,2,-28,-15,174,-41,170,75),
	(31,1,2,87,1,52,187,19,-10), (31,2,1,178,-3,36,6,65,140), (31,3,6,-31,59,188,14,38,-5),
	(32,1,2,119,15,86,94,124,83), (32,2,6,62,51,44,198,155,51), (32,3,4,15,-11,146,-8,81,58),
	(33,1,1,-37,-21,-23,90,48,173), (33,2,1,111,175,-4,-37,71,148), (33,3,6,139,118,149,3,135,26),
	(34,1,1,-17,192,195,75,189,179), (34,2,5,-16,78,87,26,139,-12), (34,3,3,112,94,131,11,51,29),
	(35,1,4,137,117,-1,80,153,-44), (35,2,6,184,176,96,137,114,198), (35,3,6,39,-46,87,-13,195,169),
	(36,1,4,162,33,91,59,-22,110), (36,2,6,1,85,104,29,29,6), (36,3,3,93,135,140,188,-42,185),
	(37,1,2,12,87,172,12,-28,65), (37,2,1,174,124,103,51,141,147), (37,3,3,53,188,94,77,-41,-38),
	(38,1,5,61,140,-11,108,199,85), (38,2,6,160,76,163,15,105,154), (38,3,4,187,125,18,59,-47,22),
	(39,1,5,-14,-37,-22,76,15,-9), (39,2,3,66,138,184,158,187,-31), (39,3,3,116,149,5,35,101,37),
	(40,1,4,116,168,65,27,-46,-5), (40,2,3,123,77,139,2,141,131), (40,3,2,-41,197,139,-32,149,33);
	");
	//Closes the connection
	print "<p> And now we'll close the connection and be on our way.</p>";
	mysqli_close($con);

	print "<p> You have a wonderful day sir and/or ma'am!</p>";
?>
