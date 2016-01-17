// Scripts for the corresponding answer_sheet.php page

//Global variables saving whatever answer has been selected.
var seriesSelected = '';
var level3selected = '';
var level2selected = '';
var level1selected = '';

//Sends the answer to the server to be graded
function gradeAnswer(qNum, l3, l2, l1){
	console.log('Sending answer: series: '+qNum+' ; '+l3+' ; '+l2+' ; '+l1+' ;');
	obj = new Object;
	obj.action = 'gradeAnswer';
	obj.question = qNum;	//question number, as an INT
	obj.level3 = l3;		//level 3 answer, as a char
	obj.level2 = l2;		//level 2 answer, as a char
	obj.level1 = l1;		//level 1 answer, as a char
	$.post('server/user_runner.php',obj,function(data){
		console.log(data);
		data = JSON.parse(data);
		var hist = data[0];	//new history statement, in format "0;0;0;0;2;1;1;0...": 0 = unattempted, 1 = correct, 2 = incorrect, 3 = too many attempts
		var res1 = data[1];	//result for level 1: 1 = correct, 0 = incorrect, 3 = too many attempts, 4 = already graded
		var res2 = data[2];	//result for level 2
		var res3 = data[3];	//result for level 3
		//console.log("hist "+hist+" ; "+res1+" "+res2+" "+res3);
		
		//WRITE GUI CHANGE HERE
	});
}

function getChoices(series){
	for(i=1;i<=3;i++){
		for(j=1;j<=6;j++){
			$('#c'+i+'_'+j+'').html(choiceBank[series][i][j]);
		}
	}
}

$(document).ready( function() {
	var action;
		$.post("server/user_control.php", action= "action=getNickname", function(data) {
			console.log("Retrieving nickname if available.");
			//console.log(JSON.parse(data));
			if(data){
				$("#nickname").text(JSON.parse(data));
			}
		});
		
	
	$("#submitNickname").click( function(){
		 obj = new Object;
		 obj.action = "setNickname";
		 obj.nickname =  $("#nicknameInput").val();
		$.post("server/user_control.php", obj, function(data) {
			console.log(data)
			console.log(nickname)
			if(data){
				$("#nickname").text(obj.nickname);
				console.log(data);
			}
			else {
				console.log("Oops! Something went wrong. :(")
			}
			
		});
		document.getElementById("nicknameInput").value = "";
	});
	
	$("#logoutButton").click( function() {
		action = "action=userLogout";
		$.post("server/user_control.php", action, function(data) {
			console.log(data)
			
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
		level3selected = '';
		level2selected = '';
		level1selected = '';
		
		//gets the answer choices for the selected series
		series = $(this).prop('id');
		series = series.substring(1,series.length);
		getChoices(series);
		seriesSelected = series;
	});
	
	$(".level3Buttons").click( function(){
		selid = $(this).prop('id');
		level3selected = selid.substring(3,4);
		//SOME GUI CHANGE
	});
	$(".level2Buttons").click( function(){
		selid = $(this).prop('id');
		level2selected = selid.substring(3,4);
		//SOME GUI CHANGE
	});
	$(".level1Buttons").click( function(){
		selid = $(this).prop('id');
		level1selected = selid.substring(3,4);
		//SOME GUI CHANGE
	});
	$('#submit_answer').click( function(){
		console.log("submitting answer");
		gradeAnswer(seriesSelected,level3selected,level2selected,level1selected);
	});
});
