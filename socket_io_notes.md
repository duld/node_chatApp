# Section 9: SocketIO

## Adding Socket.io to an App
### Web Sockets
Websockets are a persistant technology. If a connection between a client and the serer
is already present, then the client will attempt to maintain the connection, even if 
the server goes down.

### Socket IO events
connection: a server-side event that fires when a client makes a connection via socketIO.
connect: a client-side event that occurs when a connection is established with socketIO.

## Emitting and Listening to Events
We can use socketIO's event emitting and handling functionality to our advantage. It is as simple as telling socketIO to emit an event, and to include a handler for that event and to handle it.

### Handling the event on the client
We have access to the socketIO through the the __io__ global, which is loaded in from the script on our webserver. To handle an event, we simply need to call, __io('event-name', callback_fn)__. Where 'event-name' is the name of the event we are waiting to handle and the 'callback_fn' is the callback we will run when the event occurs.

### Handling the event on the server
Identical to handling the event on the client, except we are not sourcing the socketIO module and not a subscript located on our server.

## Emitting and Listening to Events (solution)


## Broadcasting Events
If you want to emit an event to all connections on a socketIO instance, you would call __'io.emit(EVENT, callback_fn)'__. If however you want to broadcast an event from a single connection and have it go out to the other connections (excluding the source), then you would call __'socket.broadcast.emit(EVENT, callback_fn)'__.

If we have connections: A, B and C. Suppose 'A', broadcasts an event, only connection B and C will handle that event. Connection 'A' will not receive the event.

## Message Generator & Tests
Here we refactor out a common snippet of code, into it's own file. We then installed mocha and expect for unit tests. Finally we crated a test file for our newly refactored code.


## Event Acknowledgements
We can add Event Acknowledgements to our socketIO event emiters by providing a third argument, in the form of a callback. The call back can take a single argument, which can be of any type.

Using acknowledgements and the values they return will allow us some insight on the current state. Was the request good? Was it bad? Are the values returned what we expected?

## Message Form & jQuery


## Geolocation part 1


## Geolocation part 2


## Styling the Chat Page


## Timestamps and Formatting with Moment


## Printing Message Timestamps


## Moustache.js
moustache.js is a handlebars

## Autoscrolling
var obj = arr.reduce(function(acc, cur, i) {
  acc[i] = cur;
  return acc;
}, {});

## Adding a Join Page


## Passing Room Data
We need to get the information passed into the __username__ and __roomname__ field. Right now the values are stored in the URL 'querystring'. Andrew uses a JS snippet to extract the values from the URL into a JS Object using jQuery. I don't want to use jQuery. 

The modern way to get this information is to use the __URLSearchParams()__ browser API. But this method is not backwards compatible with older browsers. Instead I will try to get the values based on an older API; __window.location.search__.

We can grab the querystring and begin transforming it ourselves, removing the leading '?' the equal signs (=) and the plus symbol (+). Then run a reduce on the result to convert it into an object.

## Socket.io Rooms
It is very simple to join a room, in socketIO. You simply need to specify the room on the socket object that you would like to join.
```JavaScript
let myMessage = 'Hi everybody!';
socket.join('very cool chat room');
socket.to('very cool chat room').emit('newMessage', myMessage);
``` 

## Storing Users with ES6 Classes part 1


## Storing Users with ES6 Classes part 2


## Wiring Up User List


## Sending Messages to Room Only


## New Feature Ideas


