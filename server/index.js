const flash = require('flash');
const express = require('express');
const helpers = ('./helpers.js');
const config = require('./config.js');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');

const Model = require('./model.js');

const User = Model.User;
const request = require('request');
const cookieParser = require('cookie-parser');

const app = express();
const categories = require('../assets/categories.json');
require('../passport.js')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'haha',
  name: 'session_id',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 2419200000,
  },
}));
app.use(flash());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/login', express.static(__dirname + '/../client/dist'));
app.use('/logout', express.static(__dirname + '/../client/dist'));
app.use('/signup', express.static(__dirname + '/../client/dist'));
app.use('/home', express.static(__dirname + '/../client/dist'));
app.use('/profile', express.static(__dirname + '/../client/dist'));
app.use('/create', express.static(__dirname + '/../client/dist'));
const getMeetupsByLatLon = (lat, lon, callback) => {
  const options = {
    url: `http://api.meetup.com//find/upcoming_events?\
    photo-host=public&fields=group_photo&page=20&key=${config.MEETINGS_API_KEY}&lat=${lat}&lon=${lon}`,
    headers: { 'User-Agent': 'request' },
  };
  request(options, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, body);
    }
  });
};

const getLatLon = (zipcode, callback) => {
  const options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}`,
    headers: {
      'User-Agent': 'request',
    },
  };
  request(options, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      const place = JSON.parse(body);
      const lat = place.results[0].geometry.location.lat;
      const lon = place.results[0].geometry.location.lng;
      callback(null, lat, lon);
    }
  });
};

app.get('/home', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.send({ redirect: '/login' });
});
app.get('/users', (req, res) => {
  res.send(req.user.local);
});
app.get('/profile', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.send({ redirect: '/login' });
});
app.get('/session', (req, res) => {
  if (!req.isAuthenticated()) {
    res.send({ redirect: '/login' });
  } else {
    res.send({ redirect: '/home' });
  }
});
app.post('/events', (req, res) => {
  const createEvent = new Model.Event({
    userID: 88,
    event_name: req.body.eventName,
    event_location: req.body.eventLocation,
    event_topic: req.body.eventTopic,
    event_time: req.body.eventTime,
    event_date: req.body.eventDate,
    event_description: req.body.eventDescription,
    username: req.user.local.username,
  });
  createEvent.save({}, { method: 'insert' }).then(() => {
    res.redirect('/profile');
  });
});
app.post(
  '/auth',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

app.get('/meetups', (req, res) => {
  const sessionID = req.sessionID;
  const zipcode = req.param('zipcode');
  const lat = req.param('lat');
  const lon = req.param('lon');
  if (zipcode) {
    getLatLon(zipcode, (err, lat, lon) => {
      if (err) {
        res.send(err);
      }
      getMeetupsByLatLon(lat, lon, (error, meetups) => {
        if (error) {
          res.status(500).json(error);
        }
        res.send({ meetups: meetups, categories: categories.results });
      });
    });
  } else {
    getMeetupsByLatLon(lat, lon, (error, meetups) => {
      if (error) {
        res.status(500).json(error);
      }
      res.send({ meetups: meetups, categories: categories.results });
    });
  }
});
app.post('/signup', (req, res) => {
  const user = req.body;
  const usernamePromise = new Model.User({ username: user.username }).fetch();
  return usernamePromise.then((model) => {
    if (model) {
      res.render('/signup', { title: 'signup', errorMessage: 'username already exists' });
    } else {
      const email = user.email;
      const password = user.password;
      const hash = bcrypt.hashSync(password, 10);
      const sessionID = req.sessionID;
      const createdAt = function () { return new Date(); };
      const signUpUser = new Model.User({
        username: user.username,
        password: hash,
        email: email,
        name: user.name,
        created_at: createdAt(),
        session_id: sessionID,
        biography: user.biography,
        location: user.location,
        age: user.age,
        profilepic: '',
      });
      signUpUser.save({}, { method: 'insert' }).then(() => {
        res.redirect('/login');
      });
    }
  });
});
app.post('/userevents', (req, res) => {
  let username = req.user.local.username;
  const meetup = req.body;
  const result = [];
  const eventPromise = new Model.UserEvents({ username: req.user.local.username }).fetch();
  return eventPromise.then((model) => {
    if (model) {
      result.push(model.attributes.events);
      result.push(meetup);
      username = req.user.local.username;
      const addEvent = new Model.UserEvents({
        username: username,
        events: result,
      });
      addEvent.save({}, { method: 'insert' }).then(() => {
        res.sendStatus(201);
      });
    } else {
      result.push(JSON.stringify(meetup, null, 2));
      username = req.user.local.username;
      const events = meetup;
      const addEvent = new Model.UserEvents({
        username: username,
        events: meetup,
      });
      addEvent.save({}, { method: 'insert' }).then(() => {
        res.sendStatus(201);
      });
    }
  });
});
app.get('/userevents', (req, res) => {
  Model.getUserEvents(req.user.local.username, (err, events) => {
    if (err) {
      console.log(err);
    } else {
      res.send(events);
    }
  });
});
app.get('/events', (req, res) => {
  Model.getNonApiEvents(5, req.user.local.username, (err, results) => {
    if (err) {
      console.log('err on getting events', err);
    } else {
      res.send(results);
    }
  });
});
app.post('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.send({ redirect: '/' });
});
const getMeetupsBySearchFields = (searchOptions, callback) => {
  const options = {
    url: `https://api.meetup.com/2/open_events?fields=group_photo\
    &lon=${searchOptions.lon}&limited_events=False&photo-host=public\
    &page=20&time=${searchOptions.startdate}%2C&radius=${searchOptions.radius}\
    &category=${searchOptions.categoryId}&lat=${searchOptions.lat}&desc=False&status=upcoming&key=${config.MEETINGS_API_KEY}`,
    headers: {
      'User-Agent': 'request',
    },
  };
  request(options, (err, response, body) => {
    if (err) {
      callback(err, null);
    }
    callback(null, body);
  });
};
app.get('/meetups/categories', (req, res) => {
  const options = {
    categoryId: req.param('categoryId'),
    radius: req.param('radius'),
    lat: req.param('lat'),
    lon: req.param('lon'),
    startdate: req.param('startDate'),
  };
  getMeetupsBySearchFields(options, (error, meetups) => {
    if (error) {
      res.send(error);
    }
    res.status(200).send({ meetups: meetups });
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
