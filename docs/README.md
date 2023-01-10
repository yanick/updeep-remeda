# updeep-remeda

> Easily update nested frozen objects and arrays in a declarative and immutable
> manner.

## About

:::info

This is a fork of the main updeep package. For ease of reading &mdash; not to
mention ease of shamelessly lifting large pieces of the original
documentation &mdash; in this documentation all mentions of `updeep` refers to this
fork.

:::

updeep makes updating deeply nested objects/arrays painless by allowing you to
declare the updates you would like to make and it will take care of the rest. It
will recursively return the same instance if no changes have been made, making
it ideal for using reference equality checks to detect changes.

Because of this, everything returned by updeep is frozen. Not only that, but
updeep assumes that every object passed in to update is immutable, so it may
freeze objects passed in as well. Note that the freezing only happens in
development.

This fork of updeep requires Remeda, but works very well with any other utility function ([lodash], [Ramda], etc).

## Differences with the original Updeep

- Under the hood, the use of lodash has
  been replaced by Remeda (for better type support and tree-shaking abilities).

- The codebase has been ported to TypeScript (mostly for the lulz).

- The order of parameters in the non-curryied invocation of functions has been modified. In the original updeep the input object is the last parameter, whereas here it's the first.

```js
// original updeep
const dataIn = { a: 1, b: 2 };

let dataOut = u({ c: 3 }, dataIn); // simple call
dataOut = u({ c: 3 })(dataIn); // curried

// updeep-remeda
dataOut = u(dataIn, { c: 3 }); // simple call
dataOut = u({ c: 3 })(dataIn); // curried
```

- `withDefault` has been removed as the behavior can be implemented using
  Remeda's `pipe`, or a simple `??`.

- `u.omitted` has been renamed `u.skip`.

## Installation

```bash
$ npm install @yanick/updeep-remeda
# or
$ pnpm install @yanick/updeep-remeda
```

## Full example

```js
import u from "@yanick/updeep-remeda";

const person = {
  name: { first: "Bill", last: "Sagat" },
  children: [
    { name: "Mary-Kate", age: 7 },
    { name: "Ashley", age: 7 },
  ],
  todo: ["Be funny", "Manage household"],
  email: "bill@example.com",
  version: 1,
};

const inc = (i) => i + 1;

const eq = (x) => (y) => x === y;

const newPerson = u(person, {
  // Change first name
  name: { first: "Bob" },
  // Increment all children's ages
  children: u.map({ age: inc }),
  // Update email
  email: "bob@example.com",
  // Remove todo
  todo: u.reject(eq("Be funny")),
  // Increment version
  version: inc,
});
// => {
//  name: { first: 'Bob', last: 'Sagat' },
//  children: [
//    { name: 'Mary-Kate', age: 8 },
//    { name: 'Ashley', age: 8 }
//  ],
//  todo: [
//    'Manage household'
//  ],
//  email: 'bob@example.com',
//  version: 2
//}
```
