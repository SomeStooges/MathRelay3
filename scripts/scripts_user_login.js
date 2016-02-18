// Script for the user_login.php page
function checkEvent(){
	$.post('server/user_runner.php', 'action=getEvent', function(data) {
		var checker = JSON.parse(data);
		console.log(checker);
		switch(checker){
			case "close":
						window.location.href = "index.php";
						break;
			case "none":
						window.location.href = "index.php";
						break;
			case "stop":
						window.location.href = "index.php";
						break;
		}
	});
}
$(document).ready( function() {
	checkEvent();
	setInterval(checkEvent, 1000);
	$("#back_button").click(function() {
		window.location.href = "index.php";
	});


	$("#teamPassword").keypress(function(){
		if(event.which == 13){
			$("#user_login").click();
		}
	});

	$("#user_login").click( function() {
		obj = new Object();
		obj.action = "userLogin";
		obj.teamID = $("#teamID").val();
		obj.teamPassword = $("#teamPassword").val();

		$.post("server/user_control.php", obj, function(data) {
			var info = JSON.parse(data);
			if (info == "Successful") {
				window.location.href = "answer_sheet.php";
			}
			else {
				$("#passErr").text("Your password or team ID is incorrect.");
				//Whatever else happens when a login fails...
			}
		});
	});
});
