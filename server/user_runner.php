<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
	function gradeAnswer(){
		//Get the variables that were submitted
		$teamID = 1; //$_SESSION['teamID'];
		$series = 1; //$_REQUEST['question'];
		$l3 = 'A';	 //$_REQUEST['level3'];
		$l2 = 'A';	 //$_REQUEST['level2'];
		$l1 = 'A';	 //$_REQUEST['level1'];
		
		//Check whether those answers were correct
		$resource = db_Query("SELECT series_number FROM answer_key WHERE series_number='$series' AND level_3='$l3' AND level_2='$l2' AND level_1='$l1';");
		$num = mysqli_num_rows($resource);
		print "The current number:" . $num;
		//update the points in teamdata
		
		//Get/update the history
		$resource = mysqli_fetch_object(db_Query("SELECT history FROM team_data WHERE team_id='$teamID';"));
		$ansHis = 
		//Update the answer log
		//Return the response to the user
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'gradeAnswer': $return = gradeAnswer(); break;
	}
	print json_encode($return);
?>