// Libraries
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Utils
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// Server Setup.
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

// Set directory to load static files from.
const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

// Socket IO
io.on('connection', (socket) => {
  // grab the connection ID and log it.
  const connection_id = socket.client.conn.id;

 

  // Server <- Client :: join
  socket.on('join', (params, callback) => {
    if (!(isRealString(params.name) && isRealString(params.room))){
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    
    let userList = users.getUserList(params.room);
    io.to(params.room).emit('updateUserList', userList);

    // Welcome the user to to the chat app and notify all other users of their arrival.
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  // Server <- Client :: createMessage
  socket.on('createMessage', (message, callback) => { 
    let user = users.getUser(socket.id);

    if (user && isRealString(message)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message));
    }
    
    if (callback) {
      callback();
    }
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // Set handler for when the client disconnects.
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + ' has left.'));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is up and listening on port: ${PORT}`);
});
