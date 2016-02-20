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
		<b> Leaderboard Display Option </b>
		<table>
			<tr><td>Show Team ID</td><td><input type='checkbox' id='showTeamID'></td></tr>
			<tr><td>Show Nickname</td><td><input type='checkbox' id='showNickname'></td></tr>
			<tr><td>Show Points</td><td><input type='checkbox' id='showPoints'></td></tr>
			<tr><td>Number of Teams to Show</td><td><input id='numTeamsShow'></td></tr>
		</table>
		<b> Reset Settings </b>
		<table>
			<tr><td>Number of Teams to Generate</td><td><input id='numTeamsGen'></td></tr>
			<tr><td>Number of Teams to Generate</td><td><input id='numTeamsGen'></td></tr>
		</table>
		<b> Test Settings </b>
		<table>
			<tr><td>Number of Questions</td><td><input id='numQuestions'></td></tr>
		</table>
		<b> Password Reset </b>
		<table>
			<tr><td>Old Admin Password: </td><td><input id='oldPassword'></td></tr>
			<tr><td>New Admin Password: </td><td><input id='newPassword'></td></tr>
			<tr><td>Repeat New Admin Password: </td><td><input id='repeatPassword'></td></tr>
		</table>
		<p> <button id="reset_button">RESET</button> Push RESET to clear all points, change passwords, and change the number of teams. </p>
		
	</body>
</html>
