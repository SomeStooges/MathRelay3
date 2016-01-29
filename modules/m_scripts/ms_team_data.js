//Scripts for the m_team_data module
function reloadModules() {
  $.post('/mathrelay3/modules/m_team_data.php', function(data) {
    $('#mod1').html(data);
    console.log(data);
    console.log('something worked!');
  });
  $.post('/mathrelay3/modules/m_answer_key.php', function(data) {
    $('#mod3').html(data);
  });
  $.post('/mathrelay3/modules/m_team_activity.php', function(data) {
    $('#mod4').html(data);
  });
  $.post('/mathrelay3/modules/m_statistics.php', function(data) {
    $('#mod5').html(data);
  });
  $.post('/mathrelay3/modules/m_settings.php', function(data) {
    $('#mod6').html(data);
  });
}

$(document).ready( function() {
  console.log("Hello world!");

  $("#reset_button").click(function() {
    console.log('checkpoint 1');
    $.post("../server/admin_control.php", 'action=adminReset', function(data) {
      console.log(data);
      reloadModules();
    });
  });

});
