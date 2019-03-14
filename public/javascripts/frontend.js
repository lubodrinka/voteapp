

$(document).ready(function () {
  $('#addValueOptiontoModal').click(function (e) {
    e.preventDefault();
    $('.ModalPollsinputs').append("<input  type='text' name='graphVal'>");
  });
  $('#signout').click(function (e) {

    $.ajax({
      type: "POST",
      url: 'signout',
      data: { signout: false, user_id:code($('#modalUser').attr("value") )},
      dataType: 'json',
      success: 'success'

    });
    $('#signout').hide();
    $('#signin').show();
    $("#socialName").empty();
    $("#socialPhoto").empty();
  });
  $('#signin').click(function (e) {
    $('#signin').hide();
     });
  $('#Home').click(function () {
    $("#navMyPolls").removeClass('active');
    $("#navAllPolls").removeClass('active');
    $("#navHome").addClass('active');
  });

  $('#myPolls').click(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/mypolls',
      type: 'post',
      dataType: 'json',
      data: { user_id: code($('#modalUser').attr("value")) },
      success: function (data) {
         $(".polls").empty();
        //update listalert(data);
        // 
        getMy(data);
      }
    });
  });

  $('#allPolls').click(function (e) {
    e.preventDefault();
    //

    $.ajax({
      url: '/allpolls',
      type: 'post',
      dataType: 'json',
      data: { user_id: '' },
      success: function (data) {
        //update listalert(data);
        $(".polls").empty();
      
        getAll(data);
      }
    });
  });


  function getAll(data) {
 data.reverse();
     for (let x = 0; x != data.length - 1; x++) {
          for (let y = 0; y < data[x].polls.length - 1; y++) {
           $(".polls").append("<a href='/polls/" +data[x].polls[y]._id +"/"+  data[x]._id +"?"+ 'hide=' +code($('#modalUser').attr("value")) +"'>" + data[x].polls[y].name + "</a>");
      }
    }
 
    $("#navHome").removeClass('active');
    $("#navMyPolls").removeClass('active');
    $("#navAllPolls").addClass('active');
  }


  function getMy(data) {
    
    // $(".polls").text('My Polls');
    if (data.hasOwnProperty('polls')) {
      if (data.polls.length > 0) {
        for (let y = data.polls.length - 1; y !=0 ; y--) {
          //console.log("56"+ JSON.stringify(data._id));
         
          $(".polls").append("<a href='/polls/" + data.polls[y]._id + "/" + data._id+"?"+ 'hide=' +code($('#modalUser').attr("value")) + "' >" + data.polls[y].name + "</a>");
        }

        $("#navHome").removeClass('active');
        $("#navAllPolls").removeClass('active');
        $("#navMyPolls").addClass('active');
      }
    }
  }
function  code(myString){

 return myString?JSON.stringify(myString.replace(/"/g, "")):JSON.stringify("unregistered");
  
}
  $.ajax({
    url: '/autologin',
    type: 'post',
    dataType: 'json',
    data: { user: "$('#modalUser').text()" },
    success: function (data) {

      if (data !== "") {

        $('#modalUser').attr("value", JSON.stringify(data._id)  ); 
         $("#socialName").text(data.name);
         
        if (Array.isArray(data)) {
          // console.log("31" + JSON.stringify(data));
          $('#signin').show();
          $('#signout').hide();
          $('#myPolls').hide(); 
          $("#socialPhoto").attr("src", './images/favicon.jpg');
          getAll(data);

        } else {
          $('#signin').hide();
           $('#signout').show();
            $('#myPolls').show();
        
        
          // console.log("50" + JSON.stringify(data));
          // console.log("54"+(data.polls.length+ data.polls ));

          //console.log(data.hasOwnProperty('polls'));
  $("#socialPhoto").attr("src", data.url);
          getMy(data);
        }
      } else {
        $('#modalUser').attr("value", "unregistered");
        
        $("#socialName").hide();
        $("#socialPhoto").hide();

      }
    }
  });

});
