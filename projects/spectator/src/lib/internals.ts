import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef, DebugElement, ElementRef, Type } from '@angular/core';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from './dispatch-events';
import { createMouseEvent } from './event-objects';
import { typeInElement } from './type-in-element';
import { patchElementFocus } from './element-focus';
import { Observable } from 'rxjs';
import { SpyObject } from './mock';
import { DOMSelector } from './dom-selectors';
import { Token } from './token';
import { isString, QueryOptions, QueryType, SpectatorElement } from '@netbasal/spectator';

const KEY_UP = 'keyup';

export class Spectator<Component> {
  fixture: ComponentFixture<Component>;
  component: Component;
  element: Element;
  debugElement: DebugElement;

  get<R extends T, T = any>(type: Token<T>, fromComponentInjector = false): R & SpyObject<R> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(type) as R & SpyObject<R>;
    }
    return TestBed.get(type);
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

  query<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R;
  query<R>(directive: Type<R>): R;
  query<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R;
  query<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector) as any;
    }
    return _getChildren<R>(this.debugElement)(directiveOrSelector, options)[0] || null;
  }

  queryAll<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  queryAll<R>(directive: Type<R>): R[];
  queryAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  queryAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector)) as any[];
    }
    return _getChildren<R>(this.debugElement)(directiveOrSelector, options);
  }

  queryLast<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R;
  queryLast<R>(directive: Type<R>): R;
  queryLast<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R;
  queryLast<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector) as any;
    }
    const result = _getChildren<R>(this.debugElement)(directiveOrSelector, options);
    if (result && result.length) {
      return result[result.length - 1];
    }
    return null;
  }

  setInput<K extends keyof Component>(input: Partial<Component>);
  setInput<K extends keyof Component>(input: K, inputValue: Component[K]);
  setInput<K extends keyof Component>(input: Partial<Component> | K, inputValue?: Component[K]) {
    _setInput(input, inputValue, this.component);
    this.detectComponentChanges();
  }

  output<T, K extends keyof Component = keyof Component>(output: K): Observable<T> {
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
    let element = this.getNativeElement(selector);
    patchElementFocus(element as HTMLElement);
    element.blur();
    this.detectChanges();
  }

  focus(selector: SpectatorElement) {
    let element = this.getNativeElement(selector);
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

export function _getChildren<R>(debugElementRoot: DebugElement) {
  return function(directiveOrSelector: QueryType, options: QueryOptions<R> = { root: false, read: undefined }): R[] {
    if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement) as any[];
    }

    let debugElements = debugElementRoot.queryAll(isString(directiveOrSelector) ? By.css(directiveOrSelector) : By.directive(directiveOrSelector));

    if (options.read) {
      return debugElements.map(debug => debug.injector.get(options.read));
    } else if (isString(directiveOrSelector)) {
      return debugElements.map(debug => debug.nativeElement);
    } else {
      return debugElements.map(debug => debug.componentInstance);
    }
  };
}

export function _setInput(input, inputValue, component) {
  if (isString(input)) {
    component[input] = inputValue;
  } else {
    for (let p in input) {
      component[p] = input[p];
    }
  }
}
