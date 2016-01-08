<?php
	//Protection against premature entrance
	session_start();
	if( false/*!isset($_SESSION['teamID']) || !isset($_SESSION['adminLogin'])*/){
		//currently disabled
		
		//redirects the page
		header('location: index.php');
	}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title> Answer Sheet </title>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/scripts_finish_page.js"></script>
	</head>

	<body>
		<h1> Finish Page </h1>
		<!-- We can probably run the PHP from here and not a JQUERY post, except to reject the page if too premature -->
		<p> <span id='rankMessage'><i>Some print out of rank or generic congradulation message </i></span></p>
		<p> <span id='cleanupParagraph'><i>Some large paragraph of instructions for the team captain.</i></span></p>
	</body>
</html>