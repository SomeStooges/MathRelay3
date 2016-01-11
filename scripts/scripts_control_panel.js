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

$(document).ready( function() {
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
