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
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="./scripts/scripts_control_panel.js">var something = "Hello world";</script>
		<link rel="stylesheet" type="text/css" href="Styles/styles_control_panel.css">
	</head>
	
	<body id = "body">
		<div id = "ribbon">
		<!-- The banner running across the top -->
			<div id = "ribbon1">
				<h1> Admin Control Panel </h1>
			</div>
			<div id = "ribbon2">
				<button class="ribbonButton" id="none">None</button>
				<button class="ribbonButton" id="open">Open</button>
				<button class="ribbonButton" id="start">Start</button>
				<button class="ribbonButton" id="freeTime">Free Time</button>
				<button class="ribbonButton" id="freezeLeaderboard">Freeze Leaderboard</button>
				<button class="ribbonButton" id="stop">Stop</button>
				<button class="ribbonButton" id="close">Close</button>
				<button class="ribbonButton" id="logoutButton">Logout</button>
				<div id="timer">00:00:00</div>				

			</div>
		</div>
		<div id = "toolbar">
		<!-- The box running down the left side -->
			<button class="toolbarButton" id="teamData">Display Team Data</button>
			<button class="toolbarButton" id="leaderboardLink">GO TO LEADERBOARD</button>
			<button class="toolbarButton" id="answerKey">Answer Key</button>
			<button class="toolbarButton" id="teamLog">Team Activity Log</button>
			<button class="toolbarButton" id="statistics">Statistics</button>
			<button class="toolbarButton" id="settings">Settings</button>
		</div>
		<div id="container">
		<!-- Adds margin between content and toolbar and ribbon -->
			<div id = "content">
			<!-- Dynamic div for content of tabs to display -->
			
				<div id='tooltab1' style='background-color: #CCFFFF'>
					<!-- Content for Team Data tab -->
					<?php
						$resource = db_Query("SELECT team_id,team_nickname,password,points,rank_freetime,last_checkin_time,last_point FROM team_data;");
						$teamData = array();
						while($teamRow = mysqli_fetch_row($resource)){
							$teamData[] = $teamRow;
						}
						
						print "<table id='teamDataTable'>";
						print "<tr><th>Team ID</th><th>Team Nickname</th><th>Password</th><th>Points</th><th>Rank at Freetime</th><th>Last Point Time</th><th>Last Check-in Time</th></tr>";
						for($i=0;$i<count($teamData);$i++){
							print "<tr>";
							for($j=0;$j<count($teamData[$i]);$j++){
								print "<td>" . $teamData[$i][$j] . "</td>";
							}
							print "</tr>";
						}
						print "</table>";
					?>
					<p> <button id="reset_button">RESET</button> Push RESET to clear all points, change passwords, and change the number of teams. </p>
				</div>

				<!-- Tooltab 2 is missing because it is a hyperlink -->
				
				<div id='tooltab3' style='background-color: #FFFFCC'>
					<!-- Content for Answer Key tab -->
					<div id='questionDiv'>
						<b> Question Number </b>
						<table id='questionTable'>
							<?php
								$numQuestions = getOption('answerkey','numQuestion');
								for ($countOut = 0; $countOut < ($numQuestions / 5); $countOut++) {
									print "<tr class='questions'>";
									for ($countIn = 1; $countIn <= 5; $countIn++) {
										$currentNum = $countIn + (5 * $countOut);
										if ($currentNum <= $numQuestions) {
											print "<td><button class='seriesNumbers' id='q" . $currentNum . "'> " . $currentNum . " </button></td>";
										}	
									}
								print "</tr>"; 				
								}	
							?>
						</table>
					</div>
					<div id='level3Div' class=''>
						<b> Level 3 Answer </b>
						<table id='level3table'>
							<?php
								$numChoices = 6;
								$level = 3;
								for($i=1;$i<=6;$i++){
									print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values' value='v".$level."_".$i."'<td>";
									print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>s".$level."_".$i."</button></tr>";
								}
							?>	
						</table>
					</div>
					<div id='level2Div' class=''>
						<b> Level 2 Answer </b>
						<table id='level2table'>
							<?php
								$level = 2;
								for($i=1;$i<=6;$i++){
									print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values' value='v".$level."_".$i."'<td>";
									print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>s".$level."_".$i."</button></tr>";
								}
							?>	
						</table>
					</div>
					<div id='level1Div' class=''>
						<b> Level 1 Answer </b>
						<table id='level1table'>
							<?php
								$level = 1;
								for($i=1;$i<=6;$i++){
									print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values' value='v".$level."_".$i."'<td>";
									print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>s".$level."_".$i."</button></tr>";
								}
							?>	
						</table>
					</div>
				</div>
				
				<div id='tooltab4' style='background-color: #CCFFFF'>
					<!-- Content for Team Activity log tab-->
				</div>
				
				<div id='tooltab5' style='background-color: #FFFFCC'>
					<!-- Content for statistics tab -->
				</div>
				
				<div id='tooltab6' style='background-color: #CCFFFF'>
					<!-- Content for settings tab -->
				</div>
			</div>
		</div>	
	</body>
</html>
