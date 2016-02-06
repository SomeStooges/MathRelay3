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
		<link href='http://fonts.googleapis.com/css?family=Advent+Pro:500' rel='stylesheet' type='text/css'/>
		<title>User Login</title>
	<head>

	<body style="text-align:center">
	<section>
		<h1><span id="title"> User Login </span></h1>
		<p><span id="second"> Enter login information below</span></p>
		<p><span id="third"> Team ID: <input type="text" name="teamID" placeholder="Enter Team ID" id='teamID'></p>
		<p> Team Password: <input type= "password" name="password" placeholder="Enter Password" id='teamPassword'></span></p>
		<br>
		<p style="color: Red" id="passErr"></p>
		<button id="user_login"> Login </button>

		<button id="back_button"> BACK </button>
		<!-- <br> <?php print $currentEvent ?> -->
	</section>
	</body>
</html>
