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

Router.put("/avatar", VerifyToken, function(req, res) {
	models.User.update({
		avatarUrl: req.body.avatarUrl
	}, {
		where: {
			uid: res.locals.uid
		}
	})
	.then(function(updatedUser) {
		if(updatedUser) {
			res.status(200).send({
				error: false
			});
		}
	})
	.catch(function(err) {
		res.status(500).send({
			error: true,
			message: "Server error"
		});
	});
});

Router.put("/username", VerifyToken, function(req, res) {
	req.checkBody("username", "Invalid username").trim().isLength({ min: 3, max: 48 });

	const errors = req.validationErrors();

	if(!errors) {

		return models.User.findOne({
			where: {
				username: req.body.username
			}
		})
		.then(function(foundUser) {
			if(foundUser) {
				return res.status(404).send({
					error: true,
					message: "Username is busy"
				});
			} else {

				return models.User.update({
					username: req.body.username
				}, {
					where: {
						uid: res.locals.uid
					}
				})
				.then(function(updatedUser) {
					return res.status(200).send({
						error: false,
						username: req.body.username
					})
				})
				
			}
		})

	} else {
		return res.status(404).send({
			error: true,
			errors
		})
	}
});

Router.put("/email", VerifyToken, function(req, res) {
	req.checkBody("email", "Invalid email address").trim().isEmail().isLength({ min: 5, max: 255 });

	const errors = req.validationErrors();

	if(!errors) {

		return models.User.findOne({
			where: {
				email: req.body.email
			}
		})
		.then(function(foundUser) {
			if(foundUser) {
				return res.status(404).send({
					error: true,
					message: "Username is busy"
				});
			} else {

				return models.User.update({
					email: req.body.email
				}, {
					where: {
						uid: res.locals.uid
					}
				})
				.then(function(updatedUser) {
					return res.status(200).send({
						error: false,
						email: req.body.email
					})
				})
				
			}
		})

	} else {
		return res.status(404).send({
			error: true,
			errors
		})
	}
});

Router.put("/password", VerifyToken, function(req, res) {
	return models.User.findOne({
		where: {
			uid: res.locals.uid,
			password: req.body.currentPassword
		}
	})
	.then(function(foundUser) {
		if(foundUser) {
			if(req.body.newPassword === req.body.newPasswordRepeat) {
				return foundUser.updateAttributes({
					password: req.body.newPassword
				})
				.then(function(updatedUser) {
					return res.status(200).send({
						error: false
					});
				});
			} else {
				return res.status(404).send({
					error: true,
					message: "Pasword are not compare"
				});
			}
		} else {
			return res.status(403).send({
				error: true,
				message: "Forbidden"
			});
		}
	})
});

Router.put("/emailprivacy", VerifyToken, function(req, res) {
	return models.User_options.findOne({
		where: {
			uid: res.locals.uid
		}
	})
	.then(function(foundOptions) {
		foundOptions.updateAttributes({
			emailVisibility: !foundOptions.emailVisibility
		})
		.then(function(updatedOptions) {
			return res.status(200).send({
				error: false
			})
		})
	})
});

Router.put("/loginbyusername", VerifyToken, function(req, res) {
	return models.User_options.findOne({
		where: {
			uid: res.locals.uid
		}
	})
	.then(function(foundOptions) {
		foundOptions.updateAttributes({
			loginByUsername: !foundOptions.loginByUsername
		})
		.then(function(updatedOptions) {
			return res.status(200).send({
				error: false
			})
		})
	})
});

module.exports = Router;
