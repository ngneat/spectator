import { DebugElement, ElementRef, Type } from '@angular/core';

import { DOMSelector } from './dom-selectors';
import { Token } from './token';

type OptionalPropertyNames<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];
type OptionalProperties<T> = Pick<T, OptionalPropertyNames<T>>;

export type OptionalsRequired<T> = Required<OptionalProperties<T>> & Partial<T>;

export type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;

export type QueryType = Type<any> | DOMSelector | string;
export interface QueryOptions<R> {
  read?: Token<R>;
  root?: boolean;
}

export type SelectOptions = string | string[] | HTMLOptionElement | HTMLOptionElement[];

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

export function isHTMLOptionElementArray(value: any): value is HTMLOptionElement[] {
  return Array.isArray(value) && !!value.length && value.every(item => item instanceof HTMLOptionElement);
}

export function isObject(v: any): v is object {
  return v && typeof v === 'object';
}
