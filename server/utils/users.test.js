const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '1',
                name: 'mike',
                room: 'node course'
            }, {
                id: '2',
                name: 'jen',
                room: 'react course'
            }, {
                id: '3',
                name: 'julie',
                room: 'node course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'adil',
            room: 'the first room'
        };
        let resUser = users.addUser(user.id, user.name, user.room);
        // testing
        expect(users.users).toEqual([user]);

    });

    it('should remove the user', () => {
        let removedUers = users.removeUser(3);
        expect(users.users.length).toEqual(2);
        expect(removedUers[0].name).toBe('julie');
    });

    it('should not remove the user', () => {
        let removedUers = users.removeUser(5);
        expect(users.users.length).toEqual(3);
        expect(removedUers).toEqual([]);
    });

    it('should find user', () => {
        let usr = users.getUser(1);
        expect(usr).toEqual([{id: '1', name: 'mike', room: 'node course'}]);
    });

    it('should not find user', () => {
        let usr = users.getUser(19);
        expect(usr).toEqual([]);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('node course');
        expect(userList.length).toBe(2);
    });

    it('should return names for react course', () => {
        let userList = users.getUserList('react course');
        expect(userList.length).toBe(1);
        expect(userList).toEqual(['jen']);
    });
});
