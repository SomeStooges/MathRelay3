//Script for the leaderboard.
var currentEvent;
var t,s;
var count = 0;

function updateLeaderboard(){
	var tempRows1, tempRows2;
	$.post('server/admin_runner.php', 'action=getEvent', function(data) {
		currentEvent = JSON.parse(data);
		console.log(currentEvent);
		switch(currentEvent){
			case 'open':
			case 'start':
			case 'freetime':
			case 'close':
				obj = new Object();
				obj.action = 'updateLeaderboard';
				$.post('server/admin_runner.php',obj,function(data){
					data = JSON.parse(data);
					var rows2 = new Array();
					rows2[0] = "<tr id='title'><th class='rank' id='rank1'>Rank</th><th class='left' id='name1'>Name</th><th class='right' id='points1'>Total <br>Points</th></tr>";
					for(i=0;i<data.length;i++){
						rows2[i+1] = "<tr id='row" + i + "'><td class='rank'>"+(i+1)+"</td><td class='left'> "+ data[i][0] +" </td><td class='right'> "+ data[i][1] +" </td></tr>";
					}

					//var half = Math.ceil(data.length/2);

					rows1 = rows2.slice(0,4).join("");
					rows2 = "<tr id='title'><th class='rank' id='rank2'>Rank</th><th class='left' id='name2'>Name</th><th class='right' id='points2'>Total <br>Points</th></tr>" + rows2.splice(4,data.length).join("");
					tempRows1 = rows1;
					tempRows2 = rows2;

					$('#leaderboardTable1').html(rows1);
					$('#leaderboardTable2').html(rows2);
					/*
					$('#row0').css('color', 'rgb(193, 161, 25)');
					$('#row0').css('font-size', '150%');

					$('#row1').css('color', 'rgb(167, 170, 171)');
					$('#row1').css('font-size', '150%');

					$('#row2').css('color', 'rgb(158, 103, 9)');
					$('#row2').css('font-size', '150%');*/
				});
				break;
			case 'none':
			case 'freezeLeader':
			case 'stop':
			default:
				$('#leaderboardTable1').html(tempRows1);
				$('#leaderboardTable2').html(tempRows2);
				$('#row0').css('color', 'rgb(193, 161, 25)');
				$('#row0').css('font-size', '150%');

				$('#row1').css('color', 'rgb(167, 170, 171)');
				$('#row1').css('font-size', '150%');

				$('#row2').css('color', 'rgb(158, 103, 9)');
				$('#row2').css('font-size', '150%');
				break;
			}
	});

}

$(document).ready(function() {
	updateLeaderboard();
	t = window.setInterval(updateLeaderboard,1000);




	$("#back_button").click(function() {
		window.location.href = "control_panel.php";
	});
});
