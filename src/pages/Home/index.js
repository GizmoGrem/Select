import React from 'react';
import Logo from 'public/index';
import './style.styl';

class Home extends React.Component {
  render() {
    return (
      <div className='Home'>
        <div className='Logo__wrapper'>
          <img className='Logo__icon' src={Logo.webpack}/>
          <img className='Logo__icon' src={Logo.stylus}/>
          <img className='Logo__icon' src={Logo.redux}/>
          <img className='Logo__icon' src={Logo.react_router}/>
        </div>
        <div className='Home__title'>
          <div>Webpack 3 React, Redux and Stylus boilerplate</div>
        </div>
      </div>
    )
  }
}

export default Home;