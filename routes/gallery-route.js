const server = require('../server');
const express = require('express');
const models = require('../models');


const app = express();
const router = express.Router();

//	Gallery Index
router.route('/')
	.get((req, res) => {
		models.Gallery.findAll()
			.then(function (gallery) {
				// res.send('sanity');
				res.json(gallery);
			});
})
	.post((req, res) => {
		models.Gallery.create({ 
		author: req.body.author,
		link: encodeURI(req.body.link),
		description: req.body.description
	 })
	.then(function(gallery) {
		res.json(gallery);
	});
});

//	Gallery Index By id
// app.get('/gallery/:id', (req, res) => {
// 	Gallery.findById()
// 	.then(function (gallery) {
// 		res.json(gallery);
// 	});
// });

module.exports = router;