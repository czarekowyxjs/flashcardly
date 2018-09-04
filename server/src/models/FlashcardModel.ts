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
	title: {
		type: String
	},
	description: {
		type: String,
		default: ''
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
	},
	words: [{
		type: Schema.Types.ObjectId,
		ref: 'Word'
	}]
}, {
	collection: 'flashcards'
});

export const Flashcard = model('Flashcard', flashcardSchema);