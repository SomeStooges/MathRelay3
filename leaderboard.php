<?php
	//Protection against premature entrance
	session_start();
	if(!isset($_SESSION['admin'])){
		header('location: index.php');
	}
	require 'server/utilities.php';
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Leaderboard </title>
		<meta charset="utf-8">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="/scripts/scripts_leaderboard.js"></script>
		<link rel="stylesheet" type="text/css" href="/styles/styles_leaderboard.css"/>
		<link href='http://fonts.googleapis.com/css?family=Advent+Pro:500' rel='stylesheet' type='text/css'/>
	</head>

	<body style="text-align:center">
		<div id='dataStore' style='display: none;'>
			<span id='cEvent'>
				<?php print getOption('event','currentEvent'); ?>
			</span>
		</div>
		<section>
			<h1> Leaderboard </h1>
			<div id='leaderboard' align = 'center'>
				<table id='leaderboardTable1'> </table>
				<table id='leaderboardTable2'> </table>
			</div>
			<!--<button id="back_button">BACK</button>-->
		</section>
	</body>
</html>
