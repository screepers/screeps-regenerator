screeps-regenerator
===

This package implements a babel transformation that allows you to use
generators/`yield` in the game [screeps](https://screeps.com/) to emulate
synchronous, multithreaded programming.

This project is based on [regenerator](https://github.com/facebook/regenerator), by Facebook.

Status
---

Generators can be serialized and deserialized from plan JSON objects, which
allows their running state to be stored in Memory. Note that an advanced heap
serializer is needed for anything more than trivial examples, because JSON does
not allow circular references.

Here is a working example using nothing more than this package:

```js
require('screeps-regenerator-runtime/runtime');

function* main() {
  let counter = 0;
  while (true) {
    console.log("Code has been running for", counter, "ticks");
    yield null;
    counter += 1;
  }
}

exports.loop = function () {
  var thread;
  if (Memory.thread) {
    try {
      thread = regeneratorRuntime.deserializeGenerator(Memory.thread);
    } finally {
      delete Memory.thread;
    }
  } else {
    thread = main();
  }
  let result = thread.next();
  if (!result.done) {
    Memory.thread = regeneratorRuntime.serializeGenerator(thread);
  }
};
```

Installation
---

From NPM:
```sh
npm install --save-dev screeps-regenerator-preset screeps-regenerator-runtime
```

From GitHub:
```sh
cd path/to/node_modules
git clone git://github.com/facebook/regenerator.git
cd screeps-regenerator
npm install .
npm test
```

Usage
---

You have several options for using this module.

Via .babelrc (Recommended)
```js
{
  "presets": ["screeps-regenerator-preset"]
}
```

Via CLI:
```sh
babel --preset screeps-regenerator-prefix script.js
```

Via Node API:
```js
require("babel-core").transform("code", {
  presets: ["screeps-regenerator-preset"]
});
```

How can you get involved?
---

The easiest way to get involved is to try out some scripts yourself and submit
feature requests for what you'd like to be able to do. If you're feeling
especially brave, you are more than welcome to dive into the runtime code and
add new features yourself.
