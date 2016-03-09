<?php
	require 'utilities.php';

	function getStatistics(){
		//Get the event start time and determine how many minutes have passed
    $startTime = getOption('event','startTime');
    $ctime = time();

    $numMinPassed = floor( ($ctime - $startTime) / 60 );
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
    $scatterQuestionTime;
    $attemptsByTeam = array_fill( 1 , 50 , 0);
    $correctByTeam = array_fill( 1 , 50 , 0 );
    $attemptsByQuestion = array_fill( 1 , 40 , 0);
    $correctByQuestion = array_fill( 1 , 40 , 0 );

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
      $scatterQuestionTime[] = [ 0 => $obj->series_number,   1 => $obj->timesptamp];

      //Determine number of attempts for each team and the number of correct responses for each team (responses/team bar)
      $attemptsByTeam[ $obj->team_id ] += 1;
      if( $isCorrect ){
        $correctByTeam[ $obj->team_id ] += 1;
      }

      ////Determine number of correct responses and number of total responses for each question (responses/question bar)
      $attemptsByQuestion[ $obj->series_number ] += 1;
      if( $isCorrect ){
        $correctByQuestion[ $obj->series_number ] += 1;
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
