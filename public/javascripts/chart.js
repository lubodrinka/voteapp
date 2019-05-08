
var color = addcolor;
var config = config;  config.data.datasets[0].backgroundColor = color;
$(document).ready(function () {
   

    console.log(config);
  
 var ctx = document.getElementById("myChart").getContext("2d");
    $("#tweet-quote").attr("href", encodeURI("https://twitter.com/intent/tweet?text=" + config.options.title.text + "|&url=" + window.location.href));
    var myChart = new Chart(ctx, config);
   myChart.update();
    $("#formVoteSubmit").click(function () {
        var IsChecked = $(".votebutton").is(":checked");
        if (!IsChecked) { alert("select something"); }
        if (alreadyVoted) { alert("You have already vote"); }
    });
});