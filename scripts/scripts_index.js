// Java Script for the welcome page
$(document).ready( function() {
	$("welcome_button").click( function() {
		window.location.href = "user_login.php";
		console.log("welcome_button was pushed");
	});

	$("admin_button").click( function() {
		window.location.href = "admin_login.php";
	});
});


