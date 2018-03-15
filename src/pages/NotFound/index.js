import React from 'react';
import cn from 'libs/bem-cn';
import './style.styl';

class NotFound extends React.Component {
	render() {
		const p = cn('NotFoundPage');
		return (
			<div className={p('')}>
				<span className={p('title')}>this page not found</span>
			</div>
		)
	}
}
export default NotFound;