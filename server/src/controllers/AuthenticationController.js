const Router = require("express").Router();
const models = require("../models");
const VerifyToken = require("../middlewares/VerifyToken");
const Op = require('sequelize').Op;
const mail = require("../config/transporter");

Router.post("/signin", function(req, res) {
	const query = `SELECT * FROM Users INNER JOIN User_options ON Users.uid = User_options.uid WHERE ((email=$bindEmail AND password=$bindPassword) OR ((email=$bindEmail OR username=$bindEmail) AND password=$bindPassword AND User_options.loginByUsername=1)) AND User_options.emailConfirm = 1 LIMIT 1`;
	//
	const bind = {
		bindEmail: req.body.email,
		bindPassword: req.body.password
	}
	//
	return models.sequelize.query(query, { bind, type: models.sequelize.QueryTypes.SELECT })
	.then(function(foundUser) {
		if(foundUser.length > 0) {
			//
			delete foundUser[0].password;
			delete foundUser[0].emailHash;
			//
			return models.Token.create({
				uid: foundUser[0].uid,
				token: models.Token.generateToken()
			})
			.then(function(createdToken) {
				delete createdToken.dataValues.createdAt;
				delete createdToken.dataValues.updatedAt;
				//
				return res.status(200).send({
					error: false,
					user: foundUser[0],
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
	return models.User.getFullUserData(req.headers.authorization).then(function(foundUser) {
		if(foundUser) {
			req.foundUser = foundUser;
			next();
			return null;
		} else {
			return res.status(404).send({
				error: true,
				message: "Error"
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true
		});
	});
}, function(req, res) {

	const uniqueToken = models.Token.generateToken();
	return models.Token.update({
		token: uniqueToken
	}, {
		where: {
			token: req.foundUser.Token.token
		}
	})
	.then(function(updatedToken) {
		if(updatedToken) {
			return res.status(200).send({
				error: false,
				user: req.foundUser,
				token: uniqueToken
			});
		} else {
			return;
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true,
			err
		});
	})
});

Router.post("/verifyreverse", function(req, res) {
	return models.User.findOne({
		include: [{
			model: models.Token,
			where: {
				token: req.headers.authorization
			}
		}]
	})
	.then(function(foundToken) {
		if(foundToken) {
			return res.status(200).send({
				error: false
			});
		} else {
			return res.status(203).send({
				error: false
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true
		});
	})
})

Router.post("/signout", VerifyToken, function(req, res) {
	return models.Token.destroy({
		where: {
			token: req.headers.authorization
		}
	})
	.then(function(deletedToken) {
		if(deletedToken) {
			return res.status(200).send({
				error: false
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true
		});
	});
});

Router.post("/signup", function(req, res, next) {

	req.checkBody('username', "Incorrect username").trim().isLength({ min: 3, max: 48 });
	req.checkBody("email", "Incorrect email address").trim().isEmail().isLength({ min: 5, max: 255 });
	req.checkBody('password', "Incorrect password").trim().isLength({ min: 2, max: 255 });
	req.checkBody('password2', 'Passwords are not that same').equals(req.body.password);

	const errors = req.validationErrors();

	if(!errors) {
		next();
		return null;
	} else {
		return res.status(404).send({
			error: true,
			errors
		});
	}

}, function(req, res, next) {
	return models.User.findOne({
		where: {
			[Op.or]: [
				{ username: req.body.username },
				{ email: req.body.email }
			]
		}
	})
	.then(function(foundMultiUser) {
		if(foundMultiUser) {
			return res.status(404).send({
				error: false,
				message: "That account is already exist"
			});
		} else {
			next();
			return null;
		}
	})
}, function(req, res, next) {
	return models.User.createUser({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then(function(createdUser) {
		if(createdUser) {
			req.createdUser = createdUser;
			next();
			return null;
		} else {
			return res.status(404).send({
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

	return mail.transporter.sendMail(mailSettings, function(err, info) {
		return res.status(200).send({
			error: false
		});
	});
});

Router.put("/email/confirm", function(req, res, next) {
	return models.User.findOne({
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
			return null;
		} else {
			return res.status(403).send({
				error: true,
				message: "Permission denied"
			});
		}
	})
	.catch(function(err) {
		return res.status(500).send({
			error: true
		});
	})
}, function(req, res) {
	return models.User_options.update({
		emailConfirm: true
	}, {
		where: {
			uid: req.uid
		}
	})
	.then(function(updatedUserOptions) {
		if(updatedUserOptions) {
			return res.status(200).send({
				error: false
			});
		} else {
			return res.status(404).send({
				error: true
			});
		}
	});
});

module.exports = Router;