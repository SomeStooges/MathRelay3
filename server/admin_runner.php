<?php
	session_start();

	require 'utilities.php'; //imports some universal utilities

	function updateLeaderboard(){
		//GEts the display settings and packs them in an object array
/*		$resource = db_Query("SELECT name,value FROM relay_options WHERE class='display';");
		$settings = array();
		while( $tempObj = mysqli_fetch_object($resource) ){
			$settings[] = $tempObj;
		}

		//Translates the object array into and SQL query to get the correct columns
		$getValues = "";
		$totalPoints = false;	//currently does nothing
		foreach($settings as $tempObj){
			if($tempObj->value == "true"){
				switch($tempObj->name){
					case 'idColumn': $getValues .= "team_id, "; break;
					case 'nicknameColumn':$getValues .= "team_nickname, "; break;
					case 'totalPoints': $totalPoints = true;	//currently does nothing
					case 'level3PointsColumn': $getValues .= "level_3, "; break;
					case 'level2PointsColumn': $getValues .= "level_2, "; break;
					case 'level1PointsColumn': $getValues .= "level_1, "; break;
				}
			}
		}
		$getValues = substr($getValues,0,strlen($getValues)-2);	//clips off trailing ', ' to correct for SQL
*/
		//Query the database for the number of teams to fetch
		$numTeams = getOption('display','numTeams');//= getOption("display","numTeams"); for right now

		//Query the databse for the selected columns from team_data
		//if($getValues != ""){ //checks that at least one column was selected
			$resource = db_Query("SELECT `team_nickname`,`points`,`team_id` FROM team_data ORDER BY `points` DESC, `last_point` ASC LIMIT $numTeams;");
			$retfield = array();
			while( $tempObj = mysqli_fetch_row($resource) ){
				if($tempObj[0] == ""){
					$tempObj[0] = '<i>Team ' . $tempObj[2] . '</i>';
				}
				//unset($tempObj[2]);
				$retField[] = $tempObj;
			}
	//	}
		//return the object array containing the leading teams' data
		return $retField;
	}

	function getTeamLog(){
		$lastUp = $_REQUEST['lastUp'];	//The latest time that the computer currently has
		$resource = db_Query("SELECT * FROM admin_log WHERE `timestamp` > $lastUp ORDER BY `timestamp` ASC;");
		$return = array();
		while($row = mysqli_fetch_row($resource)){
			$return[] = $row;
		}
		return $return;
	}

	function setStartTime(){
		$startTime = $_REQUEST['startTime'];
		$resource = db_Query("UPDATE `relay_options` SET `value` = '$startTime' WHERE `name` = 'startTime'");
	}

	function setStopTime(){
		$stopTime = $_REQUEST['stopTime'];
		$resource = db_Query("UPDATE `relay_options` SET `value` = '$stopTime' WHERE `name` = 'stopTime'");
	}

	//Returns team_data's contents
	function updateTeamData(){
		$resource = db_Query("SELECT `team_id`,`team_nickname`,`password`,`points`,`rank_freetime`,`last_point`,`last_checkin_time`,`rank_final` FROM team_data ORDER BY `points` DESC, `last_point` ASC;");
		$returnRow = array();
		while($tempRow = mysqli_fetch_row($resource)){
			$returnRow[]=$tempRow;
		}
		return $returnRow;
	}
	function getEvent(){
		$resource = mysqli_fetch_row(db_Query("SELECT `value` FROM `relay_options` WHERE `class`='event';"));
		return $resource[0];
	}

	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'updateLeaderboard': $return = updateLeaderboard(); break;
		case 'setStartTime': $return = setStartTime(); break;
		case 'setStopTime':		$return = setStopTime(); break;
		case 'updateTeamData': $return = updateTeamData(); break;
		case 'getTeamLog': $return = getTeamLog(); break;
		case 'setUnloadTime': $return = setUnloadTime(); break;
		case 'getEvent': $return = getEvent(); break;
	}
	print json_encode($return);

?>
