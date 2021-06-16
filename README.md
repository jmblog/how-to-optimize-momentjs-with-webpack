# How to optimize moment.js with webpack

When you write `var moment = require('moment')` in your code and pack with webpack, the size of the bundle file gets heavyweight because it includes all locale files.

![](https://raw.githubusercontent.com/jmblog/how-to-optimize-momentjs-with-webpack/master/source-map-explorer.png)

To optimize the size, the two webpack plugins are available:

1.  `IgnorePlugin`
1.  `ContextReplacementPlugin`

## Using `IgnorePlugin`

You can remove all locale files with the `IgnorePlugin`.

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


[Create React App](https://github.com/facebookincubator/create-react-app/blob/a0030fcf2df5387577ced165198f1f0264022fbd/packages/react-scripts/config/webpack.config.prod.js#L350-L355) and [Next.js](https://github.com/vercel/next.js/blob/1ebf26af784637a27fe422090418126c474353f4/packages/next/build/webpack-config.ts#L1142-L1150) use this solution.

## Using `ContextReplacementPlugin`

If you want to specify the including locale files in the webpack config file, you can use `ContextReplacementPlugin`.

```js
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // load `moment/locale/ja.js` and `moment/locale/it.js`
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
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

* webpack: v3.10.0
* moment.js: v2.20.1

|                             | File size | Gzipped |
| :-------------------------- | --------: | ------: |
| Default                     |    266 kB |   69 kB |
| w/ IgnorePlugin             |   68.1 kB | 22.6 kB |
| w/ ContextReplacementPlugin |   68.3 kB | 22.6 kB |

## Alternatives

If you are looking for the alternatives to moment.js, please see https://github.com/you-dont-need/You-Dont-Need-Momentjs.

## References

* http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack/37172595
* https://github.com/moment/moment/issues/2373
