import { Request, Response, Router, NextFunction } from 'express';
import { User } from '../models/UserModel';

class AuthenticationController {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private signInByFacebook(req: Request, res: Response): void {
		
		const fbData = req.body.data;	

		User.findOne({
			'social.facebook.userID': fbData.authResponse.userID
		})
		.then(resUser => {
			if(resUser) {
				User.findOneAndUpdate({
					'social.facebook.userID': fbData.authResponse.userID
				}, {
					social: {
						facebook: {
							accessToken: fbData.authResponse.accessToken,
							signedRequest: fbData.authResponse.signedRequest,
							userID: fbData.authResponse.userID,
							picture: {
								url: fbData.user.picture.data.url
							},
							fullName: fbData.user.name,
							email: fbData.user.email
						}
					},
					updatedAt: Math.floor(new Date().getTime()/1000)
				}, { new: true }, (err: any, updatedUser: any) => {
					res.status(200).send({
						status: 'Logged',
						user: updatedUser
					});
				});
			} else {
				User.create({
					social: {
						facebook: {
							accessToken: fbData.authResponse.accessToken,
							signedRequest: fbData.authResponse.signedRequest,
							userID: fbData.authResponse.userID,
							picture: {
								url: fbData.user.picture.data.url
							},
							fullName: fbData.user.name,
							email: fbData.user.email
						}
					}
				}, (err: any, user: any) => {
					res.status(200).send({
						status: 'Logged',
						user
					});
				});
			}
		});
	}

	private initRoutes(): void {
		this.router.post("/signin/facebook", this.signInByFacebook);
	}
}

export default new AuthenticationController();