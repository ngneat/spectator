import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { _getChildren, _setInput, Spectator } from '../spectator/spectator';
import { DOMSelector } from '../dom-selectors';
import { Token } from '../token';
import { HostComponent } from '../spectator/host-component';
import { isString, QueryOptions, QueryType } from '../types';

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

  queryHost<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R;
  queryHost<R>(directive: Type<R>): R;
  queryHost<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R;
  queryHost<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R {
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

  getDirectiveInstance<T>(directive: Type<T>, all?: false): T;
  getDirectiveInstance<T>(directive: Type<T>, all?: true): T[];
  getDirectiveInstance<T>(directive: Type<T>, all = false): T | T[] {
    if (all) {
      return this.hostFixture.debugElement.queryAll(By.directive(directive)).map(d => d.injector.get(directive));
    }

    return this.hostFixture.debugElement.query(By.directive(directive)).injector.get(directive);
  }
}
