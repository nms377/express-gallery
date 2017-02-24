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
const	LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const psLogout = require('express-passport-logout');
const cookieParser = require('cookie-parser');

//	setup handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));

//	body-parser
app.use( bp.urlencoded({extended: true}));

//  cookie parser
app.use(cookieParser());

//	method-override
app.use(methodOverride('_method'));

//	express-session
app.use(session({
  store: new RedisStore(),
	secret: 'session'
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

const authenticate = (username, password) => {
  return User.findOne({where: { username: username, password: password}});
};

//	authenticate password
passport.use(new LocalStrategy(
  function (username, password, done, err) {

  authenticate(username, password)
    .then( function (username) { 
      return done(null, username); // no error, and data = username
     })
    .catch( err => {
      console.log(err);
      return done(null, false);  
  });
}));

//	serialize user
passport.serializeUser(function(user, done) {
	return done(null, user);
});

//	deserialize user
passport.deserializeUser(function(user, done) {

  console.log('user', user);

  User.findOne({where: { username: user.username} })
    .then( function(username) {
      return done(null, user);
    })
    .catch( err=> {
      console.log('deserialize err', err);
      return done(err, user);
    });

  // return done(null, user);
});

//	listening on port
app.listen(3000, function() {
	console.log('Server listening on port 3000');
	db.sequelize.sync();
});

module.exports = app;