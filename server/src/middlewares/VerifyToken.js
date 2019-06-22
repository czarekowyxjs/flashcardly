const models = require("../models");

module.exports = function(req, res, next) {
	return models.User.findOne({
		include: [{
			model: models.Token,
			where: {
				token: req.headers.authorization
			}
		}]
	})
	.then(function(foundUser) {
		if(foundUser) {
			res.locals.uid = foundUser.uid;
			next();
			return null;
		} else {
			return res.status(404).send({
				error: true,
				message: "Permission denied"
			});
		}
	})
};