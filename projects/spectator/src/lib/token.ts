import { InjectionToken, AbstractType, Type, ProviderToken } from '@angular/core';

/** Type representing valid typesafe token types for provider binding. */
export type Token<T> = Type<T> | InjectionToken<T> | AbstractType<T> | ProviderToken<T>;
