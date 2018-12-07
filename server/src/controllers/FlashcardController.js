const Router = require("express").Router();
const Op = require("sequelize").Op;
const VerifyToken = require("../middlewares/VerifyToken");
const AntiWordSpam = require("../middlewares/AntiWordSpam");
const CheckFlashcardAuthor = require("../middlewares/CheckFlashcardAuthor");
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
		return models.Flashcard.create({
			title: req.body.title,
			firstColumnName: req.body.firstCol,
			secondColumnName: req.body.secondCol,
			author: uid
		})
		.then(function(createdFlashcard) {
			return models.User.findOne({
				where: {
					uid: uid
				}
			})
			.then(function(foundUser) {
				return res.status(200).send({
					error: false,
					flashcard: createdFlashcard,
					author: foundUser	
				});
			});
		});
	} else {
		return res.status(404).send({
			error: true,
			errors
		});
	}
});

/**
	Add new word to set of flashcards
*/
Router.post("/word/create", VerifyToken, CheckFlashcardAuthor, AntiWordSpam, function(req, res) {
	req.checkBody('firstColWord', "Incorrect first word value").trim().isLength({ min: 1, max: 255 });
	req.checkBody('secondColWord', "Incorrect second word value").trim().isLength({ min: 1, max: 255});

	const errors = req.validationErrors();

	if(!errors) {
		return models.Word.create({
			fid: req.body.fid,
			firstColumnValue: req.body.firstColWord,
			secondColumnValue: req.body.secondColWord
		})
		.then(function(createdWord) {
			return res.status(200).send({
				error: false,
				word: createdWord
			});
		});
	} else {
		return res.status(404).send({
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
	return models.Flashcard.findOne({
		where: {
			fid: fid
		},
		include: [{
			model: models.Word
		}],
		order: [
			[models.Word, "learned", "asc"],
			[models.Word, "createdAt", "asc"]
		]
	})
	.then(function(foundFlashcard) {
		if(foundFlashcard) {

			return models.User.findOne({
				where: {
					uid: foundFlashcard.author
				}
			})
			.then(function(foundUser) {
				return res.status(200).send({
					error: false,
					flashcard: foundFlashcard,
					author: foundUser
				})
			});

		} else {
			return res.status(404).send({
				error: true,
				message: 'Unknown flashcard'
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true
		});
	});
});

/**
	Find many flashcards
*/
Router.get('/', VerifyToken, function(req, res) {

	const query = {
		where: {
			author: res.locals.uid
		},
		include: [{
			model: models.User,
			attributes: {
				exclude: ['createdAt', 'displayName']
			}
		}, {
			model: models.Word
		}]
	};

	if(req.query.title) {
		query.where.title = {
			[Op.or]: {
				[Op.like]: '%'+req.query.title,
				[Op.like]: req.query.title,
				[Op.like]: req.query.title+'%'			
			}
		}
	}
	//
	if(req.query.limit) {
		query.limit = parseInt(req.query.limit);
	}
	//
	if(req.query.sort && req.query.st) {
		query.order = [
			[req.query.sort, req.query.st]
		]
	}
	//
	if(req.query.page && req.query.limit) {
		query.offset = parseInt(req.query.limit)*parseInt(req.query.page);
	}

	return models.Flashcard.findAll(query)
	.then(function(foundFlashcards) {
		let isMore = true;
		if(foundFlashcards.length < parseInt(req.query.limit)) {
			isMore = false;
		}
		return res.status(200).send({
			flashcards: foundFlashcards,
			isMore
		});
	});
});

/**
	Delete word from set
*/
Router.post('/word/delete', VerifyToken, CheckFlashcardAuthor, function(req, res) {
	return models.Word.destroy({
		where: {
			wid: req.body.wid
		}
	})
	.then(function(deletedWord) {
		return res.status(200).send({
			error: false,
			wid: req.body.wid
		});
	});
});
/**
	Update word
*/
Router.put('/word/update', VerifyToken, CheckFlashcardAuthor, function(req, res) {
	req.checkBody('firstColWord', "Incorrect first word value").trim().isLength({ min: 1, max: 255 });
	req.checkBody('secondColWord', "Incorrect second word value").trim().isLength({ min: 1, max: 255 });

	const errors = req.validationErrors();

	if(!errors) {

		return models.Word.update({
			firstColumnValue: req.body.firstColWord,
			secondColumnValue: req.body.secondColWord
		}, {
			where: {
				wid: req.body.wid
			}
		})
		.then(function(updatedWord) {
			return res.status(200).send({
				error: false,
				wid: req.body.wid
			});
		});

	} else {
		return res.status(404).send({
			error: true,
			errors
		});			
	}
});

/**
	Toggle check learned word
*/
Router.put("/word/learned", VerifyToken, CheckFlashcardAuthor, function(req, res) {
	console.log(req.body);
	return models.Word.findOne({
		where: {
			wid: req.body.wid
		}
	})
	.then(function(foundWord) {
		if(foundWord) {
			foundWord.updateAttributes({
				learned: !foundWord.learned
			})
			.then(function(updatedWord) {
				return res.status(200).send({
					word: updatedWord
				});
			});
		}
	});
});

module.exports = Router;