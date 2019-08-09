import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DOMSelector } from '../dom-selectors';
import { isString, QueryOptions, QueryType } from '../types';

export function getChildren<R>(debugElementRoot: DebugElement) {
  return function(directiveOrSelector: QueryType, options: QueryOptions<R> = { root: false, read: undefined }): R[] {
    if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement) as any[];
    }

    const debugElements = debugElementRoot.queryAll(isString(directiveOrSelector) ? By.css(directiveOrSelector) : By.directive(directiveOrSelector));

    if (options.read) {
      return debugElements.map(debug => debug.injector.get(options.read));
    } else if (isString(directiveOrSelector)) {
      return debugElements.map(debug => debug.nativeElement);
    } else {
      return debugElements.map(debug => debug.componentInstance);
    }
  };
}

export function setComponentProps(component: any, key: any, value: any);
export function setComponentProps(component: any, keyValues: any);
export function setComponentProps(component: any, keyOrKeyValues: any, value?: any) {
  if (isString(keyOrKeyValues)) {
    component[keyOrKeyValues] = value;
  } else {
    // tslint:disable-next-line:forin
    for (const p in keyOrKeyValues) {
      component[p] = keyOrKeyValues[p];
    }
  }
}
