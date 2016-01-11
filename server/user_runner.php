<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
	function gradeAnswer(){
		//Get the variables that were submitted
		//?action=gradeAnswer&question=1&level3=A&level2=B&level1=C
		$teamID = $_SESSION['teamID'];
		$series = $_REQUEST['question'];
		$l3 = $_REQUEST['level3'];
		$l2 = $_REQUEST['level2'];
		$l1 = $_REQUEST['level1'];
		
		//Check whether those answers were correct
		$resource = db_Query("SELECT level_3, level_2, level_1 FROM answer_key WHERE series_number='$series';");
		$answer = mysqli_fetch_object($resource);
		
		$res3 = ($answer->level_3==$l3 ? 1 : 0);
		$res2 = ($answer->level_2==$l2 ? 1 : 0);
		$res1 = ($answer->level_1==$l1 ? 1 : 0);

		//update the points in teamdata
		$ansHis = null;
		$resource = mysqli_fetch_object(db_Query("SELECT points,history,attempts FROM team_data WHERE team_id='$teamID';"));
		if($res1 && $res2 && $res3){
			//if correct
			$attempts = explode(';',$resource->attempts);
			$specA = $attempts[ $series-1 ];
			$addition = 10 - 2 * intval($specA);
			$attempts = implode(';',$attempts);
			
			$points = $resource->points;
			$points += $addition;
			db_Query("UPDATE team_data SET points = '$points' WHERE team_id='$teamID';");
			
			$ansHis = explode(';',$resource->history);
			$ansHis[ $series-1 ] = '1';
			$ansHis = implode(';', $ansHis);
		} else {
			//if incorrect
			$ansHis = explode(';',$resource->history);
			$ansHis[ $series-1 ] = '2';
			$ansHis = implode(';', $ansHis);
			
			$attempts = explode(';',$resource->attempts);
			$attempts[ $series-1 ] = strval (intval($attempts[ $series-1 ]) + 1);
			$attempts = implode(';',$attempts);
		}
		db_Query("UPDATE team_data SET history='$ansHis',attempts='$attempts' WHERE team_id='$teamID';");
		
		//Update the answer log
		$ctime = date('g:i:s l, M d, Y');
		db_Query("INSERT INTO `admin_log`
			(`team_id`, `series_number`, `answer_3`, `check_3`, `answer_2`, `check_2`, `answer_1`, `check_1`, `timestamp`) 
			VALUES ('$teamID','$series','$l3','$res3','$l2','$res2','$l1','$res1','$ctime')");
		
		//Return the response to the user
		$response = array(
			0 => $ansHis,
			1 => $res1,
			2 => $res2,
			3 => $res3
		);
		return $response;
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'gradeAnswer': $return = gradeAnswer(); break;
	}
	print json_encode($return);
?>