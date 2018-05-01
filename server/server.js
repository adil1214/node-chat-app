const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', '/public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected, id: ', socket.id);

    // sent to the current user
    socket.emit('newMessage', "Welcome to the chat room");

    // sent to everyone except the current user
    socket.broadcast.emit('newMessage', "New user joined");

    socket.on('createMessage', (message) => {
        // console.log(JSON.stringify(message, undefined, 2));
        console.log(`${message.from}: ${message.text}`);
        // sent to everyone
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: (new Date()).toLocaleString()
        });

        // io.emit('newMessage', `${message.from}: ${message.text}`);
        // socket.broadcast.emit('newMessage', `${message.from}: ${message.text}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected, id:' , socket.id);
    });
});


server.listen(port, () => {
    console.log(`server started on ${port}` );
});
