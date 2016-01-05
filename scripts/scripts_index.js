// Java Script for the welcome page
$(document).ready( function() {
	$("welcome_button").click( function() {
		window.location.href = "user_login.php";
	});

	$("admin_button").click( function() {
		window.location.href = "admin_login.php";
	});
});


