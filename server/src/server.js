const express = require("express");
const validator = require("express-validator");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const AuthenticationController = require("./controllers/AuthenticationController");
const FlashcardController = require("./controllers/FlashcardController");

const app = express();
//
app.use("/img", express.static(__dirname+"/public/images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(validator());
//
app.use('/api/v1/authentication', AuthenticationController);
app.use('/api/v1/flashcards', FlashcardController);
//
app.listen(3001, function() {
	console.log('Server is running');
});