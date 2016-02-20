// Script for the admin control panel
//Universal event variable
var currentEvent;
//Universal ID variables
var ribbonID;
var toolbarID;
//Universal timer variables
var intervalID = '';
var startTime;
var stopTime;

function startTimer(){
  //Sets the startTime if this is the first time the event is being set.
  console.log("StartTime: " + startTime);
  if(startTime == 0){
    var currentTime = new Date;
    var obj = new Object;
    obj.action = 'setStartTime';
    obj.startTime = Math.floor( currentTime.getTime() / 1000 ); //Send the current number of seconds, not miliseconds.
    $.post('server/admin_runner.php',obj,function(data){
      console.log("From startTimer" + data);
      startTime = obj.startTime;
    });
    if(intervalID == ''){
      intervalID = window.setInterval(updateTimer,1000);
    }
  }
}

function updateTimer(){
  var currentTime = new Date;
  var time = Math.floor( currentTime.getTime() / 1000 );
  console.log("Current Time: " + time);
  var etime = time - startTime;
  console.log("Elapsed Time: " + etime);
  var tempH = parseInt(etime/3600);
  var tempM = parseInt((etime%3600)/60);
  var tempS = (etime%60);
  var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
  $('#timer').html(response);
}

function stopTimer(){
  if(stopTime == 0){
    var currentTime = new Date;
    var obj = new Object;
    obj.action = 'setStopTime';
    obj.stopTimer = currentTime.getTime();
    $.post('server/admin_runner.php',obj,function(data){
      console.log("From stopTimer" + data);
    });
  }
  if(intervalID != ''){
    window.clearInterval(intervalID);
  }
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
//Old function, fate TBD --------------------------------------------------------------------------------------------------------------
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

function updateEvent(uEvent){
  obj = new Object();
  obj.action = 'updateEvent';
  obj.uEvent = uEvent;
  $.post('server/admin_control.php',obj, function(data){
    var bID = JSON.parse(data);
    $('.ribbonButton').css('background-color','');
    $('#'+bID).css('background-color','#011858');
  });

  switch (ribbonID) {
    case "none":
      $(".ribbonButton").prop("disabled", true);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;

    case "open":
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#start").prop("disabled", false);
      break;

    case "start":
      startTimer();
      $(".ribbonButton").prop("disabled", false);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#close").prop("disabled", true);
      $("#start").prop("disabled", true);
      break;

    case "freetime":
      startTimer();
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#start").prop("disabled", true);
      $("#close").prop("disabled", true);
      break;

    case "freezeLeaderboard":
      startTimer();
      $("#ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);

      break;

    case "stop":
      stopTimer();
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#stop").prop("disabled", true);
      //$.post("server/admin_runner.php", obj, function(data){});
      break;

    case "close":
      stopTimer();
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;
  }

}

function updateUI(){
  currentEvent = $("#cEvent").text().trim();
  console.log("Current Event: " + currentEvent);
  $('#'+currentEvent).css('background-color','#011858');
  console.log(currentEvent);
  toggleButtons(currentEvent);
}

function toggleButtons(ribbonID){
  switch (ribbonID) {
    case "none":
      $(".ribbonButton").prop("disabled", true);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;

    case "open":
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#start").prop("disabled", false);
      break;

    case "start":
      startTimer();
      $(".ribbonButton").prop("disabled", false);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#close").prop("disabled", true);
      $("#start").prop("disabled", true);
      break;

    case "freetime":
      startTimer();
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#start").prop("disabled", true);
      $("#close").prop("disabled", true);
      break;

    case "freezeLeaderboard":
      startTimer();
      $("#ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);

      break;

    case "stop":
      stopTimer();
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#stop").prop("disabled", true);
      //$.post("server/admin_runner.php", obj, function(data){});
      break;

    case "close":
      stopTimer();
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;
  }
}

//---------------------------------------------------------------------------------------------------------

$(document).ready(function() {
  startTime = $('#startTimeDiv').html().trim();
  stopTime = $('#stopTimeDiv').html().trim();
  updateUI();


  //Event Handler for toolbar buttons
  $(".toolbarButton").click(function() {
    $('.contentMod').css('display', 'none'); //Resets all to none by default
    var target; //to save the value of the pointer
    toolbarID = $(this).attr("id");
    switch (toolbarID) {
      case "teamData":
        target = $('#mod1');
        break; //get the pointer
      case "leaderboardLink":
        window.open("leaderboard.php");
        break;
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



  //Event Handler for event buttons
  $('.ribbonButton').click(function(){
    ribbonID = $(this).attr('id');
    updateEvent(ribbonID);
    toggleButtons(ribbonID);
  });

  //Event Handler for logout button
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
