import { ChangeDetectorRef, DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { DOMSelector } from '../dom-selectors';
import { getChildren, setHostProps } from '../internals/query';
import { Token } from '../token';
import { QueryOptions, QueryType, isString } from '../types';

import { DomSpectator } from '../base/dom-spectator';
import { SpyObject } from '../mock';
import { HostComponent } from './host-component';

/**
 * @publicApi
 */
export class SpectatorHost<C, H = HostComponent> extends DomSpectator<C> {
  constructor(
    public hostComponent: H,
    public hostDebugElement: DebugElement,
    public hostElement: Element,
    public hostFixture: ComponentFixture<any>,
    public debugElement: DebugElement,
    componentInstance: C,
    public element: HTMLElement,
  ) {
    super(hostFixture, debugElement, componentInstance, element);
  }

  public get component(): C {
    return this.instance;
  }

  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(token) as SpyObject<T>;
    }

    return super.inject(token);
  }

  public detectComponentChanges(): void {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }

  public queryHost<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  public queryHost<R>(directive: Type<R>): R | null;
  public queryHost<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  public queryHost<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | Element | null {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector);
    }

    return getChildren<R>(this.hostDebugElement)(directiveOrSelector, options)[0] || null;
  }

  public queryHostAll<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  public queryHostAll<R>(directive: Type<R>): R[];
  public queryHostAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  public queryHostAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] | Element[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector));
    }

    return getChildren<R>(this.hostDebugElement)(directiveOrSelector, options);
  }

  public setHostInput<K extends keyof H>(input: H extends HostComponent ? any : Partial<H>): void;
  public setHostInput<K extends keyof H>(input: H extends HostComponent ? any : K, inputValue: H extends HostComponent ? any : H[K]): void;
  public setHostInput(input: any, value?: any): void {
    setHostProps(this.fixture.componentRef, input, value);
    this.detectChanges();
  }
}
