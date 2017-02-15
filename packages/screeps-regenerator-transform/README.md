# screeps-regenerator-transform

Transform async/generator functions with [screeps-regenerator](https://github.com/screepers/screeps-regenerator)

## Installation

```sh
$ npm install screeps-regenerator-transform
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["screeps-regenerator-transform"]
}
// with options
{
  "plugins": [
    ["screeps-regenerator-transform", {
      asyncGenerators: false, // true by default
      generators: false, // true by default
      async: false // true by default
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins screeps-regenerator-transform script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["screeps-regenerator-transform"]
});
```
