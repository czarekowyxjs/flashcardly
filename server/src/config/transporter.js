const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'login to email',
		pass: 'password to email'
	}
});

let host;

if(process.env.NODE_ENV === "development") {
	host = "http://localhost:3000/";
} else if(process.env.NODE_ENV === "production") {
	host = "https://flashcardly.herokuapp.com/";
}

module.exports.transporter = transporter;
module.exports.host = host;