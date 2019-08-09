import { ChangeDetectorRef, DebugElement, ElementRef, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { BaseSpectator } from '../base/base-spectator';
import { DOMSelector } from '../dom-selectors';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from '../internals/dispatch-events';
import { patchElementFocus } from '../internals/element-focus';
import { createMouseEvent } from '../internals/event-objects';
import { getChildren, setComponentProps } from '../internals/query';
import { typeInElement } from '../internals/type-in-element';
import { SpyObject } from '../mock';
import { Token } from '../token';
import { isString, QueryOptions, QueryType, SpectatorElement } from '../types';

const KEY_UP = 'keyup';

/**
 * @publicApi
 */
export class Spectator<C> extends BaseSpectator {
  constructor(public fixture: ComponentFixture<any>, public debugElement: DebugElement, public component: C, public element: Element) {
    super();
  }

  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(type) as SpyObject<T>;
    }

    return super.get(type);
  }

  detectChanges() {
    this.fixture.detectChanges();
  }

  detectComponentChanges() {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }

  query<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  query<R>(directive: Type<R>): R | null;
  query<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  query<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | null {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector) as any;
    }
    return getChildren<R>(this.debugElement)(directiveOrSelector, options)[0] || null;
  }

  queryAll<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  queryAll<R>(directive: Type<R>): R[];
  queryAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  queryAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector)) as any[];
    }
    return getChildren<R>(this.debugElement)(directiveOrSelector, options);
  }

  queryLast<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  queryLast<R>(directive: Type<R>): R | null;
  queryLast<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  queryLast<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | null {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector) as any;
    }
    const result = getChildren<R>(this.debugElement)(directiveOrSelector, options);
    if (result && result.length) {
      return result[result.length - 1];
    }
    return null;
  }

  setInput<K extends keyof C>(input: Partial<C>);
  setInput<K extends keyof C>(input: K, inputValue: C[K]);
  setInput<K extends keyof C>(input: Partial<C> | K, value?: C[K]) {
    setComponentProps(this.component, input, value);
    this.detectComponentChanges();
  }

  output<T, K extends keyof C = keyof C>(output: K): Observable<T> {
    const observable = this.component[output];
    if (observable instanceof Observable) {
      return observable as Observable<T>;
    } else {
      throw new Error(`${output} is not an @Output`);
    }
  }

  click(selector: SpectatorElement) {
    const element = this.getNativeElement(selector);
    element.click();
    this.detectChanges();
  }

  blur(selector: SpectatorElement) {
    const element = this.getNativeElement(selector);
    patchElementFocus(element as HTMLElement);
    element.blur();
    this.detectChanges();
  }

  focus(selector: SpectatorElement) {
    const element = this.getNativeElement(selector);
    patchElementFocus(element as HTMLElement);
    element.focus();
    this.detectChanges();
  }

  dispatchMouseEvent(selector: SpectatorElement, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    const _event = dispatchMouseEvent(this.getNativeElement(selector), type, x, y, event);
    this.detectChanges();
    return _event;
  }

  dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyCode: number, target?: Element): KeyboardEvent;
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, key: string, target?: Element): KeyboardEvent;
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyOrKeyCode: string | number, target?: Element): KeyboardEvent {
    const _event = dispatchKeyboardEvent(this.getNativeElement(selector), type, keyOrKeyCode, target);
    this.detectChanges();
    return _event;
  }

  dispatchFakeEvent(selector: SpectatorElement, type: string, canBubble?: boolean): Event {
    const _event = dispatchFakeEvent(this.getNativeElement(selector), type, canBubble);
    this.detectChanges();
    return _event;
  }

  get keyboard() {
    return {
      pressKey: (key: string, selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, key);
      },
      pressEscape: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, 'Escape');
      },
      pressEnter: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, 'Enter');
      },
      pressTab: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, 'Tab');
      },
      pressBackspace: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, 'Backspace');
      }
    };
  }

  dispatchTouchEvent(selector: SpectatorElement, type: string, x = 0, y = 0) {
    const _event = dispatchTouchEvent(this.getNativeElement(selector), type, x, y);
    this.detectChanges();
    return _event;
  }

  typeInElement(value: string, selector: SpectatorElement) {
    const _event = typeInElement(value, this.getNativeElement(selector));
    this.detectChanges();
    return _event;
  }

  private getNativeElement(selector: SpectatorElement) {
    let element;

    /** Support global objects window and document **/
    if (selector === window || selector === document) {
      return selector;
    }

    if (isString(selector)) {
      const exists = this.debugElement.query(By.css(selector));
      if (exists) {
        element = exists.nativeElement;
      } else {
        console.error(`${selector} does not exists`);
      }
    } else {
      if (selector instanceof DebugElement || selector instanceof ElementRef) {
        element = selector.nativeElement;
      } else {
        element = selector;
      }
    }

    return element;
  }
}
