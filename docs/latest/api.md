
# API 

<div class="info">
<h4>💡 Info</h4>

All functions are curried, Remeda-style, so if you see `f(dataIn, ...others)`, it can be called with either `f(dataIn, ...others)` or `f(...others)(dataIn)`.

</div>

## Importing

`updeep-remeda` exports a default function that is an alias to `u.update` and
has all the other functions available as props.

``` 
import u from '@yanick/updeep-remeda';

const foo = u({a:1}, { a: x => x + 1 });

const bar = u.updateIn({ a: { b: 2 } }, 'a.b', 3 );
```

Or you can import the functions piecemeal:

``` 
import { updateIn, omit } from '@yanick/updeep-remeda';
```


## `u(dataIn, updates)`
## `u.update(dataIn, updates)`

Update as many values as you want, as deeply as you want. The `updates` parameter can either be an object, a function, or a value. Everything returned from `u` is frozen recursively.

If `updates` is an object, for each key/value, it will apply the updates specified in the value to `object[key]`.

If `updates` is a function, it will call the function with `object` and return the value.

If `updates` is a value, it will return that value.

Sometimes, you may want to set an entire object to a property, or a function. In that case, you'll need to use a function to return that value, otherwise it would be interpreted as an update. Ex. `function() { return { a: 0 }; }`.

Also available at `u.update(...)`.

### Simple update

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

### Multiple updates

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

### Use a function

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

### Array Manipulation

Non-trivial array manipulations, such as element removal/insertion/sorting, can be implemented with functions. Because there are so many possible manipulations, we don't provide any helpers and leave this up to you. Simply ensure your function is pure and does not mutate its arguments.

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

Remeda is one of the many libraries providing good utility functions for
such manipulations.

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

### Default input data

When the input data is null or undefined, updeep uses a empty plain object.

```javascript
const result = u(null, { foo: "bar" });
expect(result).to.eql({ foo: "bar" });
```

### Partial application

```js
const inc = (i) => i + 1;

const addOneYear = u({ age: increment });
const result = addOneYear({ name: "Shannon Barnes", age: 62 });

expect(result).to.eql({ name: "Shannon Barnes", age: 63 });
```

## `u.freeze(dataIn)`

Freeze your initial state to protect against mutations. Only performs the freezing in development, and returns the original object unchanged in production.

```js
const state = u.freeze({ someKey: "Some Value" });
state.someKey = "Mutate"; // ERROR in development
```

## `u.updateIn(dataIn, path, value)`

Update a single value with a simple string or array path. Can be use to update nested objects, arrays, or a combination. Can also be used to update every element of a nested array with `'*'`.

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

## `u.constant(dataIn)`

Sometimes, you want to replace an object outright rather than merging it.
You'll need to use a function that returns the new object.
`u.constant` creates that function for you.

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

## `u.if(dataIn, predicate, updates)`

Apply `updates` if `predicate` is truthy, or if `predicate` is a function.
It evaluates to truthy when called with `object`.

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

## `u.filter(arrayIn, predicate)`

## `u.reject(arrayIn, predicate)`

## `u.pickBy(objectIn, predicate)`

## `u.omitBy(objectIn, predicate)`

## `u.pick(objectIn, keys)`

## `u.omit(objectIn, keys)`

Essentially the same as their Remeda counterparts. The difference being
that if the transformation results in no change, the original object/array is
returned.

## `u.matches(dataIn, condition)`

Do a deep comparison with `condition`, and returns
`true` if the `dataIn` object matches.

Scalar values are verified for equality (i.e., `{foo: 12}`
will verify that the object has the prop `foo` set to `12`), and
functions are going to be invoked with the object value of the object and
expected to return `true` upon matching.

```js
u.matches(
  { name: "Bob", age: 32, address: "..." },
  {
    name: "Bob",
    age: (age) => age > 30,
  }
); // true
```
