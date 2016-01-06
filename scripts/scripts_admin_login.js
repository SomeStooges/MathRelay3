// Login page for administrators
$(document).ready( function() {
	$("#login").click( function() {
	var action = "adminLogin";
		$.post("./server/admin_control.php", action, function(data) {
			console.log(data);
		});
	});
});
