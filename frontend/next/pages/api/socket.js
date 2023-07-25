// pages/api/socket.js

const WebSocket = require("ws");

export default function handler(req, res) {
  // Next.js API routes support WebSocket upgrade, but we need to manually handle it.
  if (!req.socket.server.websocketServer) {
    const wss = new WebSocket.Server({ noServer: true });

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        console.log("Received:", message);
        ws.send(`You sent: ${message}`);
      });
    });

    req.socket.server.websocketServer = wss;
  }

  // Upgrade the connection to WebSocket.
  req.socket.server.websocketServer.handleUpgrade(
    req,
    req.socket,
    Buffer.alloc(0),
    onUpgrade
  );

  function onUpgrade(ws) {
    req.socket.server.websocketServer.emit("connection", ws, req);
  }
}
