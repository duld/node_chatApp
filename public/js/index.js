var socket = io();

// connect - handler
socket.on('connect', function () {
  console.log('connected to server');
});

// disconnect - handler
socket.on('disconnect', function () {
  console.log('connection closed.');
});

// newEmail - handler
socket.on('newEmail', function (data) {
  console.log('New Email!');
  console.log(data);
});

// createEmail - event emit
var createEmail = function (newEmail, text) {
  socket.emit('createEmail', {
    email: newEmail,
    text: text
  });
};

// createMessage - event emit
var createMessage = function(from, text) {
  var data = {from: from, text: text}
  socket.emit('createMessage', data);
};

// newMessage - handler
socket.on('newMessage', function (data) {
  console.log(JSON.stringify(data));
});