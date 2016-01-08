<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
	//FUNCTION DEFINITIONS
	function getEvent(){
		return 'open';
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
		return 'userLogout() called, success!';
	}
	function submitNickname() {
		/* 
		1. Needs to know which team id (manually enter nickname in to team id 1); will need to update with "get" function
		2. needs to know what nickname is being sent
		3. after PHP layer knows, tell database the nickname
		4. needs to tell javascript that the database received it*/
		$nickname = $_REQUEST['nickname'];
		$teamID = $_SESSION['teamID'];
		db_Query("UPDATE team_data SET team_nickname ='$nickname'  WHERE team_id='$teamID';");
		
		
		return $teamID;
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'getEvent': $return = getEvent(); break;
		case 'userLogin': $return = userLogin(); break;
		case 'userLogout': $return = userLogout(); break;
		case 'submitNickname': $return = submitNickname(); break;
	}
	print json_encode($return);
?>