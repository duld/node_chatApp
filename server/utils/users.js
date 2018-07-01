/* 
[
  {
    id: socket.id
    name: name
    room: roomname
  }
]
*/

// addUser(id, name room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {
//   constructor (name, age) {
//     this.name = name || 'default';
//     this.age = age || 0;
//   }

//   getUserDescription () {
//     return `${this.name} is ${this.age} years old.`;
//   }
// }

// let me = new Person('Kesia', 28);
// console.log(me.getUserDescription());

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    let user = { id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    // store the user to be removed, if its found.
    let removedUser;
    // loop over all the users, checking for a matching user.id value.
    this.users = this.users.filter((cur) => {
      if (cur.id === id){
        removedUser = cur;
        return false;
      } else {
        return true;
      }
    });
    // return the removedUser or undefined.
    return removedUser;
  }

  getUser (id) {
    return this.users.filter(cur => cur.id === id)[0];
  }

  getUserList (room) {
    let roomUsers = this.users.filter((cur) => cur.room === room );
    return roomUsers.map( cur => cur.name);
  }

  getUserCount () {
    return this.users.length;
  }
}

module.exports = {Users};