import escapeStringRegexp from 'escape-string-regexp';

const KEY_CODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESCAPE: 27
};

const getItems=(keyCode, defaultValue)=>{
  const { UP, DOWN } = KEY_CODE;
  let ActiveItem, NextItem;
  if ( keyCode === DOWN ) {
    ActiveItem = defaultValue;
    NextItem = defaultValue + 1
  } else if ( keyCode === UP && defaultValue != 1 ) {
    ActiveItem = defaultValue - 2;
    NextItem = defaultValue - 1
  } else {
    ActiveItem = 0;
    NextItem = 0
  }
  return { ActiveItem, NextItem }
};

const getDropDownDirection=(element,maxHeight)=> {
  const clientHeight = document.documentElement.clientHeight;
  const distanceToBottom = element.getBoundingClientRect().bottom;

  return clientHeight - distanceToBottom < maxHeight ? 'isUP' : 'isDOWN';
};

const findCountry = (elem, event) => {
  let re = new RegExp(escapeStringRegexp(event.target.value), 'i');
  return elem.match(re)
};

const SearchItems = (array, value) => {

  let NewArray = [];
  const regExp = new RegExp(escapeStringRegexp(value.toLowerCase()), 'i');

  array.filter((item) => {
    const regExpPos = item.value.toLowerCase().search(regExp);
    const Search = item.value.toLowerCase().includes(value.toLowerCase());

    if ( Search ) {
      const Slice1 = item.value.slice(0, regExpPos);
      const Slice2 = item.value.slice(regExpPos, regExpPos + value.length);
      const Slice3 = item.value.slice(regExpPos + value.length);

      const NewItem = {
        text: [Slice1, Slice2, Slice3],
        value: item.value
      };

      NewArray.push(NewItem);
    }
  });

  if ( NewArray < 1 ) {
    NewArray.push({
      text: 'no results',
      value: 'no results'
    });
  }

  return NewArray;

};

const UpdateBlockHeight = (items, itemsCount, itemsHeight) => {
  let BlockHeight;
  const SearchLength = items.length;
  if ( (SearchLength === 1 || SearchLength > 1) && SearchLength < itemsCount ) {
    BlockHeight = SearchLength * itemsHeight + 1;
  } else {
    BlockHeight = itemsHeight * itemsCount;
  }
  return BlockHeight

};

export {
  getItems,
  getDropDownDirection,
  findCountry,
  SearchItems,
  UpdateBlockHeight,
  KEY_CODE
}