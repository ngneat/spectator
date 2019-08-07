import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef, Type, ChangeDetectorRef } from '@angular/core';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from './dispatch-events';
import { createMouseEvent } from './event-objects';
import { typeInElement } from './type-in-element';
import { patchElementFocus } from './element-focus';
import { Observable } from 'rxjs';
import { SpyObject } from './mock';
import { DOMSelector } from './dom-selectors';
import { Token } from './token';

declare const require: Function;
const $ = require('jquery');

export type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;

const KEY_UP = 'keyup';

export class Spectator<Component> {
  fixture: ComponentFixture<Component>;
  component: Component;
  element: HTMLElement | Node | any;
  debugElement: DebugElement;

  get<T = any>(type: Token<T>, fromComponentInjector = false): T & SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(type) as T & SpyObject<T>;
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

  query<R extends Element>(selector: string | DOMSelector): R;
  query<R>(directive: Type<R>): R;
  query<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R;
  query<R>(directiveOrSelector: Type<any> | DOMSelector | string, options: { read: Token<R> } = { read: undefined }): R {
    return _getChild<R>(this.debugElement)(directiveOrSelector, options);
  }

  queryAll<R extends Element[]>(selector: string | DOMSelector): R;
  queryAll<R>(directive: Type<R>): R[];
  queryAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  queryAll<R>(directiveOrSelector: Type<any> | DOMSelector | string, options: { read: Token<R> } = { read: undefined }): R[] {
    return _getChildren<R>(this.debugElement)(directiveOrSelector, options);
  }

  queryLast<R extends Element>(selector: string | DOMSelector): R;
  queryLast<R>(directive: Type<R>): R;
  queryLast<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R;
  queryLast<R>(directiveOrSelector: Type<R> | DOMSelector | string, options: { read: Token<R> } = { read: undefined }): R {
    const result = _getChildren<R>(this.debugElement)(directiveOrSelector, options);
    if (result && result.length) {
      return result[result.length - 1];
    }
    return null;
  }

  $$(selector) {
    return $(selector);
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
      throw new Error(`${output} in not an @Output`);
    }
  }

  click(selector: SpectatorElement = this.element) {
    const element = this.getNativeElement(selector);
    element.click();
    this.detectChanges();
  }

  private getNativeElement(selector: SpectatorElement | Window | Document) {
    let element;

    /** Support global objects window and document **/
    if (selector === window || selector === document) {
      return selector;
    }

    if (typeof selector === 'string') {
      const checkExists = this.debugElement.query(By.css(selector));
      if (checkExists) {
        element = checkExists.nativeElement;
      } else {
        throw new Error(`${selector} does not exists`);
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

  dispatchMouseEvent(selector: SpectatorElement = this.element, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    const _event = dispatchMouseEvent(this.getNativeElement(selector), type, x, y, event);
    this.detectChanges();
    return _event;
  }

  dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyCode: number, target?: Element): KeyboardEvent;
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, key: string, target?: Element): KeyboardEvent;
  dispatchKeyboardEvent(selector: SpectatorElement = this.element, type: string, keyOrKeyCode: string | number, target?: Element): KeyboardEvent {
    const _event = dispatchKeyboardEvent(this.getNativeElement(selector), type, keyOrKeyCode, target);
    this.detectChanges();
    return _event;
  }

  dispatchFakeEvent(selector: SpectatorElement | Window = this.element, type: string, canBubble?: boolean): Event {
    const _event = dispatchFakeEvent(this.getNativeElement(selector), type, canBubble);
    this.detectChanges();
    return _event;
  }

  get keyboard() {
    return {
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

  dispatchTouchEvent(selector: SpectatorElement = this.element, type: string, x = 0, y = 0) {
    const _event = dispatchTouchEvent(this.getNativeElement(selector), type, x, y);
    this.detectChanges();
    return _event;
  }

  typeInElement(value: string, selector: SpectatorElement = this.element) {
    const _event = typeInElement(value, this.getNativeElement(selector));
    this.detectChanges();
    return _event;
  }

  patchElementFocus(element: HTMLElement) {
    patchElementFocus(element);
    this.detectChanges();
  }
}

export function _getChild<R>(debugElementRoot: DebugElement) {
  return function(directiveOrSelector: Type<R> | DOMSelector | string, options: { read } = { read: undefined }): R {
    return _getChildren<R>(debugElementRoot)(directiveOrSelector, options)[0] || null;
  };
}

export function _getChildren<R>(debugElementRoot: DebugElement) {
  return function(directiveOrSelector: Type<R> | DOMSelector | string, options: { read } = { read: undefined }): R[] {
    if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement) as any[];
    }

    let debugElements: DebugElement[];

    if (typeof directiveOrSelector === 'string') {
      debugElements = debugElementRoot.queryAll(By.css(directiveOrSelector));
    } else {
      debugElements = debugElementRoot.queryAll(By.directive(directiveOrSelector));
    }

    if (options.read) {
      return debugElements.map(debug => debug.injector.get(options.read));
    } else if (typeof directiveOrSelector === 'string') {
      return debugElements.map(debug => debug.nativeElement);
    } else {
      return debugElements.map(debug => debug.componentInstance);
    }
  };
}

export function _setInput(input, inputValue, component) {
  if (typeof input === 'string') {
    component[input] = inputValue;
  } else {
    for (let p in input) {
      component[p] = input[p];
    }
  }
}
