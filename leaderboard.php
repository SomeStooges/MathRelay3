<?php
	//Protection against premature entrance
	session_start();
	if(!isset($_SESSION['admin'])){
		header('location: index.php');
	}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Answer Sheet </title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/scripts_leaderboard.js"></script>
	</head>

	<body style="text-align:center">
		<h1> Leaderboard </h1>
		<p> <span id='leaderboardTable'> <i> Some table to display information in a fancy manner... </i> </span> </p>
		<button id="back_button">BACK</button>
	</body>
</html>