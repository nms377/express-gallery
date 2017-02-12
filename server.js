const express = require('express');
const bp = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const hbs = handlebars.create({
	extname: '.hbs',
	defaultLayout: 'app'
});

//	setup handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//	body-parser
app.use( bp.urlencoded({extended: true}));

//	method-override
app.use(methodOverride('_method'));

//	routes
const gallery = require('./routes/gallery-route');

//	models
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