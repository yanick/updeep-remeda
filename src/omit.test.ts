import { expect, it } from "vitest";
import omit from "./omit.js";
import u from "./index.js";

it("can omit a key", () => {
  const result = u({ foo: omit(["bar"]) })({ foo: { bar: 7 } });

  expect(result).to.eql({ foo: {} });
});

it("freezes the result", () => {
  expect(Object.isFrozen(omit({}, ["a"]))).to.be.true;
});

it("doesn't change the obj if nothing is omitted", () => {
  const orig = { a: 1 };
  const result = omit(["b"])(orig);
  expect(result).to.be.equal(orig);
});
