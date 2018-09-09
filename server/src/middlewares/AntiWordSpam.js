const models = require("../models");

module.exports = function(req, res, next) {
	models.Word.findOne({
		where: {
			fid: req.body.fid
		},
		order: [
			['createdAt', 'desc']
		]
	})
	.then(function(foundWord) {
		if(foundWord) {
			const now = Math.floor(new Date().getTime()/1000);
			const diff = now-foundWord.createdAt;
			if(diff < 2) {
				res.status(404).send({
					error: true,
					message: 'Anti spam error'
				});
			} else {
				next();
			}
		} else {
			next();
		}
	});
};