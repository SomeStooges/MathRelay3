<!DOCTYPE HTML>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="../scripts/Chart.min.js"></script>
		<script src="../scripts/Chart.Scatter.min.js"></script>
    <script type="text/javascript" src="m_scripts/ms_statistics.js"></script>
    <link rel="stylesheet" type="text/css" href="m_styles/mst_statistics.css">
  </head>
  <body style='background-color: black'>
    <div id='buttons'>
      <button class='selectorButton' id='forceStatUpdate'>Update Now</button>
      <button class='selectorButton' id='bindLineButton'>Attempts vs Time</button>
      <button class='selectorButton' id='bindScatterButton'>Questions vs Time</button>
      <button class='selectorButton' id='bindBar1Button'>Attempts vs Team</button>
      <button class='selectorButton' id='bindBar2Button'>Attempts vs Question</button>
    </div>
    <div id='y-axis'></div>
    <div id='x-axis'></div>
    <div  class='graphwrap' id='bindLine'><canvas id="attemptsVTime" class='graph' width='1000' height='500'></canvas></div><br>
		<div  class='graphwrap' id='bindScatter'><canvas id="questionVTime" class='graph' width="5000" height="500"></canvas></div><br>
		<div  class='graphwrap' id='bindBar1'><canvas id="attemptsVTeam" class='graph' width="1000" height="500"></canvas></div><br>
		<div  class='graphwrap' id='bindBar2'><canvas id="attemptsVQuestion" class='graph' width="1000" height="500"></canvas></div><br>
  </body>
</html>
