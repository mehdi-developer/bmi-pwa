import React from 'react';
import './App.css';

// Anim
import { AnimatePresence } from 'framer-motion';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/header/Header';
import Result from './components/result/Result';
import Test from './components/test/Test';
import Lang from './components/lang/Lang';

// Redux
import { connect } from 'react-redux';

// Routes
import { Switch, Route, Redirect } from 'react-router-dom';

// Dark Mode
import { ThemeProvider, createGlobalStyle } from 'styled-components';
const Global = createGlobalStyle`
body {
  background : ${(props) => (props.theme.mode === 'dark' ? 'black' : 'white')};
  color : ${(props) => (props.theme.mode === 'dark' ? 'white' : 'black')};
}
`;

function App(props) {
	return (
		<ThemeProvider theme={{ mode: props.darkMode ? 'dark' : 'light' }}>
			<Global />
			<Header />
			<div className="line" />
			<AnimatePresence exitBeforeEnter>
				<Switch>
					<Route exact path="/">
						{props.lang.length > 0 ? <Redirect to="/test" /> : <Redirect to="/lang" />}
					</Route>
					<Route exact path="/result" component={Result} />
					<Route exact path="/test" component={Test} />
					<Route exact path="/lang" component={Lang} />
				</Switch>
			</AnimatePresence>
		</ThemeProvider>
	);
}

const mapState = (state) => {
	return {
		darkMode: state.darkMode,
		lang: state.lang
	};
};

const mapDis = (dispatch) => {
	return {};
};

export default connect(mapState, mapDis)(App);
