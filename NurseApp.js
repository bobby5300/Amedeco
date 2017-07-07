var app1 = require('express')();
var http = require('http').Server(app1);
var io = require('socket.io')(http);
var Evnt = require('events').EventEmitter.prototype._maxListeners = 0;

var userCount = 0;
var clients = [];
var sequence = 1;

app1.get('/', function(req, res){
  	res.sendFile(__dirname + '/AppPages/NurseApp.html');
});

io.sockets.on('connection', function(socket){
	// new user has joined	
	userCount++;
	clients.push(socket); 
	socket.username = socket.id;
	console.log('user '+ socket.username + ' connected' );
	

// Every 1 second, sends a message to a random client:

    socket.on('clientEvent',function(msg){			
			console.log(msg);
	});


	

	// clients disconnects
  	socket.on('disconnect', function(){
		  userCount--;
  		clients.splice(clients.indexOf(socket), 1);
  		console.log('User ' + socket.username + ' Disconnected');
  	});

  	// process commands and messages
  	
});

http.listen(8000, function(){
  	console.log('listening on *:8000');
});