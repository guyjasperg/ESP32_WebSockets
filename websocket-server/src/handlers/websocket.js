const WebSocket = require("ws");

const clients = new Map();

// Helper function to broadcast to all clients
const broadcast = (message) => {
  console.log("Broadcasting message:", message);
  clients.forEach((client) => {
    console.log("Client ID:", client.clientId);
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message));
    }
  });
};

const handleConnection = (ws) => {
  console.log("New client connected");
  let clientId = null;

  // Request client identity
  ws.send(
    JSON.stringify({
      type: "identity",
      message: "Please identify yourself",
    })
  );

  // Handle incoming messages
  ws.on("message", (data) => {
    try {
      let message = JSON.parse(data);
      console.log("Received:", message);

      // Handle identity response
      if (message.type === "identity") {
        const parsedData = JSON.parse(message.data);
        clientId = Date.now();
        clients.set(clientId, {
          ws,
          deviceType: parsedData.devicetype,
          connected: true,
        });
        console.log(`ESP32 client registered with ID: ${clientId}`);
      }

      console.log("Client ID:", clientId);
      
      // Handle pump status updates
      if (message.type === "pumpstatus") {
        const parsedData = JSON.parse(message.data);
        // Broadcast status to all connected clients
        broadcast({
          type: "pumpStatus",
          status: parsedData.status,
        });
      }
      
      // Handle pump interval updates
      if (message.type === "pumpInterval") {
        // Broadcast the interval status to all connected clients
        broadcast({
          type: "pumpInterval",
          data: message.data,
          timestamp: message.timestamp
        });
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    if (clientId) {
      clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    }
  });
};

const getConnectedClients = () => {
  return Array.from(clients.entries())
    .filter(([_, client]) => client.deviceType === "ESP32")
    .map(([clientId]) => clientId);
};

const sendToClient = (clientId, message) => {
  console.log(`Sending message to client ${clientId}:`, message);
  const client = clients.get(parseInt(clientId));
  if (!client) {
    console.error(`Client ${clientId} not found`);
    return false;
  }
  client.ws.send(JSON.stringify(message));
  return true;
};

module.exports = {
  handleConnection,
  getConnectedClients,
  sendToClient,
};
