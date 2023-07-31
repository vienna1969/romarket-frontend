import { Server } from "socket.io";

export default function SocketHandler(req: any, res: any) {
  
  if (res.socket.server.io) {
    const data = { status: false };
    res.write(JSON.stringify(data));
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {

    // after the connection.....
  });

  io.on("disconnect", (socket) => {

    // after the connection.....
  });

  io.on("join", (data) => {
  });

  const repeater = () => {
    io.emit("tick", "tick");
    setTimeout(repeater, 1000);
  };

  repeater();




  res.end();
}
