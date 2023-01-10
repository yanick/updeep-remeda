import { expect, it } from "vitest";
import pickBy from "./pickBy.js";
import u from "./index.js";

it("can pick a key", () => {
  const result = u({ foo: pickBy((v, k) => k === "bar") })({
    foo: { bar: 7, baz: 8 },
  });

  expect(result).to.eql({ foo: { bar: 7 } });
});

it("freezes the result", () => {
  expect(Object.isFrozen(pickBy({}, () => true))).to.be.true;
});

it("doesn't change the obj if nothing is modified", () => {
  const orig = { a: 1 };
  const result = pickBy(() => true)(orig);
  expect(result).to.be.equal(orig);
});
