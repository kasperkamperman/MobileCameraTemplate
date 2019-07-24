$(document).ready(function(){

    var socket = io.connect('http://' + document.domain + ':' + location.port);
    
    console.log(1)
    socket.emit('client-event', {data: "my event data"});

    socket.on('server-event', function(msg) {
        console.log("got message: "+String(msg.data));
        console.log("taking snapshot");
        snapshot();
        socket.emit('client-event', {data: "my event data"});
    });
});

