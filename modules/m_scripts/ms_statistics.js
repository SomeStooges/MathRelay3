//Scripts for the m_statistics module
//Global viewing window width
var vw = $(window).width() - 100;
var vh = Math.floor(($(window).height())*9/10) -70;

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
  }/*,
  {
    label: 'My Second dataset',
    strokeColor: '#007ACC',
    pointColor: '#007ACC',
    pointStrokeColor: '#fff',
    data: [
      { x: 19, y: 75, r: 4 },
      { x: 27, y: 69, r: 7 },
      { x: 28, y: 70, r: 5 },
      { x: 40, y: 31, r: 3 },
      { x: 48, y: 76, r: 6 },
      { x: 52, y: 23, r: 3 },
      { x: 24, y: 32, r: 4 }
      ]
    }*/
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
    //console.log(data);
    data = JSON.parse(data);
    bindLine( data.attemptsByTime , data.correctByTime);
    bindScatter(data.scatterQuestionTime);
    bindBar1( data.attemptsByTeam , data.correctByTeam );
    bindBar2( data.attemptsByQuestion , data.correctByQuestion );
    //Add data to attemps/time line graph
    //Add data to question/time scatter plot
    //Add data to attempts/team bar graph
    //add data to attempts/question bar graph
  });
}

$(document).ready( function(){
  /*var h = $('.graphwrap').;
  var w = $('.graphwrap').width();
  $("#attemptsVTime").attr({ "height" : h , "width" : w });
  $("#questionVTime").attr({ "height" : h , "width" : w });
  $("#attemptsVTeam").attr({ "height" : h , "width" : w });
  $("#attemptsVQuestion").attr({ "height" : h , "width" : w });*/
  console.log("Viewing width: " + vw);
  console.log("Viewing height: " + vh);
  $('#questionVTime').attr('width',String(vw));
  $('.graph').attr('height',String(vh));
  getStatistics();
  $('#forceStatUpdate').click(function(){
    location.reload();
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
        $('#x-axis').text('Time in Seconds');
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
