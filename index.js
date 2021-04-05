var express = require("express");
var app= express();
//khach hang yeu cau no vao thu muc public tim
app.use(express.static("public"));
app.set("view engine","ejs");
//set muc views chua muc trang chu 
app.set("views","./views");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use(require('cors')())

const cors = require("cors");

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.hivemq.com');
//var client = mqtt.connect('mqtt://localhost:1883');
var topic = 'bbb';

var server = require("http").Server(app);
var http = require('https');

var io= require("socket.io")(server, {
    cors: {
      origin: "https://vanquangonline.herokuapp.com",
      credentials: true,
      allowedHeaders: ["my-custom-header"],
      methods: ["GET", "POST"]
    }
  });
//server lang nghe port
server.listen(process.env.PORT || 8000);
//lang nghe co ai ket noi len hay khong


client.on('error', (err) => {
    console.log(err);
})
client.on('disconnect', () => {
        console.log('mqtt client has been disconected.')
});
client.on('connect', ()=>{
    io.on("connection",function(socket){
        console.log("co nguoi ket noi"+ socket.id);
        socket.on("Client-send-data",function(data){
            //console.log(data);
            //gui tat ca 
            client.publish(topic, data);
            console.log('Message sent!', data);
            //io.sockets.emit("Server-send-data",data+"888");
            //gui cho thang gui minh
            //socket.emit("Server-send-data",data+"888");
            //gui cho nhung thang khac
            //socket.broadcast.emit("Server-send-data",data+"888");
        });
    });
    client.subscribe(topic,function (err){
        client.on('message', (topic, message)=>{
            io.sockets.emit("Server-send-data",message.toString()+"888");
            console.log(message.toString());
        });
    });
    
})
io.on("connection",function(socket){
    socket.on("Client-send-data1",function(data){
        //console.log(data);
        //gui tat ca 
        io.sockets.emit("Server-send-data1",data);
        console.log("888");
        console.log('Message sent!', data);
        //io.sockets.emit("Server-send-data",data+"888");
        //gui cho thang gui minh
        //socket.emit("Server-send-data",data+"888");
        //gui cho nhung thang khac
        //socket.broadcast.emit("Server-send-data",data+"888");
    });
});

    

app.get("/", function(req, res){
    res.render("trangchu");
})