<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
	//FUNCTION DEFINITIONS
	
	//regenerates all the team data
	function adminReset() {
		//gets initial parameters
		$numTeams = getOption("reset","numTeams");
		$passwordLength = getOption("reset",'passwordLength');
		$numQuestions = getOption('answerkey','numQuestion');
		
		//clears old table
		db_Query('DELETE FROM team_data;');
		
		//creates the $newhistory string with enough characters for each question
		$newhistory = "";
		for($i = 0; $i<$numQuestions; $i++){ $newhistory .= "0;"; }
		$newhistory = substr( $newhistory, 0, strlen($newhistory)-1);
		
		if($numTeams >= 1){
			//creates the query statement for each team
			$query = "INSERT INTO team_data VALUES ";
			for( $i=1; $i<=$numTeams; $i++){
				$tempPass = makePassword($passwordLength);
				$query .= "('$i','','$tempPass','0','0','0','0','0','0','$newhistory'), ";
			}
			$query = substr( $query, 0, strlen($query)-2) . ";";
			
			//inserts the values
			db_Query($query);
		}		
		return "Regenerated all team data";
	}
	
	function makePassword($size){
		$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
		$length = strlen( $chars ) - 1;
		$out = '';
		for( $i=0; $i<$size; $i++){
			$out .= $chars[ rand( 0,$length ) ];
		}
		return $out;
	}
	
	function adminLogin() {
		return "The function 'adminLogin()' was called!";
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'adminReset': $return = adminReset(); break;
		case 'adminLogin': $return = adminLogin(); break;
		case 'getOption': $return = getOption($_REQUEST['class'],$_REQUEST['name']); break;
	}
	print json_encode($return);
?>