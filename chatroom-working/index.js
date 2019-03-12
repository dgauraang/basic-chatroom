const express = require('express');

let app = express();
let port = process.env.PORT || 3000;

let server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = require('socket.io')(server);
app.set('view engine', 'ejs');
app.use(express.static('public'));

let nicknames = {};
let rooms = {};

app.get('/', function (req, res) {
	res.render('index', {});
});

io.on('connection', function(socket) {
	console.log('A user connected');
	socket.on('chat message', function (msg) {
		socket.broadcast.to(rooms[socket.id]).emit('chat message', `${nicknames[socket.id]} : ${msg}`);
	});

	socket.on('nickname', function(nickname) {
		nicknames[socket.id] = nickname;
	});

	socket.on('room', function(room) {
		socket.join(room);
		rooms[socket.id] = room;
	});

	socket.on('disconnect', function() {
		nicknames[socket.id] = undefined;
		rooms[socket.id] = undefined;
		console.log('A user disconnected');
	});
});
