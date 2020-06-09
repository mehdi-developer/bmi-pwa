import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Redux
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

// Route
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<Router>
				<App />
			</Router>
		</ReduxProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();
