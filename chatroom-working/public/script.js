let socket = io();
// Make form get name 
let roomForm = document.getElementById('room');
roomFormEvent();
function roomFormEvent() {
	// Add an event listener to the room form 
	roomForm.addEventListener('submit', function(e){
		e.preventDefault();
		let rbox = document.getElementById('rbox');
		let room = rbox.value;
		// Set room in server
		socket.emit('room', room);
		nbox.value = '';
		// Set display to off and display nickname form
		roomForm.style.display = 'none';
		let nameForm = document.getElementById('name');
		nameForm.style.display = 'block';
		nameFormEvent();
		return false;
	});

}
function nameFormEvent() {
	// Add an event listener to the name form
	let nameForm = document.getElementById('name');
	nameForm.addEventListener('submit', function(e){
		e.preventDefault();
		let nbox = document.getElementById('nbox');
		let nickname = nbox.value;
		// Set nickname in server
		socket.emit('nickname', nickname);
		nbox.value = '';
		// Set display to off and display message form
		nameForm.style.display = 'none';
		let messages = document.getElementById('messages');
		messages.style.display = 'block';
		msgFormEvent();
		return false;
	});
}
// Add an event listener to the message form
function msgFormEvent() {
	let msgForm = document.getElementById('msg');
	msgForm.addEventListener('submit', function(e) {
		// Prevent post request
		e.preventDefault();
		let li = document.createElement('li');
		let box = document.getElementById('mbox');
		let message = box.value;
		socket.emit('chat message', message);
		li.innerHTML = `You: ${message}`;
		// Add message to messages
		let messages = document.getElementById('messages');
		box.value = '';
		messages.append(li);
		// Prevent redirection
		return false;
	});
}

socket.on('chat message', function(msg) {
	let message = document.createElement('li');
	let messages = document.getElementById('messages');
	message.innerHTML = msg;
	let box = document.getElementById('mbox');
	box.value = '';
	messages.append(message);
});
