import { test, expect, describe } from "vitest";

import u from "./index.js";

describe("update", () => {
  test("basic", () => {
    const orig = { a: 1 };
    const result = u(orig, { a: 1 });
    expect(result).toBe(orig);
  });

  test("array", () => {
    const orig = [1, 2, 3];
    const result = u(orig, { 1: 2 });
    expect(result).toBe(orig);
  });

  test("with u.skip", () => {
    const orig = { a: 1 };
    const result = u(orig, { b: u.skip });
    expect(result).toBe(orig);
  });

  test("found in the wild", () => {
    const x = { a: { c: 3 }, b: 2 };
    const res = u(x, { a: { c: 3 } });
    expect(res).toBe(x);
  });
});
