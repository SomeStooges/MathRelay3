<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
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
				$points += 12 - 2 * intval( $attempts[ $series-1 ] );
				$ansHis[ $series-1 ] = '1';
				$lastPoint = time();
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
		$ctime = date('g:i:s l, M d, Y');
		db_Query("INSERT INTO `admin_log`
			(`team_id`, `series_number`, `answer_3`, `check_3`, `answer_2`, `check_2`, `answer_1`, `check_1`, `timestamp`) 
			VALUES ('$teamID','$series','$l3','$res3','$l2','$res2','$l1','$res1','$ctime')");
		
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
	}
	print json_encode($return);
?>