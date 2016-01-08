<?php
	session_start();
	
	require 'utilities.php'; //imports some universal utilities
	
	//FUNCTION DEFINITIONS
	function getEvent(){
		return 'open';
	}
	function userLogin(){
		return 'userLogin() called, success!';
	}
	function userLogout(){
		return 'userLogout() called, success!';
	}
	
	//REQUEST SWITCH
	$action = $_REQUEST['action'];
	$return = false;
	switch( $action ){
		case 'getEvent': $return = getEvent(); break;
		case 'userLogin': $return = userLogin(); break;
		case 'userLogout': $return = userLogout(); break;
	}
	print json_encode($return);
?>