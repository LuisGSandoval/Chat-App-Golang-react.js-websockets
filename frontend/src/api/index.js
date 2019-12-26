var socket = new WebSocket("ws://192.168.43.171:8080/ws");

let connect = cb => {
  console.log("Attempting connection...");

  socket.onopen = () => {
    console.log("Succesfully connected");
  };

  socket.onmessage = msg => {
    console.log(msg);
    cb(msg);
  };

  socket.onclose = e => {
    console.warn("Socket closed connection...", e);
  };

  socket.onerror = err => {
    console.error("Socket error", err);
  };
};

let sendMsg = msg => {
  console.log("Send message: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
