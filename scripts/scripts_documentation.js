//Scripts for documentation.php
$(document).ready(function(){
  var divHeight = $('#developers').height();
  $('#developerButton').css('background-color', 'rgb(32, 70, 93)');
  $('.selectorButton').click(function(){
    var target = $(this).attr('id');
    switch(target){
      case 'developerButton':
        $('#developers').show();
        $('#developerButton').css('background-color', 'rgb(32, 70, 93)');
        $('#about').hide();
        $('#aboutButton').css('background-color', '');
        break;
      case 'aboutButton':
        $('#developers').hide();
        $('#about').show();
        $('#developerButton').css('background-color', '');
        $('#aboutButton').css('background-color', 'rgb(32, 70, 93)');
        break;
    }
    });
    $('#returnTitle').click(function(){
      window.location.href = "index.php";
  });
});
