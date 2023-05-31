# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. The line `crypto.createHash(algorithm).update(value).digest(encoding)` was repeated more than once. So, a generic function `createEncoding` was created which does the same. It also ensures that the value passed to `update` is a string, so, if value is not, it is stringified prior to being hashed.

2. `candidate` will have a default value of "0".

3. If `event` is passed to the function, then for all cases where event is not an object or it is an object with `partitionKey` set to undefined or an empty string, event will be encoded. If `partitionKey` is defined, then `candidate` will be set to the same.
