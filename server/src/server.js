const express = require("express");
const validator = require("express-validator");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const AuthenticationController = require("./controllers/AuthenticationController");
const FlashcardController = require("./controllers/FlashcardController");
const UserController = require("./controllers/UserController");

const app = express();
require("dotenv");
//
app.use("/img", express.static(__dirname+"/public/images"));
if(process.env.NODE_ENV == "production") {
	app.use("/static", express.static(__dirname+"/public/build/static"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(validator());
//
app.use('/api/v1/authentication', AuthenticationController);
app.use('/api/v1/flashcards', FlashcardController);
app.use('/api/v1/users', UserController);
//
if(process.env.NODE_ENV == "production") {
	app.use("/*", function(req, res) {
		res.sendFile(__dirname+"/public/build/index.html");
	});
} else {

}

const server = app.listen(process.env.PORT || 3001, function() {
	console.log('Server is running');
});