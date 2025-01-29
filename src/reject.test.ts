import { expect, test } from "vitest";
import reject from "./reject.js";
import u from "./index.js";

test("can reject", () => {
  const result = u({
    foo: reject((_, k) => k === 1),
  })({
    foo: ["a", "b"],
  });

  expect(result).to.eql({ foo: ["a"] });
});

test("freezes the result", () => {
  expect(Object.isFrozen(reject([1], () => true))).to.be.true;
});

test("doesn't change the obj if nothing is modified", () => {
  const orig = [1, 2, 3];
  const result = reject(() => false)(orig);
  expect(result).to.be.equal(orig);
});
