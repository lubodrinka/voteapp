function sign_in_G(){
    alert("hell forntoend");
}
$(document).ready(function(){
      if($( "#socialName" ).text() ==""){
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

  $.get( "/autologin", function( data ) {
data="";
    if(data !== ""){
       $('#signin').hide();
       $( "#socialName" ).text( data.name );
  $( "#socialPhoto" ).attr("src", data.url );
 // alert( "Load was performed." );
  //console.log(data.name);
    }else{
      $('#signin').show();
       $( "#socialName" ).hide();
  $( "#socialPhoto" ).hide();
    }
 
});
     
     
   /* let sessionData = JSON.parse(sessionStorage.getItem(1)) || [];

console.log('sessionData'+sessionData);
document.getElementById("socialName").innerHTML =sessionData.Name ; 
document.getElementById("socialPhoto").src =sessionData.Photo ; 
*/}});
