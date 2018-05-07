const _ = require('lodash');

// addUser (id, name, room)
// removeUser (id)
// getUser (id)
// getUserList (room)

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let result = _.remove(this.users, (element) => element.id == id );
        return result;      // maybe return the first element of the array? (aka the user object)
    }

    getUser(id) {
        return this.users.filter((element) => element.id == id);    // maybe return the first element of the array?
    }

    getUserList(room) {
        let usersInRoom = this.users.filter((userObj) => userObj.room === room);
        let namesArray = usersInRoom.map(userObj => userObj.name);
        return namesArray;
    }
}



module.exports = {Users};