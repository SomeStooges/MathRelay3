//Scripts for the m_settings module

function getSettings() {
  $.post('../server/admin_control.php', 'action=getSettings', function(data) {
    console.log(data);
    data = JSON.parse(data);
    /* Data is a two dimensional array. THe first index determines which setting it is for.
    the second index lists the class, name, and value of the setting, in that order (from 0 to 2).
    */

    //WRITE GUI CHANGE HERE
  });
}

$(document).ready( function(){
  getSettings();
  $("#reset_button").click(function() {
    console.log('checkpoint 1');
    $.post("../server/admin_control.php", 'action=adminReset', function(data) {
      console.log(data);
    });
  });
});
