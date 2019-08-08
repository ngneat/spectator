import { DebugElement, ElementRef, Provider, Type } from '@angular/core';
import { DOMSelector, Token } from '@netbasal/spectator';

export type HashMap<T = any> = { [key: string]: T };

export interface CreateComponentOptions<Component> {
  detectChanges?: boolean;
  providers?: Provider[];
  props?: Partial<Component> & HashMap;
}

export type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;

export type QueryType = Type<any> | DOMSelector | string;
export type QueryOptions<R> = { read?: Token<R>; root?: boolean };

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}
