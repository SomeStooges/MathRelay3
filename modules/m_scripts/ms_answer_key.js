//Scripts for the m_answer_key module
//Global variables saving whatever answer has been selected
var seriesSelected = '';
var level3selected = '';
var level2selected = '';
var level1selected = '';
var lastTarget;
var selectedSeries = '';

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

	//Resubmits the lastTarget after adding the character
}

function updateAnswerKey(target){
	var fID = $(target).attr('id');
	fID = fID.substring(1,4).split('_');
	obj = new Object;
	obj.action = 'updateAnswerKey';
	obj.series = selectedSeries;
	obj.level = fID[0];
	obj.choice = fID[1];
	obj.value = $(target).val();
	console.log(fID);
	$.post('../server/admin_control.php',obj,function(data){
			//Should probably be some GUI change here....
	});
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

	$('.seriesNumbers').click(function(){
		selectedSeries = $(this).attr('id').substring(1,3);
		console.log(selectedSeries);
	});

	$('.level3Set, .level2Set, .level1Set').click(function(){
		fID = $(this).attr('id').substring(1,4).split('_');
		obj = new Object;
		obj.action = 'setAnswer';
		obj.series = selectedSeries;
		obj.level = fID[0];
		obj.choice = fID[1];
		$.post('../server/admin_control.php',obj,function(data){

		});
	});

	$('.level3Values, .level2Values, .level1Values').click(function(){
		lastTarget = $(this);
	});

	$('.level3Values, .level2Values, .level1Values').blur(function(){
		updateAnswerKey($(this));
	});

});
