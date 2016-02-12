<?php
	session_start();

	require 'utilities.php'; //imports some universal utilities

	function getEvent(){
		$resource = mysqli_fetch_row(db_Query("SELECT `value` FROM `relay_options` WHERE `class`='event';"));
		return $resource[0];
	}
	function retrieveHistory(){
		$teamID = $_SESSION['teamID'];
		$resource = mysqli_fetch_object(db_Query("SELECT `history` FROM `team_data` WHERE `team_id` = '$teamID'"));
		$resource = $resource->history;
		return $resource;
	}

	function gradeAnswer(){
		//Get the variables that were submitted
		$teamID = $_SESSION['teamID'];
		$series = $_REQUEST['question'];
		$l3 = $_REQUEST['level3'];
		$l2 = $_REQUEST['level2'];
		$l1 = $_REQUEST['level1'];

		//Check whether those answers were correct
		$resource = db_Query("SELECT correct_index FROM answer_key WHERE series_number='$series' ORDER BY level_number DESC;");
		$answer = mysqli_fetch_object($resource);
		$res3 = ($answer->correct_index==$l3 ? 1 : 0);

		$answer = mysqli_fetch_object($resource);
		$res2 = ($answer->correct_index==$l2 ? 1 : 0);

		$answer = mysqli_fetch_object($resource);
		$res1 = ($answer->correct_index==$l1 ? 1 : 0);

		//update the points in teamdata
		$resource = mysqli_fetch_object(db_Query("SELECT points,history,attempts,last_point FROM team_data WHERE team_id='$teamID';"));
		$attempts = explode(';',$resource->attempts);
		$points = $resource->points;
		$ansHis = explode(';',$resource->history);
		$numAtt = intval($attempts[ $series-1 ]) + 1;
		$attempts[ $series-1 ] = strval($numAtt);
		$lastPoint = $resource->last_point;

		if( $numAtt < 6 && strval($ansHis[ $series-1 ])!='1'){
			if($res1 && $res2 && $res3){
				//if correct, and will score more than zero points
				$award = 12 - 2 * intval( $attempts[ $series-1 ] );
				$points += $award;
				$ansHis[ $series-1 ] = '1';
				$lastPoint = time();

				$ctime = date('g:i:s');
				db_Query("INSERT INTO admin_log VALUES ('$teamID','$ctime','$series','$award','$points');");
			} else {
				//if incorrect
				$ansHis[ $series-1 ] = '2';
			}
		} else {

			if(strval($ansHis[ $series-1 ])=='1'){
				//if the question has already been answered
				$res1 = 4; $res2 = 4; $res3 = 4;
			} else {
				//if no more points can be scored
				$ansHis[ $series-1 ]='3';
				$res1 = 3; $res2 = 3; $res3 = 3;
			}
		}


		$ansHis = implode(';', $ansHis);
		$attempts = implode(';',$attempts);

		db_Query("UPDATE team_data SET history='$ansHis',attempts='$attempts',points='$points',last_point='$lastPoint' WHERE team_id='$teamID';");

		//Update the answer log
		$ctime = date('g:i:s');
		//Return the response to the user

		$response = array(
			0 => $ansHis,
			1 => $res1,
			2 => $res2,
			3 => $res3,
			4 => $points
		);
		return $response;
	}

	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'gradeAnswer': $return = gradeAnswer(); break;
		case 'getEvent': $return = getEvent(); break;
		case 'retrieveHistory': $return = retrieveHistory(); break;
	}
	print json_encode($return);
?>
