const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage function', () => {
    it('should generate the correct message object', () => {
        const from1 = 'Bot1',
            text1 = 'i\'m just a bot LUL';

        let retObject = generateMessage(from1, text1);

        expect(retObject.text).toBe(text1);
        expect(retObject.from).toBe(from1);
        expect(typeof retObject.createdAt).toBe('string');

    });
});