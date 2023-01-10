# updeep-remeda

> Easily update nested frozen objects and arrays in a declarative and immutable
> manner.

## About

This is a fork of the main [updeep](github.com/substantial/updeep) package.

updeep makes updating deeply nested objects/arrays painless by allowing you to
declare the updates you would like to make and it will take care of the rest. It
will recursively return the same instance if no changes have been made, making
it ideal for using reference equality checks to detect changes.

Full documentation can be found at [https://yanick.github.io/updeep-remeda/index.html](https://yanick.github.io/updeep-remeda/index.html).
