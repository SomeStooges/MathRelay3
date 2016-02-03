<?php
	session_start();

	require 'utilities.php'; //imports some universal utilities

	//FUNCTION DEFINITIONS
	function getEvent(){
		return 'open';
	}

	function getCleanupParagraph(){
		$fileName = "cleanupParagraph.txt";
		if(file_exists($fileName)){
			$myfile = fopen($fileName,'r');
			$text = fread($myfile, filesize($fileName));
		} else {
			$myfile = fopen($fileName,'w');
			//default text if the file doesn't exist.
			$text = "Pay attention to the announcers for future directions.";
			fwrite($myfile,$text);
			$myfile = fopen($fileName,'r');
			$text = fread($myfile, filesize($fileName));
		}
		fclose($myfile);
		return $text;
	}

	function userLogin(){
		//Get the teamID and password
		$teamID = $_REQUEST['teamID'];
		$teamPassword = $_REQUEST['teamPassword'];
		//check to see if the teamID is possible

		//Query the database and process the return
		$num = mysqli_num_rows(db_Query("SELECT team_ID FROM team_data WHERE team_ID='$teamID' AND password='$teamPassword';"));
		if($num){
			$_SESSION['teamID'] = $teamID;
			$response = "Successful";
		}
		else{
			$response = "Failed";
		}
		return $response;
	}

	function userLogout(){
		unset($_SESSION['teamID']);
		return true;
	}
	function setNickname(){
		$nickname = $_REQUEST['nickname'];
		$teamID = $_SESSION['teamID'];
		db_Query("UPDATE team_data SET team_nickname ='$nickname'  WHERE team_id='$teamID';");

		return $teamID;
	}
	function getNickname(){
		$teamID = $_SESSION['teamID'];
	//	$num = mysqli_num_rows(db_Query("SELECT team_nickname FROM team_data WHERE team_ID='$team_ID'"));
		$nickname = mysqli_fetch_object(db_Query("SELECT team_nickname FROM team_data WHERE team_id = '$teamID';"));
		if($nickname) {
			$nickname = $nickname->team_nickname;
		}
		else{
			$nickname = false;
		}
		return $nickname;
	}
	function getPoints(){
		$teamID = $_SESSION['teamID'];
		$points = mysqli_fetch_object(db_Query("SELECT points FROM team_data WHERE team_id = '$teamID';"));
		if($points) {
			$points = $points->points;
		}
		else{
			$points = false;
		}
		return $points;
	}

	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'getEvent': 		$return = getEvent(); 	break;
		case 'userLogin':		$return = userLogin();	break;
		case 'userLogout':		$return = userLogout(); break;
		case 'setNickname':		$return = setNickname(); break;
		case 'getNickname':	$return = getNickname(); break;
		case 'getPoints':		$return = getPoints(); break;
		case 'getCleanupParagraph': $return = getCleanupParagraph(); break;
	}
	print json_encode($return);
?>
