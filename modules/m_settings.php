<!-- Content for the Settings tab -->
<?php
	require '../server/utilities.php';
 ?>
<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="m_scripts/ms_settings.js"></script>
		<link rel="stylesheet" type="text/css" href="m_styles/mst_settings.css">
	</head>
	<body>
		<?php if(!function_exists('db_Query')){require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';} ?>
		<!-- Content for settings tab -->
		<div id='table1'>
			<b> Leaderboard Display Option </b>
			<table>
				<tr><td>Show Team ID</td><td><input type='checkbox' id='showTeamID' class='checkbox'></td></tr>
				<tr><td>Show Nickname</td><td><input type='checkbox' id='showNickname' class = 'checkbox'></td></tr>
				<tr><td>Show Points</td><td><input type='checkbox' id='showPoints' class = 'checkbox'></td></tr>
				<tr><td>Number of Teams to Show</td><td><input id='numTeamsShow'></td><td><button>Save</button></td><td><span id = 'a' style = 'color : green'></span></td></tr>
			</table>
		</div>
		<div id='table2'>
			<b> Password Reset </b>
			<table>
				<tr><td>Old Admin Password: </td><td><input type = 'password' id='oldPassword'><span id = 'checkPass'></span></td></tr>
				<tr><td>New Admin Password: </td><td><input type = 'password' id='newPassword'><span id = 'isNew'></span></td></tr>
				<tr><td>Repeat New Admin Password: </td><td><input type = 'password' id='repeatPassword'><span id = 'matchPass'></span></td></tr>
				<tr><td><button id = 'setAdminPass'>Submit New Password</button></td></tr>
			</table>
			<p id = 'passComplete'></p>
		</div>
		<div id='table3'>
			<b> Regeneration Settings (Note: These changes will not be applied unless the REGENERATE button is pressed!)</b>
			<table>
				<tr><td>Number of Teams to Generate:</td><td><input id='numTeamsGen'></td><td><button id = 'saveTeams'>Save</button></td><td><span style = "color: green" id = 's1'></span></td></tr>
				<tr><td>Number of Digits in Password to Generate:</td><td><input id='numDigPass'></td><td><button id = 'savePass'>Save</button></td><td><span style = "color: green" id = 's2'></span></td></tr>
			</table>
			<!-- <b> Test Settings </b>
			<table>
				<tr><td>Number of Questions</td><td><input id='numQuestions'></td></tr>
			</table> -->
			<br>
			<p> <button id="reset_button">REGENERATE</button> Push REGENERATE to clear all points, change passwords, and change the number of teams. </p>
		</div>
	</body>
</html>
