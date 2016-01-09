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
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="./scripts/scripts_control_panel.js"></script>
	</head>
	<body>
		<h1> Admin Control Panel </h1>
		<p> Push the RESET button for a total system reset </p>
		
		<button id="reset_button">RESET</button>
		<button id="leaderboardLink">GO TO LEADERBOARD</button>
		<p><button id="logoutButton">LOGOUT</button></p>
	</body>
</html>
