// Script for the admin control panel
//Universal event variable
var currentEvent;
//Universal ID variables
var ribbonID;
var toolbarID;
//Universal timer variables
var temp = 0;

var EventTimer = function(startTime, elapsedTime){
  this.startTime = startTime;     //The time, in seconds since epoch, when the timer started
  this.elapsedTime = elapsedTime; //The number of seconds between the current time and the start time, or until the stop time was pushed
  this.intervalID;                //Saves the reference ID of the window.setInterval
  this.isReloading = false;

  this.startTimer = function(){
      var date = new Date();
    if(this.isReloading == false){
      if(this.startTime == 0 || this.startTime == 'NaN'){
        //First time the clock is started
        console.log("Starting the Timer; startTime = " + this.startTime);
        this.startTime = parseInt(Math.floor( date.getTime() / 1000 ));
        //console.log("this.startTime : " + this.startTime + " " + typeof this.startTime);
      } else {
        //clock is restarted; so that "start time" is adjusted to be however many second ago the button was first pushed.
        console.log("Restarting the timer; startTime = " + this.startTime);
        this.startTime  = parseInt(Math.floor( date.getTime() / 1000 )) - this.elapsedTime;
      }
    } else {
      //nothing happens; the startTime is already set to whatever was last correct
      console.log("Reloading the timer; startTime = " + this.startTime)
    }

    var obj = new Object();
    obj.action = 'setStartTime';
    obj.startTime = this.startTime;
    $.post('server/admin_runner.php',obj, function(){
      document.getElementById('iframe1').contentWindow.location.reload();
      document.getElementById('iframe3').contentWindow.location.reload();
    });
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
    var date = new Date();
    this.elapsedTime = parseInt(Math.floor( date.getTime() / 1000 ) - this.startTime);
    this.parseToTimerDisplay(this.elapsedTime);
    console.log("Updating the Timer; elapsedTime = " + this.elapsedTime);
  }

  this.displayElapsedTime = function(){
    this.parseToTimerDisplay(this.elapsedTime);
  }

  this.stopTimer = function(){
    var date = new Date();
    console.log("Stopping the Timer");
    var obj = new Object();
    obj.action = 'setStopTime';
    obj.stopTime = this.elapsedTime;
    $.post('server/admin_runner.php',obj);

    this.startTime  = parseInt(Math.floor( date.getTime() / 1000 )) - this.elapsedTime;
    obj.action = 'setStartTime';
    obj.startTime = this.startTime;
    $.post('server/admin_runner.php',obj);

    window.clearInterval(this.intervalID);
    this.updateTimer();

  }
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
  switch (currentEvent) {
    case "none":
      break;

    case "open":
      break;

    case "start":
    myTimer.isReloading = true;
    myTimer.startTimer();
      break;

    case "freetime":
    myTimer.isReloading = true;
    myTimer.startTimer();
      break;

    case "freezeLeaderboard":
    myTimer.isReloading = true;
    myTimer.startTimer();
      break;

    case "stop":
    myTimer.displayElapsedTime();
      break;

    case "close":
    myTimer.displayElapsedTime();
      break;
  }
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
      $("#none").prop("disabled", true);
      $("#open").prop("disabled", true);
      break;

    case "freetime":
      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#start").prop("disabled", true);
      $("#close").prop("disabled", true);
      $("#none").prop("disabled", true);
      $("#open").prop("disabled", true);
      break;

    case "freezeLeaderboard":
      $("#ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#none").prop("disabled", true);
      $("#open").prop("disabled", true);
      $("#close").prop("disabled", true);
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

    //Activates only when the database is reset.
    default:
      $('#none').css('background-color','dimgray');
      $("#teamData").css('background-color', 'DimGray');

  }
}

function adminClear(){
  $.post('server/admin_control.php', 'action=adminClear',function(){
    //Sets the local model to the server model;
    toggleButtons('none');
    myTimer.startTime = 0;
    myTimer.elapsedTime = 0;
  });
}

//---------------------------------------------------------------------------------------------------------
var myTimer = new EventTimer(0,0);
$(document).ready(function() {


  //Creates new EventTimer object and assigns it to pointer myTimer
  myTimer.startTime = $('#startTimeDiv').html().trim();
  myTimer.elapsedTime = parseInt( $('#stopTimeDiv').html().trim() );
  console.log("From ready: myTimer = " + $('#startTimeDiv').html().trim());

  updateUI();

  //Event Handler for toolbar buttons
  $("#clear").click(function(){
    adminClear();
    window.top.location.reload();
  });
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
        //document.getElementById('iframe4').contentWindow.location.reload();
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
