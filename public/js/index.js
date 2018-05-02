let socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    // console.log(JSON.stringify(message, undefined, 2));
    console.log(message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Bot1',
//     text: 'hi'
// }, function (response) {
//     console.log(`response: ${response}`);
// });

jQuery('#message-form').on('submit', function (e) {
    // override/prevent the default html form behaviour
    e.preventDefault();     

    socket.emit('createMessage', {
        from: 'User1',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});