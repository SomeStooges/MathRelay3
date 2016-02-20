//Scripts for the m_team_data module

//Requests team_data database from the server and reprints the table's contents
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
