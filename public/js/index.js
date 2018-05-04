let socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    let template = jQuery('#message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        time: formattedTime
    });

    jQuery('#messages').append(html);

    // // console.log(JSON.stringify(message, undefined, 2));
    // let formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log(message);
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} (${formattedTime}): ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let template = jQuery('#location-message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        link: message.url
    });

    jQuery('#messages').append(html);


    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My current location</a>');
    // let formattedTime = moment(message.createdAt).format('h:mm a');

    // li.text(`${message.from}  (${formattedTime}): `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
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

    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: `User[${socket.id.slice(0,5)}]`,
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

let locationButton = jQuery("#send-location");
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.prop('disabled', true).text('sending...');

    navigator.geolocation.getCurrentPosition(function (pos) {
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
        locationButton.prop('disabled', false).text('Send location');
    }, function () {
        locationButton.prop('disabled', false).text('Send location');
        alert('Unable to fetch location.');
    })
});