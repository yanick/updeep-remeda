import { expect, it } from "vitest";
import filter from "./filter.js";
import u from "./index.js";

it("can filter", () => {
  const result = u({ foo: filter((v, k) => k === 1) })({
    foo: ["a", "b"],
  });

  expect(result).to.eql({ foo: ["b"] });
});

it("freezes the result", () => {
  expect(Object.isFrozen(filter([1], () => true))).to.be.true;
});

it("doesn't change the obj if nothing is modified", () => {
  const orig = [1, 2, 3];
  const result = filter(() => true)(orig);
  expect(result).to.be.equal(orig);
});
