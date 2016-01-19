var ss = require('socket.io-stream');
var MediaSourceStream = require('mediasource')

// Check MediaSource API
function hasMediaSource() {
	return !!(window.MediaSource || window.WebKitMediaSource);
}

if (hasMediaSource()) {
	console.log('MedaiSource API available.');
} else {
	alert("Your browser doesn't support the MediaSource API!");
}

function createElem (tagName) {
	var elem = document.createElement(tagName)
	elem.controls = true
	elem.autoplay = true // for chrome
	elem.play() // for firefox
	document.body.appendChild(elem)
	return elem
}

var socket = io();
var elem = createElem('video');
var stream = ss.createStream();
var fileName = 'small.webm';

ss(socket).emit('stream video', stream, {name: fileName} );

var writable = new MediaSourceStream(elem, { extname: '.webm' });

stream.pipe(writable);
