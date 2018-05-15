import React, { Component } from 'react';
import {
  array,
  string,
  func,
  bool
} from 'prop-types';
import cn from 'libs/bem-cn';
const s = cn('Select');

const InputWithSearch = (props) => {
  const {
    value, isOpened, disabled,
    dropDownDirection, placeholder,onChange, onClick,
    refSelect, refInput
  } = props;

  const SelectClass = {
    open: isOpened || value.length > 0,
    [dropDownDirection]: value.length > 0 || isOpened
  };

  return (
    <div
      className={s('wrapper')}
      ref={refSelect}
      onClick={onClick}>
      <div style={{ height: 0 }}>
        <div
          className={s('label', SelectClass)}
          htmlFor="name">
          {placeholder}
        </div>
      </div>

      <input
        disabled={disabled}
        ref={refInput}
        autoComplete='off'
        className={s('input', { [dropDownDirection]: !disabled })}
        type="text"
        name="name"
        value={value}
        onChange={(event) => onChange(event)}
      />

    </div>
  )
};

InputWithSearch.propTypes = {
  refInput: func.isRequired,
  refSelect: func.isRequired,
  // onKeyDown: func.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired,
  value: string,
  isOpened: bool,
  disabled: bool,
  dropDownDirection: string,
  placeholder: string
};

export default InputWithSearch;