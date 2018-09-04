import { Document, Model, model, Schema } from 'mongoose';

const wordModel: Schema = new Schema({
	flashcardID: {
		type: Schema.Types.ObjectId,
		ref: 'Flashcard'
	},
	firstColumnValue: {
		type: String,
		required: true
	},
	secondColumnValue: {
		type: String,
		required: true
	},
	background: {
		type: String,
		default: ''
	},
	createdAt: {
		type: String,
		default: Math.floor(new Date().getTime()/1000)
	}
}, {
	collection: 'words'
});

export const Word = model('Word', wordModel);