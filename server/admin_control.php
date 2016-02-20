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

			setOption('event','startTime',0);
			setOption('event','stopTime',0);
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

	function getAnswerKey(){
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
		$p = json_encode($choiceBank) . "_+_" . json_encode($correctKey);
		return $p;
	}

	function getSettings(){
		$resource = db_Query("SELECT * FROM relay_options;");
		$response = array();
		while($teamRow = mysqli_fetch_row($resource)){
			$response[] = $teamRow;
		}
		return $response;
	}

	function getStatistics(){
		$resource;
		$response;
		return $response;
	}

	function updateAnswerKey(){
		$series = $_REQUEST['series'];
		$level = $_REQUEST['level'];
		$choice = $_REQUEST['choice'];
		$value = $_REQUEST['value'];
		db_Query("UPDATE answer_key SET `choice_$choice`='$value' WHERE `series_number`='$series' AND `level_number`='$level'");
		return true;
	}

	function setAnswer(){
		$series = $_REQUEST['series'];
		$level = $_REQUEST['level'];
		$choice = $_REQUEST['choice'];
		db_Query("UPDATE answer_key SET `correct_index`='$choice' WHERE `series_number`='$series' AND `level_number`='$level';");
		return true;
	}

	function updateEvent(){
		$newEvent = 'none';
		switch ($_REQUEST['uEvent']) {
			case 'none': $newEvent = 'none'; break;
			case 'open': $newEvent = 'open'; break;
			case 'start': $newEvent = 'start'; break;
			case 'freetime': $newEvent = 'freetime'; break;
			case 'freezeLeaderboard': $newEvent = 'freezeLeaderboard'; break;
			case 'stop': $newEvent = 'stop'; break;
			case 'close': $newEvent = 'close'; break;
		}
		db_Query("UPDATE relay_options SET value='$newEvent' WHERE class='event' AND name='currentEvent';");
		return $newEvent;
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
		case 'getTeamLog': $return = getTeamLog(); break;
		case 'getStatistics': $return = getStatistics(); break;
		case 'adminLogout': $return = adminLogout(); break;
		case 'setCleanupParagraph': $return = setCleanupParagraph(); break;
		case 'updateEvent': $return = updateEvent(); break;
		case 'updateAnswerKey': $return = updateAnswerKey(); break;
		case 'setAnswer': $return = setAnswer(); break;
	}
	print json_encode($return);
?>
