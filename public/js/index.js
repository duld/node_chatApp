var socket = io();

// connect - handler
socket.on('connect', function () {
  console.log('connected to server');
});

// disconnect - handler
socket.on('disconnect', function () {
  console.log('connection closed.');
});

// createMessage - event emit
var createMessage = function(from, text) {
  var data = {from: from, text: text}
  socket.emit('createMessage', data, function (res) {
    console.log('Ack recieved');
    console.log(res);
  });
};

// newMessage - handler
socket.on('newMessage', function (data) {
  console.log(JSON.stringify(data));
  // append the new message to our 'messages' list
  var li = document.createElement('li');
  var message = document.createTextNode(`${data.from}: ${data.text}`);
  li.appendChild(message);

  document.querySelector('#messages').appendChild(li);
});


// Form
var messageForm = document.querySelector('#message-form');
messageForm.addEventListener('submit', function (e){
  e.preventDefault();
  
  // grab the text in the message box
  var newMessage = document.querySelector('[name=message]').value;
  createMessage('User', newMessage);
});

var locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function (e){

  if (!navigator.geolocation) {
    return alert('gelocation not supported by your browser.');
  } else {
    navigator.geolocation.getCurrentPosition(function (pos) {
      socket.emit('createLocationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    }, function (err) {
      alert('Unable to fetch location.')
    })
  }
});