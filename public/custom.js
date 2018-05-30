var socket = io("http://localhost:3000");
socket.on("registration-fail",function(){
  alert("User had ready used");
});

socket.on("registration-success",function(data){
  $("#currentUser").html(data);
  $('#loginform').hide(2000);
  $('#chatform').show(1000);
});

socket.on('send-list-users', function(data){
  $("#boxContent").html("");
  data.forEach(function(i){
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
})
$(document).ready(function(){
  $('#loginform').show();
  $('#chatform').hide();

  $("#btnRegister").click(function(){
    socket.emit('client-sent-username',$("#txtUsername").val());
  });

  $("#btnLogout").click(function(){
    socket.emit('client-logout');
  });
});
