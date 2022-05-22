const express = require('express');
const http = require('http');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors');

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors);

io.on('connection', (socket) => {
    socket.join('test')
	console.log('user');
	console.log('Clients number', io.engine.clientsCount);
	socket.on('drawingSend', (data) => {
		io.emit('otherData', data);
	});
});

app.get('/', (req, res, next) => {
	res.send('Hola');
});

server.listen(4002, () => console.log('Server running on port 4000'));
