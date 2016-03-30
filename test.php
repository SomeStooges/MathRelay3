<!DOCTYPE HTML>
<html>
<head>

</head>
<body>
  <div id = "cleanUpParagraph">
		<?php
			$fileName = "server/cleanupParagraph.txt";
			$myfile = fopen($fileName,'r');
			$text = fread($myfile, filesize($fileName));
			fclose($myfile);
			print "<div id='cleanup'>".$text."</div>";
		?>
	</div>
</body>
</html>
