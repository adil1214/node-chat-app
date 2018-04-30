let socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'user1@gmail.com',
    //     text: 'the email body',
    //     from: 'me@smtp.eu'
    // });

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
//     console.log('new email!', email);
// });

socket.on('newMessage', function (message) {
    console.log(JSON.stringify(message, undefined, 2));
});