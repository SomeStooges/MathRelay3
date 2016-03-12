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
    <button id='forceStatUpdate'>Update Now</button><br>
    <div  class='graphwrap'><canvas id="attemptsVTime" width='1000' height='500'></canvas></div><br>
		<div  class='graphwrap'><canvas id="questionVTime" width="5000" height="500"></canvas></div><br>
		<div  class='graphwrap'><canvas id="attemptsVTeam" width="1000" height="500"></canvas></div><br>
		<div  class='graphwrap'><canvas id="attemptsVQuestion" width="1000" height="500"></canvas></div><br>
  </body>
</html>
