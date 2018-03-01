let DB = require('../database/config');

DB = DB.DB;
const knex = DB.knex;

const User = DB.Model.extend({
  tableName: 'users',
  idAttribute: 'id',
});
const UserEvents = DB.Model.extend({
  tableName: 'user_events',
  idAttribute: 'id',
});
const Event = DB.Model.extend({
  tableName: 'userCreatedEvents',
  idAttribute: 'eventId',
});
const getNonApiEvents = (eventId, username, callback) => {
  knex.select('userCreatedEvents.event_name', 'userCreatedEvents.event_location', 'userCreatedEvents.event_description', 'userCreatedEvents.event_topic', 'userCreatedEvents.event_date', 'userCreatedEvents.event_time')
    .from('userCreatedEvents')
    .where('userCreatedEvents.username', '=', username).then((row) => {
      const result = [];
      result.push(row);
      const firstRow = row[0];
      if (!firstRow) {
        callback('Could not find event', null);
      } else {
        const test = result;
        callback(null, test);
      }
    });
};

const createNewUser = (callback) => {
  new User().save().then((user) => {
    callback(user.toJSON().id);
  });
};
const getUserCredentials = (userId, callback) => {
  const loginUser = {
    local: {
      username: '',
      password: '',
      biography: '',
      location: '',
      name: '',
      age: 0,
      image: '',
    },
  };
  knex.select('users.id', 'users.username', 'users.password', 'users.biography', 'users.location', 'users.name', 'users.age', 'users.profilepic', 'users.location')
    .from('users')
    .where('users.id', '=', userId).then((row) => {
      const firstRow = row[0];
      if (!firstRow) {
        callback('Could not find user with that ID', null);
      } else {
        loginUser.local.username = row.username;
        loginUser.local.password = row.password;
        loginUser.local.biography = row.biography;
        loginUser.local.location = row.location;
        loginUser.local.age = row.age;
        loginUser.local.name = row.name;
        loginUser.local.image = row.profilepic;
        callback(null, loginUser);
      }
    });
};
const getUserEvents = (username, callback) => {
  const userEvents = {
    local: {
      username: '',
      events: [],
    },
  };
  knex.select('user_events.id', 'user_events.username', 'user_events.events')
    .from('user_events')
    .where('user_events.username', '=', username).then((row) => {
      const firstRow = row[0];
      if (!firstRow) {
        callback('Could not find events from that user', null);
      } else {
        userEvents.local.username = row.username;
        userEvents.local.events = row.events;
        callback(null, userEvents);
      }
    });
};
module.exports = {
  createNewUser,
  getUserCredentials,
  User,
  UserEvents,
  Event,
  getUserEvents,
  getNonApiEvents,
};
