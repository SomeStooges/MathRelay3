//Scripts for the m_team_activity module

function getTeamLog() {
  $.post('../server/admin_control.php', 'action=getTeamLog', function(data) {
    data = JSON.parse(data);
    console.log(message);
    //Prints out a constantly updating table that adds new information in to new columns on the left side of the table.
    /*In order, prints out:
      1. Time stamp
      2. Question Number
      3. How many points were awarded for correctly answering the question
      4. How many points the team has overall
      This logs something every time the team gets a question correct.
    */
  });
}

$(document).ready( function(){
  //getTeamLog();
  $("#freezeButton").click( function(){
    console.log("Freeze button clicked. Needs actual functionality");

  });
});
