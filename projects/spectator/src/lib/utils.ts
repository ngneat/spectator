import { Type, ɵisStandalone } from '@angular/core';
import { ModuleMetadata } from './base/initial-module';

export function isRunningInJsDom() {
  return navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom');
}

export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function declareInModule<T>(moduleMetadata: ModuleMetadata, type: Type<T>) {
  if (ɵisStandalone(type)) {
    moduleMetadata.imports.push(type);
  } else {
    moduleMetadata.declarations.push(type);
  }
}
