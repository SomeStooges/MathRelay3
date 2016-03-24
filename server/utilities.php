<?php
	function db_Query($query){
		$con = mysqli_connect('localhost','root','root','mathrelay3');
		$result = mysqli_query($con, $query);
	
		if (!$result) {
			print mysqli_error($con);
			die("Query failed\n"); 
		}
		
		mysqli_close($con);
		return $result;
	} 
	
	function checkForOption($class,$name,$default){
		$reso = db_Query("SELECT * FROM relay_options WHERE class='$class' AND name='$name';");
		$num = mysqli_num_rows($reso);
		if($num == 0){
			db_Query("INSERT INTO relay_options VALUES ('$class','$name','$default');");
		}
		return true;
	}
	
	function getOption($class,$name){
		$ret = mysqli_fetch_row(db_Query("SELECT value FROM relay_options WHERE class='$class' AND name='$name';"));
		return $ret[0];
	}
	
	function setOption($class,$name,$value){
		db_Query("UPDATE relay_options SET value='$value' WHERE class='$class' AND name='$name';");
		return true;
	}
?>