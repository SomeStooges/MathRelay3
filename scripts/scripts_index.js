// Java Script for the welcome page
var getEvent; //global getEvent variable

function checkEvent(){
	$.post('server/user_control.php', 'action=getEvent', function(data) {
		$('#welcomeButton').prop('disabled', true);
		getEvent = JSON.parse(data);
		switch(getEvent){
			case "none":
						$('#welcomeButton').prop('disabled', true);
						break;
			case "close":
						$('#welcomeButton').prop('disabled', true);
						break;
			default:
						$('#welcomeButton').prop('disabled', false);
		}
	});
}

$(document).ready( function() {
	var eventChecker;
	checkEvent();
	setInterval(checkEvent,1000);
	$("#welcomeButton").click( function() {
		window.location.href = "user_login.php";
	});
	$("#adminButton").click( function() {
		window.location.href = "admin_login.php";
	});
	$("#aboutButton").click( function() {
		window.location.href = "documentation.php";
	});
});
