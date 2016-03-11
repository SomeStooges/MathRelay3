//Scripts for the m_settings module
//Universal variables
var newPassword, repeatPassword, currentPassword, t, auth;
function getSettings() {
  $.post('../server/admin_control.php', 'action=getSettings', function(data) {
  //  console.log(data);
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
    //WRITE GUI CHANGE HERE
    $('#showTeamID').prop('checked', showTeamID);
    $('#showNickname').prop('checked', showNickname);
    $('#showPoints').prop('checked', showPoints);
    $('#numTeamsShow').prop('placeholder', showTeamNum);
    $('#a').text('Set!');
    $('#numTeamsGen').prop('placeholder', numTeams);
    $('#numDigPass').prop('placeholder', passLength);
  });
}
function checkNewPassword(){
  newPassword = $('#newPassword').val().trim();
  repeatPassword = $('#repeatPassword').val().trim();
  currentPassword = $('#oldPassword').val().trim();
  if(newPassword === '' && repeatPassword === ''){
    $('#matchPass').text("Please enter a new password.");
    $('#matchPass').css('color', 'red');
    auth = 0;
  }
  if(newPassword !== currentPassword){
    $('#isNew').text('');
    if(newPassword === repeatPassword && newPassword !== '' && repeatPassword !== ''){
      $('#matchPass').text("The passwords match.");
      $('#matchPass').css('color', 'green');
      auth = 1;
    }
    if(newPassword !== repeatPassword && newPassword !== '' && repeatPassword !== ''){
      $('#matchPass').text("The passwords don't match.");
      $('#matchPass').css('color', 'red');
      auth = 0;
    }
  }else{
    $('#isNew').text("Please enter a new password that is different from the old one.");
    $('#isNew').css('color', 'red');
    auth = 0;
  }
}
function startCheck(){
  t = setInterval(checkNewPassword, 1000);
}
function clearCheck(){
  clearInterval(t);
}
function setAdminPassword(){
  $('#passComplete').text('');
  var passHandler = new Object();
  passHandler.action = 'adminLogin';
  passHandler.adminPassword = $('#oldPassword').val().trim();
  $.post("../server/admin_control.php", passHandler, function(data) {
    data = JSON.parse(data);
    if (data === "Successful") {
      if(auth === 1){
        passHandler.action = 'setSettings';
        passHandler.c = 'admin';
        passHandler.n = 'adminPassword';
        passHandler.v = newPassword;
        $.post("../server/admin_control.php", passHandler, function(data){});
        $('#passComplete').text('New Password Set!');
        $('#passComplete').css('color', 'green');
      }else{
        $('#passComplete').text('Please make sure that you entered a valid new password, and that your passwords match.');
        $('#passComplete').css('color', 'red');
      }
    }
    else {
      $('#checkPass').text('Incorrect Password.');
      $('#checkPass').css('color', 'red');
    }
  });
}

$(document).ready( function(){
  //Upon reloading, retrieve current settings
  getSettings();
  var obj = new Object();
  obj.action = 'setSettings';

  //Handles checkbox values
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
    console.log(Math.floor(teamShow));
    if(Math.floor(teamShow) === parseInt(teamShow) && Math.abs(teamShow) === parseInt(teamShow)){
      obj.c = 'display';
      obj.n = 'numTeams';
      obj.v = teamShow;
      $.post('../server/admin_control.php', obj, function(data) {
        var temp = JSON.parse(data);
      });
      $('#a').text('Set!');
      $('#a').css('color', 'green');
      $('#error').text('');
    }else{
      $('#a').text('');
      $('#error').text('Must be a positive integer.');
      $('#error').css('color', 'red');
    }
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
  $('#repeatPassword').focus(function(){
    startCheck();
  });
  $('#repeatPassword').blur(function(){
    clearCheck();
    if(newPassword === repeatPassword && newPassword !== '' && repeatPassword !== ''){
      $('#matchPass').text('');
    }
  });

  //Validates old admin password, sets new password.
  $('#setAdminPass').click(function(){
    setAdminPassword();
  });

  $('#cleanupParagraph').blur(function(){
    console.log('got this far');
  });

  $('#saveCleanupParagraph').click(function(){
    var cleanupText = $('#cleanupParagraph').val().trim();
    console.log(cleanupText);
    console.log ('hello world');
    var obj = new Object;
    obj.action = 'setCleanupParagraph';
    obj.paragraph = cleanupText;
    $.post("../server/admin_control.php", obj, function(data) {
      console.log(data);
      $('#cleanupParagraph').val( JSON.parse(data) );
    });
  });

  $('#numTeamsGen').focus(function(){
    $('#s1').text('');
  });
  $('#numTeamsGen').keypress(function(){
    if(event.which == 13){
      $('#saveTeams').click();
    }
  });
  //Saves number of teams to be generated
  $('#saveTeams').click(function(){
    var teamGen = $('#numTeamsGen').val().trim();
    if(teamGen !== ''){
      if(Math.floor(teamGen) === parseInt(teamGen) && Math.abs(teamGen) === parseInt(teamGen)){
        obj.c = 'reset';
        obj.n = 'numTeams';
        obj.v = teamGen;
        $.post('../server/admin_control.php', obj);
        $('#s1').text('Saved!');
        $('#s1').css('color', 'green');
        $('#s3').text('');
      }else{
        $('#s1').text('');
        $('#s3').text('Must be a positive integer.');
        $('#s3').css('color', 'red');
      }
    }else{
      $('#s1').text('');
      $('#s3').text('Please enter a valid integer.');
      $('#s3').css('color', 'red');
    }
  });

  $('#numDigPass').focus(function(){
    $('#s2').text('');
  });
  $('#numDigPass').keypress(function(){
    if(event.which == 13){
      $('#savePass').click();
    }
  });
  //Saves length of passwords to be generated
  $('#savePass').click(function(){
    var digPass = $('#numDigPass').val().trim();
    if(digPass !== ''){
      if(Math.floor(digPass) === parseInt(digPass) && Math.abs(digPass) === parseInt(digPass)){
        obj.c = 'reset';
        obj.n = 'passwordLength';
        obj.v = digPass;
        $.post('../server/admin_control.php', obj);
        $('#s2').text('Saved!');
        $('#s2').css('color', 'green');
        $('#s4').text('');
      }else{
        $('#s2').text('');
        $('#s4').text('Must be a positive integer.');
        $('#s4').css('color', 'red');
      }
    }else{
      $('#s2').text('');
      $('#s4').text('Please enter a valid integer.');
      $('#s4').css('color', 'red');
    }
  });

  //Resets points, passwords, and number of teams
  $("#reset_button").click(function() {
    $.post("../server/admin_control.php", 'action=adminReset', function(data) {
      window.top.location.reload();
    });
  });
});
