const server = require('../server');
const express = require('express');
const models = require('../models');


const app = express();
const router = express.Router();

//	New Photo Form
router.route('/new')
	.get((req, res) => {
		models.Gallery.findAll()
		.then(function(gallery) {
			res.render('gallery/new');
		});
	});

//	Gallery Index
router.route('/')
	.get((req, res) => {
		models.Gallery.findAll()
			.then(function (gallery) {
				// res.send('sanity');
				res.render('gallery/index', {galleryIndex: gallery});
			});
})
	.post((req, res) => {
		models.Gallery.create({ 
		author: req.body.author,
		link: req.body.link,
		description: req.body.description
	 })
	.then(function(gallery) {
		res.redirect('gallery');
	});
});

//	Gallery Index By id
router.route('/:id')
	.get((req, res) => {
		models.Gallery.findById(req.params.id)
		.then(function (gallery) {
			res.render('gallery/view', {galleryView: gallery});
	});
})
.put((req, res) => {
	models.Gallery.find({
		where: {
			id: req.params.id
		}
	}).then( function (gallery) {
		if (gallery) {
			gallery.updateAttributes({
				author: req.body.author,
				link: req.body.link,
				description: req.body.description
			}).then( function (gallery) {
				res.redirect(`/gallery/${req.params.id}`);
			});
		}
	});
})
.delete((req, res) => {
	models.Gallery.destroy({
		where: {
			id: req.params.id
		}
	}).then(function (gallery) {
		res.redirect('/gallery');
	});
});

router.route('/:id/edit')
	.get((req,res) => {
		models.Gallery.findById(req.params.id)
		.then(function (gallery) {
			res.render('gallery/edit', {galleryEdit: gallery});
		});
	});

module.exports = router;