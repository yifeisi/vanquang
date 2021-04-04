var express = require("express");
var app= express();
//khach hang yeu cau no vao thu muc public tim
app.use(express.static("public"));
app.set("view engine","ejs");
//set muc views chua muc trang chu 
app.set("views","./views");

var server = require("http").Server(app);
var io= require("socket.io")(server);
//server lang nghe port
server.listen(3000);
//lang nghe co ai ket noi len hay khong
var mang=[];

io.on("connection",function(socket){
   socket.on("hoc-vien-gui-thongtin",function(data){
        mang.push(
           new hocvien(data.hoten,data.email,data.sdt) 
        );
        io.sockets.emit("server-gui-ds",mang);
   });
});
function hocvien(hoten,email,sdt){
    this.HOTEN = hoten;
    this.EMAIL= email;
    this.SDT=sdt;
}

app.get("/", function(req, res){
    res.render("trangchu");
})