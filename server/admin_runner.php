<?php
	session_start();

	require 'utilities.php'; //imports some universal utilities

	function getLeaderboard(){
		//GEts the display settings and packs them in an object array
		$resource = db_Query("SELECT name,value FROM relay_options WHERE class='display';");
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
		$getValues = substr($getValues,0,strlen($getValues)-2);	//clips off trailing ', ' to correctly for SQL

		//Query the database for the number of teams to fetch
		$numTeams = getOption("display","numTeams");

		//Query the databse for the selected columns from team_data
		if($getValues != ""){ //checks that at least one column was selected
			$resource = db_Query("SELECT $getValues FROM team_data ORDER BY level_3 DESC LIMIT $numTeams;");
			$retfield = array();
			while( $tempObj = mysqli_fetch_object($resource) ){
				$retField[] = $tempObj;
			}
		}

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
		//sets the start time of the event
		$startTime = $_REQUEST['startTime'];
		//sends the time in to the database
		$resource = db_Query("UPDATE `relay_options` SET `value` = '". $startTime . "' WHERE `name` = 'startTime'");
	}

	function getStartTime(){
		$resource = mysqli_fetch_object(db_Query("SELECT `value` FROM `relay_options` WHERE `name` = 'startTime'"));
		if($resource){
			$resource = $resource->value;
		}
		else{
			$resource = false;
		}
		return $resource;
	}

	//Returns team_data's contents
	function updateTeamData(){
		$resource = db_Query("SELECT `team_id`,`team_nickname`,`password`,`points`,`rank_freetime`,`last_checkin_time`,`last_point`,`rank_final` FROM team_data ORDER BY `points` DESC;");
		$returnRow = array();
		while($tempRow = mysqli_fetch_row($resource)){
			$returnRow[]=$tempRow;
		}
		return $returnRow;
	}

	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'getLeaderboard': $return = getLeaderboard(); break;
		case 'setStartTime': $return = setStartTime(); break;
		case 'getStartTime': $return = getStartTime(); break;
		case 'updateTeamData': $return = updateTeamData(); break;
		case 'getTeamLog': $return = getTeamLog(); break;
	}
	print json_encode($return);

?>
