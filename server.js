// Import required modules
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

// Create an Express app
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a WebSocket server on the same server
const wss = new WebSocket.Server({ server });

// PORT
const PORT = process.env.PORT || 10000;

// WebSocket server event handlers
wss.on('connection', (ws) => {
  console.log('Client connected');

  // WebSocket message event handler
  ws.on('message', (message) => {
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // WebSocket close event handler
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Serve a simple HTML file for testing
app.get('/', (req, res) => {
  // send ok status
  res.status(200).send('ok');
});

// Start the HTTP server on port 3000
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
