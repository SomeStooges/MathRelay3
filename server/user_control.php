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
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'getEvent': $return = getEvent(); break;
		case 'userLogin': $return = userLogin(); break;
		case 'userLogout': $return = userLogout(); break;
	}
	print json_encode($return);
?>