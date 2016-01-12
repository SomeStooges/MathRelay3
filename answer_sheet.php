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
	} elseif ($currentEvent == 'close'){
		header('location: finish_page.php');
	}*/
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Answer Sheet </title>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/scripts_answer_sheet.js"></script>
		<link rel="stylesheet" type="text/css" href="styles/styles_answer_sheet.css"></script>
	</head>

	<body>
		<div id="ribbon">
			<h1 id="page_title" style="text-align:center"> Answer Sheet </h1>
			<h1 id="nickname" style="text-align:center"></h1>
			<div>
			<p style="text-align:center"> 
				Edit nickname: <input id='nicknameInput' value="Enter a nickname">
				<button id = 'submitNickname'>SUBMIT</button>
			</p>
			<p> <button id='logoutButton'>LOGOUT</button></p>
			</div>
		</div>
		<p><i> Some GUI to enter series number and show answer history...</i></p>
		
		<p> Answer sheet for team. </p>

		<!-- Table for interactive question numbers -->
		<div id="content">
			<div id="questionGrid">
				<?php
					
					$numQuestions = getOption('answerkey','numQuestion');

					print "<table class='questions'>";
					print "<tr> <th class='questions' colspan='5'> Questions </th> </tr>";
						for ($countOut = 0; $countOut < ($numQuestions / 5); $countOut++) {
							print "<tr class='questions'>";
							for ($countIn = 1; $countIn <= 5; $countIn++) {

								$currentNum = $countIn + (5 * $countOut);

								if ($currentNum <= $numQuestions) {
									print "<td class='questions' id='q" . $currentNum . "'> " . $currentNum . " </td>";
								}	
							}
							print "</tr>"; 				
						}
					print "</table>";
				?>
			</div>
			<!-- 3 tables for answers -->
			<div id="answerChoices">
				<?php
					for ($count = 3; $count >= 1; $count--) {
						print "<table class='answer_sheet' id='level" . $count . "'>";
							print "<tr>";
								print "<th colspan='6' class='level_header' id='level" . $count . "'> Level " . $count . " </th>";
							print "</tr>";
							print "<tr>";
								print "<td id='a' class='answer_sheet' class='level" . $count . "'> A </td>";
								print "<td id='b' class='answer_sheet' class='level" . $count . "'> B </td>";
								print "<td id='c' class='answer_sheet' class='level" . $count . "'> C </td>";
								print "<td id='d' class='answer_sheet' class='level" . $count . "'> D </td>";
								print "<td id='e' class='answer_sheet' class='level" . $count . "'> E </td>";
								print "<td id='f' class='answer_sheet' class='level" . $count . "'> F </td>";
							print "</tr>";
						print "</table>";
					}
				?>
			</div>
			
			<button id="submit_answer"> SUBMIT </button>
		</div>
	</body>
</html>

