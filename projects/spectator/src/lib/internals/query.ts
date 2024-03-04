import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DOMSelector } from '../dom-selectors';
import { isString, QueryOptions, QueryType } from '../types';

export function getChildren<R>(debugElementRoot: DebugElement): (directiveOrSelector: QueryType, options?: QueryOptions<R>) => R[] {
  return (directiveOrSelector: QueryType, options: QueryOptions<R> = { root: false, read: undefined }): R[] => {
    if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement) as any[];
    }

    const debugElements = debugElementRoot.queryAll(
      isString(directiveOrSelector) ? By.css(directiveOrSelector) : By.directive(directiveOrSelector),
    );

    if (options.read) {
      return debugElements.map((debug) => debug.injector.get(options.read));
    }

    if (isString(directiveOrSelector)) {
      return debugElements.map((debug) => debug.nativeElement);
    }

    return debugElements.map((debug) => debug.injector.get(directiveOrSelector));
  };
}

/**
 * @internal
 * Set props on a component. This is used in `createComponent` and `createRoutingFactory` since we have direct access to the componentRef.
 */
export function setProps<T, K extends string | number | symbol, V>(componentRef: ComponentRef<T>, key: K, value: V): T & { [KEY in K]: V };
export function setProps<T, KV>(componentRef: ComponentRef<T>, keyValues?: KV): T & KV;
export function setProps(componentRef: ComponentRef<any>, keyOrKeyValues: any, value?: any): any {
  if (isString(keyOrKeyValues)) {
    componentRef.setInput(keyOrKeyValues, value);
  } else {
    // eslint-disable-next-line guard-for-in
    for (const p in keyOrKeyValues) {
      componentRef.setInput(p, keyOrKeyValues[p]);
    }
  }

  return componentRef.instance;
}

/**
 * @internal
 * Set props on a host component. This is used in `createHostFactory`, `createDirectiveFactory` and `createPipeFactory`.
 * As these factories contain a custom host component, we set properties on this host component rather than the tested component itself.
 * Setting props on the component that's being tested is not possible as we don't have access to its componentRef.
 */
export function setHostProps<T, K extends string | number | symbol, V>(
  componentRef: ComponentRef<T>,
  key: K,
  value: V,
): T & { [KEY in K]: V };
export function setHostProps<T, KV>(componentRef: ComponentRef<T>, keyValues?: KV): T & KV;
export function setHostProps(componentRef: ComponentRef<any>, keyOrKeyValues: any, value?: any): any {
  if (isString(keyOrKeyValues)) {
    componentRef.instance[keyOrKeyValues] = value;
  } else {
    // eslint-disable-next-line guard-for-in
    for (const p in keyOrKeyValues) {
      componentRef.instance[p] = keyOrKeyValues[p];
    }
  }

  return componentRef.instance;
}
