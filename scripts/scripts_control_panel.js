// Script for the admin control panel
//Universal event variable
var currentEvent;
//Universal ID variables
var ribbonID;
var toolbarID;
//Universal timer variables
var intervalID = '';
var startTime = 0;
var stopTime = 0;
var count = 0;
var temp = 0;

function startTimer(){
  //Sets the startTime if this is the first time the event is being set.
  console.log("StartTime: " + startTime);
  if(startTime == 0){
    var currentTime = new Date();
    var obj = new Object();
    obj.action = 'setStartTime';
    obj.startTime = Math.floor( currentTime.getTime() / 1000 ); //Send the current number of seconds, not miliseconds.
    $.post('server/admin_runner.php',obj,function(data){
      console.log("From startTimer" + data);
      startTime = obj.startTime;
    });
  }
  //assigns temp to be stopTime
  temp = stopTime;
  if(intervalID == ''){
    intervalID = window.setInterval(updateTimer,1000);
  }
}

function updateTimer(){
  var currentTime = new Date();
  var time;
  //Assigns time depending on which value of count it is.
  //Count = 0 means that this is the first instance of running the timer since last reset of the database. (stopTime is not defined)
  //Count = 1 updates the timer with a time that continually compounds one second every second.
  switch(count){
    case 0:
      time = Math.floor( currentTime.getTime() / 1000);
      break;
    case 1:
      temp++;
      time = temp; //assigns the time to be subtracted from as the growing temp
      break;
  }
  //Parses the difference in time(currentTime OR temp) and startTime
  //console.log("Current Time: " + time);
  var etime = time - startTime;
  //console.log("Elapsed Time: " + etime);
  var tempH = parseInt(etime/3600);
  var tempM = parseInt((etime%3600)/60);
  var tempS = (etime%60);
  var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
  $('#timer').html(response);
}

function stopTimer(){
  //Sets Stop Time
  var currentTime = new Date();
  var obj = new Object();
  obj.action = 'setStopTime';
  //Assigns the stopTime depending on what temp is.
  //if temp = 0, then there is no temp stored. assigns the current time when the stop button was clicked as the stopTimer
  //if temp != 0, then the default case is called and obj.startTimer is assigned to be temp.
  switch(temp){
    case 0:
      obj.stopTimer = Math.floor(currentTime.getTime()/1000);
      $.post('server/admin_runner.php',obj,function(data){
        console.log("From stopTimer" + data);
      });
      break;
    default:
      obj.stopTimer = temp;
      //updates the database value for stopTime as temp.
      $.post('server/admin_runner.php',obj,function(data){
        console.log("From stopTimer" + data);
      });
  }
  stopTime = obj.stopTimer;
  //Only runs this if statement when both startTime and stopTime are defined.
  if(stopTime != 0 && startTime != 0){
    count=1;
  }
  //Clears the setInterval
  if(intervalID != ''){
    window.clearInterval(intervalID);
    intervalID = '';
  }
  //Parses the difference between stopTime(currentTime OR temp)
  console.log(stopTime);
  var etime = stopTime - startTime;
  console.log("Elapsed Time: " + etime);
  var tempH = parseInt(etime/3600);
  var tempM = parseInt((etime%3600)/60);
  var tempS = (etime%60);
  var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
  $('#timer').html(response);
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
      $.post('server/admin_control.php', 'action=setRankFreetime', function(data){
        var temp = JSON.parse(data);
      });
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
      $.post('server/admin_control.php', 'action=setFinalRank', function(data){
      });
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
      $("#logoutButton").prop("disabled", false);
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
  startTime = parseInt(startTime);
  stopTime = parseInt(stopTime);
  updateUI();
  $("#teamData").css('background-color', 'DimGray');


  //Event Handler for toolbar buttons
  $(".toolbarButton").click(function() {
    $(".toolbarButton").css('background-color', '');
    $('.contentMod').css('display', 'none'); //Resets all to none by default
    var target; //to save the value of the pointer
    toolbarID = $(this).attr("id");
    $("#"+toolbarID).css('background-color', 'DimGray');
    switch (toolbarID) {
      case "teamData":
        target = $('#mod1');
        break; //get the pointer
      case "leaderboardLink":
        $("#leaderboardLink").css('background-color', '');
        $("#teamData").css('background-color', 'DimGray');
        window.open("leaderboard.php","_blank");
        target = $('#mod1');
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

$(window).unload(function(){
  $.ajax();
});
