//Scripts for documentation.php
$(document).ready(function(){
  $('.selectorButton').click(function(){
    var target = $(this).attr('id');
    $('.selectorButton').css('background-color', '');
    /*switch(target){
      case 'developerButton':
        $('#developers').show();
        $('#about').hide();
        console.log('DEBUG: Developer Button Clicked!');
        break;
      case 'aboutButton':
        $('#about').show();
        $('#developers').hide();
        console.log('DEBUG: About Button Clicked!');
        break;
    }*/
    $('#'+target).css('background-color', 'rgb(32, 70, 93)');
  });
  $('#developerButton').click();


  $('#returnTitle').click(function(){
    window.location.href = "index.php";
  });
});
