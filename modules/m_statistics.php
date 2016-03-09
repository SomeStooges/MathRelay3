<!-- Content for the Statistics tab -->
<?php
	require '../server/utilities.php';
 ?>
<!DOCTYPE HTML>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
    <script type="text/javascript" src="m_scripts/ms_statistics.js"></script>
    <link rel="stylesheet" type="text/css" href="m_styles/mst_statistics.css">

  </head>
  <body style='background-color: black'>
    <?php if(!function_exists('db_Query')){require $_SERVER['DOCUMENT_ROOT'] . 'MathRelay3/server/utilities.php';} ?>
    <button id='forceStatUpdate'>Update Now</button>
		<canvas id="myChart" width="400" height="400"></canvas>
  </body>
</html>
