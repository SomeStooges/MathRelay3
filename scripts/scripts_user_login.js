// Script for the user_login.php page
$(document).ready( function() {
	$("#user_login").click( function() {
		obj = new Object;
		obj.action = "userLogin";
		obj.teamID = $("#teamID").val();
		obj.teamPassword = $("#teamPassword").val();

		$.post("server/user_control.php", obj, function(data) {
			var info = JSON.parse(data);			
			if (info == "Successful") {
				window.location.href = "answer_sheet.php";
			}
			else {
				console.log("Login failed");
				//Whatever else happens when a login fails...
			}
		}); 
	});
});
