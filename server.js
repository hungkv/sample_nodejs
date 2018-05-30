var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
var users = ["AAA"];

server.listen(3000);

io.on("connection", function(socket){
  console.log("Someone has connected");
  socket.on('client-sent-username', function(data){
    if(users.indexOf(data) >=0){
      socket.emit("registration-fail");
    } else {
      users.push(data);
      socket.userName = data;
      socket.emit("registration-success",data);
      io.sockets.emit('send-list-users', users);
    }
  });
  //Listent Logout
  socket.on('client-logout', function(){
    users.splice(users.indexOf(socket.userName), 1);
    socket.broadcast.emit('someone-logout',users);
  });
});

app.get("/", function(req, res){
  res.render("trangchu");
})
