const express = require('express');
const bp = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const hbs = handlebars.create({
	extname: '.hbs',
	defaultLayout: 'app'
});

//	password middleware for User
const CONFIG = require('./config/config.json');
const	LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');

//	setup handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));

//	body-parser
app.use( bp.urlencoded({extended: true}));

//  cookie parser
// app.use(express.cookieParser());

//	method-override
app.use(methodOverride('_method'));

//	express-session
app.use(session({
  store: new RedisStore(),
	secret: CONFIG.SESSION_SECRET
}));

//	this goes after every other middleware
app.use(passport.initialize());
app.use(passport.session());

//	routes
const gallery = require('./routes/gallery-route');
const user = require('./routes/user-route');

//	models
const db = require('./models');
const { User, Gallery } = db;	//	object destructuring

//	routes
app.use('/gallery', gallery );
app.use('/user', user );

//	authenticate password
const authenticate = (username, password) => {
  // get user data from the DB
  const { USERNAME } = CONFIG;
  const { PASSWORD } = CONFIG;

 // check if the user is authenticated or not
  return ( username === USERNAME && password === PASSWORD );
};

passport.use(new LocalStrategy(
  function (username, password, done, err) {
    console.log('username, password: ', username, password);

    if (err) { return done(err); }

    // check if the user is authenticated or not
    if( authenticate(username, password) ) {
    	console.log('passed');
      console.log('username', username);

      // User data from the DB
      const user = {
        name: username,
        role: 'admin',
        favColor: 'green',
        isAdmin: true,
      };

      return done(null, user); // no error, and data = user
    }
    return done(null, false, { message: 'Login failed.'}); // error and authenticted = false
  }
));

//	serialize user
passport.serializeUser(function(user, done) {
	return done(null, user);
});

//	deserialize user
passport.deserializeUser(function(user, done) {
	return done(null, user);
});

//	listening on port
app.listen(3000, function() {
	console.log('Server listening on port 3000');
	db.sequelize.sync();
});

module.exports = app;