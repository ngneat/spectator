import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { DOMSelector } from '../dom-selectors';
import { _getChildren, _setInput } from '../internals/query';
import { HostComponent } from '../spectator/host-component';
import { Spectator } from '../spectator/spectator';
import { Token } from '../token';
import { isString, QueryOptions, QueryType } from '../types';

/**
 * @publicApi
 */
export class SpectatorWithHost<C, H = HostComponent> extends Spectator<C> {
  hostComponent: H;
  /** We need a different property when there is an host because it's different type */
  hostFixture: ComponentFixture<H>;
  hostElement: HTMLElement;
  hostDebugElement: DebugElement;

  private _debugElement: DebugElement;
  get debugElement() {
    return this._debugElement || this.hostDebugElement;
  }

  set debugElement(value) {
    this._debugElement = value;
  }

  /**
   * Run detect changes on the host component
   */
  detectChanges() {
    this.hostFixture.detectChanges();
  }

  queryHost<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  queryHost<R>(directive: Type<R>): R | null;
  queryHost<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  queryHost<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | null {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector) as any;
    }

    return _getChildren<R>(this.hostDebugElement)(directiveOrSelector, options)[0] || null;
  }

  queryHostAll<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  queryHostAll<R>(directive: Type<R>): R[];
  queryHostAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  queryHostAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector)) as any[];
    }

    return _getChildren<R>(this.hostDebugElement)(directiveOrSelector, options);
  }

  setHostInput<K extends keyof H>(input: Partial<H>);
  setHostInput<K extends keyof H>(input: K, inputValue: H[K]);
  setHostInput<K extends keyof H>(input: Partial<H> | K, inputValue?: H[K]) {
    _setInput(input, inputValue, this.hostComponent);
    this.hostFixture.detectChanges();
  }
}
