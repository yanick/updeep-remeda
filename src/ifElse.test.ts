import { expect, test, describe } from "vitest";

import ifElse from "./ifElse.js";
import _if from "./if.js";

describe("ifElse", () => {
  test("does updates with the else if the predicate is false", () => {
    const object = { a: 0 };
    const result = ifElse(false, { b: 1 }, { b: 2 })(object);
    expect(result).to.eql({ a: 0, b: 2 });
  });

  test("updates with the true update if the predicate is true", () => {
    const object = { a: 0 };
    const result = ifElse(true, { b: 1 }, { b: 4 })(object);
    expect(result).to.eql({ a: 0, b: 1 });
  });

  test("will use the result of a function passed as a predicate", () => {
    const object = { a: 0 };
    const aIsThree = (x) => x.a === 3;
    const result = ifElse(aIsThree, { b: 1 }, { b: 4 })(object);

    expect(result).to.eql({ a: 0, b: 4 });
  });

  test("freezes the result", () => {
    expect(Object.isFrozen(ifElse(true, {}, {})({}))).to.be.true;
    expect(Object.isFrozen(ifElse(false, {}, {})({}))).to.be.true;
  });
});

describe("if", () => {
  test("does updates with the else if the predicate is false", () => {
    const object = { a: 0 };
    const result = _if(false, { b: 1 })(object);
    expect(result).not.toHaveProperty("b");
  });

  test("updates with the true update if the predicate is true", () => {
    const object = { a: 0 };
    const result = _if(true, { b: 1 })(object);
    expect(result).to.eql({ a: 0, b: 1 });
  });
});
