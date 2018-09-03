import { Document, Model, model, Schema } from 'mongoose';

const flashcardSchema: Schema = new Schema({
	createdAt: {
		type: String,
		default: Math.floor(new Date().getTime()/1000)
	},
	updatedAt: {
		type: String,
		default: Math.floor(new Date().getTime()/1000)
	},
	flashcardName: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	firstColumn: {
		type: String
	},
	secondColumn: {
		type: String
	}
}, {
	collection: 'flashcards'
});

export const Flashcard = model('Flashcard', flashcardSchema);