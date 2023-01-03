import { describe, test, expect } from "vitest";

import _if from "./if.js";

describe("if", () => {
  test("does not update if the predicate is false", () => {
    const object = { a: 0 };
    let result = _if(false, { b: 1 }, object);
    expect(result).to.eql(object);

    result = _if(0, false, 1);
    expect(result).to.eql(0);
  });

  test("does update if the predicate is true", () => {
    const object = { a: 0 };
    const result = _if(true, { b: 1 })(object);
    expect(result).to.eql({ a: 0, b: 1 });
  });

  test("will use the result of a function passed as a predicate", () => {
    const object = { a: 0 };
    const aIsThree = (x) => x.a === 3;
    const result = _if(aIsThree, { b: 1 }, object);

    expect(result).to.eql({ a: 0 });
  });

  test("freezes the result", () => {
    expect(Object.isFrozen(_if(true, {})({}))).to.be.true;
    expect(Object.isFrozen(_if(false, {})({}))).to.be.true;
  });
});
