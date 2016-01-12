// Script for the admin control panel
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
function timer(){
	t = setTimeout(add, 1000);
}
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    $("#timer").text((hours?(hours>9?hours:"0"+hours):"00")+":"+(minutes?(minutes>9?minutes:"0"+minutes):"00")+":"+(seconds>9?seconds:"0"+seconds));
    timer();
}
function getSettings(){
	$.post('server/admin_control.php','action=getSettings',function(data){
		console.log(data);
		data = JSON.parse(data);
		/* Data is a two dimensional array. THe first index determines which setting it is for.
		the second index lists the class, name, and value of the setting, in that order (from 0 to 2).
		*/
		
		//WRITE GUI CHANGE HERE
	});
}

$(document).ready( function() {
	getSettings();
	$("#start").click( function(){
		timer();
		$("#start").prop("disabled",true);

	});
	
	$("#stop").click( function() {
		clearTimeout(t);
		$("#start").prop("disabled",false);
	});
	
	$("#reset_button").click( function() {
		var action = 'action=adminReset';
		$.post("./server/admin_control.php", action, function(data) {
			console.log(data);
		});
	});
	
	$('#leaderboardLink').click(function(){
		window.location.href="leaderboard.php";
	});
	$("#logoutButton").click( function() {
		action = "action=adminLogout";
		$.post("server/admin_control.php", action, function(data) {
			console.log(data)
			
			if(data){
				window.location.href = "index.php";
			}
			else {
				console.log("Logout failed.");
			}
		});
	});
});
