<!-- Content for Team Activity log tab-->
<b> Team ID </b> <button id='freezeButton'>Freeze Log</button>
<table id='teamActivity'>
	<?php
		$numTeams = 50;
		for($i=1;$i<=$numTeams;$i++){
			print "<tr><td class='teamIDdiv'>";
			print $i;
			print "</td></tr>";
		}
	?>
</table>
