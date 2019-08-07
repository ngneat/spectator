import { Provider, Type } from '@angular/core';

export type HashMap<T = any> = { [key: string]: T };

export interface CreateComponentOptions<Component> {
  detectChanges?: boolean;
  providers?: Provider[];
  props?: Partial<Component> & HashMap;
}

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}
