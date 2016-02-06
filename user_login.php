<?php
	require 'server/utilities.php';
	$currentEvent = getOption('event','currentEvent');
	/*if($currentEvent == 'none'){
		header('location: index.php');
	}*/
?>
<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/scripts_user_login.js"></script>
		<link rel="stylesheet" type="text/css" href="../MathRelay3/styles/user_login.css"/>
		<title>User Login</title>
	<head>

	<body style="text-align:center">
	<section>
		<h1> User Login </h1>
		<p> Enter login information below </p>
		<p> Team ID: <input type="text" name="teamID" placeholder="Enter Team ID" id='teamID'></p>
		<p> Team Password: <input type= "password" name="password" placeholder="Enter Password" id='teamPassword'></p>
		<button id="user_login"> Login </button>
		<p style="color: Red" id="passErr"></p>
		<button id="back_button"> BACK </button>
		<!-- <br> <?php print $currentEvent ?> -->
	</section>
	</body>
</html>
