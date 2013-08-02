import device;

import plugins.websocket.install;

exports = Class(GC.Application, function() {

  this.initUI = function() {

    var i = 0;
    var websocket = new WebSocket("ws://192.168.0.12:1337", "echo-protocol");
    this.websocket = websocket;
    websocket.onopen = function() {
      websocket.send("test onopen");
    };
    websocket.addEventListener("open", function() {
      websocket.send("test addEventListener(\"open\", Function)");
    });
    websocket.addEventListener("message", function(evt) {
      websocket.send(evt.data + " " + (i++));
      logger.log("Websocket message: "+evt.data);
      if(i==5){
        logger.log("Websocket close");
        websocket.close();
      }
    });

    websocket.onclose = function() {
      logger.log("Websocket onclose");
    };
    websocket.addEventListener("close", function(evt) {
      logger.log("addEventListener(\"close\", "+JSON.stringify(evt)+")");
    });

  };

  this.launchUI = function() {};
});