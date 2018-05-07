const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', '/public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected, id: ', socket.id);

    socket.on('join', (params, callback) => {

        if ( !isRealString(params.name) || !isRealString(params.room) ) {
            return callback('name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // sent to the current user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        // sent to everyone except the current user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log(`${message.from}: ${message.text}`);
        // sent to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        let leftUser = users.removeUser(socket.id);
        if (leftUser) {
            io.to(leftUser[0].room).emit('updateUserList', users.getUserList(leftUser[0].room));
            io.to(leftUser[0].room).emit('newMessage', generateMessage('Admin', `${leftUser[0].name} has left.`));
            console.log('user disconnected, name:', leftUser[0].name);
        }
    });
});


server.listen(port, () => {
    console.log(`server started on ${port}, at ${(new Date()).toTimeString()}` );
});
