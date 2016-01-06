// Login page for administrators
$(document).ready( function() {
	$("#admin_login").click( function() {
	var action = "action=adminLogin";
		$.post("./server/admin_control.php", action, function(data) {
			console.log(data);
		});
	});
});
