<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
	function gradeAnswer(){
		//Get the variables that were submitted
		$teamID = 1; //$_SESSION['teamID'];
		$series = 3; //$_REQUEST['question'];
		$l3 = 'B';	 //$_REQUEST['level3'];
		$l2 = 'A';	 //$_REQUEST['level2'];
		$l1 = 'C';	 //$_REQUEST['level1'];
		
		//Check whether those answers were correct
		$resource = db_Query("SELECT level_3, level_2, level_1 FROM answer_key WHERE series_number='$series';");
		$answers = mysqli_fetch_object($resource);
		if($answers->level_3 == $l3){
			$res3 = 1;
		} else {
			$res3 = 0;
		}
		if($answers->level_2 == $l2){
			$res2 = 1;
		} else {
			$res2 = 0;
		}
		if($answers->level_1 == $l1){
			$res1 = 1;
		} else {
			$res1 = 0;
		}
		//update the points in teamdata
		$ansHis = null;
		if($res1 && $res2 && $res3){
			$resource = mysqli_fetch_object(db_Query("SELECT points FROM team_data WHERE team_id='$teamID';"));
			$points = $resource->points;
			$points++;
			db_Query("UPDATE team_data SET points = '$points' WHERE team_id='$teamID';");
			
			$resource = mysqli_fetch_object(db_Query("SELECT history FROM team_data WHERE team_id='$teamID';"));
			$ansHis = explode(';',$resource->history);
			$ansHis[ $series-1 ] = '1';
			$ansHis = implode(';', $ansHis);
		} else {
			$resource = mysqli_fetch_object(db_Query("SELECT history FROM team_data WHERE team_id='$teamID';"));
			$ansHis = explode(';',$resource->history);
			$ansHis[ $series-1 ] = '2';
			$ansHis = implode(';', $ansHis);
		}
		
		db_Query("UPDATE team_data SET history='$ansHis' WHERE team_id='$teamID';");
		
		//Update the answer log
		$ctime = date('g:i:s l, M d, Y'); //Need to make room in the database
		db_Query("INSERT INTO `admin_log`(`team_id`, `series_number`, `answer_3`, `check_3`, `answer_2`, `check_2`, `answer_1`, `check_1`, `timestamp`) VALUES ('$teamID','$series','$l3','$res3','$l2','$res2','$l1','$res1','$ctime')");
		print var_dump($ansHis);
		//Return the response to the user
		$response = array(
			0 => $ansHis,
			1 => $res1,
			2 => $res2,
			3 => $res3
		);
		
		print var_dump($response);
		die();
		
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