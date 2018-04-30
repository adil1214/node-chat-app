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
    console.log('new user connected');

    // socket.emit('newEmail', {
    //     from: 'anonyme@nowhere.com',
    //     text: "hey. watch out!",
    //     createdAt: 1999
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail:', newEmail);
    // });
    //==============================

    socket.on('createMessage', (message) => {
        console.log('message recivered \n');
        console.log(JSON.stringify(message, undefined, 2));
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: (new Date()).toLocaleString()
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected.');
    });
});


server.listen(port, () => {
    console.log(`server started on ${port}` );
});
