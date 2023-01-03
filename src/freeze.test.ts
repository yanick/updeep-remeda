import { describe, afterEach, test, expect } from "vitest";

import freeze from "./freeze.js";

describe("freeze", () => {
  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  test("freezes objects", () => {
    const object = {};
    freeze(object);

    expect(Object.isFrozen(object)).to.be.true;
  });

  test("freezes nested objects", () => {
    const object = { foo: { bar: 3 } };
    freeze(object);

    expect(Object.isFrozen(object.foo)).to.be.true;
  });

  test("freezes nested arrays", () => {
    const object = [[0]];
    freeze(object);

    expect(Object.isFrozen(object)).to.be.true;
    expect(Object.isFrozen(object[0])).to.be.true;
  });

  test("ignores functions", () => {
    const object = { foo: () => 1 };
    freeze(object);

    expect(Object.isFrozen(object.foo)).to.be.false;
  });

  test("ignores regexps", () => {
    const object = { foo: /\d/ };
    freeze(object);

    expect(Object.isFrozen(object.foo)).to.be.false;
  });

  test("does not freeze children if the parent is already frozen", () => {
    const object = { foo: {} };
    Object.freeze(object);
    freeze(object);

    expect(Object.isFrozen(object.foo)).to.be.false;
  });

  test("does not freeze in production", () => {
    process.env.NODE_ENV = "production";

    const object = {};
    freeze(object);

    expect(Object.isFrozen(object)).to.be.false;
  });

  test("handles null objects", () => {
    const object = { foo: null };
    freeze(object);
    expect(Object.isFrozen(object)).to.be.true;
  });

  test("returns the same object", () => {
    const object = {};
    const result = freeze(object);
    expect(result).to.equal(object);
  });
});
