import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './App';
import './styles/common.styl';

const store = configureStore();

render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
);