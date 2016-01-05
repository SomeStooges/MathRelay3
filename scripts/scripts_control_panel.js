// Script for the admin control panel
$(document).ready( function() {
	$("#reset_button").click( function() {
		var action = 'adminReset';
		$.post("/MathRelay3/server/admin_controls.php", action, function(data) {
			console.log(data);
		});
	});
});
