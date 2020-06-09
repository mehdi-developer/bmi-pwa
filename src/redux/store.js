import { reducer } from './reducer';
import { createStore } from 'redux';

function saveToSessionStorage(state) {
	try {
		const serializedState = JSON.stringify(state);
		sessionStorage.setItem('state', serializedState);
	} catch (e) {
		console.log(e);
	}
}

function loadFromSessionStorage() {
	try {
		const serializedState = sessionStorage.getItem('state');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.log(e);
		return undefined;
	}
}

const persistedState = loadFromSessionStorage();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
	saveToSessionStorage(store.getState());
});

export default store;
