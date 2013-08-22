import device;

import plugins.websocket.install;

var ip = "192.168.0.12";
var port = 1337;

exports = Class(GC.Application, function() {

  this.initUI = function() {

    var socket = io.connect("http://" + ip + ":" + port);
    socket.on('test1', function (data) {
      logger.log("Socket.io event: test1 " + data);
      setTimeout(function() {
        socket.emit('test2', data);
      }, 200);
    });
    socket.on('test2', function (data) {
      logger.log("Socket.io event: test2 " + data);
      setTimeout(function() {
        socket.emit('test1', data);
      }, 200);
    });
    socket.on('message', function (data) {
      logger.log("Socket.io message: " + JSON.stringify(data));
    });
    socket.emit('test1', "lol");

  };

  this.launchUI = function() {};
});