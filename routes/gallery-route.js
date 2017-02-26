const server = require('../server');
const express = require('express');
const models = require('../models');


const app = express();
const router = express.Router();

function isAuthenticated(req, res, next) {
	console.log('running is authenticated');
	if (req.isAuthenticated()) {
		console.log('passed');
		next();
	}else{
		console.log('NOPE');
		res.redirect('/user/login');
	}
}

//	New Photo Form
router.get('/new', isAuthenticated, (req, res) => {
		models.Gallery.findAll()
		.then(function(gallery) {
			res.render('gallery/new', {user: req.user.username});
		})
		.catch( err => {
			console.log(err);
			res.render('gallery/error');
		});
	});

//	Gallery Index
router.route('/')
	.get((req, res) => {
		models.Gallery.findAll({order: 'id ASC'})
			.then(function (gallery) {
				res.render('index', {galleryIndex: gallery});
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
		.then(function (viewImg) {
			models.Gallery.findAll({ order: 'id ASC',
				where: {
					id: {
						$ne: req.params.id
					}
				}
			})
			.then(function (images) {

				res.render('gallery/view', {viewImg: viewImg,
				images: images});
		});
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
});

router.delete('/:id', isAuthenticated, (req, res) => {
	models.Gallery.destroy({
		where: {
			id: req.params.id
		}
	}).then(function (gallery) {
		res.redirect('/gallery');
	});
});

router.get('/:id/edit', isAuthenticated, (req,res) => {
		models.Gallery.findById(req.params.id)
		.then(function (gallery) {
			res.render('gallery/edit', {galleryEdit: gallery,
				user: req.user.username});
		});
	});

module.exports = router;