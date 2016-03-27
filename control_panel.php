<?php
	//Protection against premature entrance
	session_start();
	print $_SESSION['admin'];
	/*if(!isset($_SESSION['admin'])){
		header('location: index.php');
	}*/
	require 'server/utilities.php';
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Control Panel</title>
		<meta charset="utf-8">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="/scripts/scripts_control_panel.js"></script>
		<link rel="stylesheet" type="text/css" href="/styles/styles_control_panel.css">
		<link href='http://fonts.googleapis.com/css?family=Advent+Pro:500' rel='stylesheet' type='text/css'/>
	</head>

	<body>
		<div id='dataStore' style='display: none;'>
			<span id='cEvent'>
				<?php print getOption('event','currentEvent'); ?>
			</span>
			<span id='startTimeDiv'>
				<?php print getOption('event','startTime'); ?>
			</span>
			<span id='stopTimeDiv'>
				<?php print getOption('event','stopTime')?>
			</span>
		</div>

		<div id = 'everything'>
			<div id = "ribbon">
			<!-- The banner running across the top -->
				<div id = "ribbon1">
					<h1> Control Panel </h1>
				</div>
				<div id = "ribbon2">
					<button class="ribbonButton" id="none">None</button>
					<button class="ribbonButton" id="open">Open</button>
					<button class="ribbonButton" id="start">Start</button>
					<button class="ribbonButton" id="freetime">Free Time</button>
					<button class="ribbonButton" id="freezeLeaderboard">Freeze Leaderboard</button>
					<button class="ribbonButton" id="stop">Stop</button>
					<button class="ribbonButton" id="close">Close</button>
					<button class="ribbonButton" id="logoutButton">Logout</button>
					<button id="clear">Clear</button>
					<div id="timer">00:00:00</div>
				</div>
			</div>
			<div id = "toolbar">
			<!-- The box running down the left side -->
				<button class="toolbarButton" id="teamData">Teams</button>
				<button class="toolbarButton" id="leaderboardLink">Leaderboard</button>
				<button class="toolbarButton" id="answerKey">Answer Key</button>
				<button class="toolbarButton" id="teamLog">Activity</button>
				<button class="toolbarButton" id="statistics">Statistics</button>
				<button class="toolbarButton" id="settings">Settings</button>
				<button class="toolbarButton" id="printTeamData">Print Team Data</button>
			</div>
			<div id="container">
			<!-- Adds margin between content and toolbar and ribbon -->
				<div id = "content">
				<!-- Dynamic div for content of tabs to display -->
					<div id='mod1' style='display: block;' class='contentMod'>
						<iframe src='modules/m_team_data.php' class='iframeMod' id='iframe1'></iframe>
					</div>
					<!-- Tooltab 2 is missing because it is a hyperlink -->
					<div id='mod3' style='display: none;' class='contentMod'>
						<iframe src='modules/m_answer_key.php' class='iframeMod' id='iframe2'></iframe>
					</div>
					<div id='mod4' style='display: none;' class='contentMod'>
						<iframe src='modules/m_team_activity.php' class='iframeMod' id='iframe3'></iframe>
					</div>
					<div id='mod5' style='display: none;' class='contentMod'>
						<iframe src='modules/m_statistics.php' class='iframeMod' id='iframe4'></iframe>
					</div>
					<div id='mod6' style='display: none;' class='contentMod'>
						<iframe src='modules/m_settings.php' class='iframeMod' id='iframe5'></iframe>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
