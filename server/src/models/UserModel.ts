import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import uuid from 'uuid/v1';

const userSchema: Schema = new Schema({
	createdAt: {
		type: String,
		default: Math.floor(new Date().getTime()/1000)
	},
	updatedAt: {
		type: String,
		default: Math.floor(new Date().getTime()/1000)
	},
	displayName: {
		type: String,
		default: uuid(),
		unique: true
	},
	password: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	token: {
		type: String,
		default: uuid(),
		unique: true
	},
	social: {
		facebook: {
			accessToken: {
				type: String,
				default: ''
			},
			signedRequest: {
				type: String,
				default: ''
			},
			userID: {
				type: String,
				default: ''
			},
			picture: {
				url: String,
				default: ''
			},
			fullName: {
				type: String,
				default: ''
			}
		}
	},
	flashcards: [{
		type: Schema.Types.ObjectId,
		ref: 'Flashcard'
	}]
}, {
	collection: 'users'
});

export const User = model('User', userSchema);;