<?php
	require 'utilities.php';

	function getStatistics(){
		//Get the event start time and determine how many minutes have passed
    $startTime = getOption('event','startTime');
		$elapsedTime = getOption('event','stopTime');
		$event = getOption('event','currentEvent');
		$numTeams = getOption('reset','numTeams')+1;
		$ctime = time();

		if( $event = 'close' || $event = 'stop' || $event = 'none' || $event = 'open'){
			$numMinPassed = floor( ($elapsedTime) / 60 );
		} else {
			$numMinPassed = floor( $ctime - $startTime );
		}
		if( $numMinPassed < 30 ){
			$numMinPassed = 30;
		}

		//Pull all data from the database after the last pull time
    $resource = db_Query( "SELECT * FROM stat_log;" );
    $info = array();
    while( $tempObj = mysqli_fetch_object( $resource ) ){
      $info[] = $tempObj;
    }

    //declares return variables
    $attemptsByTime = array_fill( 0 , $numMinPassed , 0 ); //blank array; each index is one minuts
    $correctByTime  = array_fill( 0 , $numMinPassed , 0 ); //blank array; each index is one minuts
    $scatterQuestionTime = array();
    $attemptsByTeam = array_fill( 0 , $numTeams , 0);
    $correctByTeam = array_fill( 0 , $numTeams , 0 );
    $attemptsByQuestion = array_fill( 0 , 41 , 0);
    $correctByQuestion = array_fill( 0 , 41 , 0 );

    for( $i = 0 ; $i < count($info) ; $i++ ){
      $obj = $info[$i];

      //Determines if they got the question correct;
      $isCorrect = false;
      $isCorrect = ($obj->level_3_result == 1 & $obj->level_2_result == 1 & $obj->level_1_result == 1 ) ? true : false;

      //Group the number of attempts and number of correct responses together into 1 minute blocks based on the elapsed time (responses/time line)
      $obj->timesptamp = $obj->timesptamp - $startTime; //should be "timestamp"
      if( $obj->timesptamp < 0 ){
        $obj->timesptamp = 0;
      }

      //determines which minute the event happened
      $idx = floor( $info[$i]->timesptamp / 60 );   //determines index of this timestamp
      $attemptsByTime[$idx] += 1;
      if( $isCorrect ){
        $correctByTime[$idx] += 1;
      }

      //Determine elapsed time for each question (question/time scatter)
      $scatterQuestionTime[] = [ "y" => $obj->series_number,   "x" => $obj->timesptamp];

      //Determine number of attempts for each team and the number of correct responses for each team (responses/team bar)
      $attemptsByTeam[ intval($obj->team_id) ] += 1;//intval($obj->team_id)
      if( $isCorrect ){
        $correctByTeam[ intval($obj->team_id) ] += 1;
      }

      ////Determine number of correct responses and number of total responses for each question (responses/question bar)
      $attemptsByQuestion[ intval($obj->series_number) ] += 1;
      if( $isCorrect ){
        $correctByQuestion[ intval($obj->series_number) ] += 1;
      }
    }

    //Pack and return data
    $ret = [
      "attemptsByTime" => $attemptsByTime,
      "correctByTime" => $correctByTime,
      "scatterQuestionTime" => $scatterQuestionTime,
      "attemptsByTeam" => $attemptsByTeam,
      "correctByTeam" => $correctByTeam,
      "attemptsByQuestion" => $attemptsByQuestion,
      "correctByQuestion" => $correctByQuestion
    ];
    return $ret;
  }


  print json_encode(getStatistics());
?>
