import { expect, test, describe } from "vitest";
import u from "./index.js";

test("does not change anything if no updates are specified", () => {
  const object = { foo: 3, bar: [7, 5] };
  const result = u(object, {});

  expect(result).to.equal(object);
});

test("can update with fixed values", () => {
  const object = { foo: 3, bar: [7, 5] };
  const result = u(object, { foo: 4 });

  expect(result).to.deep.equal({ foo: 4, bar: [7, 5] });
});

test("returns the same instance if an update doesn't make changes", () => {
  const object = { foo: 3 };
  const result = u({ foo: 3 })(object);

  expect(result).to.equal(object);
});

test("can update a nested structure", () => {
  const object = { foo: { bar: 7, bam: 3 }, baz: 32 };
  const result = u({ foo: { bar: 8 } })(object);

  expect(result).to.deep.equal({ foo: { bar: 8, bam: 3 }, baz: 32 });
});

test("can update arrays", () => {
  const object = [1, 2, 3];
  const result = u({ 1: 7 })(object);

  expect(result).to.deep.equal([1, 7, 3]);
});

test("replaces the object outright if updates are a constant", () => {
  expect(u(3)({})).to.equal(3);
  expect(u(null)({})).to.be.null;
});

test("can add an element to an array", () => {
  const object = [];
  const result = u({ 0: 3 })(object);

  expect(result).to.eql([3]);
});

test("can update nested arrays", () => {
  const object = { foo: [1, 2, 3], bar: 9 };
  const result = u({ foo: { 1: 7 } })(object);

  expect(result).to.deep.equal({ foo: [1, 7, 3], bar: 9 });
});

test("can use functions to update values", () => {
  const inc = (i) => i + 1;
  const object = { foo: 3, bar: 4, baz: 7 };
  const result = u({ foo: inc, bar: inc })(object);

  expect(result).to.deep.equal({ foo: 4, bar: 5, baz: 7 });
});

test("can be partially applied", () => {
  const inc = (i) => i + 1;
  const object = { foo: 3 };
  const incFoo = u({ foo: inc });

  const result = incFoo(object);

  expect(result).to.deep.equal({ foo: 4 });
});

test("can update if the value is an array", () => {
  const object = {};
  const result = u({ foo: [0, 1] })(object);

  expect(result).to.deep.equal({ foo: [0, 1] });
});

test("can update when original object is undefined", () => {
  const result = u({ foo: [0, 1] })(undefined);

  expect(result).to.deep.equal({ foo: [0, 1] });
});

test("can take a function as the updater", () => {
  const result = u((i) => i + 1)(7);

  expect(result).to.eql(8);
});

test("deeply freezes the result", () => {
  const result = u({ foo: { bar: 3 } }, { foo: { bar: 0 } });

  expect(Object.isFrozen(result)).to.be.true;
  expect(Object.isFrozen(result.foo)).to.be.true;
});

test("assigns null values", () => {
  expect(u({ isNull: null }, {})).to.eql({ isNull: null });
});

test("defaults to an empty object when null or undefined", () => {
  let result = u({ a: { b: 0 } })({ a: null });
  expect(result).to.eql({ a: { b: 0 } });

  result = u({ a: { b: 0 } })({ a: undefined });
  expect(result).to.eql({ a: { b: 0 } });

  result = u({ a: { b: 0 } })({});
  expect(result).to.eql({ a: { b: 0 } });
});

test("preserves empty objects when empty updates are specified", () => {
  const result = u({ a: {} })({});
  expect(result).to.eql({ a: {} });
});

test("works with date objects", () => {
  const date = new Date();
  const result = u({ created: date })({});
  expect(result).toEqual({ created: date });
});

const expectU = (update, orig, expected) =>
  expect(update(orig)).to.eql(expected);

describe("u.skip", () => {
  test("omit properties via u.skip", () => {
    expectU(u({ a: u.skip, b: (i) => i + 1 }), { a: 1, b: 2 }, { b: 3 });
  });

  test("omit array and object properties", () => {
    expectU(
      u({ a: u.skip, b: "stuff", c: u.skip }),
      { a: [1, 2, 3], b: "orig", c: { z: "bar" } },
      { b: "stuff" }
    );
  });

  test("deep omit", () => {
    expectU(
      u({ a: { b: u.skip, c: "stuff" } }),
      { a: { b: "foo", z: "bar" } },
      { a: { z: "bar", c: "stuff" } }
    );
  });

  test("omitting an array item filters it out", () => {
    expectU(u({ 1: u.skip }), ["a", "b", "c"], ["a", "c"]);
  });

  test("doesn't change the obj if nothing is omitted", () => {
    const orig = { a: 1 };
    const result = u(orig, { b: u.skip });
    expect(result).to.be.equal(orig);
  });

  test("doesn't change the array if nothing is omitted", () => {
    const orig = [1, 2, 3];
    const result = u({ 4: u.skip })(orig);
    expect(result).to.be.equal(orig);
  });
});

test("has map", () => {
  expect(u).toHaveProperty("map");
});
