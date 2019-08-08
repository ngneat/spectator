import { DebugElement, ElementRef, Type } from '@angular/core';

import { DOMSelector } from './dom-selectors';
import { Token } from './token';

type OptionalPropertyNames<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];
type OptionalProperties<T> = Pick<T, OptionalPropertyNames<T>>;

export type OptionalsRequired<T> = Required<OptionalProperties<T>>;

export type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;

export type QueryType = Type<any> | DOMSelector | string;
export interface QueryOptions<R> {
  read?: Token<R>;
  root?: boolean;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}
