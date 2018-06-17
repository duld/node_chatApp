// Libraries
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Utils
const {generateMessage} = require('./utils/message');

// Server Setup.
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// Set directory to load static files from.
const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

// Socket IO
io.on('connection', (socket) => {
  // grab the connection ID and log it.
  const connection_id = socket.client.conn.id;
  console.log('new user is connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

  // Server <- Client :: createMessage
  socket.on('createMessage', (message, callback) => {

    let resMessage = {
      from: message.from,
      text: message.text,
      createdAt: Date.now()
    };

    io.emit('newMessage', resMessage);
    if (callback) {
      callback('this is form the server');
    }
  });

  // Set handler for when the client disconnects.
  socket.on('disconnect', () => {
    console.log('The client has disconected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is up and listening on port: ${PORT}`);
});
