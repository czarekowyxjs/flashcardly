import { Request, Response, NextFunction } from 'express';
import { User } from '../models';

export default (req: Request, res: Response, next: NextFunction) => {
	User.findOne({
		'social.facebook.signedRequest': req.headers.authorization
	}, (err: any, foundUser: any) => {
		if(foundUser) {
			res.locals.uid = foundUser._id;
			next();
		} else {
			res.status(404).send({
				error: true,
				message: "Permission denied"
			});
		}
	});
};