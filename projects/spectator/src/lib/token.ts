import { InjectionToken } from '@angular/core';

/**
 * Type for classes that can be used as tokens for injection. We might be inclined to use Angular's `Type<T>` interface for this, however,
 * that interface cannot be used for abstract classes, which are also valid tokens. The `InjectableType<T>` supports both abstract and
 * concrete classes and thus is a more accurate definition of a class type which can be used for injection.
 */
export type InjectableType<T> = Function & { prototype: T };

/** Type representing valid typesafe token types for provider binding. */
export type Token<T> = InjectableType<T> | InjectionToken<T>;
