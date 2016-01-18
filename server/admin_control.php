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
				$query .= "('$i','','$tempPass','0','0','0','0','0','$newhistory','$newhistory'), ";
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
		//Get admin password
		$adminPassword = $_REQUEST['adminPassword'];
		//query the database and process the return
		$num = mysqli_num_rows(db_Query("SELECT value FROM relay_options WHERE class='$adminPassword' AND value='$adminPassword'"));
		if($num){
			$_SESSION['admin'] = 'Santosh';
			$response = "Successful";
		} 
		else{
			$response = "Failed";
		}
		return $response;
	}
	
	function adminLogout(){
		unset($_SESSION['admin']);
		return true;
	}
	
	function getTeamData(){
		$resource = db_Query("SELECT team_id,team_nickname,password,points,rank_freetime,last_checkin_time,last_point FROM team_data;");
		$response = array();
		while($teamRow = mysqli_fetch_row($resource)){
			$response[] = $teamRow;
		}
		return $response;
	}
	
	function getAdminLog(){
		$teamID = $_REQUEST['teamID'];
		
		$resource = db_Query("SELECT * FROM admin_log WHERE team_id='$teamID';");
		$response = array();
		while($tempObj = mysqli_fetch_object($resource)){
			$response[] = $tempObj;
		}
		return $response;
	}
	
	function getAnswerKey(){
		$resource = db_Query("SELECT * FROM answer_key;");
		$response = array();
		while($teamRow = mysqli_fetch_row($resource)){
			$response[] = $teamRow;
		}
		return $response;
	}
	
	function setCleanupParagraph(){
		$fileName = "cleanupParagraph.txt";
		$myfile = fopen($fileName,'w');
		$text = $_REQUEST['paragraph'];
		fwrite($myfile,$text);
		$myfile = fopen($fileName,'r');
		$text = fread($myfile, filesize($fileName));
		fclose($myfile);
		return $text;
	}
	
	function getSettings(){
		$resource = db_Query("SELECT * FROM relay_options;");
		$response = array();
		while($teamRow = mysqli_fetch_row($resource)){
			$response[] = $teamRow;
		}
		return $response;
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'adminReset': $return = adminReset(); break;
		case 'adminLogin': $return = adminLogin(); break;
		case 'getOption': $return = getOption($_REQUEST['class'],$_REQUEST['name']); break;
		case 'getTeamData': $return = getTeamData(); break;
		case 'getAdminLog': $return = getAdminLog(); break;
		case 'getAnswerKey': $return = getAnswerKey(); break;
		case 'getSettings': $return = getSettings(); break;
		case 'adminLogout': $return = adminLogout(); break;
		case 'setCleanupParagraph': $return = setCleanupParagraph(); break;
	}
	print json_encode($return);
?>