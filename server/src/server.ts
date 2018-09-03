// import modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
// import config
import config from './config';
// import controller
import authenticationController from './controllers/AuthenticationController';

/**
	Server class
*/
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	private config(): void {
		// mongoose(mongodb) connection
		mongoose.connect(process.env.MONGO_URI || config.MONGO_URI, {
			useNewUrlParser: true
		});
		//
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		//
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use("/img", express.static(__dirname + "/public/images"));
	}

	private routes(): void {
		this.app.use("/api/v1/authentication", authenticationController.router);
	}
}

export default new Server().app;