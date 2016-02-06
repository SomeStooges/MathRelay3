//Scripts for the m_statistics module
function getStatistics() {
  $.post('../server/admin_control.php', 'action=getStatistics', function(data) {
    //TBD
  });
}

$(document).ready( function(){
  //getStatistics();
});
