const WebSocket = require("ws");

// Connect to WebSocket server
const ws = new WebSocket("ws://192.168.1.7:3000");

// Connection opened
ws.on("open", function () {
  console.log("Connected to WebSocket server");

  // Send a message to the server
  ws.send("Hello from client!");
});

// Listen for messages
ws.on("message", function (data) {
  console.log("Received from server:", data.toString());
});

// Handle errors
ws.on("error", function (error) {
  console.log("WebSocket error:", error);
});

// Handle connection close
ws.on("close", function () {
  console.log("Disconnected from WebSocket server");
});
