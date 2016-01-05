<?php
	session_start();
	
	//UTILITY FUNCTIONS
	public function db_Query($query){
		$con = mysqli_connect('localhost','root','','mathrelay3');
		$result = mysqli_query($con, $query);
	
		if (!$result) {
			print mysqli_error($con);
			die("Query failed\n"); 
		}
		
		mysqli_close($con);
		return $result;
	} 
	
	public function getEvent(){
		return 'none'
	}
	
	$action = $_REQUEST['action'];
	$return = true;
	switch( $action ){
		case 'getEvent': $return = getEvent(); break;
	}
	print json_encode($return);
?>