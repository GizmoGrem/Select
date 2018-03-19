/**
 * Usage:
 * import cn from 'lib/bem-cn';
 *
 * const b = cn('Aston');
 *
 * b; // Aston
 *
 * b('title');                   // Aston__title
 * b('title', 'mod1');           // Aston__title Aston__title_mod1
 * b('title', ['mod1', 'mod2']); // Aston__title Aston__title_mod1 Aston__title_mod2
 * b('title', {mod1: true, mod2: false}); // Aston__title Aston__title_mod1
 *
 * b.mod('mod1'); // Aston Aston_mod1
 * b.mod(['mod1', 'mod2']); // Aston Aston_mod1 Aston_mod2
 * b.mod({mod1: true, mod2: false}); // Aston Aston_mod1
 *
 * const titleColor = orange;
 * b('title', {[titleColor]: true, hide: true}) // Aston__title Aston__title_orange Aston__title_hide
 *
 * b.add('foo'); // Aston foo
 *
 * b('title').add('foo');           // Aston__title foo
 * b('title').add(['foo', 'bar']);  // Aston__title foo bar
 * b('title').add({foo: true, bar: false}); // Aston__title foo
 * b('title').add('foo').add('bar').add(['baz', 'qux']); // Aston__title foo bar baz qux
 *
 * cn('button').mod('orange'); // button button_orange
 *
 */

const flatten = (data) => {
  if ( !data ) return [];

  if ( typeof data === 'string' || typeof data === 'number' ) {
    return [data];
  } else if ( !Array.isArray(data) ) {
    if ( Object.prototype.hasOwnProperty.call(data, 'toString') ) {
      return [data];
    }

    return Object.keys(data).filter(i => data[i]);
  }
  return data;
};

const chain = (stored) => ({
  toString() {
    return stored;
  },
  add(data) {
    return chain([stored, ...flatten(data)].join(' '));
  }
});

const cn = (block) => {
  const fn = (elem, mod) => {
    const cl = block + (elem ? '__' + elem : '');

    if ( !mod ) {
      return chain(cl);
    }

    return chain([cl, ...flatten(mod).map(v => cl + '_' + v)].join(' '));
  };

  fn.mod = (mod) => {
    return fn(null, mod);
  };

  return Object.assign(fn, chain(block));
};

export default cn;
