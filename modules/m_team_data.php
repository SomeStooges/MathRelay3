<!-- Content for Team Data tab -->
<?php
	require '../server/utilities.php';
	$startTime = mysqli_fetch_object(db_Query("SELECT `value` FROM relay_options WHERE `name` = 'startTime'"));
	$startTime = $startTime->value;
 ?>
<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="/modules/m_scripts/ms_team_data.js"></script>
		<script type="text/javascript">
			var startTime = JSON.parse('<?php print json_encode($startTime) ?>');
		</script>
		<link rel="stylesheet" type="text/css" href="/modules/m_styles/mst_team_data.css">
	</head>
	<body>
		<?php
			if(!function_exists('db_Query')){
				require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';
			}

			$resource = db_Query("SELECT `team_id`,`team_nickname`,`password`,`points`,`rank_freetime`,`last_checkin_time`,`last_point`,`rank_final` FROM team_data;");
			$teamData = array();
			while($teamRow = mysqli_fetch_row($resource)){
				$teamData[] = $teamRow;
			}

			print "<table id='teamDataTable'>";
			print "<tr><th>Current Rank</th><th>Team ID</th><th>Team Nickname</th><th>Password</th><th>Points</th><th>Rank at Freetime</th><th>Last Point Time</th><th>Last Check-in Time</th></tr>";
			for($i=0;$i<count($teamData);$i++){
				print "<tr id='dataRow" . $i . "'>";
				$rank = $i + 1;
				print "<td> " . $rank . " </td>";
				for($j=0;$j<count($teamData[$i]);$j++){
					print "<td>" . $teamData[$i][$j] . "</td>";
				}
				print "</tr>";
			}
			print "</table>";
		?>

	</body>
</html>
