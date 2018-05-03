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

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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
        from: `User${socket.id.slice(0,5)}`,
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});

let locationButton = jQuery("#send-location");
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (pos) {
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    })
});