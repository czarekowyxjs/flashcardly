const Router = require("express").Router();
const models = require("../models");
const VerifyToken = require("../middlewares/VerifyToken");
const Op = require('sequelize').Op;
const mail = require("../config/transporter");

Router.post("/signin", function(req, res) {
	models.User.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		},
		include: [{
			model: models.User_options,
			where: {
				emailConfirm: {
					[Op.not]: false
				}
			}
		}],
		attributes: {
			exclude: ['password']
		}
	})
	.then(function(foundUser) {
		if(foundUser) {

			return models.Token.create({
				uid: foundUser.uid,
				token: models.Token.generateToken()
			})
			.then(function(createdToken) {
				delete createdToken.dataValues.createdAt;
				delete createdToken.dataValues.updatedAt;
				
				return res.status(200).send({
					error: false,
					user: foundUser,
					token: createdToken
				});
			})
			.catch(function(err) {
				return res.status(500).send({
					error: true,
					message: "Server error"
				});
			});
		} else {
			return res.status(404).send({
				error: true,
				message: 'User doesn\'t exist'
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			message: "Server error"
		});
	});
});

Router.post("/verify", VerifyToken, function(req, res, next) {
	models.User.getFullUserData(res.locals.uid).then(function(foundUser) {
		if(foundUser) {
			req.foundUser = foundUser;
			next();
		} else {
			res.status(404).send({
				error: true,
				message: "Error"
			});
		}
	})
	.catch(function(err) {
		res.status(500).send({
			error: true
		});
	})
}, function(req, res) {

	const uniqueToken = models.Token.generateToken();
	models.Token.update({
		token: uniqueToken
	}, {
		where: {
			token: req.foundUser.Token.token
		}
	})
	.then(function(updatedToken) {
		if(updatedToken) {
			res.status(200).send({
				error: false,
				user: req.foundUser,
				token: uniqueToken
			});
		}
	})
	.catch(function(err) {
		res.status(500).send({
			error: true,
			err
		});
	})
});

Router.post("/verifyreverse", function(req, res) {
	models.User.findOne({
		include: [{
			model: models.Token,
			where: {
				token: req.headers.authorization
			}
		}]
	})
	.then(function(foundToken) {
		if(foundToken) {
			res.status(200).send({
				error: false
			});
		} else {
			res.status(203).send({
				error: false
			});
		}
	})
	.catch(function(err) {
		res.status(500).send({
			error: true
		});
	})
})

Router.post("/signout", VerifyToken, function(req, res) {
	models.Token.destroy({
		where: {
			token: req.headers.authorization
		}
	})
	.then(function(deletedToken) {
		if(deletedToken) {
			res.status(200).send({
				error: false
			});
		}
	})
	.catch(function(err) {

	});
});

Router.post("/signup", function(req, res, next) {

	req.checkBody('username', "Incorrect username").trim().isLength({ min: 3, max: 48 });
	req.checkBody("email", "Incorrect email address").trim().isEmail().isLength({ min: 5, max: 255 });
	req.checkBody('password', "Incorrect password").trim().isLength({ min: 8, max: 255 });
	req.checkBody('password2', 'Passwords are not that same').equals(req.body.password);

	const errors = req.validationErrors();

	if(!errors) {
		next();
	} else {
		res.status(404).send({
			error: true,
			errors
		});
	}

}, function(req, res, next) {
	models.User.findOne({
		where: {
			[Op.or]: [
				{ username: req.body.username },
				{ email: req.body.email }
			]
		}
	})
	.then(function(foundMultiUser) {
		if(foundMultiUser) {
			res.status(404).send({
				error: false,
				message: "That account is already exist"
			});
		} else {
			next();
		}
	})
}, function(req, res, next) {
	models.User.createUser({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then(function(createdUser) {
		if(createdUser) {
			req.createdUser = createdUser;
			next();
		} else {
			res.status(404).send({
				error: true
			});
		}
	});
}, function(req, res) {
	const mailSettings = {
		from: '"Flashcardly" <mailer.bot.service@gmail.com>',
		to: req.createdUser.user.dataValues.email,
		subject: "Confirm your email address",
		text: "Hello",
		html: `<p>Hello, it is last step of sign up in Flashcardly. You have to only confirm your email address in this link: <a href='${mail.host+"confirm/"+req.createdUser.user.dataValues.emailHash}'>${mail.host+"confirm/"+req.createdUser.user.dataValues.emailHash}</a></p>`
	};

	mail.transporter.sendMail(mailSettings, function(err, info) {
		res.status(200).send({
			error: false
		});
	});
});

Router.put("/email/confirm", function(req, res, next) {
	models.User.findOne({
		where: {
			emailHash: req.body.hash
		},
		include: [{
			model: models.User_options,
			where: {
				emailConfirm: {
					[Op.not]: true
				}
			}
		}]
	})
	.then(function(foundUser) {
		if(foundUser) {
			req.uid = foundUser.uid;
			next();
		} else {
			res.status(403).send({
				error: true,
				message: "Permission denied"
			});
		}
	})
	.catch(function(err) {
		res.status(500).send({
			error: true
		});
	})
}, function(req, res) {
	models.User_options.update({
		emailConfirm: true
	}, {
		where: {
			uid: req.uid
		}
	})
	.then(function(updatedUserOptions) {
		if(updatedUserOptions) {
			res.status(200).send({
				error: false
			});
		} else {
			res.status(404).send({
				error: true
			});
		}
	});
});

module.exports = Router;