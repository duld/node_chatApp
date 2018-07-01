var socket = io();

function scrollToBottom () {
  // console.log('checking if we need to scroll!');
  // Selectors
  var messages = document.querySelector('#messages');
  var newMessage = messages.lastElementChild;
  var prevMessage = newMessage.previousElementSibling;
  // Heights
  var clientHeight = messages.clientHeight;
  var scrollTop = messages.scrollTop;
  var scrollHeight = messages.scrollHeight;
  var newMessageHeight = newMessage.offsetHeight;
  var prevMessageHeight = prevMessage ? prevMessage.offsetHeight : 0;
  // SUM
  var scrollLimit = clientHeight + scrollTop + newMessageHeight + prevMessageHeight;

  // console.log(clientHeight, scrollTop, scrollHeight, newMessageHeight);
  if ( scrollLimit >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  } else {
    console.log('stay put!');
  }
}

// connect - handler
socket.on('connect', function () {
  // console.log('connected to server');
  var params = getPramsAsObj(window.location.search);
  // console.log(params)
  socket.emit('join', params, function (err){
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error found!');
      setPageTitle(params.room);
    }
  });
});

// disconnect - handler
socket.on('disconnect', function () {
  console.log('connection closed.');
});

// createMessage - event emit
var createMessage = function(text) {
  socket.emit('createMessage', text, function (res) {
    if (res) {
      console.log(res)
    }
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
  scrollToBottom();
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
  scrollToBottom();
});

// updateUserList - handler
socket.on('updateUserList', function (users){
  var users_div = document.querySelector('#users');
  users_div.innerHTML = "";

  // console.log('users list:  ' + users.join(', '));
  var ol = document.createElement('ol');
  var li, text;
  users.forEach(function (user){
    li = document.createElement('li');
    text = document.createTextNode(user);
    li.appendChild(text);
    ol.appendChild(li);
  });
  
  users_div.appendChild(ol);

});


// Form
var messageForm = document.querySelector('#message-form');
messageForm.addEventListener('submit', function (e){
  e.preventDefault();
  // grab the text in the message box
  var textInput = document.querySelector('[name=message]')
  var newMessage = textInput.value;
  textInput.value = "";
  createMessage(newMessage);
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

// Set title basedon chatroom
function setPageTitle(roomName) {
  document.title = document.title + ' ' + roomName;
}