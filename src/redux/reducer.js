import { TEST, CLEAR, DARKMODE, SETLANG } from './type';

const initialState = {
	darkMode: false,
	name: '',
	age: null,
	weight: null,
	height: null,
	allResults: [],
	lang: ''
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TEST:
			return {
				...state,
				name: action.payload.name,
				height: action.payload.height,
				weight: action.payload.weight,
				age: action.payload.age,
				allResults: [ ...state.allResults, action.payload ]
			};
		case CLEAR:
			return {
				...state,
				allResults: []
			};
		case DARKMODE:
			return {
				...state,
				darkMode: action.payload
			};
		case SETLANG:
			return {
				...state,
				lang: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
