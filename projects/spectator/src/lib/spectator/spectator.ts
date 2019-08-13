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

  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(type) as SpyObject<T>;
    }

    return super.get(type);
  }

  public detectChanges(): void {
    this.fixture.detectChanges();
  }

  public detectComponentChanges(): void {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }

  public query<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  public query<R>(directive: Type<R>): R | null;
  public query<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  public query<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | Element | null {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector);
    }

    return getChildren<R>(this.debugElement)(directiveOrSelector, options)[0] || null;
  }

  public queryAll<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  public queryAll<R>(directive: Type<R>): R[];
  public queryAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  public queryAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] | Element[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector));
    }

    return getChildren<R>(this.debugElement)(directiveOrSelector, options);
  }

  public queryLast<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  public queryLast<R>(directive: Type<R>): R | null;
  public queryLast<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  public queryLast<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | Element | null {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector);
    }
    const result = getChildren<R>(this.debugElement)(directiveOrSelector, options);
    if (result && result.length) {
      return result[result.length - 1];
    }

    return null;
  }

  public setInput<K extends keyof C>(input: Partial<C>): void;
  public setInput<K extends keyof C>(input: K, inputValue: C[K]): void;
  public setInput<K extends keyof C>(input: Partial<C> | K, value?: C[K]): void {
    setComponentProps(this.component, input, value);
    this.detectComponentChanges();
  }

  public output<T, K extends keyof C = keyof C>(output: K): Observable<T> {
    const observable = this.component[output];

    if (!(observable instanceof Observable)) {
      throw new Error(`${output} is not an @Output`);
    }

    return observable as Observable<T>;
  }

  public click(selector: SpectatorElement): void {
    const element = this.getNativeElement(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot click: ${selector} is not a HTMLElement`);
    }

    element.click();
    this.detectChanges();
  }

  public blur(selector: SpectatorElement): void {
    const element = this.getNativeElement(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot blur: ${selector} is not a HTMLElement`);
    }

    patchElementFocus(element);
    element.blur();
    this.detectChanges();
  }

  public focus(selector: SpectatorElement): void {
    const element = this.getNativeElement(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot focus: ${selector} is not a HTMLElement`);
    }

    patchElementFocus(element);
    element.focus();
    this.detectChanges();
  }

  public dispatchMouseEvent(
    selector: SpectatorElement,
    type: string,
    x: number = 0,
    y: number = 0,
    event: MouseEvent = createMouseEvent(type, x, y)
  ): MouseEvent {
    const element = this.getNativeElement(selector);

    if (!(element instanceof Node)) {
      throw new Error(`Cannot dispatch mouse event: ${selector} is not a node`);
    }

    const dispatchedEvent = dispatchMouseEvent(element, type, x, y, event);
    this.detectChanges();

    return dispatchedEvent;
  }

  public dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyCode: number, target?: Element): KeyboardEvent;
  public dispatchKeyboardEvent(selector: SpectatorElement, type: string, key: string, target?: Element): KeyboardEvent;
  public dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyOrKeyCode: string | number, target?: Element): KeyboardEvent {
    const element = this.getNativeElement(selector);

    if (!(element instanceof Node)) {
      throw new Error(`Cannot dispatch keyboard event: ${selector} is not a node`);
    }

    const event = dispatchKeyboardEvent(element, type, keyOrKeyCode, target);

    this.detectChanges();

    return event;
  }

  public dispatchFakeEvent(selector: SpectatorElement, type: string, canBubble?: boolean): Event {
    const event = dispatchFakeEvent(this.getNativeElement(selector), type, canBubble);
    this.detectChanges();

    return event;
  }

  public get keyboard(): any {
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

  public dispatchTouchEvent(selector: SpectatorElement, type: string, x: number = 0, y: number = 0): void {
    dispatchTouchEvent(this.getNativeElement(selector), type, x, y);
    this.detectChanges();
  }

  public typeInElement(value: string, selector: SpectatorElement): void {
    typeInElement(value, this.getNativeElement(selector));
    this.detectChanges();
  }

  private getNativeElement(selector: SpectatorElement): HTMLElement | Window | Document {
    let element;

    // Support global objects window and document
    if (selector === window || selector === document) {
      return selector;
    }

    if (isString(selector)) {
      const exists = this.debugElement.query(By.css(selector));
      if (exists) {
        element = exists.nativeElement;
      } else {
        // tslint:disable:no-console
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
