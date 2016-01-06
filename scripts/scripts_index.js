// Java Script for the welcome page
$(document).ready( function() {
	$("#welcomeButton").click( function() {
		
		obj = new Object;
		obj.action = 'getEvent';
		$.post('../server/user_control.php',obj,function(data){
			console.log(data);
			var currentEvent = JSON.parse(data);
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


