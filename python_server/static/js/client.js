$(document).ready(function(){

    var socket = io.connect('http://' + document.domain + ':' + location.port);
    
    console.log(1)
    socket.emit('client-event', {data: "my event data"});

    socket.on('server-event', function(msg) {
        console.log(msg)
        socket.emit('client-event', {data: msg.data + 1});
    });
});

