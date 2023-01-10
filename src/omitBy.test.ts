import { expect, it, describe } from "vitest";
import u from "./index.js";
import omitBy from "./omitBy.js";

it("can omitBy with a function", () => {
  const predicate = (value, key) => value === 7 && key === "bar";
  const result = u({ foo: u.omitBy(predicate) })({ foo: { bar: 7, baz: "a" } });

  expect(result).to.eql({ foo: { baz: "a" } });
});

it("freezes the result", () => {
  expect(Object.isFrozen(u.omitBy("a" as any)({}))).to.be.true;
});

it("doesn't change the obj if nothing is omitted", () => {
  const orig = { a: 1 };
  const result = omitBy(() => false)(orig);
  expect(result).to.be.equal(orig);
});
