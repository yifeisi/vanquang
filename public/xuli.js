var socket =io("http://localhost:3000");
socket.on("server-send-room-socket",function(data){
    $("#roomhientai").html(data);
});
socket.on("server-gui-ds",function(data){
    $("#ds").html("");
    data.map(function(hocvien,index){
        
        $("#ds").append(`
        <div class='hocvien'>
            <div class="hang1">id:` +index+ ` || <span>` + hocvien.HOTEN +`</span></div>
            <div class="hang2">` + hocvien.EMAIL +` - ` + hocvien.SDT +`</div>
        </div>
        `)
    });
});
$(document).ready(function(){
    $("#btnregister").click(function(){
        socket.emit("hoc-vien-gui-thongtin",
        {
            hoten:$("#txthoten").val(),
            email:$("#txtemail").val(),
            sdt:$("#txtsdt").val()
        });
    });
    $("#btnchat").click(function(){
        socket.emit("user-chat",$("#txtmessage").val());
    });
});