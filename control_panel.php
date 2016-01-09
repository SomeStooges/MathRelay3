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
		<link rel="stylesheet" type="text/css" href="Styles/control_panel.css">
	</head>
	<body id = "body">
		<div id = "ribbon1">
			<h1> Admin Control Panel </h1>
		</div>
		<div id = "ribbon2">
			<button class="ribbonButton" id="logoutButton">Logout</button>
			<button class="ribbonButton" id="none">None</button>
			<button class="ribbonButton" id="open">Open</button>
			<button class="ribbonButton" id="start">Start</button>
			<button class="ribbonButton" id="freeTime">Free Time</button>
			<button class="ribbonButton" id="freezeLeaderboard">Freeze Leaderboard</button>
			<button class="ribbonButton" id="stop">Stop</button>
			<button class="ribbonButton" id="close">Close</button>
			<div id="timer">
				<span>
				some time
				<!ENTER SOME setInterval(function,milliseconds) FUNCTION TO UPDATE TIMER>
				</span>
			</div>
		</div>
		<div id = "toolbar">
			
			<button class="toolbarButton" id="teamData">Display Team Data</button>
			<button class="toolbarButton" id="leaderboardLink">GO TO LEADERBOARD</button>
			<button class="toolbarButton" id="asnwerKey">Answer Key</button>
			<button class="toolbarButton" id="teamLog">Team Activity Log</button>
			<button class="toolbarButton" id="statistics">Statistics</button>
			<button class="toolbarButton" id="settings">Settings</button>
		</div>
		<div id = "content">
			<button id="reset_button">RESET</button>
			<p> Push the RESET button for a total system reset </p>
		</div>

		
		
		
	</body>
</html>
