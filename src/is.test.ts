import { expect, test } from "vitest";
import is from "./is.js";

test("returns true if path matches a value predicate", () => {
    const result = is({ a: { b: 4 } }, "a.b", 4);

    expect(result).to.be.true;
});

test("returns true if path matches a function predicate", () => {
    const isEven = (x) => x % 2 === 0;
    const result = is("a.b", isEven)({ a: { b: 6 } });
    expect(result).to.be.true;
});

test("returns false if path matches a value predicate", () => {
    const result = is("a.b", 4)({ a: { b: 5 } });
    expect(result).to.be.false;
});

test("returns false if path matches a function predicate", () => {
    const isEven = (x: number) => x % 2 === 0;
    const result = is("a.b", isEven)({ a: { b: 7 } });
    expect(result).to.be.false;
});

test("returns false if the path does not exist", () => {
    const result = is("a.b.c.d", 4)({ a: { b: {} } });
    expect(result).to.be.false;
});

test("can test for undefined", () => {
    const result = is("a.b.c", undefined)({ a: { b: {} } });
    expect(result).to.be.true;
});

test("tests the actual object if a blank path is given", () => {
    const result = is(4, "", 4);
    expect(result).toBeTruthy();
});

test("can use arrays as paths", () => {
    const result = is(["a", "b"], 4)({ a: { b: 4 } });
    expect(result).to.be.true;
});

test("can include array indexes in paths", () => {
    let result = is("a.1.b", 4)({ a: [{}, { b: 4 }] });
    expect(result).to.be.true;

    result = is(["a", 1, "b"], 4)({ a: [{}, { b: 4 }] });
    expect(result).to.be.true;
});

test("can be partially applied", () => {
    const result = is("a.b", 4)({ a: { b: 4 } });
    expect(result).to.be.true;
});
