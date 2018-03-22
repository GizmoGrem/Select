import React, { Component } from 'react';
import './style.styl';
import cn from 'libs/bem-cn';
import Collapse from 'react-collapse';
import {
  array,
  string,
  func
} from 'prop-types';
import {
  getItems,
  getDropDownDirection,
  KEY_CODE
} from '../helpers';

import InputWithSearch from './Input';
import renderItems from './RenderItems';

const { UP, DOWN, ENTER, ESCAPE } = KEY_CODE;
const s = cn('Select');

class WebSelect extends Component {

  state = {
    isOpened: false,
    disabled: true,
    active: null,
    dropDownDirection: 'isDOWN',
    hasSelectedValue: false,
    noResult: 'no results',
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
    document.removeEventListener('keydown', this.preventOutsideScroll, false);
  };

  componentWillMount() {
    document.addEventListener('keydown', this.preventOutsideScroll, false);
    document.addEventListener('click', this.handleClickOutside, false);
  };

  handleClickOutside = (e) => {
    const { hasSelectedValue } = this.state;
    const { handleOnChange } = this.props;
    const SelectBlock = this.Select;
    if ( !e.path.includes(SelectBlock) ) {
      this.setState({
        isOpened: false,
        disabled: true,
      });
      if ( hasSelectedValue === false ) {
        handleOnChange({ value: '' })
      }
    }
  };
  preventOutsideScroll = (event) => {
    const { keyCode } = event;
    const isBlockScroll = (keyCode === UP)  || (keyCode === DOWN);

    if (isBlockScroll ) {
      event.preventDefault()
    }
  };


  toggleOpen = (value) => {
    const { isOpened, disabled } = this.state;
    const { items, handleOnChange } = this.props;
    const UpdateValue = (value !== undefined) ? value : '';
    this.setState({
      isOpened: !isOpened,
      sortedItems: items,
      disabled: !disabled,
    }, handleOnChange(UpdateValue))
  };

  onClick = () => {
    const { disabled, isOpened } = this.state;
    const {height}=this.props;
    const dropDownDirection = getDropDownDirection(this.textInput,height);

    this.setState({
      dropDownDirection,
      isOpened: !isOpened,
      disabled: !disabled,
      active: 0,
    }, () => {
      this.textInput.select();
      this.textInput.focus();
    });
  };

  selectValue = (value, keyCode) => {
    const { noResult } = this.state;
    const resolveUpdateValue = (keyCode === ENTER) && (value !== noResult);
    const selectedNoResult = (keyCode === (ENTER || undefined)) && (value === noResult);
    const selectedOnClick = (keyCode === undefined) && (value !== noResult);

    if ( resolveUpdateValue || selectedOnClick ) {

      this.setState({
        hasSelectedValue: true,
      }, () => this.toggleOpen({ value }));

    } else if ( selectedNoResult ) {

      this.setState({
        hasSelectedValue: false,
      }, () => this.toggleOpen())
    }
  };

  onKeyDown = ({ keyCode }) => {
    const { active} = this.state;
    const { items, value } = this.props;
    const isUp = (keyCode === UP);
    const isDown = (keyCode === DOWN);
    const ItemsPositions = getItems(keyCode, active);
    const FocusedItem = `item${ ItemsPositions.ActiveItem }`;
    const resolveNavigation = (isUp && active > 0) || (isDown && (active) < items.length);

    if ( keyCode === ESCAPE) {
      this.toggleOpen(value)
    }

    if ( resolveNavigation ) {
      this.setState(
        { active: ItemsPositions.NextItem }, () => {
          this.refs[FocusedItem].focus();
        }
      );
    }
  };


  renderDesktopList(items) {
    const { dropDownDirection, isOpened } = this.state;
    const { height, itemHeight, itemsCount } = this.props;
    const listModifiers = {
      [dropDownDirection]: isOpened,
      hasScroll: items.length > itemsCount
    };

    return (
      <Collapse
        ref={(ref) => {this.Collapse = ref}}
        forceInitialAnimation={true}
        onKeyDown={this.onKeyDown}
        springConfig={{ stiffness: 500, damping: 40 }}
        tabIndex={0}
        fixedHeight={height}
        isOpened={isOpened}
        className={s('list', listModifiers)}>
        {
          renderItems(items,itemHeight,this.selectValue)
        }
      </Collapse>
    )
  };

  render() {
    const {
      disabled,
      isOpened,
      hasSelectedValue,
      dropDownDirection } = this.state;

    const {
      items,
      value,
      inputValue,
      placeholder,
      handleOnChange } = this.props;

    const HeadSelectClass = {
      close: !isOpened,
      open: isOpened,
      selected: hasSelectedValue,
      openWithValue: hasSelectedValue && isOpened
    };

    const variableValue = hasSelectedValue?value:inputValue;

    return (
      <div
        className={s('', HeadSelectClass)}>
        <InputWithSearch
          refSelect={(ref) => {this.Select = ref}}
          refInput={(input) => {this.textInput = input}}
          onKeyDown={this.onKeyDown}
          onChange={(event)=>handleOnChange(event.target.value)}
          onClick={this.onClick}
          value={variableValue}
          isOpened={isOpened}
          disabled={disabled}
          placeholder={placeholder}
          dropDownDirection={dropDownDirection}
        />
        { isOpened &&
          this.renderDesktopList(items)
        }
      </div>
    )
  }
}

WebSelect.propTypes = {
  inputValue: string.isRequired,
  handleOnChange: func.isRequired,
  items: array.isRequired,
  placeholder: string,
  value: string
};

WebSelect.defaultProps = {
  placeholder: 'Select ...'
};
export default WebSelect;