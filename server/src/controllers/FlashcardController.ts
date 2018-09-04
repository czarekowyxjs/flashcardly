import { Request, Response, Router } from 'express';
import { User, Flashcard, Word } from '../models';
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

	private fetchOneFlashcard(req: Request, res: Response): void {
		Flashcard.findOne({
			_id: req.params.fid
		})
		.populate('author', "-email -password -social.facebook.signedRequest -social.facebook.accessToken -social.facebook.userID")
		.exec((err: any, flashcard: any) => {
			if(flashcard) {
				Word.find({
					flashcardID: flashcard._id
				}, (err: any, foundWords: any) => {
					flashcard.words = foundWords;
					res.status(200).send({
						flashcard
					});
				})
				.sort({
					createdAt: "asc"
				});
			} else {
				res.status(404).send({
					error: true,
					message: "Undefined flashcard"
				});
			}
		});
	}

	private insertOneWord(req: Request, res: Response): void {
		req.checkBody('firstCol', "Incorrect value of first column word").trim().isLength({ min: 2, max: 99 });
		req.checkBody('secondCol', "Incorrect value of second column word").trim().isLength({ min: 2, max: 99 });

		const errors = req.validationErrors();

		if(!errors) {
			Word.create({
				flashcardID: req.body.fid,
				firstColumnValue: req.body.firstCol,
				secondColumnValue: req.body.secondCol
			}, (err: any, createdWord: any) => {
				res.status(200).send({
					createdWord
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
		this.router.post('/word/create', verifyToken, this.insertOneWord);
		this.router.get('/:fid', verifyToken, this.fetchOneFlashcard);
	}
}

export default new FlashcardController();