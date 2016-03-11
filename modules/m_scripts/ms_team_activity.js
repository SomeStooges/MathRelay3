//Scripts for the m_team_activity module
var lastUp = 0;
var t;
var counter;

function parseTime(time){
  time = time - startTime;

  var tempH = Math.abs(parseInt(time/3600));
  var tempM = Math.abs(parseInt((time%3600)/60));
  var tempS = Math.abs(time%60);

  var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
  return response;
}

function startInterval(){
  t=setInterval(getTeamLog,1500);
}

function stopInterval(){
  clearInterval(t);
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
  startInterval();
  counter = 1;
  $("#freezeButton").click( function(){
    switch(counter){
      case 1:
        stopInterval();
        counter=0;
        $("#freezeButton").text('Unfreeze Log');
        break;
      case 0:
        startInterval();
        counter=1;
        $("#freezeButton").text('Freeze Log');
        break;
    }
  });
});
