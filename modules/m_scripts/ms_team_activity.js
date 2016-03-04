//Scripts for the m_team_activity module
var lastUp = 0;

function parseTime(time){
  time = time - startTime;

  var tempH = Math.abs(parseInt(time/3600));
  var tempM = Math.abs(parseInt((time%3600)/60));
  var tempS = Math.abs(time%60);

  var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
  return response;
}

function getTeamLog() {
  obj = new Object();
  obj.action = "getTeamLog";
  obj.lastUp = lastUp;
  $.post('../server/admin_runner.php', obj, function(data) {
    data = JSON.parse(data);
    if(data.length != 0){
      for(i=0;i<data.length;i++){
        var utime = data[i][1];
        var htime = parseTime(utime);
        var m = "<td>";
        m += " Question " + data[i][2] + "<br>";
        m += " Award: " + data[i][3] + "<br>";
        m += " Total: " + data[i][4] + "<br>";
        m += " Time: " + htime + '<br>';
        m += "</td>";
        $("#t"+data[i][0]).after(m);
      }
      lastUp = data[ data.length-1 ][1];
    }
  });
}

$(document).ready( function(){
  getTeamLog();
  setInterval(getTeamLog,1500);
  $("#freezeButton").click( function(){
    console.log("Freeze button clicked. Needs actual functionality");

  });
});
