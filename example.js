const ChataClient = require('./index.js');

// Create the new client
const client = new ChataClient();

// On connect
client.on('connect', () => {
	// Join 'Toka'
	client.join('toka');
	// Send a message to toka
	client.sendMessage('toka', 'B-B-Baka @arc !')
});

// On reciving a message
client.on('message', (message) => {
	// Display the message to the console
	console.log(message);
});

// Login uisng 'Waifu' as the username
client.login('Waifu');