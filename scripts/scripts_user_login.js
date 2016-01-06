// Script for the user_login.php page
$(document).ready( function() {
	$("#user_login").click( function() {
		var action = "action=user_login";
		$.post("server/user_controls.php", action, function(data) {
			console.log(data)

			if (data) {
				window.location.href = "answer_sheet.php";
			}
			else {
				console.log("Login failed");
			}
		}); 
	});
});
