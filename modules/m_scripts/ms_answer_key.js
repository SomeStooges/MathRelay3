//Scripts for the m_answer_key module
//Global variables saving whatever answer has been selected
var seriesSelected = '';
var level3selected = '';
var level2selected = '';
var level1selected = '';
var lastTarget;

//Assigns answer choices to each input box to be displayed, deneding on series number
function getChoices(series){
	for(i=1;i<=3;i++){
		for(j=1;j<=6;j++){
			$('#v'+i+'_'+j+'').val(choiceBank[series][i][j]);
		}
	}
}
function setAnswer(){
	//Provide function for when the set answer button is pressed
}

function addSpecialCharacter(bID){
	switch(bID){
		case 'PiButton':
			value=$("<span>").html("&#928;").text();
		break;
		case 'RadicalButton':
			value=$("<span>").html("&#8730;").text();
		break;
		case 'InfinityButton':
			value=$("<span>").html("&#8734;").text();
		break;
	}
	$(lastTarget).val($(lastTarget).val()+value);
}

$(document).ready( function() {
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

	$('.special_button').click(function(){
		bID = $(this).attr('id');
		addSpecialCharacter(bID);
	});

	$('.level3Values, .level2Values, .level1Values').click(function(){
		lastTarget = $(this);
	});



});
