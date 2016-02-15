// Script for the admin control panel
//Universal timer variables
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
}

function updateUI(){
  var currentEvent = $("#cEvent").text().trim();
  $('#'+currentEvent).css('background-color','#011858');
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
      timer();
      $(".ribbonButton").prop("disabled", false);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#close").prop("disabled", true);
      $("#start").prop("disabled", true);
      var currentTime = new Date();
      obj = new Object();
      obj.action = 'setStartTime';
      obj.startTime = currentTime.getTime();
      $.post("server/admin_runner.php", obj, function(data) {});
      break;

    case "freetime":
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#start").prop("disabled", true);
      $("#close").prop("disabled", true);
      break;

    case "freezeLeaderboard":
      $("#ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);

      break;
    case "stop":
      clearTimeout(t);
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#stop").prop("disabled", true);
      break;

    case "close":
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;
  }
}


















$(document).ready(function() {
  updateUI();
  //Event handler for stop event button
  $("#stop").click(function() {
    clearTimeout(t);
    $("#start").prop("disabled", false);
  });

  //Event Handler for toolbar buttons
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

  //Event Handler for leaderboard link
  $('#leaderboardLink').click(function() {
    window.location.href = "leaderboard.php";
  });

  //Event Handler for event buttons
  $('.ribbonButton').click(function(){
    var ribbonID = $(this).attr('id');
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
