<?php
	//Protection against premature entrance
	session_start();
	if(!isset($_SESSION['teamID'])){
		header('location: index.php');
	}
	require 'server/utilities.php';
	/*$currentEvent = getOption('event','currentEvent');
	if($currentEvent == 'none'){
		header('location: index.php');
	} elseif($currentEvent != 'close'){
		header('location: answer_sheet.php');
	}*/
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Answer Sheet </title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/scripts_finish_page.js"></script>
	</head>

	<body>
		<h1> Finish Page </h1>
		<div style = "display: hidden" id = "congrats"> </div>
			<?php
				$team_ID = $_SESSION['teamID'];
				$teamRank = mysqli_fetch_row(db_Query("SELECT `rank_final` FROM `team_data` WHERE `team_id`='" . $team_ID . "';"));
				$teamRank = $teamRank[0];
					if($teamRank<20){
						if($teamRank>10 && $teamRank<20){
							$finalRank = $teamRank . "th";
							print "<span>Congratulations on finishing the Math Relay! You ranked " . $finalRank . "!</span>";

						}else{
							$temp = $teamRank%10;
							switch($temp){
								case 1:	$finalRank = $teamRank . "st"; break;
								case 2: $finalRank = $teamRank . "nd"; break;
								case 3: $finalRank = $teamRank . "rd"; break;
								default: $finalRank = $teamRank . "th"; break;
							}
							print "<span>Congratulations on finishing the Math Relay! You ranked " . $finalRank . "!</span>";
						}
					}else{
						print "<span>Congratulations on finishing the Math Relay! Thanks for participating!</span>";
					}
			 ?>
		<!-- We can probably run the PHP from here and not a JQUERY post, except to reject the page if too premature -->
		<p> <span id='rankMessage'><i>Some print out of rank or generic congratulation message </i></span></p>
		<p> <span id='cleanupParagraph'><i>Some large paragraph of instructions for the team captain.</i></span></p>
	</body>
</html>
