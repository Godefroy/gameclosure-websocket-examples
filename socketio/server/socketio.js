#!/usr/bin/env node

var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
  socket.on('test1', function (data) {
    console.log("test1" + JSON.stringify(data));
	socket.emit('test1', data);
  });
  socket.on('test2', function (data) {
    console.log("test2" + JSON.stringify(data));
    socket.emit('test2', data);
  });
});

