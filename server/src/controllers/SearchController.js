const Router = require("express").Router();
const VerifyToken = require("../middlewares/VerifyToken.js");
const models = require("../models");
const sequelize = require("sequelize");

Router.get("/", VerifyToken, function(req, res) {
	const queryContent = req.query.query;
	const limit = req.query.limit;
	const offset = req.query.offset;

	const query = `SELECT * FROM (SELECT createdAt, "user" as type, concat("user", uid) as uniqueKey, uid, username, avatarUrl, null as fid, null as title, null as firstColumnName, null as secondColumnName FROM Users WHERE LOWER(username) LIKE CONCAT('%', LOWER($bindToFind), '%') UNION ALL SELECT createdAt, "flashcard" as type, concat("flashcard", fid) as uniqueKey, null as uid, null as username, null as avatarUrl, fid, title, firstColumnName, secondColumnName FROM Flashcards WHERE (LOWER(title) LIKE CONCAT('%', LOWER($bindToFind), '%') OR LOWER(firstColumnName) LIKE CONCAT('%', LOWER($bindToFind), '%') OR LOWER(secondColumnName) LIKE CONCAT('%', LOWER($bindToFind), '%')) AND isPrivate=0) as results ORDER BY results.createdAt LIMIT $bindLimit OFFSET $bindOffset`;

	const bind = {
		bindLimit: limit,
		bindOffset: offset,
		bindToFind: queryContent
	}

	return models.sequelize.query(query, { bind, type: models.sequelize.QueryTypes.SELECT })
	.then(function(foundResults) {
		return res.status(200).send({
			error: false,
			m: "OK",
			results: foundResults
		});
	});
});

module.exports = Router;