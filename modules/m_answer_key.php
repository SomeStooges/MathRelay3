<!--Content for Answer Key tab-->
<?php
	require '../server/utilities.php';
	$choiceBank = array();
	$numQuestions = getOption('answerkey','numQuestion');
	$resource = db_Query("SELECT choice_1,choice_2,choice_3,choice_4,choice_5,choice_6 FROM answer_key ORDER BY series_number ASC, level_number ASC;");
	for($i=1;$i<=$numQuestions;$i++){
		$choiceBank[$i] = array();
		for($j=1;$j<=3;$j++){
			$tempObj = mysqli_fetch_object($resource);
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

	$correctKey = array();
	$resource = db_Query("SELECT correct_index FROM answer_key ORDER BY series_number ASC, level_number ASC;");
	for($i=1;$i<=$numQuestions;$i++){
		$correctKey[$i] = array();
		for($j=1;$j<=3;$j++){
			$tempRow = mysqli_fetch_row($resource);
			$correctKey[$i][$j] = $tempRow[0];
		}
	}

?>
<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="m_scripts/ms_answer_key.js"></script>
		<link rel="stylesheet" type="text/css" href="m_styles/mst_answer_key.css">
		<script type="text/javascript">
			var choiceBank = JSON.parse('<?php print json_encode($choiceBank) ?>');
			var answerKey = JSON.parse('<?php print json_encode($correctKey) ?>');
		</script>

	</head>
	<body id="body">
		<?php if(!function_exists('db_Query')){require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';} ?>
		<!-- Content for Answer Key tab -->
		<div id='questionDiv' class='answerKeyElement'>
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
		<div id='level3Div' class='answerKeyElement'>
			<b> Level 3 Answer </b>
			<table id='level3table'>
				<?php
					$numChoices = 6;
					$level = 3;
					for($i=1;$i<=6;$i++){
						print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values'></td>";
						print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>Select</button></td></tr>";
					}
				?>
			</table>
		</div>
		<div id='level2Div' class='answerKeyElement'>
			<b> Level 2 Answer </b>
			<table id='level2table'>
				<?php
					$level = 2;
					for($i=1;$i<=6;$i++){
						print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values'></td>";
						print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>Select</button></td></tr>";
					}
				?>
			</table>
		</div>
		<div id='level1Div' class='answerKeyElement'>
			<b> Level 1 Answer </b>
			<table id='level1table'>
				<?php
					$level = 1;
					for($i=1;$i<=6;$i++){
						print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values'></td>";
						print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>Select</button></td></tr>";
					}
				?>
			</table>
		</div>
		<div id='special_characters'>
			<button class='special_button' id='PiButton'>&#928</button>
			<button class='special_button' id='RadicalButton'>&#8730</button>
			<button class='special_button' id='InfinityButton'>&#8734</button>
		</div>
	</body>
</html>
