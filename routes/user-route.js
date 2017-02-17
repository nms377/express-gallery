const server = require('../server');
const express = require('express');
const models = require('../models');
// const CONFIG = require('../config/config.json');


// const	session = require('express-session');
const passport = require('passport');
// const	LocalStrategy = require('passport-local').Strategy;

// const app = express();
const router = express.Router();



// const authenticate = (username, password) => {
//   // get user data from the DB
//   const { USERNAME } = CONFIG;
//   const { PASSWORD } = CONFIG;

//  // check if the user is authenticated or not
//   return ( username === USERNAME && password === PASSWORD );
// };

// passport.use(new LocalStrategy(
//   function (username, password, done) {
//     console.log('username, password: ', username, password);
//     // check if the user is authenticated or not
//     if( authenticate(username, password) ) {
//     	console.log('passed');

//       // User data from the DB
//       const user = {
//         name: 'Joe',
//         role: 'admin',
//         favColor: 'green',
//         isAdmin: true,
//       };

//       return done(null, user); // no error, and data = user
//     }
//     return done(null, false); // error and authenticted = false
//   }
// ));

// passport.serializeUser(function(user, done) {
// 	return done(null, user);
// });

// passport.deserializeUser(function(user, done) {
// 	return done(err, user);
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname + '/views/login.html'));
// });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/secret',
//   failureRedirect: '/login'
// }));

// app.get('/secret', (req, res) => {
//   res.send('this is my secret page')
// });

	// User Login
router.route('/login')
	.get((req, res) => {
		// res.sendFile(path.join(_dirname + '/views/login.html'));
		// models.User.findAll()
		// 	.then(function (user) {
				res.render('user/login');
			// });
})
	.post(passport.authenticate('local', {
		successRedirect: 'secret',
		failureRedirect: 'login'
	// };
	// 	models.User.create({ 
	// 	username: req.body.username,
	// 	passowrd: req.body.password
	//  })
	// .then(function(user) {
		// res.redirect('login');
	// });
}));


function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}else{
		console.log('NOPE');
		res.redirect('/login');
	}
}

router.route('/secret', isAuthenticated)
	.get((req, res) => {
		res.render('user/secret');
	});

module.exports = router;

