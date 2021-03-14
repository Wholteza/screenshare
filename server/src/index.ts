type Peer = {
  id: number;
  name: string;
};

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8888 });

wss.on("listening", function () {
  console.log("Server started...");
});

wss.on("connection", function (connection) {
  console.log("User connected");

  //message function
  connection.on("message", function (message) {
    console.log("message from user");
  });

  //close the connection
  connection.on("close", function () {
    console.log("Disconnecting user");
  });
});
