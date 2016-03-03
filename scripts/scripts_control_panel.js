// Script for the admin control panel
//Universal event variable
var currentEvent;
//Universal ID variables
var ribbonID;
var toolbarID;
//Universal timer variables
var count = 0;
var temp = 0;

var EventTimer = function(startTime, elapsedTime){
  this.startTime = startTime;     //The time, in seconds since epoch, when the timer started
  this.elapsedTime = elapsedTime; //The number of seconds between the current time and the start time, or until the stop time was pushed
  this.intervalID;                //Saves the reference ID of the window.setInterval

  this.startTimer = function(){
    console.log("Starting the Timer");
    var date = new Date();
    this.startTime = parseInt(Math.floor( date.getTime() / 1000 ));
    console.log("this.startTime : " + this.startTime + " " + typeof this.startTime);
    //this.intervalID = window.setInterval(this.updateTimer,1000);
    this.intervalID = window.setInterval(function(){myTimer.updateTimer()}, 1000);
  }

  this.parseToTimerDisplay = function(etime){
    var tempH = parseInt(etime/3600);
    var tempM = parseInt((etime%3600)/60);
    var tempS = (etime%60);
    var response = (tempH ? (tempH > 9 ? tempH : "0" + tempH) : "00") + ":" + (tempM ? (tempM > 9 ? tempM : "0" + tempM) : "00") + ":" + (tempS > 9 ? tempS : "0" + tempS);
    $('#timer').html(response);
  }

  this.updateTimer = function(){
    console.log("Updating the Timer");
    var date = new Date();
    console.log("datatype : " + this.startTime)
    this.elapsedTime = parseInt(Math.floor( date.getTime() / 1000 ) - this.startTime);
    this.parseToTimerDisplay(this.elapsedTime);
  }

  this.stopTimer = function(){
    console.log("Stopping the Timer");
    window.clearInterval(this.intervalID);
    this.updateTimer();
  }
}

function setCleanupParagraph(inputText) {
  obj = new Object();
  obj.action = 'setCleanupParagraph';
  obj.paragraph = inputText;
  $.post('server/admin_control.php', obj, function(data) {
    console.log(data);
    data = JSON.parse(data);
  });
}

function updateEvent(uEvent){
  obj = new Object();
  obj.action = 'updateEvent';
  obj.uEvent = uEvent;
  $.post('server/admin_control.php',obj, function(data){
    var bID = JSON.parse(data);
    console.log("bID : " + bID);
    switch (bID) {
      case "none":
        break;

      case "open":
        break;

      case "start":
        myTimer.startTimer();
        console.log("myTimer.updateTimer : " + myTimer.updateTimer);
        var obj = new Object();
        obj.action = 'setStartTime';
        obj.startTime = myTimer.startTime;
        $.post('server/admin_runner.php',obj);
        break;

      case "freetime":
        $.post('server/admin_control.php', 'action=setRankFreetime', function(data){
          var temp = JSON.parse(data);
        });
        break;

      case "freezeLeaderboard":
        break;

      case "stop":
        var obj = new Object();
        obj.action = 'setStopTime';
        obj.stopTime = myTimer.elapsedTime;
        $.post('server/admin_runner.php',obj);
        myTimer.stopTimer();
        $.post('server/admin_control.php', 'action=setFinalRank', function(data){});
        break;

      case "close":
        break;
    }
    toggleButtons(bID);
  });
}

//Restores state upon loading of the page
function updateUI(){
  currentEvent = $("#cEvent").text().trim();
  console.log("Current Event: " + currentEvent);
  toggleButtons(currentEvent);
}

//Handles all view change (css,html) of the webpage for a change in the event
function toggleButtons(event1){
  $('.ribbonButton').css('background-color','');
  $('#'+event1).css('background-color','dimgray');
  switch (event1) {
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
      $(".ribbonButton").prop("disabled", false);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#close").prop("disabled", true);
      $("#start").prop("disabled", true);
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
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#stop").prop("disabled", true);
      //$.post("server/admin_runner.php", obj, function(data){});
      break;

    case "close":
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;
  }
}

//---------------------------------------------------------------------------------------------------------
var myTimer = new EventTimer(0,0);
$(document).ready(function() {
  //Creates new EventTimer object and assigns it to pointer myTimer
  myTimer.startTime = parseInt( $('#startTimeDiv').html().trim() );
  myTimer.elapsedTime = parseInt( $('#stopTimeDiv').html().trim() );

  updateUI();
  //$("#teamData").css('background-color', 'DimGray');

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
