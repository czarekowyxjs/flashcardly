const Router = require("express").Router();
const Op = require("sequelize").Op;
const VerifyToken = require("../middlewares/VerifyToken");
const CheckFlashcardAuthor = require("../middlewares/CheckFlashcardAuthor");
const models = require("../models");

Router.put("/title", VerifyToken, CheckFlashcardAuthor, function(req, res) {
	req.checkBody('title', "Incorrect title the set of flashcards").trim().isLength({ min: 2, max: 28 });

	const errors = req.validationErrors();

	if(!errors) {

		return models.Flashcard.update({
			title: req.body.title
		}, {
			where: {
				fid: req.body.fid
			}
		})
		.then(function(updatedFlashcard) {
			return res.status(200).send({
				error: false,
				m: "OK"
			});
		})
		.catch(function(error) {
			return res.status(500).send({
				error: true,
				m: "Server error"
			});
		});

	} else {
		return res.status(404).send({
			error: true,
			errors
		});
	}
});

Router.put("/columnsNames", VerifyToken, CheckFlashcardAuthor, function(req, res) {
	
	
	req.checkBody('columnsNames.firstColumnName', "Incorrect name of first column").trim().isLength({
		min: 2,
		max: 20
	});

	req.checkBody('columnsNames.secondColumnName', "Incorrect name of second column").trim().isLength({
		min: 2,
		max: 20
	});

	const errors = req.validationErrors();
	
	if(!errors) {

		return models.Flashcard.update({
			firstColumnName: req.body.columnsNames.firstColumnName,
			secondColumnName: req.body.columnsNames.secondColumnName
		}, {
			where: {
				fid: req.body.fid
			}
		})
		.then(function(updatedFlashcard) {
			return res.status(200).send({
				error: false,
				m: "OK"
			})
		})
		.catch(function(error) {
			return res.status(500).send({
				error: true,
				m: "Server error"
			});
		});

	} else {
		return res.status(404).send({
			error: true,
			errors
		});
	}
});

Router.put("/isPrivate", VerifyToken, CheckFlashcardAuthor, function(req, res) {
	const isPrivate = req.body.isPrivate;

	return models.Flashcard.update({
		isPrivate: isPrivate
	}, {
		where: {
			fid: req.body.fid
		}
	})
	.then(function(updatedFlashcard) {
		return res.status(200).send({
			error: false,
			m: "OK"
		});
	})
	.catch(function(error) {
		return res.status(500).send({
			error: true,
			m: "Server error"
		});
	});
});

module.exports = Router;