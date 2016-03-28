<!-- Content for the Settings tab -->
<?php
	require '../server/utilities.php';
 ?>
<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="../modules/m_scripts/ms_settings.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Advent+Pro:500' rel='stylesheet' type='text/css'/>
		<link rel="stylesheet" type="text/css" href="../modules/m_styles/mst_settings.css">
	</head>
	<body>
		<?php if(!function_exists('db_Query')){require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';} ?>
		<!-- Content for settings tab -->
		<div id='table1' class='optionblock'>
			<b> Leaderboard Display Option </b>
			<br><br>Number of Teams to Show:
			<br><input id='numTeamsShow'><br>
			<br><button class ='save'>Save</button><br>
			<span id = 'a' style = 'color : green'></span>
		</div>
		<div id='table2' class='optionblock'>
			<b> Password Reset </b>
			<table>
				<tr><td>Old Admin Password: </td><td><input type = 'password' id='oldPassword'></td><td><span id = 'checkPass'></span></td></tr>
				<tr><td>New Admin Password: </td><td><input type = 'password' id='newPassword'></td><td><span id = 'isNew'></span></td></tr>
				<tr><td>Repeat New Admin <br>Password: </td><td><input type = 'password' id='repeatPassword'></td><td><span id = 'matchPass'></span></td></tr>
				<tr></tr>
			</table>
			<div style='position: absolute; top: 70%;'>
				<button id = 'setAdminPass' style='float:left'>Submit New Password</button>
				<p id = 'passComplete' style='width: 70%; margin-left: 160px;'></p>
			</div>
		</div>
		<div id='table4' class='optionblock'>
			<b> Clean-Up Paragraph </b>
			<br><textarea id='cleanupParagraph' rows='6' cols='100' maxlength='500'><?php
					$fileName = '..\server\cleanupParagraph.txt';
					$myfile = fopen($fileName,'r');
					$text = fread($myfile, filesize($fileName));
					fclose($myfile);
					print $text;
				 ?></textarea>
			<br><span id='textarea_feedback'></span>
			<br><button id = 'saveCleanupParagraph' class='save'>Save</button>
		</div>
		<div id='table3' class='optionblock'>
			<b> Regeneration Settings </b>
			<p>(Note: These changes will not be applied unless the REGENERATE button is pressed!)</p>
			<table id='in'>
				<tr><td>Number of Teams <br>to Generate:</td><td><input id='numTeamsGen'></td><td><button id = 'saveTeams' class='save'>Save</button></td><td><span id = 's1'></span></td></tr>
				<tr><td></td><td><span id = 's3'></span></td></tr>
				<tr><td>Number of Digits in <br>Password to Generate:</td><td><input id='numDigPass'></td><td><button id = 'savePass' class='save'>Save</button></td><td><span id = 's2'></span></td></tr>
				<tr><td></td><td><span id = 's4'></span></td></tr>
			</table>
			<!-- <b> Test Settings </b>
			<table>
				<tr><td>Number of Questions</td><td><input id='numQuestions'></td></tr>
			</table> -->
			<div>
				<div style='float: left'>
					<button id="reset_button">REGENERATE</button>
				</div>
				<div style='margin-left: 160px;'>
					<p>Push REGENERATE to clear all points, change passwords, and change the number of teams. </p>
				</div>
			</div>
		</div>
	</body>
</html>
