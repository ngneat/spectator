import { InjectionToken, AbstractType, Type } from '@angular/core';

/** Type representing valid typesafe token types for provider binding. */
export type Token<T> = Type<T> | InjectionToken<T> | AbstractType<T>;
