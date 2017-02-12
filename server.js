const express = require('express');
const bp = require('body-parser');
const app = express();

app.use( bp.urlencoded({extended: true}));

const gallery = require('./routes/gallery-route');
const db = require('./models');
const { User } = db;	//	object destructuring
const { Gallery } = db;

//	route
app.use('/gallery', gallery );

app.listen(3000, function() {
	console.log('Server listening on port 3000');
	db.sequelize.sync();
});

module.exports = app;