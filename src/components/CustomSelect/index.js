import React, { Component } from 'react';
import WebSelect from './Web';
import MobileSelect from './Mobile';
import {
  array,
  string,
  func,
  number
} from 'prop-types';
import {
  isBrowser,
  isMobile
} from 'react-device-detect';
import {
  SearchItems,
  UpdateBlockHeight
} from './helpers';

class CustomSelect extends Component {
  static propTypes = {
    items: array,
    onSelect: func.isRequired,
    placeholder: string,
    value: string,
  };
  state = {
    inputValue: ''
  };

  static defaultProps = {
    onSelect: () => {
    },
  };

  onChangeHandler = (value) => {
    const { onSelect } = this.props;

    if ( typeof value === 'string' ) {

      this.setState({ inputValue: value }, () => onSelect(value))

    } else if ( typeof value === 'object' ) {

      this.setState({ inputValue: '' }, () => onSelect(value.value))

    } else {

      onSelect(value.target.value)

    }
  };
  UpdateItems = (value) => {
    const { items } = this.props;
    const clearedItems = items.map((item) => ({
        text: item.name,
        value: item.name
      }));

    if ( value.length > 0 ) {
      return SearchItems(clearedItems, value)
    }
    else {
      return clearedItems
    }
  };

  render() {
    const { items, onSelect, value, placeholder, itemsCount, itemHeight } = this.props;
    const { inputValue }=this.state;
    const transformMobileItem = items.map((item) => item.name);
    const transformItems = this.UpdateItems(inputValue);

    return (
      <div className="CustomSelect">
        {
          isBrowser &&
          <WebSelect
            inputValue={inputValue}
            UpdateItems={this.UpdateItems}
            itemHeight={itemHeight}
            height={UpdateBlockHeight(transformItems, itemsCount, itemHeight)}
            value={value}
            onSelect={onSelect}
            placeholder={placeholder}
            items={transformItems}
            handleOnChange={this.onChangeHandler}
          />
        }
        {
          isMobile &&
          <MobileSelect
            value={value}
            placeholder={placeholder}
            items={transformMobileItem}
            handleOnChange={this.onChangeHandler}
          />
        }
      </div>
    )
  }
}

export default CustomSelect;