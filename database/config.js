var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    port     : '5432',
    user     : 'tepig',
    password : '',
    database: 'meetup',
    charset  : 'utf8'
  }
});
knex.schema.createTableIfNotExists('userCreatedEvents', function (table) {
  table.integer('userID');
  table.string('event_name');
  table.string('event_location');
  table.string('event_topic');
  table.string('event_date');
  table.string('event_time');
  table.increments('event_id');
  table.string('username');
  table.string('event_description');
})
.then(function() {
});
knex.schema.createTableIfNotExists('users', function (table) {
     table.string('username');
     table.string('password');
     table.string('name');
     table.string('email');
     table.increments('id');
     table.timestamps('created_at');
     table.timestamps('last_login');
     table.string('location');
     table.string('age');
     table.string('profilepic');
     table.string('biography');
     table.string('session_id');
   })
   .then(function() {
});
knex.schema.createTableIfNotExists('user_events', function (table) {
     table.increments('id');
     table.text('username');
     table.text('events');
   })
   .then(function() {
});
var DB = require('bookshelf')(knex);

module.exports.DB = DB;
