import React, { Component } from 'react';
import {
  array,
  string,
  func
} from 'prop-types';
import cn from 'libs/bem-cn';
import './style.styl';
const s = cn('SelectMobile');

const MobileSelect = (props) => {

  const { items, handleOnChange, value,placeholder } = props;

  const renderItems = (items) => {
    return items.map((value, key) => (
      <option
        className={s('item')}
        key={key}
        value={value}>
        {value}
      </option>
    ))
  };

  return (
    <div className={s('')}>
      <div style={s('wrapper')}>
        <div
          className={s('label', { selected: value.length > 0 })}
          htmlFor="name">{placeholder}
        </div>
      </div>
      <select
        value={value}
        onChange={handleOnChange}
        className={s('select')}>
        <option value="" disabled selected>{placeholder}</option>
        {
          renderItems(items)
        }
      </select>
    </div>
  )
};
MobileSelect.propTypes = {
  items: array.isRequired,
  handleOnChange: func.isRequired,
  placeholder: string,
  value: string
};

// Same approach for defaultProps too
MobileSelect.defaultProps = {
  handleOnChange: () => {},
  placeholder: 'Select ...'
};

export default MobileSelect;