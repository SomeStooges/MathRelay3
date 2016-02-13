// Scripts for the corresponding answer_sheet.php page

//Global variables saving whatever answer has been selected.
var seriesSelected = '';
var level3selected = '';
var level2selected = '';
var level1selected = '';
var selid1 = 'NaN';
var selid2 = 'NaN';
var selid3 = 'NaN';
var seriesID = '';
var selected = '';
//Global history variables
var strhis;
var arrhis;
var eventCounter = 0;

//Checks the current event
function checkEvent(){
	$.post('server/user_runner.php', 'action=getEvent', function(data) {
		var checker = JSON.parse(data);
		console.log(checker);
		switch(checker){
			case "none":
						window.location.href = "user_login.php";
						break;
			case "open":
						$('.seriesNumbers').prop('disabled', true);
						$('.level1Buttons').prop('disabled', true);
						$('.level2Buttons').prop('disabled', true);
						$('.level3Buttons').prop('disabled', true);
						break;
			case "start":
						if(eventCounter<1){
							$('.seriesNumbers').prop('disabled', false);
							$('.level1Buttons').prop('disabled', false);
							$('.level2Buttons').prop('disabled', false);
							$('.level3Buttons').prop('disabled', false);
							eventCounter++	;
						}
						break;
			case "stop":
						$('.seriesNumbers').prop('disabled', true);
						$('.level1Buttons').prop('disabled', true);
						$('.level2Buttons').prop('disabled', true);
						$('.level3Buttons').prop('disabled', true);
						break;
			case "close":
						window.location.href = "finish_page.php";
						break;
			default:
						eventCounter =0;
		}
	});
}

//Retrieves answer history in the case that there is a premature logout or refresh or closed window
function retrieveHistory(){
	$.post('server/user_runner.php', 'action=retrieveHistory', function(data) {
		strhis = JSON.parse(data);
		arrhis = strhis.split(";");
		console.log(arrhis);
		for (var a = 0; a < arrhis.length; a++){
			var b = a+1;
			switch(arrhis[a]){
				case "1": $('#q'+b).prop('disabled', true);
					$('#q'+b).css('background-color', 'lightGreen');
					break;
				case "2": $('#q'+b).css('background-color', 'yellow'); break;
				case "3": $('#q'+b).prop('disabled', true);
				$('#q'+b).css('background-color', 'lightCoral');
					break;
			}
		}
	});
}

//Sends the answer to the server to be graded
function gradeAnswer(qNum, l3, l2, l1, id1, id2, id3){
	console.log('Sending answer: series: '+qNum+' ; '+l3+' ; '+l2+' ; '+l1+' ; '+id1+' ; '+id2+' ; '+id3+' ; ');
	//checks an answer was actually submitted, and the submit button was not randomly pressed
	//ensures that all three answers were submitted for grading
	if(id1 !=='NaN' && id2 !=='NaN' && id3 !=='NaN'){
		obj = new Object();
		obj.action = 'gradeAnswer';
		obj.question = qNum;	//question number, as an INT
		obj.level3 = l3;		//level 3 answer, as a char
		obj.level2 = l2;		//level 2 answer, as a char
		obj.level1 = l1;		//level 1 answer, as a char
		//id1 = "'#" + id1 + "'";
		$.post('server/user_runner.php',obj,function(data){
			console.log(data);
			data = JSON.parse(data);
			var hist = data[0];	//new history statement, in format "0;0;0;0;2;1;1;0...": 0 = unattempted, 1 = correct, 2 = incorrect, 3 = too many attempts
			var res1 = data[1];	//result for level 1: 1 = correct, 0 = incorrect, 3 = too many attempts, 4 = already graded
			var res2 = data[2];	//result for level 2
			var res3 = data[3];	//result for level 3

			//console.log("hist "+hist+" ; "+res1+" "+res2+" "+res3);
			//WRITE GUI CHANGE HERE
			//Note: this change is not evident upon reloading the series. Needs to have a way of storing these cases.
			switch(res1){
				case 0:	$('#'+id1).css('background-color','lightCoral'); break;
				case 1:	$('.level1Buttons').css('background-color','lightGreen'); break;
				case 3:	$('.level1Buttons').css('background-color','black'); break;
				case 4: $('.level1Buttons').css('background-color','black');
					//$('.level1Buttons').prop('disabled', true);
					break;
			}
			switch(res2){
				case 0:	$('#'+id2).css('background-color','lightCoral'); break;
				case 1:	$('.level2Buttons').css('background-color','lightGreen'); break;
				case 3:	$('.level2Buttons').css('background-color','black'); break;
				case 4: $('.level2Buttons').css('background-color','black');
					//$('.level2Buttons').prop('disabled', true);
					break;
			}
			switch(res3){
				case 0:	$('#'+id3).css('background-color','lightCoral'); break;
				case 1:	$('.level3Buttons').css('background-color','lightGreen'); break;
				case 3:	$('.level3Buttons').css('background-color','black'); break;
				case 4: $('.level3Buttons').css('background-color','black');
					//$('.level3Buttons').prop('disabled', true);
					break;
			}
			$('#currentPoints').html(data[4]);

			//checks to see if  the answer was correct or had too many attempts, and disables the series button.
			var list = hist.split(";");
			var id = seriesID.split("q");
			var temp = parseInt(id[1]);
			console.log(list);
			console.log(list[temp-1]);
			switch(list[temp-1]){
				case "1": $('#'+seriesID).prop('disabled', true);
					$('#'+seriesID).css('background-color', 'lightGreen');
					break;
				case "2": $('#'+seriesID).css('background-color', 'yellow'); break;
				case "3": $('#'+seriesID).prop('disabled', true);
					$('#'+seriesID).css('background-color', 'lightCoral');
					break;
			}
		});
	}
}

function getChoices(series){
	for(i=1;i<=3;i++){
		for(j=1;j<=6;j++){
			$('#c'+i+'_'+j+'').html(choiceBank[series][i][j]);
		}
	}
}
















$(document).ready( function() {
	checkEvent();
	setInterval(checkEvent,1000);
	retrieveHistory();
	$('#submit_answer').prop('disabled', true);
	$('.level1Buttons').prop('disabled', true);
	$('.level2Buttons').prop('disabled', true);
	$('.level3Buttons').prop('disabled', true);
	var action;
		$.post("server/user_control.php", action= "action=getNickname", function(data) {
			data = JSON.parse(data);
			console.log(data);
			if(data.trim() !== ""){
				$("#page_title").text(data);
			}
		});
		$.post("server/user_control.php", action = "action=getPoints", function(data) {
			if(data){
				$("#currentPoints").text(JSON.parse(data));
			}
		});

		$("#nicknameInput").keypress(function(){
			if(event.which == 13){
				$("#submitNickname").click();
			}
		});

	$("#submitNickname").click( function(){
		 obj = new Object();
		 obj.action = "setNickname";
		 obj.nickname =  $("#nicknameInput").val();
		$.post("server/user_control.php", obj, function(data) {
			if(data){
				if( obj.nickname.trim() !== ""){
					$("#page_title").html(obj.nickname);
					console.log(data);
				}
			}
			else {
				console.log("Oops! Something went wrong. :(");
			}
		});
		$("#nicknameInput").val("");
	});

	$("#logoutButton").click( function() {
		action = "action=userLogout";
		$.post("server/user_control.php", action, function(data) {
			console.log(data);

			if(data){
				window.location.href = "index.php";
			}
			else {
				console.log("Logout failed.");
			}
		});
	});

	$(".seriesNumbers").click( function(){
		//resets the selected answers
		selid1 = 'NaN';
		selid2 = 'NaN';
		selid3 = 'NaN';
		$('#submit_answer').prop('disabled', false);
		$('.level1Buttons').prop('disabled', false);
		$('.level2Buttons').prop('disabled', false);
		$('.level3Buttons').prop('disabled', false);
		level3selected = '';
		level2selected = '';
		level1selected = '';
		$('#'+selected).css('background-color', '');
		var temp = $(this).prop('id');
		selected = temp.split('q');
		$('#'+temp).css('background-color','rgb(101, 123, 201)');
		selected = temp;
		retrieveHistory(); //Communicates with server. May cause lag
		//clears level question colors
		$('.level3Buttons').css('background-color','');
		$('.level2Buttons').css('background-color','');
		$('.level1Buttons').css('background-color','');

		//gets the answer choices for the selected series
		series = $(this).prop('id');
		seriesID = series;
		series = series.substring(1,series.length);
		getChoices(series);
		seriesSelected = series;

		//gets attempt history colors
		//some GUI
	});

	$(".level3Buttons").click( function(){
		selid3 = $(this).prop('id');
		level3selected = selid3.substring(3,4);
		//SOME GUI CHANGE
		$('.level3Buttons').css('background-color','');
		$(this).css('background-color','rgb(101, 123, 201)');
	});
	$(".level2Buttons").click( function(){
		selid2 = $(this).prop('id');
		level2selected = selid2.substring(3,4);
		//SOME GUI CHANGE
		$('.level2Buttons').css('background-color','');
		$(this).css('background-color','rgb(101, 123, 201)');
	});
	$(".level1Buttons").click( function(){
		selid1 = $(this).prop('id');
		level1selected = selid1.substring(3,4);
		//SOME GUI CHANGE
		$('.level1Buttons').css('background-color','');
		$(this).css('background-color','rgb(101, 123, 201)');
	});
	$('#submit_answer').click( function(){
		console.log("submitting answer");
		gradeAnswer(seriesSelected,level3selected,level2selected,level1selected,selid1,selid2,selid3);
	});

});
