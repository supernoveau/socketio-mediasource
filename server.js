var express = require('express');
var fs = require('fs');
var ss = require('socket.io-stream');
var path = require('path');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	// Stream Video
	ss(socket).on('stream video', function(stream, data) {
		fs.createReadStream(data.name).pipe(stream);
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
