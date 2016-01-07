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
	
	//checks to see whether the specific option exists, and if it doesn't creates it.
	//specify the class and name, and the default value
	function checkForOption($class,$name,$default){
		$reso = db_Query("SELECT * FROM relay_options WHERE class='$class' AND name='$name';");
		$num = mysqli_num_rows($reso);
		if($num == 0){
			db_Query("INSERT INTO relay_options VALUES ('$class','$name','$default');");
		}
		return true;
	}
	
	//FUNCTION DEFINITIONS
	
	//regenerates all the team data
	function adminReset() {
		$number = 10;
		$passwordLength = 6;
		db_Query('DELETE FROM team_data;');
		
		for( $i=1; $i<=$number; $i++){
			$tempPass = makePassword($passwordLength);
			db_Query("INSERT INTO team_data VALUES ('$i','','$tempPass','0','0','0','0','0','0');");
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
		return "The function 'adminLogin()' was called!";
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'adminReset': $return = adminReset(); break;
		case 'adminLogin': $return = adminLogin(); break;
	}
	print json_encode($return);
?>