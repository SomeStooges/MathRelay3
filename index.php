<?php
 	ini_set("session.save_path","/var/lib/php/session");
 ?>
<!doctype HTML>
<html lang = "en">
<html>
	<head>
		<meta charset="utf-8">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="./scripts/scripts_index.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Advent+Pro:500' rel='stylesheet' type='text/css'/>
		<link rel="stylesheet" type="text/css" href="./styles/welcome.css"/>
		<title>Math Relay</title>
	</head>

	<body>
		<section>
		<h1>
			<ul><span id="first">Math</span></ul>
			<ul><span id="second">Relay</span></ul>
		</h1>
		<div style='height: 25px;'></div>
		<button class = 'indexButton' id="welcomeButton" disabled> Student Login </button>
		<br>
		<button class = 'indexButton' id="adminButton"> Admin <br>Login </button>
		<button class = 'indexButton' id="aboutButton"> About This Program </button>
	</section>
	</body>
</html>
