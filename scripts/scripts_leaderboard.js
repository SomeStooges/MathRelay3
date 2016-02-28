//Script for the leaderboard.
function updateLeaderboard(){
	obj = new Object;
	obj.action = 'updateLeaderboard';
	$.post('server/admin_runner.php',obj,function(data){
		data = JSON.parse(data);
		var rows2 = new Array();
		rows2[0] = "<tr id='title'><th class='left'>Name</th><th class='right'>Total Points</th></tr>";
		for(i=0;i<data.length;i++){
			rows2[i+1] = "<tr id='row" + i + "'><td class='left'> "+ data[i][0] +" </td><td class='right'> "+ data[i][1] +" </td></tr>";
		}

		var half = Math.ceil(data.length/2);

		rows1 = rows2.slice(0,half).join("");
		rows2 = "<tr id='title'><th class='left'>Name</th><th class='right'>Total Points</th></tr>" + rows2.splice(half,data.length).join("");

		console.log(rows2);

		$('#leaderboardTable1').html(rows1);
		$('#leaderboardTable2').html(rows2);
		$('#row0').css('color', 'rgb(193, 161, 25)');
		$('#row0').css('font-size', '150%');

		$('#row1').css('color', 'rgb(115, 123, 125)');
		$('#row1').css('font-size', '150%');

		$('#row2').css('color', 'rgb(158, 103, 9)');
		$('#row2').css('font-size', '150%');
	});
}

$(document).ready(function() {
	updateLeaderboard();
	//window.setInterval(updateLeaderboard,1000);

	$("#back_button").click(function() {
		window.location.href = "control_panel.php";
	});
});
