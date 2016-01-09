// Script for the admin control panel
$(document).ready( function() {
	$("#reset_button").click( function() {
		var action = 'action=adminReset';
		$.post("./server/admin_control.php", action, function(data) {
			console.log(data);
		});
	});
	
	$('#leaderboardLink').click (function(){
		window.location.href="leaderboard.php";
	});
	$("#logoutButton").click( function() {
		action = "action=adminLogout";
		$.post("server/admin_control.php", action, function(data) {
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
