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
  var formattedTime =  moment(data.createdAt).format('h:mm a');
  var template = document.querySelector('#message-template').innerHTML;
  var html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });

  document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
});

// newLocationMessage - handler
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = document.querySelector('#location-message-template').innerHTML;
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    url: message.url,
    createdAt: formattedTime
  });

  document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
});


// Form
var messageForm = document.querySelector('#message-form');
messageForm.addEventListener('submit', function (e){
  e.preventDefault();
  // grab the text in the message box
  var textInput = document.querySelector('[name=message]')
  var newMessage = textInput.value;
  textInput.value = "";
  createMessage('User', newMessage);
});

// Send Location - button
var locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function (e){
  // check if the user browser doesnt have geolocation.
  if (!navigator.geolocation) {
    locationButton.disabled = true;
    return alert('gelocation not supported by your browser.');
  // if it does, get the current position and send the values to socketIO.
  } else {
    navigator.geolocation.getCurrentPosition(function (pos) {
      locationButton.text = 'Sending Location';
      socket.emit('createLocationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
      // disable the button.
      locationButton.disabled = true;
      locationButton.text = 'Send Location';
    }, function (err) {
      alert('Unable to fetch location.')
    });
  }
});