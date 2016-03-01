//Scripts for the m_team_data module

//Requests team_data database from the server and reprints the table's contents
function parseTime(time){
  time = time - startTime;

  var tempH = Math.abs(parseInt(time/3600));
  var tempM = Math.abs(parseInt((time%3600)/60));
  var tempS = Math.abs(time%60);

  var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
  return response;
}

function updateTable(){
  $.post('/MathRelay3/server/admin_runner.php','action=updateTeamData',function(data){
    //console.log(data);
    var teamData = JSON.parse(data);
    p = "<tr><th>Current Rank</th><th>Team ID</th><th>Team Nickname</th><th>Password</th><th>Points</th><th>Rank at Freetime</th><th>Last Point Time</th><th>Last Check-in Time</th><th>Final Rank</th></tr>";
    for(i=0;i<teamData.length;i++){
      p += "<tr id='dataRow" + i + "'>";
      rank = i + 1;
      p += "<td> " + rank + " </td>";
      for(j=0;j<teamData[i].length;j++){
        if( j == 5 || j == 6){
          if( teamData[i][j] == 0){
            teamData[i][j] = "---";
          }else{
            teamData[i][j] = parseTime(teamData[i][j]);
          }
        }
        p += "<td>" + teamData[i][j] + "</td>";
      }
      p += "</tr>";
    }

    $("#teamDataTable").html(p);
  });
}

$(document).ready( function(){
  window.setInterval(updateTable,1000);

});
