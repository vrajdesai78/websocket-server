const express = require('express');
const http = require('http');
const WebSocket = require('ws'); 
require('dotenv').config();

const server = http.createServer(express);
const wss = new WebSocket.Server({ server });
const app = express();

// port
const PORT = process.env.PORT || 10000;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

app.get('/', function(req, res) {
  res.status(200).send('OK');
});

const httpServer = app.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}!`)
})