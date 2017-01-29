const EventEmitter = require('events');

class ChataClient extends EventEmitter {
	constructor(location='https://chata.toka.io:1337') {
		super();
		this.connected = false;
		this.rooms = [];
	}

	login(username) {
		this.username = username;
		this.socket = require('socket.io-client')('https://chata.toka.io:1337')
		.on('connect', () => {
			this.connected = true;
			this.emit('connect');
		})
		.on('receiveMessage', (message) => {
			this.emit('message', new Message(message));
		})
		.on('disconnect', () => {
			this.connected = false;
			this.emit('disconnect');
		})
	}

	currentChatrooms() {
		return this.rooms;
	}

	join(chatroomId) {
		if (this.rooms.indexOf(chatroomId) === -1) {
			this.rooms.push(chatroomId);
			this.socket.emit('join', {username:this.username, chatroomId:chatroomId});
		}
	}

	sendMessage(chatroomId, text) {
		this.socket.emit('sendMessage', new Message({chatroomId:chatroomId, username:this.username, text:text}));
	}
}

class Message {
	constructor({chatroomId:chatroomId, username:username, text:text, timestamp:timestamp=false}) {
		this.chatroomId = chatroomId;
		this.username = username;
		this.text = text;
		if (timestamp) {
			this.timestamp = timestamp;
		}
	}
}

module.exports = ChataClient;