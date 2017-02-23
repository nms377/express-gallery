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
	});

	// User Login
router.route('/login')
	.get((req, res) => {
				res.render('user/login');
})
	.post(passport.authenticate('local', {
		successRedirect: 'secret',
		failureRedirect: 'login'

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

