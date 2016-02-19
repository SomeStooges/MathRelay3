// Script for the admin control panel
//Universal event variable
var currentEvent;
//Universal ID variables
var ribbonID;
var toolbarID;
//Universal timer variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
var time;
var originalTime;
var relogTime;
var stopTime;

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
  time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  $("#timer").text(time);
  timer();
}

function checkTime(){
  var currentTime = new Date();
  originalTime = $("#sTime").text().trim();
  stopTime = $("#pTime").text().trim();
  if (originalTime === ''){
    originalTime = currentTime.getTime();
  }
  switch(currentEvent){
    case 'start':
      relogTime = currentTime.getTime();
      timer();
      break;

    case 'freetime':
      relogTime = currentTime.getTime();
      timer();
      break;

    case 'freezeLeaderboard':
      relogTime = currentTime.getTime();
      timer();
      break;
    default:
      relogTime = stopTime;



  }
  relogTime = currentTime.getTime();
  var prevTime = $("#uTime").text().trim();

  console.log(originalTime + ":" + relogTime);
 //new random time
  var temp, tempS, tempM, tempH;
  if(prevTime !== ''){
    //Parses the time from unix to human
    temp = Math.floor((relogTime/10 - parseInt(originalTime))/100);// number of seconds elapsed
    console.log(temp);
    tempH = parseInt(temp/3600);
    tempM = parseInt((temp%3600)/60);
    tempS = (temp%60);

    //Reassign universal timer variables to parsed difference
    hours = tempH;
    minutes = tempM;
    seconds = tempS;
  }
  time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  $("#timer").text(time);
  console.log(time);

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
  currentEvent = $("#cEvent").text().trim();
  $('#'+currentEvent).css('background-color','#011858');
  console.log(currentEvent);
  toggleButtons(currentEvent);
}
function toggleButtons(ribbonID){
  switch (ribbonID) {
    case "none":
      clearTimeout(t);
      $(".ribbonButton").prop("disabled", true);
      $("#open").prop("disabled", false);
      $("#logoutButton").prop("disabled", false);
      break;

    case "open":
      console.log(";asjfkjfljsdaf!!!!!!");
      clearTimeout(t);
      $(".ribbonButton").prop("disabled", true);
      $("#none").prop("disabled", false);
      $("#start").prop("disabled", false);
      break;

    case "start":
      var currentTime = new Date();
      checkTime();
      obj = new Object();
      obj.action = 'setStartTime';
      obj.startTime = currentTime.getTime();
      $.post("server/admin_runner.php", "action=getStartTime", function(data){
        console.log(JSON.parse(data));
        if(JSON.parse(data) === ''){
          console.log("No previous time");
          $.post("server/admin_runner.php", obj, function() {});
        }
        //timer();
      });
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
      clearTimeout(t);
      checkTime();
      var currentTime2 = new Date();
      obj = new Object();
      obj.action = 'setStopTime';
      obj.stopTime = currentTime2.getTime();
      $.post("server/admin_runner.php", "action=getStopTime", function(data){
        console.log(JSON.parse(data));
        if(JSON.parse(data) === ''){
          console.log("No previous stop time");
          $.post("server/admin_runner.php", obj, function() {});
        }
      });

      $(".ribbonButton").prop("disabled", false);
      $("#freetime").prop("disabled", true);
      $("#freezeLeaderboard").prop("disabled", true);
      $("#stop").prop("disabled", true);
      $.post("server/admin_runner.php", obj, function(data){});
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
  //checkTime();


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

//Activates upon unloading the page (to be used to account for premature admin logout)
  $(window).unload(function(){
    var currentTime = new Date();
    obj = new Object();
    obj.action = 'setUnloadTime';
    obj.unloadTime = currentTime.getTime();
    $.ajax({
      type: 'POST',
      async: false,
      url: 'server/admin_runner.php',
      data: obj,
      success: function(data){
        console.log("stored unloadTime!");
      }
    });
  });
