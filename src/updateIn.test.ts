import { expect, test, describe } from "vitest";
import updateIn from "./updateIn.js";

describe("updateIn", () => {
  test("can update a single path described with a string", () => {
    const object = { a: { b: 0 } };
    const result = updateIn("a.b", 3)(object);
    expect(result).to.eql({ a: { b: 3 } });
  });

  test("can update a single path described with a string with a function", () => {
    const inc = (x) => x + 1;
    const object = { a: { b: 0 } };
    const result = updateIn("a.b", inc)(object);
    expect(result).to.eql({ a: { b: 1 } });
  });

  test("can update a single path described with an array", () => {
    const object = { a: { b: 0 } };
    const result = updateIn(["a", "b"], 3)(object);
    expect(result).to.eql({ a: { b: 3 } });
  });

  test("can update arrays", () => {
    const object = { a: [0, 0, 0] };
    const result = updateIn("a.1", 3)(object);
    expect(result).to.eql({ a: [0, 3, 0] });
  });

  test("can be partially applied", () => {
    const object = { a: { b: 0 } };
    const result = updateIn("a.b", 3)(object);
    expect(result).to.eql({ a: { b: 3 } });
  });

  test("replaces the object outright if the path is empty", () => {
    const object = {};
    const result = updateIn("", 3)(object);
    expect(result).to.equal(3);
  });
  test("freezes the result", () => {
    expect(Object.isFrozen(updateIn("a", 0)({}))).to.be.true;
  });

  test("can multiple elements of an array with *", () => {
    let object: any = { a: [{ b: 0 }, { b: 1 }, { b: 2 }] };
    let result = updateIn("a.*.b", (x) => x + 1)(object);
    expect(result).to.eql({ a: [{ b: 1 }, { b: 2 }, { b: 3 }] });

    object = { a: [0, 1, 2] };
    result = updateIn(["a", "*"], (x) => x + 1)(object);
    expect(result).to.eql({ a: [1, 2, 3] });
  });

  test("can update properties named *", () => {
    const object = { "*": 1, x: 1 };
    const result = updateIn("*", (x) => x + 1)(object);
    expect(result).to.eql({ "*": 2, x: 1 });
  });
});
