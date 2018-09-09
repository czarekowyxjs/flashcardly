const models = require("../models");

module.exports = function(req, res, next) {
	console.log(res.locals.uid);
	console.log(req.body);
	models.Word.findOne({
		where: {
			fid: req.body.fid
		},
		order: [
			['createdAt', 'desc']
		]
	})
	.then(function(foundWord) {
		const now = Math.floor(new Date().getTime()/1000);
		const diff = now-foundWord.createdAt;
		if(diff < 5) {
			res.status(404).send({
				error: true,
				message: 'Anti spam error'
			});
		} else {
			next();
		}
	});
};