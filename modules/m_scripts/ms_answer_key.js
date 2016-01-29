//Scripts for the m_answer_key module
//Global variables saving whatever answer has been selected
var seriesSelected = '';
var level3selected = '';
var level2selected = '';
var level1selected = '';

//Assigns answer choices to each input box to be displayed, deneding on series number
function getChoices(series){
	for(i=1;i<=3;i++){
		for(j=1;j<=6;j++){
			$('#v'+i+'_'+j+'').val(choiceBank[series][i][j]);
		}
	}
}





$(document).ready( function() {
  console.log("Hello from the answer key world!");

  $(".seriesNumbers").click( function(){
		//resets the selected answers
		level3selected = '';
		level2selected = '';
		level1selected = '';

		//gets the answer choices for the selected series
		series = $(this).prop('id');
		series = series.substring(1,series.length);
		getChoices(series);
		seriesSelected = series;
	});

});
