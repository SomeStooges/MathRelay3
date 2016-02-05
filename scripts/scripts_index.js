// Java Script for the welcome page
var getEvent; //global getEvent variable

function checkEvent(){
	$.post('server/user_control.php', 'action=getEvent', function(data) {
		$('#welcomeButton').prop('disabled', true);
		getEvent = JSON.parse(data);
		if (getEvent != "none")
		{
			$('#welcomeButton').prop('disabled', false);
		}
	});
}

$(document).ready( function() {
	var eventChecker;
	setInterval(checkEvent,1000);





	$("#welcomeButton").click( function() {
		obj = new Object();
		obj.action = 'getEvent';
		$.post('server/user_control.php',obj,function(data){
			console.log(data);
			var currentEvent = JSON.parse(data);
			//TEMPORARY FIX, UNTIL BETTER DATABASE INITIALIZER
			currentEvent = "open";

			switch( currentEvent ){
				case "open":
					window.location.href = "user_login.php";
					break;
				default:
					console.log("The event is incorrect");
					break;
			}
		});
	});

	$("#adminButton").click( function() {
		window.location.href = "admin_login.php";
	});
});
