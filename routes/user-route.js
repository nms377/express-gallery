const server = require('../server');
const express = require('express');
const models = require('../models');
// const CONFIG = require('../config/config.json');


// const	session = require('express-session');
const passport = require('passport');
// const	LocalStrategy = require('passport-local').Strategy;

const app = express();
const router = express.Router();

router.route('/create_user')
	.get((req, res) => {
		res.render('user/create_user');
	})
	.post((req, res) => {
		console.log(req.body.username);
		console.log(req.body.password);
		console.log(req.body.favcolor);
		models.User.create({
			username: req.body.username,
			password: req.body.password,
			favcolor: req.body.favcolor
		})
		.then(function(user) {
			res.redirect('login');
		});
});

	// User Login
router.route('/login')
	.get((req, res) => {
		res.render('user/login');
})
	.post(passport.authenticate('local', {
		successRedirect: '/user/secret',
		failureRedirect: '/user/login'
}));

function isAuthenticated(req, res, next) {
	console.log('running is authenticated');
	if (req.isAuthenticated()) {
		console.log('passed');
		next();
	}else{
		console.log('NOPE');
		res.redirect('login');
	}
}

router.get('/secret', isAuthenticated, (req, res) => {
		console.log('secret', req.user);
		res.render('user/secret');
	});

router.get('/logout', function( req, res) {
	console.log(req.user.username,'successfully logged out');
	req.logout();
	res.redirect('login');
});

module.exports = router;

