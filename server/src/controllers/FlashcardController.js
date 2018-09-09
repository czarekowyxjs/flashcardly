const Router = require("express").Router();
const VerifyToken = require("../middlewares/VerifyToken");
const AntiWordSpam = require("../middlewares/AntiWordSpam");
const models = require("../models");

/**
	Create set of flashcards
*/
Router.post('/create', VerifyToken, function(req, res) {
	req.checkBody('title', "Incorrect title the set of flashcards").trim().isLength({ min: 2, max: 28 });
	req.checkBody('firstCol', "Incorrect name of first column").trim().isLength({
		min: 2,
		max: 20
	});
	req.checkBody('secondCol', "Incorrect name of second column").trim().isLength({
		min: 2,
		max: 20
	});

	const errors = req.validationErrors();

	if(!errors) {
		const uid = res.locals.uid;
		models.Flashcard.create({
			title: req.body.title,
			firstColumnName: req.body.firstCol,
			secondColumnName: req.body.secondCol,
			author: uid
		})
		.then(function(createdFlashcard) {
			models.User.findOne({
				where: {
					uid: uid
				},
				include: [{
					model: models.Facebook
				}]
			})
			.then(function(foundUser) {
				res.status(200).send({
					error: false,
					flashcard: createdFlashcard,
					author: foundUser	
				});
			});
		});
	} else {
		res.status(404).send({
			error: true,
			errors
		});
	}
});

/**
	Add new word to set of flashcards
*/
Router.post("/word/create", VerifyToken, AntiWordSpam, function(req, res) {
	req.checkBody('firstColWord', "Incorrect first word value").trim().isLength({ min: 1, max: 255 });
	req.checkBody('secondColWord', "Incorrect second word value").trim().isLength({ min: 1, max: 255});

	const errors = req.validationErrors();

	if(!errors) {
		models.Word.create({
			fid: req.body.fid,
			firstColumnValue: req.body.firstColWord,
			secondColumnValue: req.body.secondColWord
		})
		.then(function(createdWord) {
			res.status(200).send({
				error: false,
				word: createdWord
			});
		});
	} else {
		res.status(404).send({
			error: true,
			errors
		});		
	}
});

/**
	Find one set of flashcards
*/
Router.get('/:fid', VerifyToken, function(req, res) {
	const fid = req.params.fid;
	models.Flashcard.findOne({
		where: {
			fid: fid
		},
		include: [{
			model: models.Word
		}],
		order: [
			[models.Word, "createdAt", 'asc']
		]
	})
	.then(function(foundFlashcard) {
		if(foundFlashcard) {

			models.User.findOne({
				where: {
					uid: foundFlashcard.author
				},
				include: [{
					model: models.Facebook
				}]
			})
			.then(function(foundUser) {
				res.status(200).send({
					error: false,
					flashcard: foundFlashcard,
					author: foundUser
				})
			});

		} else {
			res.status(404).send({
				error: true,
				message: 'Unknown flashcard'
			});
		}
	});
});
/**
	Delete word from set
*/
Router.post('/word/delete', VerifyToken, function(req, res) {
	models.Word.destroy({
		where: {
			wid: req.body.wid
		}
	})
	.then(function(deletedWord) {
		res.status(200).send({
			error: false,
			wid: req.body.wid
		});
	});
});
/**
	Update word
*/
Router.put('/word/update', VerifyToken, function(req, res) {
	req.checkBody('firstColWord', "Incorrect first word value").trim().isLength({ min: 1, max: 255 });
	req.checkBody('secondColWord', "Incorrect second word value").trim().isLength({ min: 1, max: 255 });

	const errors = req.validationErrors();

	if(!errors) {

		models.Word.update({
			firstColumnValue: req.body.firstColWord,
			secondColumnValue: req.body.secondColWord
		}, {
			where: {
				wid: req.body.wid
			}
		})
		.then(function(updatedWord) {
			res.status(200).send({
				error: false,
				wid: req.body.wid
			});
		});

	} else {
		res.status(404).send({
			error: true,
			errors
		});			
	}
});

module.exports = Router;