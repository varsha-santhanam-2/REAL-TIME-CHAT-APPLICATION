const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = 4000;

app.use(express.static('public'));

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('A user connected');
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});