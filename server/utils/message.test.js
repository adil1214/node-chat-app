const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage function', () => {
    it('should generate the correct message object', () => {
        const from1 = 'Bot1',
            text1 = 'i\'m just a bot LUL';

        let retObject = generateMessage(from1, text1);

        expect(retObject.text).toBe(text1);
        expect(retObject.from).toBe(from1);
        expect(typeof retObject.createdAt).toBe('number');

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const lat = 15,
            long = 22,
            from = 'med',
            url = 'https://google.com/maps?q=15,22';
        let res = generateLocationMessage(from, lat, long);
        expect(res.from).toBe(from);
        expect(res.url).toBe(url);
        expect(typeof res.createdAt).toBe('number');
    });
});