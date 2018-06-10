// Libraries
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


// Set director to load static files from.
const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  const connection_id = socket.client.conn.id;
  console.log('new user is connected');
  console.log(`Connection ID: ${connection_id}`);
  
  socket.on('disconnect', () => {
    console.log('The client has disconected');
  });
})

server.listen(PORT, () => {
  console.log(`Server is up and listening on port: ${PORT}`);
});