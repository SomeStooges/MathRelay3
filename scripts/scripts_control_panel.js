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
});
