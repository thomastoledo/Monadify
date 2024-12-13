# Pelouse - Library for Working with Optional Values in TypeScript

`pelouse` is a TypeScript library that provides a `Maybe` monad, a powerful abstraction for working with optional or nullable values. This library helps you avoid common pitfalls when dealing with `null` or `undefined` values by offering safe, functional ways to handle them. With `Maybe`, you can map, chain, and transform values without worrying about runtime errors due to null or undefined.

## Features

- **`Maybe`**: A container for a value that may or may not exist.
- **`Some`**: Represents a non-empty value.
- **`None`**: Represents a missing or `null`/`undefined` value.
- **Safe Operations**: Methods like `map`, `flatMap`, and `getOrElse` help to safely handle the value inside the container.
- **Functional**: Supports functional programming patterns to transform and chain computations without side effects.

## Install

You can install the library using npm:

```bash
npm install pelouse
```

## API

### `Maybe<T>`

The core interface representing a container that might be empty (`None`) or contain a value (`Some`). It provides several methods for working with the value safely.

#### Properties

- **`isEmpty`**: A boolean indicating whether the container is empty (`None`) or contains a value (`Some`).

#### Methods

- **`map<U>(fn: (value: T) => U): Maybe<U>`**: Transforms the contained value with a given function `fn`, returning a new `Maybe` instance. If the container is empty (`None`), the operation does nothing and returns `None`.

- **`flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U>`**: Similar to `map`, but the function `fn` must return a new `Maybe<U>`. Useful for chaining operations that can potentially return `Maybe` values.

- **`getOrElse(defaultValue: T): T`**: Returns the contained value if present; otherwise, returns the provided `defaultValue`.

- **`forEach(fn: (value: T) => void): void`**: Executes a side effect function `fn` on the contained value if present. Does nothing if the container is empty.

### `Some<T>`

A class that implements the `Maybe` interface and represents a container that holds a non-empty value.

#### Constructor

- **`constructor(value: T)`**: Initializes a `Some` instance with a value.

### `None<T>`

A class that implements the `Maybe` interface and represents a container that holds no value (i.e., `null` or `undefined`).

### `maybe<T>(value: T | null | undefined): Maybe<T>`

A helper function that wraps a value in a `Maybe` container. If the value is `null` or `undefined`, it returns `None`. Otherwise, it returns `Some` with the value.

## Use Cases

### 1. Handling Nullable Values Safely

The primary use case of `Maybe` is to provide a safe and functional way to deal with `null` or `undefined` values. This is especially useful when interacting with APIs or legacy code that might return nullable values.

#### Example

```typescript
import { maybe } from 'pelouse';

const value: string | null = getValueFromApi();

// Safely map the value to uppercase if it's not null
const result = maybe(value)
  .map(v => v.toUpperCase())
  .getOrElse('DEFAULT VALUE');

console.log(result); // 'DEFAULT VALUE' if value was null
```

In this example, the `map` operation ensures that the value is transformed only if it's present (`Some`). If the value is `null` or `undefined`, the `getOrElse` method provides a default value.

### 2. Chaining Transformations

You can chain multiple operations that might return nullable values using `flatMap`. This is particularly useful when performing operations that could fail or return null.

#### Example

```typescript
import { maybe } from 'pelouse';

const findUser = (id: number) => id === 1 ? maybe({ name: 'John' }) : maybe(null);
const getUserProfile = (user: { name: string }) => user.name === 'John' ? maybe({ profile: 'Developer' }) : maybe(null);

const userProfile = maybe(1)
  .flatMap(findUser)
  .flatMap(getUserProfile)
  .getOrElse({ profile: 'Guest' });

console.log(userProfile); // { profile: 'Developer' }
```

In this example, we chain operations (`findUser` and `getUserProfile`) that could return `None`. The `flatMap` ensures that each step is only performed if the previous one was successful.

### 3. Conditional Execution

Use `forEach` to execute side effects on the contained value when it's present, without worrying about `null` checks.

#### Example

```typescript
import { maybe } from 'pelouse';

const value: string | null = getValueFromApi();

maybe(value).forEach(v => console.log(v)); // Logs the value if present, nothing if null
```

### 4. Providing Defaults

`getOrElse` is useful when you want to provide a fallback value when the container is empty.

#### Example

```typescript
import { maybe } from 'pelouse';

const value: number | null = getValueFromApi();

const result = maybe(value).getOrElse(42);
console.log(result); // 42 if value was null
```

## Benefits

- **Safety**: Helps to avoid runtime errors caused by `null` or `undefined` values.
- **Functional Programming**: Supports functional paradigms like `map`, `flatMap`, and `getOrElse`.
- **Composition**: Enables chaining of operations on optional values in a readable and maintainable way.

## Conclusion

The `pelouse` library provides a clean and functional way to handle optional values in TypeScript. By using the `Maybe` monad, you can eliminate common issues related to `null` and `undefined`, making your code more robust and easier to maintain. Whether you're working with data from APIs or handling optional user inputs, `pelouse` helps you handle nullable values with elegance.