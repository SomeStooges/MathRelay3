//Scripts for the m_statistics module
function range(start, finish) {
    var r = [];
    for (var i = start; i <= finish; i++) {
        r.push(i);
    }
    return r;
}

function getStatistics() {
  $.post('../server/stat.php', "action=getStatistics", function(data) {
    //console.log(data);
    data = JSON.parse(data);
    var attemptsByTime = data.attemptsByTime;
    var correctByTime = data.correctByTime;
    var scatterQuestionTime = data.scatterQuestionTime;
    var attemptsByTeam = data.attemptsByTeam;
    var correctByTeam = data.correctByTeam;
    var attemptsByQuestion = data.attemptsByQuestion;
    var correctByQuestion = data.correctByQuestion;

    //Add data to attemps/time line graph
    var ctx = $("#attemptsVTime").get(0).getContext("2d");
    var numMinutes = attemptsByTime.length;
    console.log("DEBUG: attemptsByTime = " + attemptsByTime)
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
    var chart1 = new Chart(ctx).Line()

    //Add data to question/time scatter plot

    //Add data to attempts/team bar graph

    //add data to attempts/question bar graph

  });
}

$(document).ready( function(){
  //Bind line graph
  //Bind scatter plot
  //Bind bar graph 1
  //Bind bar graph 2

  getStatistics();

});
