const Router = require("express").Router();
const Op = require("sequelize").Op;
const VerifyToken = require("../middlewares/VerifyToken");
const models = require("../models");

Router.put("/options/introflashcard", VerifyToken, function(req, res) {
	models.User_options.update({
		flashcardIntro: true
	}, {
		where: {
			uid: res.locals.uid
		}
	})
	.then(function(updatedOptions) {
		res.status(200).send({
			error: false
		});
	})
	.catch(function(err) {
		res.status(500).send({
			error: true,
			message: "Server error"
		});
	});
});

module.exports = Router;
