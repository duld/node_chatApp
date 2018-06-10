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
};


var createMessage = function(from, text) {
  var data = {from: from, text: text}
  socket.emit('createMessage', data);
};

socket.on('newMessage', function (data) {
  console.log(JSON.stringify(data));
});


// challenge
/* 
SERVER -> CLIENT
emit event - newMessage {from, text, createdAt}
client listens for newMessage

SERVER <- CLIENT
emit event - createMessage {from, text}
server listens for 'createMessage'
*/