<!--Content for Team Activity tab -->
<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="m_scripts/ms_team_activity.js"></script>
		<link rel="stylesheet" type="text/css" href="m_styles/mst_team_activity.css">

	</head>
	<body>
		<?php if(!function_exists('db_Query')){require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';} ?>
		<!-- Content for Team Activity log tab-->
		<b> Team ID </b> <button id='freezeButton'>Freeze Log</button>
		<table id='teamActivity'>
			<?php
				$numTeams = 50;
				for($i=1;$i<=$numTeams;$i++){
					print "<tr><td class='teamIDdiv'>";
					print $i;
					print "</td></tr>";
				}
			?>
		</table>
	</body>
</html>
