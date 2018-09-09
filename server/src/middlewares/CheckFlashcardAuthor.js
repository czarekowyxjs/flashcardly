const models = require("../models");

module.exports = function(req, res, next) {
	const uid = res.locals.uid;
	console.log(req.body);
	let fid = req.body.fid || false;
	if(!fid) {
		models.Word.findOne({
			where: {
				wid: req.body.wid
			}
		})
		.then(function(foundWord) {
			if(foundWord) {
				models.Flashcard.findOne({
					where: {
						author: uid,
						fid: foundWord.fid
					}
				})
				.then(function(foundUser) {
					if(foundUser) {
						next();
					} else {
						res.status(403).send({
							error: true,
							message: "Forbidden"
						});
					}
				});
			}	else {
				res.status(403).send({
					error: true,
					message: "Forbidden"
				});
			}		
		});
	} else {
		models.Flashcard.findOne({
			where: {
				author: uid,
				fid: fid
			}
		})
		.then(function(foundUser) {
			if(foundUser) {
				next();
			} else {
				res.status(403).send({
					error: true,
					message: "Forbidden"
				});
			}
		});		
	}
};