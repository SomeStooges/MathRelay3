// Script for the admin control panel
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

function timer() {
  t = setTimeout(add, 1000);
}

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  $("#timer").text((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
  timer();
}

function setCleanupParagraph(inputText) {
  obj = new Object();
  obj.action = 'setCleanupParagraph';
  obj.paragraph = inputText;
  $.post('server/admin_control.php', obj, function(data) {
    console.log(data);
    data = JSON.parse(data);

    //WRITE GUI CHANGE HERE
  });
}

function getTeamData() {
  $.post('server/admin_control.php', 'action=getTeamData', function(data) {
    console.log(data);
    data = JSON.parse(data);
    /* Returns a two dimensional array containg values of team data, omiting the history and attempts columns
    	The first index contains the record number
    	The second index contains the table column, read left to right starting from 0.
    */

    //WRITE GUI CHANGE HERE
  });
}

function getAdminLog() {
  $.post('server/admin_control.php', 'action=getAdminLog', function(data) {
    console.log(data);
    data = JSON.parse(data);
    /* Data contains an object array, with each column name as a property and each record as an index
     */

    //WRITE GUI CHANGE HERE
  });
}

function getAnswerKey() {
  $.post('server/admin_control.php', 'action=getAnswerKey', function(data) {
    console.log(data);
    data = JSON.parse(data);
    /* Returns a two dimensional array containg values of team data, omiting the history and attempts columns
    	The first index contains the record number
    	The second index contains the question number, level 3 answer, level 2 answer, and level 1 answer.
    */

    //WRITE GUI CHANGE HERE
    var message = "<table>";
    message += "<tr> <th>Question<br>Number</th><th>Level 3<br>Answer</th><th>Level 2<br>Answer</th><th>Level 1<br>Answer</th>";
    for (var i = 0; i < data.length; i++) {
      message += "<tr>";
      for (var j = 0; j < data[i].length; j++) {
        message += "<td>" + data[i][j] + "</td>";
      }
      message += "</tr>";
    }

    message += "</table>";
    $("#content").html(message);

  });
}

function getTeamLog() {
  $.post('server/admin_control.php', 'action=getTeamLog', function(data) {
    data = JSON.parse(data);
    console.log("getTeamLog called");
    var message = "<p>Some HTML should be returned via a variable string from the database here to display team activity logs!</p>";
    $("#content").html(message);
    console.log(message);
  });
}

function getStatistics() {
  $.post('server/admin_control.php', 'action=getStatistics', function(data) {
    var message = "<div>Some HTML should be returned via a variable string from the database here to display statistics!</div>";
    $("#content").html(message);
  });
}

function getSettings() {
  $.post('server/admin_control.php', 'action=getSettings', function(data) {
    console.log(data);
    data = JSON.parse(data);
    /* Data is a two dimensional array. THe first index determines which setting it is for.
    the second index lists the class, name, and value of the setting, in that order (from 0 to 2).
    */

    //WRITE GUI CHANGE HERE
  });
}

function reloadModules() {
  $.post('/mathrelay3/modules/m_team_data.php', function(data) {
    $('#mod1').html(data);
    console.log(data);
    console.log('something worked!');
  });
  $.post('/mathrelay3/modules/m_answer_key.php', function(data) {
    $('#mod3').html(data);
  });
  $.post('/mathrelay3/modules/m_team_activity.php', function(data) {
    $('#mod4').html(data);
  });
  $.post('/mathrelay3/modules/m_statistics.php', function(data) {
    $('#mod5').html(data);
  });
  $.post('/mathrelay3/modules/m_settings.php', function(data) {
    $('#mod6').html(data);
  });
}

$(document).ready(function() {
  $("#start").click(function() {
    timer();
    $("#start").prop("disabled", true);
  });

  $("#stop").click(function() {
    clearTimeout(t);
    $("#start").prop("disabled", false);
  });
  $(".toolbarButton").click(function() {
    $('.contentMod').css('display', 'none'); //Resets all to none by default
    var target; //to save the value of the pointer
    switch ($(this).attr("id")) {
      case "teamData":
        target = $('#mod1');
        break; //get the pointer
      case "answerKey":
        target = $('#mod3');
        break;
      case "teamLog":
        target = $('#mod4');
        break;
      case "statistics":
        target = $('#mod5');
        break;
      case "settings":
        target = $('#mod6');
        break;
    }
    $(target).css('display', 'block'); //display the pointer's reference
  });


  $('#leaderboardLink').click(function() {
    window.location.href = "leaderboard.php";
  });

  $("#logoutButton").click(function() {
    action = "action=adminLogout";
    $.post("server/admin_control.php", action, function(data) {
      console.log(data);

      if (data) {
        window.location.href = "index.php";
      } else {
        console.log("Logout failed.");
      }
    });
  });
});
