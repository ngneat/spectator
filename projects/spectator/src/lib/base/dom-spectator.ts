import { ChangeDetectorRef, DebugElement, ElementRef, Type, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Token } from '../token';
import { DOMSelector } from '../dom-selectors';
import { isString, QueryOptions, QueryType, SpectatorElement, EventEmitterType, KeysMatching, KeyboardEventOptions } from '../types';
import { SpyObject } from '../mock';
import { getChildren, setProps } from '../internals/query';
import { patchElementFocus } from '../internals/element-focus';
import { createMouseEvent } from '../internals/event-objects';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from '../dispatch-events';
import { typeInElement } from '../type-in-element';
import { selectOption } from '../select-option';

import { BaseSpectator } from './base-spectator';

const KEY_UP = 'keyup';

/**
 * @internal
 */
export abstract class DomSpectator<I> extends BaseSpectator {
  constructor(public fixture: ComponentFixture<any>, public debugElement: DebugElement, protected instance: I, public element: Element) {
    super();
  }

  public inject<T>(token: Token<T>): SpyObject<T> {
    return super.inject(token);
  }

  public detectChanges(): void {
    this.fixture.detectChanges();
  }

  public query<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  public query<R>(directive: Type<R>): R | null;
  public query<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  public query<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | Element | null {
    if ((options || {}).root) {
      if (isString(directiveOrSelector)) {
        return document.querySelector(directiveOrSelector);
      }

      if (directiveOrSelector instanceof DOMSelector) {
        return directiveOrSelector.execute(document as any)[0] || null;
      }
    }

    return getChildren<R>(this.debugElement)(directiveOrSelector, options)[0] || null;
  }

  public queryAll<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  public queryAll<R>(directive: Type<R>): R[];
  public queryAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  public queryAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] | Element[] {
    if ((options || {}).root) {
      if (isString(directiveOrSelector)) {
        return Array.from(document.querySelectorAll(directiveOrSelector));
      }

      if (directiveOrSelector instanceof DOMSelector) {
        return directiveOrSelector.execute(document as any);
      }
    }

    return getChildren<R>(this.debugElement)(directiveOrSelector, options);
  }

  public queryLast<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R | null;
  public queryLast<R>(directive: Type<R>): R | null;
  public queryLast<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R | null;
  public queryLast<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R | Element | null {
    let result: (R | Element)[] = [];

    if ((options || {}).root) {
      if (isString(directiveOrSelector)) {
        result = Array.from(document.querySelectorAll(directiveOrSelector));
      }

      if (directiveOrSelector instanceof DOMSelector) {
        result = directiveOrSelector.execute(document as any);
      }
    } else {
      result = getChildren<R>(this.debugElement)(directiveOrSelector, options);
    }

    if (result && result.length) {
      return result[result.length - 1];
    }

    return null;
  }

  public setInput<K extends keyof I>(input: Partial<I>): void;
  public setInput<K extends keyof I>(input: K, inputValue: I[K]): void;
  public setInput(input: any, value?: any): void {
    setProps(this.instance, input, value);
    this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
  }

  public output<T, K extends keyof I = keyof I>(output: K): Observable<T> {
    const observable = this.instance[output];

    if (!(observable instanceof Observable)) {
      throw new Error(`${output} is not an @Output`);
    }

    return observable as Observable<T>;
  }

  public tick(millis?: number): void {
    tick(millis);
    this.detectChanges();
  }

  public click(selector: SpectatorElement = this.element): void {
    const element = this.getNativeElement(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot click: ${selector} is not a HTMLElement`);
    }

    element.click();
    this.detectChanges();
  }

  public blur(selector: SpectatorElement = this.element): void {
    const element = this.getNativeElement(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot blur: ${selector} is not a HTMLElement`);
    }

    patchElementFocus(element);
    element.blur();
    this.detectChanges();
  }

  public focus(selector: SpectatorElement = this.element): void {
    const element = this.getNativeElement(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Cannot focus: ${selector} is not a HTMLElement`);
    }

    patchElementFocus(element);
    element.focus();
    this.detectChanges();
  }

  public dispatchMouseEvent(
    selector: SpectatorElement = this.element,
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
  public dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyAndCode: KeyboardEventOptions, target?: Element): KeyboardEvent;
  public dispatchKeyboardEvent(
    selector: SpectatorElement = this.element,
    type: string,
    keyOrKeyCode: string | number | KeyboardEventOptions,
    target?: Element
  ): KeyboardEvent {
    const element = this.getNativeElement(selector);

    if (!(element instanceof Node)) {
      throw new Error(`Cannot dispatch keyboard event: ${selector} is not a node`);
    }

    const event = dispatchKeyboardEvent(element, type, keyOrKeyCode, target);

    this.detectChanges();

    return event;
  }

  public dispatchFakeEvent(selector: SpectatorElement = this.element, type: string, canBubble?: boolean): Event {
    const event = dispatchFakeEvent(this.getNativeElement(selector), type, canBubble);
    this.detectChanges();

    return event;
  }

  public triggerEventHandler<C = any, K extends KeysMatching<C, EventEmitter<any>> = any>(
    directiveOrSelector: Type<C> | string | DebugElement,
    eventName: K,
    eventObj: EventEmitterType<C[K]>
  ) {
    const debugElement = this.getDebugElement(directiveOrSelector);
    if (!debugElement) {
      // tslint:disable:no-console
      console.error(`${directiveOrSelector} does not exists`);
      return;
    }
    debugElement.triggerEventHandler(eventName as string, eventObj);
    this.detectChanges();
  }

  public get keyboard() {
    return {
      pressKey: (key: string, selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, key);
      },
      pressEscape: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, { key: 'Escape', keyCode: 27 });
      },
      pressEnter: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, { key: 'Enter', keyCode: 13 });
      },
      pressTab: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, { key: 'Tab', keyCode: 9 });
      },
      pressBackspace: (selector: SpectatorElement = this.element, event = KEY_UP) => {
        this.dispatchKeyboardEvent(selector, event, { key: 'Backspace', keyCode: 8 });
      }
    };
  }

  public get mouse() {
    return {
      contextmenu: (selector: SpectatorElement = this.element) => {
        this.dispatchMouseEvent(selector, 'contextmenu');
      },
      dblclick: (selector: SpectatorElement = this.element) => {
        this.dispatchMouseEvent(selector, 'dblclick');
      }
    };
  }

  public dispatchTouchEvent(selector: SpectatorElement = this.element, type: string, x: number = 0, y: number = 0): void {
    dispatchTouchEvent(this.getNativeElement(selector), type, x, y);
    this.detectChanges();
  }

  public typeInElement(value: string, selector: SpectatorElement = this.element): void {
    typeInElement(value, this.getNativeElement(selector));
    this.detectChanges();
  }

  public selectOption(
    selector: SpectatorElement = this.element,
    options: string | string[] | HTMLOptionElement | HTMLOptionElement[],
    config: { emitEvents: boolean } = { emitEvents: true }
  ): void {
    if (!selector) {
      throw new Error(`Cannot find select: ${selector}`);
    }
    selectOption(options, this.getNativeElement(selector), config);
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
    } else if (selector instanceof DOMSelector) {
      element = selector.execute(document as any)[0] || null;
    } else {
      if (selector instanceof DebugElement || selector instanceof ElementRef) {
        element = selector.nativeElement;
      } else {
        element = selector;
      }
    }

    return element;
  }

  private getDebugElement(directiveOrSelector: string | DebugElement | Type<unknown>) {
    let debugElement: DebugElement;
    if (isString(directiveOrSelector)) {
      debugElement = this.debugElement.query(By.css(directiveOrSelector));
    } else if (directiveOrSelector instanceof DebugElement) {
      debugElement = directiveOrSelector;
    } else {
      debugElement = this.debugElement.query(By.directive(directiveOrSelector));
    }
    return debugElement;
  }
}
