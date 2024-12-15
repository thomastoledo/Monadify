export interface Maybe<T> {
    isEmpty: boolean;
    map<U>(fn: (value: T) => U): Maybe<U>;
    flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U>;
    getOrElse(defaultValue: T): T;
    forEach(fn: (value: T) => void): void;
  }
  
  export class Some<T> implements Maybe<T> {
    readonly isEmpty = false;
  
    constructor(private readonly value: T) {}
  
    map<U>(fn: (value: T) => U): Maybe<U> {
      return new Some(fn(this.value));
    }
  
    flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
      return fn(this.value);
    }
  
    getOrElse(defaultValue: T): T {
      return this.value ?? defaultValue;
    }
  
    forEach(fn: (value: T) => void): void {
      fn(this.value);
    }
  }
  
  export class None<T> implements Maybe<T> {
    readonly isEmpty = true;
  
    map<U>(_: (value: T) => U): Maybe<U> {
      return new None<U>();
    }
  
    flatMap<U>(_: (value: T) => Maybe<U>): Maybe<U> {
      return new None<U>();
    }
  
    getOrElse(defaultValue: T): T {
      return defaultValue;
    }
  
    forEach(_: (value: T) => void): void {}
  }
  
  export function maybe<T>(value: T | null | undefined): Maybe<T> {
    return value != null ? new Some(value) : new None<T>();
  }
