//Scripts for the m_settings module

function getSettings() {
  $.post('../server/admin_control.php', 'action=getSettings', function(data) {
    console.log(data);
    data = JSON.parse(data);
    /* Data is a two dimensional array. THe first index determines which setting it is for.
    the second index lists the class, name, and value of the setting, in that order (from 0 to 2).
    */
    var showTeamID = data[5][2] == 'true';
    var showNickname = data[6][2] == 'true';
    var showPoints = data[7][2] == 'true';
    var showTeamNum = data[11][2];
    var numTeams = data[12][2];
    var passLength = data[13][2];
    console.log(showTeamID);
    $('#showTeamID').prop('checked', showTeamID);
    $('#showNickname').prop('checked', showNickname);
    $('#showPoints').prop('checked', showPoints);
    $('#numTeamsShow').prop('placeholder', showTeamNum);
    $('#a').text('Set!');

    $('#numTeamsGen').prop('placeholder', numTeams);
    $('#numDigPass').prop('placeholder', passLength);






    //WRITE GUI CHANGE HERE
  });
}

$(document).ready( function(){
  //Upon reloading, retrieve current settings
  getSettings();

  var obj = new Object();
  obj.action = 'setSettings';
  //Show team ID?
  //Show Nickname?
  //Show Points?
  $('.checkbox').click(function(){
    var checkboxID = $(this).attr("id");
    var value;
    obj.c = 'display';
    switch(checkboxID){
      case 'showTeamID':
        value = $('#showTeamID').prop('checked');
        obj.n = 'idColumn';
        obj.v = value;
        break;
      case 'showNickname':
        value = $('#showNickname').prop('checked');
        obj.n = 'nicknameColumn';
        obj.v = value;
        break;
      case 'showPoints':
        value = $('#showPoints').prop('checked');
        obj.n = 'totalPoints';
        obj.v = value;
        break;
    }
    $.post('../server/admin_control.php', obj, function(data) {});
  });



  //Number of teams displayed in leaderboard
  $('#numTeamsShow').focus( function(){
    $('#a').text('');
  });
  $('#numTeamsShow').blur( function(){
    var teamShow = $('#numTeamsShow').val().trim();
    obj.c = 'display';
    obj.n = 'numTeams';
    obj.v = teamShow;
    $.post('../server/admin_control.php', obj, function(data) {
      var temp = JSON.parse(data);
      console.log("setSettings called: "+temp);
    });
    $('#a').text('Set!');
  });

  //Number of questions to be generated
  //WARNING! CAN BREAK PROGRAM UPON RESET IF ENTERED NUMBER OF QUESTIONS TO BE GENERATED > 40!
  /*$('#numQuestions').blur( function(){
    var numQuestions = $('#numQuestions').val().trim();
    obj.c = 'answerkey';
    obj.n = 'numQuestion';
    obj.v = numQuestions;
    $.post('../server/admin_control.php', obj, function(data){});
  });*/

  //Password Reset

  //Saves number of teams to be generated
  $('#saveTeams').click(function(){
    var teamGen = $('#numTeamsGen').val().trim();
    if(teamGen !== ''){
      obj.c = 'reset';
      obj.n = 'numTeams';
      obj.v = teamGen;
      $.post('../server/admin_control.php', obj);
    }
    $('#s1').text('Saved!');
  });
  //Saves length of passwords to be generated
  $('#savePass').click(function(){
    var digPass = $('#numDigPass').val().trim();
    if(digPass !== ''){
      obj.c = 'reset';
      obj.n = 'passwordLength';
      obj.v = digPass;
      $.post('../server/admin_control.php', obj);
      $('#s2').text('Saved!');
     }
  });

  $("#reset_button").click(function() {
    console.log('checkpoint 1');
    $.post("../server/admin_control.php", 'action=adminReset', function(data) {
      console.log(data);
      window.top.location.reload();
    });
  });
});
