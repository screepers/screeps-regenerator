var assert = require("assert");
var recast = require("recast");
var types = recast.types;
var n = types.namedTypes;
var transform = require("..").transform;

function reserialize(value) {
  var data = JSON.stringify(regeneratorRuntime.serialize(value), null, 2);
  return regeneratorRuntime.deserialize(JSON.parse(data));
}

describe("serialization", function() {
  it("should work for simple values", function() {
    let value = "this is a test";
    assert.strictEqual(value, reserialize(value));
  });

  it("should work for references", function() {
    let referenced = { foo: true };
    let value = { a: referenced, b: referenced };
    let restored = reserialize(value);
    assert.strictEqual(restored.a, restored.b);
  });

  it("should work for generators", function() {
    function* gen(recurse) {
      yield 1;
      if (recurse) {
        yield* gen(false);
      }
      yield 2;
    }
    let thread = gen(true);
    thread = reserialize(thread);
    assert.deepEqual(thread.next(), { value: 1, done: false });
    thread = reserialize(thread);
    assert.deepEqual(thread.next(), { value: 1, done: false });
    thread = reserialize(thread);
    assert.deepEqual(thread.next(), { value: 2, done: false });
    thread = reserialize(thread);
    assert.deepEqual(thread.next(), { value: 2, done: false });
    thread = reserialize(thread);
    assert.deepEqual(thread.next(), { value: undefined, done: true });
  });
});
