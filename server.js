const express = require('express');
const bp = require('body-parser');
const app = express();

app.use( bp.urlencoded({extended: true}));

const db = require('./models');
const { User } = db;	//	object destructuring
const { Gallery } = db;

app.get('/gallery', (req, res) => {
	Gallery.findAll()
		.then(function (gallery) {
			res.json(gallery);
		});
});

app.listen(3000, function() {
	console.log('Server listening on port 3000');
	db.sequelize.sync();
});