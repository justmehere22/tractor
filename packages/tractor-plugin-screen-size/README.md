# tractor-plugin-screen-size

Plugin for [tractor](http://github.com/TradeMe/tractor) for running tests at different screen sizes.

[![Greenkeeper badge](https://badges.greenkeeper.io/phenomnomnominal/tractor-plugin-screen-sizes.svg)](https://greenkeeper.io/)
[![npm version](https://img.shields.io/npm/v/tractor-plugin-screen-sizes.svg)](https://www.npmjs.com/package/tractor-plugin-screen-sizes)
[![bitHound Overall Score](https://www.bithound.io/github/phenomnomnominal/tractor-plugin-screen-sizes/badges/score.svg)](https://www.bithound.io/github/phenomnomnominal/tractor-plugin-screen-sizes)
[![Code Climate](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-screen-sizes/badges/gpa.svg)](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-screen-sizes)
[![Test Coverage](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-screen-sizes/coverage.svg)](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-screen-sizes/coverage)


## How to use:

### As config:

You can add a `screenSizes` property to your "tractor.conf.js" file. Each size given will create a tag, which will resize the browser before your test runs.

```javascript
module.exports = {
    screenSizes: {
        sm: { width: 360, height: 480 }, // Creates a tag @screen-size:sm, at 360x840
        md: 768 // Creates a tag @screen-size:md, at 768x1000
    }
};
```

### Within a test:

You can also use the `ScreenSize.setSize` method in a Page Object. It takes a `string` which should be the name of the size from your config, e.g. 'sm' or 'md' with the config from above.