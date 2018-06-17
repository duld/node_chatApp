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
  console.log(`Connection ID: ${connection_id}`);

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

  // Server <- Client :: createMessage
  socket.on('createMessage', (data) => {
    console.log('new message being created!');
    
    let resData = {
      from: data.from,
      text: data.text,
      createdAt: Date.now()
    };

    socket.emit('welcome to the chat app');
    // emit a newMessage event, with the timestamped data.
    io.emit('newMessage', resData);
    // socket.broadcast.emit('newMessage', resData);
  });

  // Set handler for when the client disconnects.
  socket.on('disconnect', () => {
    console.log('The client has disconected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is up and listening on port: ${PORT}`);
});
