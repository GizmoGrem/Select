import React, { Component } from 'react';
import cn from 'libs/bem-cn';
const s = cn('Select');

const renderItems = (items,itemHeight, func) => {
  return (
    items.map((item, key) => {
      return (
        <div
          onKeyDown={(e) => func(item.value, e.keyCode)}
          tabIndex={1}
          ref={'item' + key}
          onClick={() => func(item.value)}
          className={s('item')}
          style={{height:itemHeight}}
          key={key}
          value={item.value}>
          {
            typeof item.text === 'string' && item.text
          }
          {
            typeof item.text === 'object' &&
            <span>
               {item.text[0]}<b className="redBlock">{item.text[1]}</b>{item.text[2]}
             </span>
          }
        </div>
      )

    })
  )
};
export default renderItems;
