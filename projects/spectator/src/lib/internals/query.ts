import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DOMSelector } from '../dom-selectors';
import { isString, QueryOptions, QueryType } from '../types';

export function getChildren<R>(debugElementRoot: DebugElement): (directiveOrSelector: QueryType, options?: QueryOptions<R>) => R[] {
  return (directiveOrSelector: QueryType, options: QueryOptions<R> = { root: false, read: undefined }): R[] => {
    if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement) as any[];
    }

    const debugElements = debugElementRoot.queryAll(
      isString(directiveOrSelector) ? By.css(directiveOrSelector) : By.directive(directiveOrSelector)
    );

    if (options.read) {
      return debugElements.map(debug => debug.injector.get(options.read));
    }

    if (isString(directiveOrSelector)) {
      return debugElements.map(debug => debug.nativeElement);
    }

    return debugElements.map(debug => debug.componentInstance);
  };
}

export function setProps(instance: any, key: any, value: any): void;
export function setProps(instance: any, keyValues: any): void;
export function setProps(instance: any, keyOrKeyValues: any, value?: any): void {
  if (isString(keyOrKeyValues)) {
    instance[keyOrKeyValues] = value;
  } else {
    // tslint:disable-next-line:forin
    for (const p in keyOrKeyValues) {
      instance[p] = keyOrKeyValues[p];
    }
  }
}
