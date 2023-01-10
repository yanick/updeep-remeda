import { expect, it } from "vitest";
import reject from "./reject.js";
import u from "./index.js";

it("can reject", () => {
  const result = u({ foo: reject((v, k) => k === 1) })({
    foo: ["a", "b"],
  });

  expect(result).to.eql({ foo: ["a"] });
});

it("freezes the result", () => {
  expect(Object.isFrozen(reject([1], () => true))).to.be.true;
});

it("doesn't change the obj if nothing is modified", () => {
  const orig = [1, 2, 3];
  const result = reject(() => false)(orig);
  expect(result).to.be.equal(orig);
});
