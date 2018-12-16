import { Type } from '@angular/core';

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}
