// Scripts for the corresponding answer_sheet.php page
$(document).ready( function() {
	var action;
	/*$("#nicknameInput").click( function() {
		action = "action=userLogin";
		$.post("server/user_control.php", action, function(data) {
			console.log(data)

			if (data) {
				window.location.href = "";
			}
			else {
				console.log("");
			}
			
		}); 
	});*/
	
	$("#logoutButton").click( function() {
		action = "action=userLogout";
		$.post("server/user_control.php", action, function(data) {
			console.log(data)
			
			if(data){
				window.location.href = "index.php";
			}
			else {
				console.log("Logout failed.");
			}
		
		
		});
	});
});
