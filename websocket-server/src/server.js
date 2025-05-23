const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const path = require("path");
const {
  handleConnection,
  getConnectedClients,
  sendToClient,
} = require("./handlers/websocket");
const { PORT } = require("./config");

// Create Express app
const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Create HTTP server with Express
const httpServer = http.createServer(app);

// Create WebSocket server attached to HTTP server
const wsServer = new WebSocket.Server({
  server: httpServer,
  host: "0.0.0.0",
});

// Handle WebSocket connections
wsServer.on("connection", handleConnection);

// API endpoint to send messages to clients
app.post("/send/:clientId", express.json(), (req, res) => {
  const success = sendToClient(req.params.clientId, {
    type: "command",
    data: req.body,
  });

  if (!success) {
    return res.status(404).json({ error: "Client not found" });
  }
  res.json({ success: true });
});

// API endpoint to list connected clients
app.get("/clients", (_, res) => {
  res.json(getConnectedClients());
});

// Start server
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
