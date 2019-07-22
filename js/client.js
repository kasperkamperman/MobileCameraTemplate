
var socket = io('ws://localhost:13254');

socket.on('example-pong', function (data) {
    console.log("pong");
});

