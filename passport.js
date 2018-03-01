const config           = require('./database/config.js');
    LocalStrategy    = require('passport-local').Strategy;
    Model            = require('./server/model.js');
    bcrypt           = require('bcrypt');
    User             = Model.User;
    passport         = require('passport');
    session          = require('express-session');
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Model.getUserCredentials(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy((username, password, done) => {
    const hash = bcrypt.hashSync(password, 10);
    new Model.User({ username: username }).fetch().then((data) => {
      let user = data;
      if (user === null) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      user = data.toJSON();
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }));
};
