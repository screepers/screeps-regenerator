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

The following currently works. It will spawn a creep in one of your controlled rooms and have it run laps around the room.

```js
function* main() {
  let room = _.filter(Game.rooms, r => r.controller && r.controller.my)[0];
  console.log("Using " + room.name + " as test room.");
  let creep = room.find(FIND_MY_CREEPS)[0];
  if (!creep) {
    console.log(room.name + " has no creep; spawning.");
    let spawn = room.find(FIND_MY_SPAWNS)[0];
    if (!spawn) {
      console.log(room.name + " has no spawn!");
      return;
    }
    creep = yield* spawnCreep(spawn);
  }
  console.log("Toy creep is", creep.name);
  while (true) {
    yield* moveCreep(creep, new RoomPosition(0, 0, room.name), { range: 15 });
    console.log(creep.name + " is at the top left");
    yield* moveCreep(creep, new RoomPosition(49, 0, room.name), { range: 15 });
    console.log(creep.name + " is at the top right");
    yield* moveCreep(creep, new RoomPosition(49, 49, room.name), { range: 15 });
    console.log(creep.name + " is at the bottom left");
    yield* moveCreep(creep, new RoomPosition(0, 49, room.name), { range: 15 });
    console.log(creep.name + " is at the bottom right");
  }
}

function* spawnCreep(spawn) {
  let name = spawn.createCreep([MOVE]);
  if (typeof name === 'number') {
    throw new Error("Cannot spawn creep: Error " + name);
  }
  while (Game.creeps[name].spawning) {
    yield null;
  }
  return Game.creeps[name];
}

function* moveCreep(creep, target, opts) {
  opts = opts || {};
  let range = opts.range || 0;
  while (creep.pos.getRangeTo(target) > range) {
    creep.moveTo(target, opts);
    yield null;
  }
}

exports.loop = function () {
  var thread;
  if (Memory.thread) {
    try {
      thread = regeneratorRuntime.deserialize(Memory.thread);
    } finally {
      delete Memory.thread;
    }
  } else {
    thread = main();
  }
  let result = thread.next();
  if (!result.done) {
    Memory.thread = regeneratorRuntime.serialize(thread);
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
