import axios from 'axios';
import store from "../store";

/**
	Return to initial state
*/
export const returnFlashcardToInitial = () => {
	return {
		type: 'RETURN_FLASHCARD_TO_INITIAL'
	}
};

/**
	FLASHCARD CREATOR
*/
export const createNewFlashcard = (flashcard) => {
	return async dispatch => {
		const userState = store.getState().user;
		dispatch(setCreateFlashcardLoaded(false));
		try {
			const response = await axios.post("/api/v1/flashcards/create", flashcard, {
				headers: {
					authorization: userState.userData.fb.signedRequest
				}
			});
			dispatch({
				type: "FETCH_FLASHCARD_DATA",
				payload: {
					flashcardData: response.data.flashcard,
					authorData: response.data.author
				}
			});
			dispatch(setCreateFlashcardLoaded(true));
		} catch(e) {
			console.log(e.response);
		}
	};
};

export const setCreateFlashcardLoaded = (payload) => {
	return {
		type: "CREATE_FLASHCARD_LOADED",
		payload: payload
	};
};
/** 
	FLASHCARD SETTINGS
	******************
	FETCH FLASHCARD DATA
*/
export const fetchFlashcardSet = (flashcardID) => {
	return async dispatch => {
		const userState = store.getState().user;
		dispatch(setFetchFlashcardLoaded(false));
		try {
			const response = await axios.get("/api/v1/flashcards/"+flashcardID, {
				headers: {
					authorization: userState.userData.fb.signedRequest
				}
			});

			for(let i = 0;i < response.data.flashcard.Words.length;++i) {
				response.data.flashcard.Words[i].editable = false;
			}

			dispatch({
				type: "FETCH_FLASHCARD_DATA",
				payload: {
					flashcardData: response.data.flashcard,
					authorData: response.data.author
				}
			});
			dispatch(setFetchFlashcardLoaded(true));
		} catch(e) {	
			console.log(e.response);
		}
	};	
};

export const setFetchFlashcardLoaded = (payload) => {
	return {
		type: "FETCH_FLASHCARD_LOADED",
		payload: payload
	};
};
/** 
	FLASHCARD SETTINGS
	******************
	ADD NEW WORD
*/
export const addNewWordToSet = (firstColWord, secondColWord, fid) => {
	return async dispatch => {
		const userState = store.getState().user;
		dispatch(setAddWordLoaded(false));
		try {
			const response = await axios.post("/api/v1/flashcards/word/create", {
				fid,
				firstColWord,
				secondColWord
			}, {
				headers: {
					authorization: userState.userData.fb.signedRequest
				}
			});

			let flashcardData = store.getState().flashcard.flashcardData;
			flashcardData.Words.push(response.data.word);

			dispatch(landUpFlashcardData(flashcardData));
			dispatch(setAddWordLoaded(true));
		} catch(e) {
			dispatch(setAddWordLoaded(true));
			dispatch({
				type: "ADD_WORD_ERROR",
				payload: e.response.data
			});
		}
	};
};

export const landUpFlashcardData = (payload) => {
	return {
		type: "LAND_UP_WORDS",
		payload: payload
	};
};

export const setAddWordLoaded = (payload) => {
	return {
		type: "ADD_WORD_LOADED",
		payload: payload
	};
};

/** 
	FLASHCARD SETTINGS
	******************
	DELETE WORD
*/
export const deleteWord = (wid) => {
	return async dispatch => {
		const userState = store.getState().user;
		try {
			const response = await axios.post('/api/v1/flashcards/word/delete', {
				wid: wid
			}, {
				headers: {
					authorization: userState.userData.fb.signedRequest
				}
			});

			let flashcardData = store.getState().flashcard.flashcardData;
			let indexToDelete;

			for(let i = 0;i < flashcardData.Words.length;++i) {
				if(flashcardData.Words[i].wid === response.data.wid) {
					indexToDelete = i;
					break;
				}
			}

			flashcardData.Words.splice(indexToDelete, 1);

			dispatch(landUpFlashcardData(flashcardData));
		} catch(e) {
			console.log(e.response);
		}
	};
};	

/** 
	FLASHCARD SETTINGS
	******************
	EDIT WORD
*/
export const editWord = (firstColWord, secondColWord, wid) => {
	return async dispatch => {
		const userState = store.getState().user;
		try {
			const response = await axios.put("/api/v1/flashcards/word/update", {
				wid,
				firstColWord,
				secondColWord
			}, {
				headers: {
					authorization: userState.userData.fb.signedRequest
				}
			});

			let flashcardData = store.getState().flashcard.flashcardData;
			let indexToUpdate;

			for(let i = 0;i < flashcardData.Words.length;++i) {
				if(flashcardData.Words[i].wid === response.data.wid) {
					indexToUpdate = i;
					break;
				}
			}

			flashcardData.Words[indexToUpdate].firstColumnValue = firstColWord;
			flashcardData.Words[indexToUpdate].secondColumnValue = secondColWord;

			dispatch(landUpFlashcardData(flashcardData));
			dispatch(setWordAsNotEditable(response.data.wid));
		} catch(e) {
			console.log(e.response);
		}
	};
};

export const setWordAsEditable = wid => {
	let flashcardData = store.getState().flashcard.flashcardData;
	for(let i = 0;i < flashcardData.Words.length;++i) {
		if(flashcardData.Words[i].wid === wid) {
			flashcardData.Words[i].editable = true;
			break;
		}
	}
	return {
		type: "LAND_UP_WORDS",
		payload: flashcardData
	};
};

export const setWordAsNotEditable = wid => {
	let flashcardData = store.getState().flashcard.flashcardData;
	for(let i = 0;i < flashcardData.Words.length;++i) {
		if(flashcardData.Words[i].wid === wid) {
			flashcardData.Words[i].editable = false;
			break;
		}
	}
	return {
		type: "LAND_UP_WORDS",
		payload: flashcardData
	};
}