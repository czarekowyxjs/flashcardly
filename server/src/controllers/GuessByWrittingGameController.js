const Router = require("express").Router();
const models = require("../models");
const VerifyToken = require("../middlewares/VerifyToken");
const Op = require('sequelize').Op;
const sequelize = require("sequelize");

Router.post("/create", VerifyToken, function(req, res, next) {
	return models.Word.count({
		where: {
			fid: req.body.fid
		}
	})
	.then(function(wordsAmount) {
			req.wordsAmount = wordsAmount;
			next();
			return null;
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			m: "Server error"
		});
	});
}, function(req, res) {
	return models.GuessByWrittingGames.create({
		fid: req.body.fid,
		uid: res.locals.uid,
		wordsAmount: req.wordsAmount
	})
	.then(function(createdGame) {
		if(createdGame) {
			return res.status(200).send({
				game: createdGame,
				duration: createdGame.wordsAmount*15
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			m: "Server error"
		})
	});
});

Router.put("/check", VerifyToken, function(req, res, next) {
	console.log(req);
	return models.Word.findOne({
		where: {
			wid: req.body.wid
		}
	})
	.then(function(foundWord) {
		if(foundWord) {

			let isGood = false;

			if(req.body.selectedGameType === "firstToSecond") {
				if(req.body.input === foundWord.secondColumnValue) isGood = true;
			} else {
				if(req.body.input === foundWord.firstColumnValue) isGood = true;
			}

			req.isGood = isGood;

			next();
			return null;

		} else {
			return res.status(404).send({
				error: true
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			m: "Server error"
		})
	})
}, function(req, res, next) {
	return models.Word.update({
		learned: req.isGood
	}, {
		where: {
			wid: req.body.wid
		}
	})
	.then(function(updatedWord) {

		next();
		return null;

	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			m: "Server error"
		});
	});
}, function(req, res) {
	return models.GuessByWrittingGames.findOne({
		where: {
			gbwid: req.body.gbwid
		}
	})
	.then(function(foundGame) {
		if(foundGame) {
			if(req.isGood) {
				return foundGame.update({
					result: foundGame.result+1
				})
				.then(function(updatedGame) {
					return res.status(200).send({
						error: false,
						result: req.isGood
					});
				});
			} else { 
				return res.status(200).send({
					error: false,
					result: req.isGood
				});
			}
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			m: "Server error"
		})
	});
});

module.exports = Router;
