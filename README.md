screeps-regenerator
===

This package implements a babel transformation that allows you to use
generators/`yield` in the game [screeps](https://screeps.com/) to emulate
synchronous, multithreaded programming.

This project is based on [regenerator](https://github.com/facebook/regenerator), by Facebook.

Status
---

This project is currently just a proof-of-concept. There is very little error
checking and few convenience methods. Follow the project to see future
development.

The eventual vision is to be able to do something like this. Note: none of this currently works, it's just for inspiration.

```js
function* harvester() {
  let spawn = Game.spawns.Spawn1;
  let creep = yield spawn.createCreep([MOVE, WORK, CARRY]);
  let source = creep.room.find(FIND_SOURCES)[0];
  while (creep.ticksToLive > 0) {
    yield creep.moveTo(source.pos);
    while (_.sum(creep.carry) < creep.carryCapacity) {
      yield creep.harvest(source);
    }
    yield creep.moveTo(spawn.pos);
    yield creep.transfer(spawn, RESOURCE_ENERGY);
  }
}
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
