//Scripts for the m_statistics module
//Global viewing window width
var hasLoadedOnce = false;

function range(start, finish) {
    var r = [];
    for (var i = start; i <= finish; i++) {
        r.push(i);
    }
    return r;
}

function bindLine(attemptsByTime , correctByTime ){
  var ctx = $("#attemptsVTime").get(0).getContext("2d");
  //  ctx.canvas.width = $("#div1").width();
  //ctx.canvas.height = $("#div1").height();
  var numMinutes = attemptsByTime.length;
  console.log("DEBUG: attemptsByTime = " + attemptsByTime);
  console.log("DEBUG: numMinutes = " + numMinutes);
  var data = {
  labels: range(1,numMinutes),
  datasets: [
      {
          label: "Aggregate Attempts",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: attemptsByTime
      },
      {
          label: "Aggregate Correct Responses",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: correctByTime
      }
    ]
  };
  var chart1 = new Chart(ctx).Line(data);
}

function bindScatter(scatterQuestionTime){
  var ctx2 = $("#questionVTime").get(0).getContext("2d");
  var data = [
  {
    label: 'My First dataset',
    strokeColor: '#F16220',
    pointColor: '#F16220',
    pointStrokeColor: '#fff',
    data: scatterQuestionTime
  }
  ];
  var chart2 = new Chart(ctx2).Scatter(data);
}

function bindBar1( attemptsByTeam , correctByTeam ){
  attemptsByTeam.shift();
  correctByTeam.shift();
  var enumTeams = range( 1 , attemptsByTeam.length );
  console.log("DEBUG: length = " + attemptsByTeam.length);
  console.log("DEBUG: length = " + attemptsByTeam);
  console.log("DEBUG: length = " + correctByTeam);
  var ctx = $("#attemptsVTeam").get(0).getContext("2d");
  var data = {
    labels: enumTeams,
    datasets: [
        {
            label: "Attempts",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: attemptsByTeam
        },
        {
            label: "Correct",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: correctByTeam
        }
      ]
    };
  var chart3 = new Chart(ctx).Bar(data);
}

function bindBar2( attemptsByQuestion , correctByQuestion ){
  attemptsByQuestion.shift();
  correctByQuestion.shift();
  var enumTeams = range( 1 , attemptsByQuestion.length );
  var ctx = $("#attemptsVQuestion").get(0).getContext("2d");
  var data = {
    labels: enumTeams,
    datasets: [
        {
            label: "Attempts",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: attemptsByQuestion
        },
        {
            label: "Correct",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: correctByQuestion
        }
      ]
    };
  var chart4 = new Chart(ctx).Bar(data);
}

function getStatistics() {
  $.post('../server/stat.php', "action=getStatistics", function(data) {
    data = JSON.parse(data);
    bindLine( data.attemptsByTime , data.correctByTime);
    bindScatter(data.scatterQuestionTime);
    bindBar1( data.attemptsByTeam , data.correctByTeam );
    bindBar2( data.attemptsByQuestion , data.correctByQuestion );
  });
}

$(document).ready( function(){
  var windowIntervalID;

  $( window ).resize(function(){
    if(!hasLoadedOnce){
      console.log("DEBUG: window was resized, so running.");
      var vw = $(window).width() - 100;
      var vh = Math.floor(($(window).height())*9/10) -70;
      console.log("Viewing width: " + vw);
      console.log("Viewing height: " + vh);
      $('#questionVTime').attr('width',String(vw));
      $('.graph').attr('height',String(vh));
      getStatistics();
      $('#bindLineButton').click();
      windowInvtervalID = window.setInterval(getStatistics, 5000)//Currently reset to a refresh of 5 seconds for debug; will be extended to a refresh of 30000 miliseconds
      hasLoadedOnce = true;
    }
  });

  $('#forceStatUpdate').click(function(){
    getStatistics();
  });

  $('.selectorButton').click(function(){
    var selectedID = $(this).attr("id");
    $('.selectorButton').css('background-color', '');
    switch(selectedID){
      case 'bindLineButton':
        $('#bindLine').show();
        $('#bindScatter').hide();
        $('#bindBar1').hide();
        $('#bindBar2').hide();
        $('#x-axis').text('Time in Minutes');
        $('#y-axis').text('Number of Attempts');
        break;
      case 'bindScatterButton':
        $('#bindLine').hide();
        $('#bindScatter').show();
        $('#bindBar1').hide();
        $('#bindBar2').hide();
        $('#x-axis').text('Time in Seconds');
        $('#y-axis').text('Question Number');
        break;
      case 'bindBar1Button':
        $('#bindLine').hide();
        $('#bindScatter').hide();
        $('#bindBar1').show();
        $('#bindBar2').hide();
        $('#x-axis').text('Team Number');
        $('#y-axis').text('Number of Attempts');
        break;
      case 'bindBar2Button':
        $('#bindLine').hide();
        $('#bindScatter').hide();
        $('#bindBar1').hide();
        $('#bindBar2').show();
        $('#x-axis').text('Question Number');
        $('#y-axis').text('Number of Attempts');
        break;
    }
    $('#'+selectedID).css('background-color', 'dimgray');
  });
});
