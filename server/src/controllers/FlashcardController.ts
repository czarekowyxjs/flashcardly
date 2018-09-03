import { Request, Response, Router } from 'express';
import { User, Flashcard } from '../models';
import verifyToken from '../middlewares/VerifyToken';

class FlashcardController {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private createFlashcard(req: Request, res: Response): void {
		req.checkBody("title", "Title is incorret").trim().isLength({ min: 2, max: 28 });
		req.checkBody("firstCol", "Name of first column is incorrect").trim().isLength({ min: 2, max: 20 });
		req.checkBody("secondCol", "Name of second column is incorrect").trim().isLength({ min: 2, max: 20 });

		const errors = req.validationErrors();

		if(!errors) {
			const uid = res.locals.uid;

			Flashcard.create({
				title: req.body.title,
				firstColumn: req.body.firstCol,
				secondColumn: req.body.secondCol,
				author: uid
			}, (err: any, createdFlashcard: any) => {
				res.status(200).send({
					flashcard: createdFlashcard
				});
			});

		} else {
			res.status(404).send({
				errors,
				error: true
			});
		}
	}

	private initRoutes(): void {
		this.router.post('/create', verifyToken, this.createFlashcard);
	}
}

export default new FlashcardController();