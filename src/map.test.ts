import { expect, test, describe } from "vitest";
import map from "./map.js";

test("applies updates to each item in an array", () => {
  const object = [0, 1, 2];
  const inc = (x) => x + 1;
  const result = map(object, inc);

  expect(result).to.eql([1, 2, 3]);
});

test("applies updates to each value in an object", () => {
  const object = { a: 0, b: 1, c: 2 };
  const inc = (x) => x + 1;
  const result = map(inc)(object);

  expect(result).to.eql({ a: 1, b: 2, c: 3 });
});

test("can update with a regular updates object", () => {
  const object = [{ a: 0 }, { a: 0 }];
  const result = map({ a: 1 })(object);

  expect(result).to.eql([{ a: 1 }, { a: 1 }]);
});

test("returns the same object if no updates are made", () => {
  const array = [0, 1];
  const ident = (x) => x;
  let result = map(ident)(array);

  expect(result).to.equal(array);

  const object = { a: 0 };
  result = map(ident)(object);

  expect(result).to.equal(object);
});

test("passes the key or index as the second parameter to the iteratee", () => {
  const object = {
    a: { x: 0 },
    b: [3, 3],
  };
  const setToKey = (_, key) => key;
  const result = map(object, map(setToKey));

  expect(result).to.eql({
    a: { x: "x" },
    b: [0, 1],
  });
});

test("freezes the result", () => {
  expect(Object.isFrozen(map({}, {}))).to.be.true;
});
