let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: (new Date()).toLocaleString()
    };
};

let generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url:`https://google.com/maps?q=${lat},${long}`,
        createdAt: (new Date()).toLocaleString()
    };
};


module.exports = {generateMessage, generateLocationMessage};