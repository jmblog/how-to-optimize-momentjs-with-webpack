# How to optimize moment.js with webpack

When you write `var moment = require('moment')` in your code and pack with webpack, your bundle file includes all locale files by default and its size gets heavyweight.

To optimize the size, the two webpack plugins are available:

1. `IgnorePlugin`
1. `ContextReplacementPlugin`

## Using `IgnorePlugin`

If you don't need any locales except `en`, the `IgnorePlugin` is the best choice.

```js
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
```

And you can still load some locales in your code.

```js
const moment = require('moment');
require('moment/locale/ja');

moment.locale('ja');
...
```

## Using `ContextReplacementPlugin`

If you want to include some locales, you can use `ContextReplacementPlugin`.

```js
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // load `moment/locale/ja.js` and `moment/locale/it.js`
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ja|it/),
  ],
};
```

In this case, you don't need load the locale files in your code.

```js
const moment = require('moment');
moment.locale('ja');
...
```

## Measurements

|       | File size | Gzipped |
|:-----------------|------------------:|------------------:|
| Default | 199 kB | 58.6 kB |
| using IgnorePlugin | 51 kB | 17.1 kB |
| using ContextReplacementPlugin | 51 kB | 17.1 kB |

## Bonus

[`date-fns`](https://github.com/date-fns/date-fns/) is an alternative libraly to `moment.js`. It doesn't need this kind of tricky solution and has [more cons](https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189). It's worth considering.

## References
- http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack/37172595
- https://github.com/moment/moment/issues/2373
