//Scripts for the m_statistics module
//Global chart variables
var chartDataStore= new Array();
var chart1, chart2, chart3, chart4;
function range(start, finish) {
    var r = [];
    for (var i = start; i <= finish; i++) {
        r.push(i);
    }
    return r;
}
function bindLine(attemptsByTime , correctByTime ){
  var chartData = new Array();
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
          fillColor: "rgba(255, 75, 75, 0.3)",
          strokeColor: "rgba(255, 75, 75, 1)",
          pointColor: "rgba(255, 75, 75, 0.3)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: attemptsByTime
      },
      {
          label: "Aggregate Correct Responses",
          fillColor: "rgba(34, 250, 49, 0.3)",
          strokeColor: "rgba(34, 250, 49, 1)",
          pointColor: "rgba(34, 250, 49, 0.3)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: correctByTime
      }
    ]
  };
 chartData[0] = ctx;
 chartData[1] = data;
 return chartData;
}

function bindScatter(scatterQuestionTime){
  var chartData = new Array();
  var ctx = $("#questionVTime").get(0).getContext("2d");
  var data = [
  {
    label: 'My First dataset',
    strokeColor: '#2148f1',
    pointColor: '#2148f1',
    pointStrokeColor: '#fff',
    data: scatterQuestionTime
  }
  ];
  chartData[0] = ctx;
  chartData[1] = data;
  return chartData;
}

function bindBar1( attemptsByTeam , correctByTeam ){
  var chartData = new Array();
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
            fillColor: "rgba(34, 250, 49, 0.5)",
            strokeColor: "rgba(34, 250, 49, 0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: correctByTeam
        }
      ]
    };
    chartData[0] = ctx;
    chartData[1] = data;
    return chartData;
}

function bindBar2( attemptsByQuestion , correctByQuestion ){
  var chartData = new Array();
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
            fillColor: "rgba(34, 250, 49, 0.5)",
            strokeColor: "rgba(34, 250, 49, 0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: correctByQuestion
        }
      ]
    };
    chartData[0] = ctx;
    chartData[1] = data;
    return chartData;
}
var response;
function createChart(){
  chart1 = new Chart(chartDataStore[0][0]).Line(chartDataStore[0][1]);
  chart2 = new Chart(chartDataStore[1][0]).Scatter(chartDataStore[1][1], {bezierCurve: false});
  chart3 = new Chart(chartDataStore[2][0]).Bar(chartDataStore[2][1]);
  chart4 = new Chart(chartDataStore[3][0]).Bar(chartDataStore[3][1]);
}
function updateChart(){
  chart1.update();
  chart2.destroy();
  chart2 = new Chart(chartDataStore[1][0]).Scatter(chartDataStore[1][1], {bezierCurve: false});
  chart3.update();
  chart4.update();
  console.log("DEBUG: Update Chart Called.")
}

function getStatistics() {
  $.post('../server/stat.php', "action=getStatistics", function(data) {
    data = JSON.parse(data);
    console.log(data.attemptsByTime);
    chartDataStore[0] = bindLine( data.attemptsByTime , data.correctByTime);
    chartDataStore[1] = bindScatter(data.scatterQuestionTime);
    chartDataStore[2] = bindBar1( data.attemptsByTeam , data.correctByTeam );
    chartDataStore[3] = bindBar2( data.attemptsByQuestion , data.correctByQuestion );
    createChart();
  });
}
function updateStatistics() {
  $.post('../server/stat.php', "action=getStatistics", function(data) {
    data = JSON.parse(data);
    //update line chart
    for(var i = 0; i < data.attemptsByTime.length; i++){
      chart1.datasets[0].points[i].value = data.attemptsByTime[i];
      chart1.datasets[1].points[i].value = data.correctByTime[i];
    }

    //As there is no animation that is different from redrawing scatter chart, the chart is just destroyed and then redrawn with new points.
    chartDataStore[1] = bindScatter(data.scatterQuestionTime);

    //update bar chart 1
    for(var i = 1; i < data.attemptsByTeam.length-1; i++){
      chart3.datasets[0].bars[i].value = data.attemptsByTeam[i+1];
      chart3.datasets[1].bars[i].value = data.correctByTeam[i+1];
    }

    //update bar chart 2
    //  chartDataStore[3] = bindBar2( data.attemptsByQuestion , data.correctByQuestion );
    for(var i = 1; i < data.attemptsByQuestion.length-1; i++){
      chart4.datasets[0].bars[i].value = data.attemptsByQuestion[i+1];
      chart4.datasets[1].bars[i].value = data.correctByQuestion[i+1];
    }
    updateChart();
  });
}

$(document).ready( function(){
  var windowIntervalID;
  var selectedID = 0;
  var lastID;

  $( window ).resize(function(){
    console.log("DEBUG: window was resized, so running.");
    var vw = $(window).width() - 100;
    var vh = Math.floor(($(window).height())*9/10) -70;
    console.log("Viewing width: " + vw);
    console.log("Viewing height: " + vh);
    $('#questionVTime').attr('width',String(vw));
    $('.graph').attr('height',String(vh));
    getStatistics();
    $('#bindLineButton').click();
    windowIntervalID = window.setInterval(updateStatistics, 30000);//Currently reset to a refresh of 5 seconds for debug; will be extended to a refresh of 30000 miliseconds
  });

  $('.selectorButton').click(function(){
    lastID = selectedID;
    selectedID = $(this).attr("id");
    $('.selectorButton').css('background-color', '');
    switch(selectedID){
      case 'forceStatUpdate':
        updateStatistics();
        $('#'+lastID).css('background-color', 'dimgray');
        break;
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
    $('#forceStatUpdate').css('background-color', '');
  });
});
