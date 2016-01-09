<?php
	//Protection against premature entrance
	session_start();
	if(!isset($_SESSION['teamID'])){
		header('location: index.php');
	}
	/*require 'server/utilities.php';
	$currentEvent = getOption('event','currentEvent');
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
	</head>

	<body>
		<h1> Answer Sheet </h1>
		<h1 id="nickname"></h1>
		<p> 
			Enter nickname <input id='nicknameInput'>
			<button id = 'submitNickname'>SUBMIT</button>
		</p>
		
		
		<p> <i> Some GUI to enter answer inforamtion...</i></p>
		<p><i> Some GUI to enter series number and show answer history...</i></p>
		<p> <button id='logoutButton'>LOGOUT</button></p>
		<p> Answer sheet for team. </p>	
	</body>
</html>

