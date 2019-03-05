function sign_in_G(){
    alert("hell forntoend");
}
function load(){
    let sessionData = JSON.parse(sessionStorage.getItem(1)) || [];
$.ajax({
    url: '/oauth/twitter/callback',
    type: 'get',
    dataType: 'json',
    data: $('#newBookForm').serialize(),
    success: function(data) {
      //update list
    }
  });
console.log('sessionData'+sessionData);
document.getElementById("socialName").innerHTML =sessionData.Name ; 
document.getElementById("socialPhoto").src =sessionData.Photo ; 
}
