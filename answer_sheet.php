<?php
	//Protection against premature entrance
	session_start();
	if(!isset($_SESSION['teamID'])){
		header('location: index.php');
	}
	require 'server/utilities.php';
	$checkEvent = mysqli_fetch_row(db_Query("SELECT `value` FROM `relay_options` WHERE `class`='event';"));
	switch($checkEvent[0]){
		case "close":	header('location: finish_page.php');break;
		case "open": $temp = "open"; //may delete later
	}
	if($checkEvent[0] == "close"){
		header('location: finish_page.php');
	}
	/*$currentEvent = getOption('event','currentEvent');
	if($currentEvent == 'none'){
		header('location: index.php');
	} elseif ($currentEvent == 'close'){
		header('location: finish_page.php');
	}*/
	$choiceBank = array();
	$numQuestions = getOption('answerkey','numQuestion');
	$resource = db_Query("SELECT choice_1,choice_2,choice_3,choice_4,choice_5,choice_6 FROM answer_key ORDER BY series_number ASC, level_number ASC;");
	for($i=1;$i<=$numQuestions;$i++){
		$choiceBank[$i] = array();
		for($j=1;$j<=3;$j++){
			$tempObj = mysqli_fetch_object($resource);
			//die(var_dump($tempObj));
			$choiceBank[$i][$j] = array(
				1 => $tempObj->choice_1,
				2 => $tempObj->choice_2,
				3 => $tempObj->choice_3,
				4 => $tempObj->choice_4,
				5 => $tempObj->choice_5,
				6 => $tempObj->choice_6
			);
		}
	}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Answer Sheet </title>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript">
			var choiceBank = JSON.parse('<?php print json_encode($choiceBank) ?>');
			var id = JSON.parse('<?php print json_encode($_SESSION['teamID']) ?>')
		</script>
		<script type="text/javascript" src="scripts/scripts_answer_sheet.js"></script>
		<link rel="stylesheet" type="text/css" href="styles/styles_answer_sheet.css"></script>
		<link href='http://fonts.googleapis.com/css?family=Advent+Pro:500' rel='stylesheet' type='text/css'/>
	</head>

	<body>
		<div id="everything">
			<div id="ribbon">
				<div id='logoutDiv'> <button id='logoutButton'>Logout</button></div>
				<h1 id='teamNumber'></h1>
				<div id="title">
					<p style="text-align:center">
						<input id='nicknameInput' maxlength="25" value="Answer Sheet">
					</p>
				</div>
				<div id='freetimeDiv'>Free Time!</div>
			</div>

			<!-- Table for interactive question numbers -->
			<div id="questionGrid">
				<div class='necessary2'>
					<div id='questions'>
					<h1>Questions</h1>
					<table id='series'>
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
				</div>
			</div>



				<!-- 3 tables for answers -->
			<div id="answerChoices" >
				<div class='necessary'>
					<div id='level3choice'class="answerLevel">
						<h1>Level 3</h1>
							<?php
								$numChoices = 6;
								$level = 3;
								for($i=1;$i<=6;$i++){
									print "<button id='c".$level."_".$i."' class='level".$level."Buttons'></button>";
								}
							?>
					</div>
					<div id='level2choice'class="answerLevel">
							<h1>Level 2</h1>
								<?php
									$level = 2;
									for($i=1;$i<=6;$i++){
										print "<button id='c".$level."_".$i."' class='level".$level."Buttons'></button>";
									}
								?>
					</div>
					<div id='level1choice'class="answerLevel">
						<h1>Level 1</h1>
							<?php
								$level = 1;
								for($i=1;$i<=6;$i++){
									print "<button id='c".$level."_".$i."' class='level".$level."Buttons'></button>";
								}
							?>
					</div>
				</div>
			</div>
			<div id='rightside'>
				<h1>Points: <span id='currentPoints'>0<!-- Should fix this to display the correct number of points of page initialization. --></span></h1>
				<!--<ul id='submit'>--><button id="submit_answer"> Submit </button>
			</div>
		</div>
	</body>
</html>
