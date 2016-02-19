//Script for the leaderboard.
function updateLeaderboard(){
	obj = new Object;
	obj.action = 'updateLeaderboard';
	$.post('server/admin_runner.php',obj,function(data){
		console.log('Leaderboard data returning: ' + data);
		data = JSON.parse(data);
		var rows2 = new Array();
		for(i=0;i<data.length;i++){
			rows2[i] = "<tr id='row" + i + "'><td> "+ data[i][0] +" </td><td> "+ data[i][1] +" </td></tr>";
		}
		rows1 = rows2.slice(0,5).join("");
		rows2 = rows2.splice(5,10).join("");

		$('#leaderboardTable1').html(rows1);
		$('#leaderboardTable2').html(rows2);
	});
}

$(document).ready(function() {
	setInterval(updateLeaderboard,1000);

	$("#back_button").click(function() {
		window.location.href = "control_panel.php";
	});
});
