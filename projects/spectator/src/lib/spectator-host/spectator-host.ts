import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { DOMSelector } from '../dom-selectors';
import { getChildren, setProps } from '../internals/query';
import { Spectator } from '../spectator/spectator';
import { Token } from '../token';
import { isString, QueryOptions, QueryType } from '../types';

import { HostComponent } from './host-component';

/**
 * @deprecated Use SpectatorHost instead. To be removed in v5.
 */
export type SpectatorWithHost<C, H = HostComponent> = SpectatorHost<C, H>;

/**
 * @publicApi
 */
export class SpectatorHost<C, H = HostComponent> extends Spectator<C> {
  constructor(
    public hostComponent: H,
    public hostDebugElement: DebugElement,
    public hostElement: Element,
    public hostFixture: ComponentFixture<any>,
    public debugElement: DebugElement,
    componentInstance: C,
    public element: HTMLElement
  ) {
    super(hostFixture, debugElement, componentInstance, element);
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

  public queryHostAll<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  public queryHostAll<R>(directive: Type<R>): R[];
  public queryHostAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  public queryHostAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] | Element[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector));
    }

    return getChildren<R>(this.hostDebugElement)(directiveOrSelector, options);
  }

  public setHostInput<K extends keyof H>(input: Partial<H>): void;
  public setHostInput<K extends keyof H>(input: K, inputValue: H[K]): void;
  public setHostInput(input: any, value?: any): void {
    setProps(this.hostComponent, input, value);
    this.detectChanges();
  }
}
