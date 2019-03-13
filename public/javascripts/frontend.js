

$(document).ready(function () {
  $('#addValueOptiontoModal').click(function (e) {
    e.preventDefault();
    $('.ModalPollsinputs').append("<input  type='text' name='graphVal'>");



  });




  if ($("#socialName").text() == "") {
    /* window.location.href = "/autologin";
     $.ajax({
url: '/autologin',
type: 'get',
dataType: 'json',
data: 
success: function(data) {
  //update list


  console.log(data);
}
});*/

    $.get("/autologin", function (data) {

      if (data !== "") {

        $('#modalUser').attr("value", data.name);
        if (Array.isArray(data)) {
         // console.log("31" + JSON.stringify(data));
          $(".polls").text('Polls');
          for (let x = 0; x != data.length - 1; x++) {
           // console.log(data[x]);
            for (let y = 0; y != data[x].polls.length - 1; y++) {
             // console.log(data[x][y]);
              $(".polls").append("<a href='/polls/" + data[x][y] + "'>" + data[x][y] + "</a>");

            }
          }


        } else {
          $('#signin').hide();
          $('#modalUser').attr("value", data.name);
          $("#socialName").text(data.name);
          $("#socialPhoto").attr("src", data.url);
         // console.log("50" + JSON.stringify(data));
          // console.log("54"+(data.polls.length+ data.polls ));
         
          //console.log(data.hasOwnProperty('polls'));
          if( data.hasOwnProperty('polls')){
             if (data.polls.length > 0) {
            for (let y = 0; y != data.polls.length - 1; y++) {
              //console.log("56"+ JSON.stringify(data._id));
              $(".polls").append("<a href='/polls/" + data.polls[y]._id + "/" +data._id+"' >" + data.polls[y].name + "</a>");

            }
          }

          }
         


        }

        // alert( "Load was performed." );



      } else {
        $('#modalUser').attr("value", "unregistered");
        $('#signin').show();
        $("#socialName").hide();
        $("#socialPhoto").hide();
    
      }

    });


   /* let sessionData = JSON.parse(sessionStorage.getItem(1)) || [];

console.log('sessionData'+sessionData);
document.getElementById("socialName").innerHTML =sessionData.Name ; 
document.getElementById("socialPhoto").src =sessionData.Photo ; 
*/}
});
