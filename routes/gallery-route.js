const server = require('../server');
const express = require('express');
const models = require('../models');


const app = express();
const router = express.Router();


router.route('/')
	.get((req, res) => {

		models.Gallery.findAll()
			.then(function (gallery) {
				// res.send('sanity');
				res.json(gallery);
			});
});

// app.get('/gallery/:id', (req, res) => {
// 	Gallery.findById()
// 	.then(function (gallery) {
// 		res.json(gallery);
// 	});
// });

module.exports = router;