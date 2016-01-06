// Login page for administrators
$(document).ready( function() {
	$("#admin_login").click( function() {
	var action = "action=adminLogin";
		$.post("./server/admin_control.php", action, function(data) {
			console.log(data);

			if (data) {
				window.location.href="../MathRelay3/control_panel.php";
			}
			else {
				console.log("Not authorized");
			}
		});
	});
});
