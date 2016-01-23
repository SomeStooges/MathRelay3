<!-- Content for Answer Key tab -->
<div id='questionDiv' class='answerKeyElement'>
	<b> Question Number </b>
	<table id='questionTable'>
		<?php
			$numQuestions = getOption('answerkey','numQuestion');
			for ($countOut = 0; $countOut < ($numQuestions / 5); $countOut++) {
				print "<tr class='questions'>";
				for ($countIn = 1; $countIn <= 5; $countIn++) {
					$currentNum = $countIn + (5 * $countOut);
					if ($currentNum <= $numQuestions) {
						print "<td><button class='seriesNumbers' id='q" . $currentNum . "'> " . $currentNum . " </button></td>";
					}	
				}
			print "</tr>"; 				
			}	
		?>
	</table>
</div>
<div id='level3Div' class='answerKeyElement'>
	<b> Level 3 Answer </b>
	<table id='level3table'>
		<?php
			$numChoices = 6;
			$level = 3;
			for($i=1;$i<=6;$i++){
				print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values' value='v".$level."_".$i."'<td>";
				print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>s".$level."_".$i."</button></tr>";
			}
		?>	
	</table>
</div>
<div id='level2Div' class='answerKeyElement'>
	<b> Level 2 Answer </b>
	<table id='level2table'>
		<?php
			$level = 2;
			for($i=1;$i<=6;$i++){
				print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values' value='v".$level."_".$i."'<td>";
				print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>s".$level."_".$i."</button></tr>";
			}
		?>	
	</table>
</div>
<div id='level1Div' class='answerKeyElement'>
	<b> Level 1 Answer </b>
	<table id='level1table'>
		<?php
			$level = 1;
			for($i=1;$i<=6;$i++){
				print "<tr><td><input id='v".$level."_".$i."' class='level".$level."Values' value='v".$level."_".$i."'<td>";
				print "<td><button id='s".$level."_".$i."' class='level".$level."Set'>s".$level."_".$i."</button></tr>";
			}
		?>	
	</table>
</div>