import React from 'react';
import cn from 'libs/bem-cn';
import { NavLink } from 'react-router-dom';
import './style.styl';

const menuConfig = [
  { url: '/', id: 'Home', name: 'Home', disabled: 'false', exact: true },
  { url: '/about', id: 'About', name: 'About', disabled: 'true', exact: false },
  { url: '/notFoundExample', id: 'NotFound', name: 'NotFound', disabled: 'true', exact: false },

];
const PageHeader = () => {

  const n = cn('PageHeader');

  return (
    <div className='PageHeader animationTranslate'>
      <div className={n('list')}>
        <div
          className={`HeaderItem HeaderItem-main`}>
          <div className={`HeaderItem__text HeaderItem__text-main`}>
            <span>Start project</span>
          </div>
        </div>
        <div className="HeaderItem_wrapper">
        { menuConfig.map((value, key) => {
          const { name, id, url, exact } = value;
            return (
              <NavLink
                className={`HeaderItem HeaderItem-${id}`}
                activeClassName='selected'
                to={url}
                exact={exact}
                key={key}>
                <div key={key} className={`HeaderItem__text HeaderItem__text-${id}`}>
                  <span>{name}</span>
                </div>
              </NavLink>
            );
        })
        }
        </div>
      </div>

    </div>
  )
};

export default PageHeader;