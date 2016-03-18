<?php
	//Protection against premature entrance
	session_start();
	if(!isset($_SESSION['admin'])){
		header('location: index.php');
	}
	require 'server/utilities.php';
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Team Data Printout </title>
		<meta charset="utf-8">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="scripts/scripts_printout.js"></script>
		<link rel="stylesheet" type="text/css" href="../MathRelay3/styles/styles_printout.css"/>
	</head>

	<body>
    <div id="page1">
      <?php
        if(!function_exists('db_Query')){
          require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';
        }

        $resource = db_Query("SELECT `team_id`,`password` FROM team_data;");
        $teamData = array();
        while($teamRow = mysqli_fetch_row($resource)){
          $teamData[] = $teamRow;
        }

        print "<table id='teamDataTable1'>";
        for($i=0;$i<27;$i++){
          print "<tr class='page-break' id='dataRow" . $i . "'>";
          for($j=0;$j<count($teamData[$i]);$j++){
            if($j%2 ==1){
              print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
            }
            if($j%2 ==0){
              print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
            }
          }
          print "</tr>";
        }
        print "</table>";
        if(count($teamData)> 27 && count($teamData) <= 54){
          print "<table id='teamDataTable2'>";
          for($i=27;$i<count($teamData);$i++){
            print "<tr class='page-break' id='dataRow" . $i . "'>";
            for($j=0;$j<count($teamData[$i]);$j++){
              if($j%2 ==1){
                print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
              }
              if($j%2 ==0){
                print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
              }
            }
            print "</tr>";
          }
        }else if(count($teamData)> 27 && count($teamData) > 54){
          print "<table id='teamDataTable2'>";
          for($i=27;$i<54;$i++){
            print "<tr class='page-break' id='dataRow" . $i . "'>";
            for($j=0;$j<count($teamData[$i]);$j++){
              if($j%2 ==1){
                print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
              }
              if($j%2 ==0){
                print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
              }
            }
            print "</tr>";
          }
        }
      ?>
    </div>
    <div id="page2">
      <?php
      if(count($teamData)>54 && count($teamData) <= 81){
        print "<table id='teamDataTable3'>";
        for($i=54;$i<count($teamData);$i++){
          print "<tr class='page-break' id='dataRow" . $i . "'>";
          for($j=0;$j<count($teamData[$i]);$j++){
            if($j%2 ==1){
              print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
            }
            if($j%2 ==0){
              print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
            }
          }
          print "</tr>";
        }
      }else if(count($teamData)>54 && count($teamData) >81){
        print "<table id='teamDataTable3'>";
        for($i=54;$i<81;$i++){
          print "<tr class='page-break' id='dataRow" . $i . "'>";
          for($j=0;$j<count($teamData[$i]);$j++){
            if($j%2 ==1){
              print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
            }
            if($j%2 ==0){
              print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
            }
          }
          print "</tr>";
        }
      }
      if(count($teamData)>81 && count($teamData) <= 108){
        print "<table id='teamDataTable4'>";
        for($i=81;$i<count($teamData);$i++){
          print "<tr class='page-break' id='dataRow" . $i . "'>";
          for($j=0;$j<count($teamData[$i]);$j++){
            if($j%2 ==1){
              print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
            }
            if($j%2 ==0){
              print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
            }
          }
          print "</tr>";
        }
      }else if(count($teamData)>81 && count($teamData) > 108){
        print "<table id='teamDataTable4'>";
        for($i=81;$i<108;$i++){
          print "<tr class='page-break' id='dataRow" . $i . "'>";
          for($j=0;$j<count($teamData[$i]);$j++){
            if($j%2 ==1){
              print "<td>Password: <b>" . $teamData[$i][$j] . "</b></td>";
            }
            if($j%2 ==0){
              print "<td>Team ID: <b>" . $teamData[$i][$j] . "</b></td>";
            }
          }
          print "</tr>";
        }
      }

    ?>
  </div>
	</body>
</html>
