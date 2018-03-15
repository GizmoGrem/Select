import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { PageHeader } from './components';
import { Home, NotFound, About } from './pages';


export default class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='App__wrapper'>
					<PageHeader />
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/about' component={About}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</Router>
		);
	}
}