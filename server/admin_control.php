<?php
	session_start();
	
	//UTILITY FUNCTIONS
	function db_Query($query){
		$con = mysqli_connect('localhost','root','','mathrelay3');
		$result = mysqli_query($con, $query);
	
		if (!$result) {
			print mysqli_error($con);
			die("Query failed\n"); 
		}
		
		mysqli_close($con);
		return $result;
	} 
	
	//FUNCTION DEFINITIONS
	function adminReset() {
		return "Santosh was here! (adminReset() called)";
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = true;
	switch( $action ){
		case 'adminReset': $return = adminReset(); break;
	}
	print json_encode($return);
?>