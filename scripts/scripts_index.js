// Java Script for the welcome page
$(document).ready( function() {
	$("#welcomeButton").click( function() {
		window.location.href = "user_login.php";
	});

	$("#adminButton").click( function() {
		window.location.href = "admin_login.php";
	});
});


