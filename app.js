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
	console.log('Clients number', io.engine.clientsCount);
	socket.join("room1");
	socket.on('join',(room)=>{
		console.log('Joining ' + room);
		socket.join(room);
	})
	socket.on('drawingSend', (data) => {
		socket.to(data.room).emit('otherData',data.canvasData);
	});	
	socket.on('chat',(data)=>{
		socket.to(data.room).emit('receiveChat',data.message)
	})
});


app.get('/', (req, res, next) => {
	res.send('Hola');
});

server.listen(4000, () => console.log('Server running on port 4000'));
