var express = require("express");
var app= express();
//khach hang yeu cau no vao thu muc public tim
app.use(express.static("public"));
app.set("view engine","ejs");
//set muc views chua muc trang chu 
app.set("views","./views");

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
var topic = 'bbb';

var server = require("http").Server(app);
var io= require("socket.io")(server);
//server lang nghe port
server.listen(process.env.PORT || 8080);
//lang nghe co ai ket noi len hay khong

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
        });
    });
    
})
app.get("/", function(req, res){
    res.render("trangchu");
})