# @yanick/updeep

> Easily update nested frozen objects and arrays in a declarative and immutable
> manner.

## About

> 💡 This is a fork of the main [updeep](https://github.com/substantial/updeep)
> package. For ease of reading &mdash; not to mention ease of shamelessly
> lifting large pieces of the original documentation &mdash; in this
> documentation all mentions of `updeep` refers to this fork.

updeep makes updating deeply nested objects/arrays painless by allowing you to
declare the updates you would like to make and it will take care of the rest. It
will recursively return the same instance if no changes have been made, making
it ideal for using reference equality checks to detect changes.

Because of this, everything returned by updeep is frozen. Not only that, but
updeep assumes that every object passed in to update is immutable, so it may
freeze objects passed in as well. Note that the freezing only happens in
development.

This fork of updeep requires Remeda, but works very well with any other utility
function ([lodash], [Ramda], etc).

## Differences with the original Updeep

- Under the hood, the use of lodash has been replaced by Remeda (for better type
  support and tree-shaking abilities).

- The codebase has been ported to TypeScript (mostly for the lulz).

- The order of parameters in the non-curryied invocation of functions has been
  modified. In the original updeep the input object is the last parameter,
  whereas here it's the first.

```js
// original updeep
const dataIn = { a: 1, b: 2 };

let dataOut = u({ c: 3 }, dataIn); // simple call
dataOut = u({ c: 3 })(dataIn); // curried

// @yanick/updeep
dataOut = u(dataIn, { c: 3 }); // simple call
dataOut = u({ c: 3 })(dataIn); // curried
```

- `withDefault` has been removed as the behavior can be implemented using
  Remeda's `pipe`, or a simple `??`.

- `u.omitted` has been renamed `u.skip`.

## Installation

```bash
$ npm install @yanick/updeep
# or
$ pnpm install @yanick/updeep
```

## Full example

```js
import u from "@yanick/updeep";

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

## API

> 💡 All functions are curried, Remeda-style, so if you see
> `f(dataIn, ...others)`, it can be called with either `f(dataIn, ...others)` or
> `f(...others)(dataIn)`.

### Importing

`@yanick/updeep` exports a default function that is an alias to `u.update` and
has all the other functions available as props.

```
import u from '@yanick/updeep';

const foo = u({a:1}, { a: x => x + 1 });

const bar = u.updateIn({ a: { b: 2 } }, 'a.b', 3 );
```

Or you can import the functions piecemeal:

```
import { updateIn, omit } from '@yanick/updeep';
```

### `u(dataIn, updates)`

### `u.update(dataIn, updates)`

Update as many values as you want, as deeply as you want. The `updates`
parameter can either be an object, a function, or a value. Everything returned
from `u` is frozen recursively.

If `updates` is an object, for each key/value, it will apply the updates
specified in the value to `object[key]`.

If `updates` is a function, it will call the function with `object` and return
the value.

If `updates` is a value, it will return that value.

Sometimes, you may want to set an entire object to a property, or a function. In
that case, you'll need to use a function to return that value, otherwise it
would be interpreted as an update. Ex. `function() { return { a: 0 }; }`.

Also available at `u.update(...)`.

#### Simple update

Object properties:

```js
const person = {
  name: {
    first: "Jane",
    last: "West",
  },
};

const result = u(person, { name: { first: "Susan" } });

expect(result).to.eql({ name: { first: "Susan", last: "West" } });
```

Array elements:

```js
const scoreboard = {
  scores: [12, 28],
};

const result = u(scoreboard, { scores: { 1: 36 } });

expect(result).to.eql({ scores: [12, 36] });
```

#### Multiple updates

```js
const person = {
  name: {
    first: "Mike",
    last: "Smith",
  },
  scores: [12, 28],
};

const result = u(person, { name: { last: "Jones" }, scores: { 1: 36 } });

expect(result).to.eql({
  name: { first: "Mike", last: "Jones" },
  scores: [12, 36],
});
```

#### Use a function

```js
const increment = (i) => i + 1;

var scoreboard = {
  scores: {
    team1: 0,
    team2: 0,
  },
};

const result = u(scoreboard, { scores: { team2: increment } });

expect(result).to.eql({ scores: { team1: 0, team2: 1 } });
```

#### Array Manipulation

Non-trivial array manipulations, such as element removal/insertion/sorting, can
be implemented with functions. Because there are so many possible manipulations,
we don't provide any helpers and leave this up to you. Simply ensure your
function is pure and does not mutate its arguments.

```js
function addTodo(todos) {
  return [].concat(todos, [{ done: false }]);
}

const state = {
  todos: [{ done: false }, { done: false }],
};

const result = u({ todos: addTodo }, state);

expect(result).to.eql({
  todos: [{ done: false }, { done: false }, { done: false }],
});
```

Remeda is one of the many libraries providing good utility functions for such
manipulations.

```js
import { reject, concat, prop } from "remeda";

let state = {
  todos: [{ done: true }, { done: false }],
};

// add a new todo
state = u(state, { todos: concat({ done: false }) });
expect(state).to.eql({
  todos: [{ done: true }, { done: false }, { done: false }],
});

// remove all done todos
state = u(state, { todos: reject(prop("done")) });
expect(state).to.eql({ todos: [{ done: false }, { done: false }] });
```

#### Default input data

When the input data is null or undefined, updeep uses a empty plain object.

```javascript
const result = u(null, { foo: "bar" });
expect(result).to.eql({ foo: "bar" });
```

#### Partial application

```js
const inc = (i) => i + 1;

const addOneYear = u({ age: increment });
const result = addOneYear({ name: "Shannon Barnes", age: 62 });

expect(result).to.eql({ name: "Shannon Barnes", age: 63 });
```

### `u.freeze(dataIn)`

Freeze your initial state to protect against mutations. Only performs the
freezing in development, and returns the original object unchanged in
production.

```js
const state = u.freeze({ someKey: "Some Value" });
state.someKey = "Mutate"; // ERROR in development
```

### `u.updateIn(dataIn, path, value)`

Update a single value with a simple string or array path. Can be use to update
nested objects, arrays, or a combination. Can also be used to update every
element of a nested array with `'*'`.

```js
const result = u.updateIn(
  { bunny: { color: "black" } },
  "bunny.color",
  "brown"
);

expect(result).to.eql({ bunny: { color: "brown" } });
```

```js
const result = u.updateIn(
  "0.1.color",
  "brown"
)([[{ color: "blue" }, { color: "red" }], []]);

expect(result).to.eql([[{ color: "blue" }, { color: "brown" }], []]);
```

```js
const incr = (i) => i + 1;

const result = u.updateIn("bunny.age", incr)({ bunny: { age: 2 } });

expect(result).to.eql({ bunny: { age: 3 } });
```

```js
const result = u(
  { pets: [{ bunny: { age: 2 } }] }
  { pets: u.updateIn([0, "bunny", "age"], 3) },
);

expect(result).to.eql({ pets: [{ bunny: { age: 3 } }] });
```

```js
const result = u.updateIn(
  "todos.*.done",
  true
)({
  todos: [{ done: false }, { done: false }],
});

expect(result).to.eql({
  todos: [{ done: true }, { done: true }],
});
```

### `u.constant(dataIn)`

Sometimes, you want to replace an object outright rather than merging it. You'll
need to use a function that returns the new object. `u.constant` creates that
function for you.

```js
const user = {
  name: "Mitch",
  favorites: {
    band: "Nirvana",
    movie: "The Matrix",
  },
};

const newFavorites = {
  band: "Coldplay",
};

const result = u(user, { favorites: u.constant(newFavorites) });

expect(result).to.eql({ name: "Mitch", favorites: { band: "Coldplay" } });
```

```js
const alwaysFour = u.constant(4);
expect(alwaysFour(32)).to.eql(4);
```

### `u.if(dataIn, predicate, updates)`

Apply `updates` if `predicate` evaluates to true. The `predicate` can be a
boolean, or a function taking in `dataIn` and returning a boolean, or an object,
in which case it'll be treated as a shortcut for `u.matches(predicate)`.

```js
function isEven(x) {
  return x % 2 === 0;
}
function increment(x) {
  return x + 1;
}

const result = u({ value: 2 }, { value: u.if(isEven, increment) });

expect(result).to.eql({ value: 3 });
```

### `u.filter(arrayIn, predicate)`

### `u.reject(arrayIn, predicate)`

### `u.pickBy(objectIn, predicate)`

### `u.omitBy(objectIn, predicate)`

### `u.pick(objectIn, keys)`

### `u.omit(objectIn, keys)`

Essentially the same as their Remeda counterparts. The difference being that if
the transformation results in no change, the original object/array is returned.

### `u.map(objectIn, updates)`

Applies the updates on all entries of `objectIn`.

### `u.mapIf(objectIn, predicate, updates)`

Shorthand for `u.map( objectIn, u.if(predicate,updates) )`.

### `u.mapIfElse(objectIn, predicate, updates, updatesElse)`

Shorthand for `u.map( objectIn, u.ifElse(predicate,updates,updatesElse) )`.

### `u.matches(dataIn, condition)`

Do a deep comparison with `condition`, and returns `true` if the `dataIn` object
matches.

Scalar values are verified for equality (i.e., `{foo: 12}` will verify that the
object has the prop `foo` set to `12`), and functions are going to be invoked
with the object value of the object and expected to return `true` upon matching.

```js
u.matches(
  { name: "Bob", age: 32, address: "..." },
  {
    name: "Bob",
    age: (age) => age > 30,
  }
); // true
```
