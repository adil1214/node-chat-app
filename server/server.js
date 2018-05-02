const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', '/public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected, id: ', socket.id);

    // sent to the current user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // sent to everyone except the current user
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log(`${message.from}: ${message.text}`);
        // sent to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
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
