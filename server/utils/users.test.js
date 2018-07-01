const expect = require('expect');

const {Users} = require('./users');


describe('Users class', () => {
  // variable to store our seed data, accessible by all unit tests.
  let users;

  // Seed some dummy data before each test.
  beforeEach(() => {
    users = new Users();
    // create some seed data.
    userList = [
      {
        id: 34567,
        name: 'Kesia',
        room: 'Bounce-House'
      },
      {
        id: 38475,
        name: 'Jeffrey',
        room: 'hunchback-hangout'
      },
      {
        id: 45677,
        name: 'Corbett',
        room: 'hunchback-hangout'
      }
    ];
    userListLen = userList.length; // original length
    users.users = userList; // store the seed data in our users obj.
  })

  // User.addUser()
  it('Should add a new User', () => {
    // create dummy user data
    let user = {
      id: 1234,
      name: 'Jeff',
      room: 'wallJump'
    };
    // insert the dummy data, storing the response.
    let response = users.addUser(user.id, user.name, user.room);

    // making our assertions.
    expect(users.users.length).toBe(userListLen + 1); // user was added.
    expect(users.users[userListLen]).toEqual(user); // user values match.
    expect(response).toEqual(user); // response value matches inserted value.
  });

  // User.removeUser() - found
  it('Should remove a user', () => {
    // create dummy user data
    let user = {
      id: 1234,
      name: 'Jeff',
      room: 'wallJump'
    };
    // insert the dummy data, storing the response.
    let response = users.addUser(user.id, user.name, user.room);
    let removedUser = users.removeUser(1234);
    // making our assertions
    expect(response).toEqual(removedUser);
    expect(users.getUserCount()).toBe(userListLen);
  });

  // User.removeUser() - not found
  it('Should not remove a user if an invalid id is privided', () => {
    // create dummy user data
    let user = {
      id: 1234,
      name: 'Jeff',
      room: 'wallJump'
    };

    let removedUser = users.removeUser(1234);
    // making our assertions
    expect(removedUser).toBeFalsy();
    expect(removedUser).toNotExist();
  });

  // User.getUsers() - found
  it('Should return a list of names based on room name', () => {
    let roomName = users.users[1].room;
    let userList = users.getUserList(roomName);
    let userCount = users.users.filter((cur) => cur.room === roomName);
    
    expect(userList.length).toBe(userCount.length);
    expect(() => {
      userList.forEach( cur => {
        expect(cur).toBeA('string');
      });
    });
  });

  // User.getUsers() - not found
  it('Should return an empty list if room name has no users', () => {
    let roomName = 'not an active room name';
    let userList = users.getUserList(roomName);
    let userCount = users.users.filter((cur) => cur.room === roomName);
    
    expect(userList.length).toBe(userCount.length);
    expect(userList).toBeAn('object');
  });

  // User.getUser()
  it('Should get a user based on id', () => {
    let userToFind = users.users[1];
    let user_id = userToFind.id;
    let user = users.getUser(user_id);

    expect(user).toBeAn('object');
    expect(user).toIncludeKeys(['id', 'room', 'name']);
    expect(user).toEqual(userToFind);
  });
});