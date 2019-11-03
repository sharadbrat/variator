# @sharadbrat/variator

Tiny javascript library that provides simple API for AB and variation testing.

## Start

Install dependency:

`npm install @sharadbrat/variator`

Import in project:

```javascript
import Variator from '@sharadbrat/variator';
```

Use:

```javascript
const v = new Variator();

v.set({
  featureA: true,
  featureB: false,
});

v.runTest('featureA', () => {
  // do ab testing
});

v.runTest('featureB', () => {
  // don't do ab testing
})
```

## Examples

Set function merges provided objects:

```javascript
const v = new Variator();

v.set({
  featureA: true,
  featureB: true,
});

v.set({
  featureB: false, // { featureA: true, featureB: false }
});
```

Clean inner state:

```javascript
const v = new Variator();

v.set({
  featureA: true,
});

v.clear(); // sets to empty object
```

Weighted variations for certain features:

```javascript
const v = new Variator();

v.set({
  featureC: true,
});

v.runWeightedTest('featureC', [[1, 'A'], [1, 'B']], (variationName) => {
  // do ab testing with randomly chosen variation
  // variationName is either 'A' or 'B'
});
```

## Testing

`npm run test`

Runs tests with mocha.

## Authors

[sharadbrat](https://github.com/sharadbrat)

## License

MIT
