const Router = require("express").Router();
const fs = require('fs');

Router.get("/language", function(req, res) {
	let lid = parseInt(req.query.lid);

	if(lid < 0 || lid > 2) lid = 1;

	const langs = ['pl_PL', 'en_EN', 'de_DE'];
	const langJSON = require(`../public/langs/${langs[lid]}.lang.json`);
	res.status(200).send({
		lang: langJSON
	});
});

module.exports = Router;