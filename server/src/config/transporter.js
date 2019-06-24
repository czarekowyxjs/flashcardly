const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'your email',
		pass: 'your password to email account'
	}
});

let host;

if(process.env.NODE_ENV === "development") {
	host = "http://localhost:3000/";
} else if(process.env.NODE_ENV === "production") {
	host = "https://flashcardly.eu/";
}

module.exports.transporter = transporter;
module.exports.host = host;