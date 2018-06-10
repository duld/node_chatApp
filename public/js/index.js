var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('connection closed.');
});

socket.on('newEmail', function (data) {
  console.log('New Email!');
  console.log(data);
});

var createEmail = function (newEmail, text) {
  socket.emit('createEmail', {
    email: newEmail,
    text: text
  });
}