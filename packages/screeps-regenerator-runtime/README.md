# screeps-regenerator-runtime

Standalone runtime for
[screeps-regenerator](https://github.com/screepers/screeps-regenerator)-compiled generator
and `async` functions.

To import the runtime as a module (recommended), either of the following
import styles will work:
```js
// CommonJS
const regeneratorRuntime = require("screeps-regenerator-runtime");

// ECMAScript 2015
import regeneratorRuntime from "screeps-regenerator-runtime";
```

To ensure that `regeneratorRuntime` is defined globally, either of the
following styles will work:
```js
// CommonJS
require("screeps-regenerator-runtime/runtime");

// ECMAScript 2015
import "screeps-regenerator-runtime/runtime";
```

To get the absolute file system path of `runtime.js`, evaluate the
following expression:
```js
require("screeps-regenerator-runtime/path").path
```
