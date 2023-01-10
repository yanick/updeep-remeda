import { expect, it } from "vitest";
import pick from "./pick.js";
import u from "./index.js";

it("can pick a key", () => {
  const pickBar = pick(["bar"] as any);

  const result = u({ foo: pickBar })({
    foo: { bar: 7, baz: 8 },
  });

  expect(result).to.eql({ foo: { bar: 7 } });
});

it("freezes the result", () => {
  expect(Object.isFrozen(pick({ a: 1 }, ["a"]))).to.be.true;
});

it("doesn't change the obj if nothing is modified", () => {
  const orig = { a: 1 };
  const result = pick<any, string>(["a"])(orig);
  expect(result).to.be.equal(orig);
});
