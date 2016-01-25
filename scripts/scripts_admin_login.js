// Login page for administrators
$(document).ready( function() {
	$("#back_button").click( function() {
		window.location.href="index.php";
	});
	$("#adminPassword").keypress(function(){
		if(event.which == 13){
			$("#admin_login").click();
		}
	});

	$("#admin_login").click( function() {
		obj = new Object();
		obj.action = "adminLogin";
		obj.adminPassword = $('#adminPassword').val();

		$.post("./server/admin_control.php", obj, function(data) {
			console.log(data);
			data = JSON.parse(data);
			if (data == "Successful") {
				console.log(obj.adminPassword);
				window.location.href="control_panel.php";
			}
			else {
				console.log(obj.adminPassword);
				$('#adminreply').text('Incorrect password.');
			}
		});
	});
});
