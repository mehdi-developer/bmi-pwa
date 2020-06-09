import { TEST, CLEAR, DARKMODE, SETLANG } from './type';

export const test = (values) => {
	return {
		type: TEST,
		payload: values
	};
};

export const clear = () => {
	return {
		type: CLEAR
	};
};

export const changeTheme = (mode) => {
	return {
		type: DARKMODE,
		payload: mode
	};
};
export const setLang = (lang) => {
	return {
		type: SETLANG,
		payload: lang
	};
};
