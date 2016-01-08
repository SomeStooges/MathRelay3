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
	$("#submitNickname").click( function(){
		 obj = new Object;
		 obj.action = "submitNickname";
		 obj.nickname =  $("#nicknameInput").val();
		$.post("server/user_control.php", obj, function(data) {
			console.log(data)
			console.log(nickname)
			if(data){
				$("#nickname").text(obj.nickname);
				console.log(data);
			}
			else {
				console.log("Oops! Something went wrong. :(")
			}
			
		});
			
	});
});
