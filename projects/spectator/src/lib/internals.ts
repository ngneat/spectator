/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef, InjectionToken, Type, ChangeDetectorRef } from '@angular/core';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from './dispatch-events';
import { createMouseEvent } from './event-objects';
import { typeInElement } from './type-in-element';
import { patchElementFocus } from './element-focus';
import { Observable } from 'rxjs';
import { SpectatorError } from './errors';
import { SpyObject } from './mock';
import { DOMSelector } from './dom-selectors';

declare const require: Function;
const $ = require('jquery');

export type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;

const KEY_UP = 'keyup';

export class Spectator<C> {
  fixture: ComponentFixture<C>;
  component: C;
  element: HTMLElement | Node | any;
  debugElement: DebugElement;

  /**
   * Wrapper for TestBed.get()
   * @param type
   * @returns
   */
  get<T>(type: Type<T> | InjectionToken<T>, fromComponentInjector = false): T & SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(type) as T & SpyObject<T>;
    }
    return TestBed.get(type);
  }

  /**
   * Run detect changes on the component
   */
  detectChanges() {
    this.fixture.detectChanges();
  }

  /**
   * Run detect changes explicitly on the tested component
   */
  detectComponentChanges() {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }

  /**
   *
   * @param directiveOrSelector
   * @param options
   * @returns
   */
  query<R extends Element>(directiveOrSelector: string | DOMSelector): R;
  query<R>(directiveOrSelector: Type<any>, options?: { read }): R;
  query<R>(directiveOrSelector: Type<any> | DOMSelector | string, options: { read } = { read: undefined }): R {
    return _getChild<R>(this.debugElement)(directiveOrSelector, options);
  }

  /**
   *
   * @param directiveOrSelector
   * @param options
   * @returns
   */
  queryAll<R extends Element[]>(directiveOrSelector: string | DOMSelector): R;
  queryAll<R>(directiveOrSelector: Type<any>, options?: { read }): R[];
  queryAll<R>(directiveOrSelector: Type<any> | DOMSelector | string, options: { read } = { read: undefined }): R[] {
    return _getChildren<R>(this.debugElement)(directiveOrSelector, options);
  }

  /**
   * Helper for getting the last value
   * @param directiveOrSelector
   * @param options
   * @returns
   */
  queryLast<R extends Element>(directiveOrSelector: string | DOMSelector): R;
  queryLast<R>(directiveOrSelector: Type<any>, options?: { read }): R;
  queryLast<R>(directiveOrSelector: Type<any> | DOMSelector | string, options: { read } = { read: undefined }): R {
    const result = _getChildren<R>(this.debugElement)(directiveOrSelector, options);
    if (result && result.length) {
      return result[result.length - 1];
    }
    return null;
  }

  /**
   * Free style JQuery support
   * @param selector
   * @returns
   */
  $$(selector) {
    return $(selector);
  }

  /**
   *
   * Set component @Input()
   *
   * spectator.setInput('className', 'danger');
   *
   * spectator.setInput({
   *   className: 'danger',
   *   title: 'title'
   * });
   * @param input
   */
  setInput<K extends keyof C>(input: Partial<C>);
  setInput<K extends keyof C>(input: K, inputValue: C[K]);
  setInput<K extends keyof C>(input: Partial<C> | K, inputValue?: C[K]) {
    _setInput(input, inputValue, this.component);
    this.detectComponentChanges();
  }

  /**
   *
   * Subscribe to component @Output()
   *
   *  spectator.output<{ type: string }>('click')
   *    .subscribe(result => (output = result));
   *
   * @param output
   * @returns
   */
  output<T, K extends keyof C = keyof C>(output: K): Observable<T> {
    const observable = this.component[output];
    if (observable instanceof Observable) {
      return observable as Observable<T>;
    } else {
      throw new Error(`${output} in not an @Output`);
    }
  }

  /**
   *
   * @param selector
   */
  click(selector: SpectatorElement) {
    const element = this.getNativeElement(selector);
    element.click();
    this.detectChanges();
  }

  /**
   * returns the native element from an SpectatorElement
   * @param selector
   * @returns
   */
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

  /**
   *
   * @param selector
   * @param type
   * @param x
   * @param y
   * @param event
   */
  dispatchMouseEvent(selector: SpectatorElement, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    const _event = dispatchMouseEvent(this.getNativeElement(selector), type, x, y, event);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param selector
   * @param type
   * @param keyCode
   * @param target
   * @returns
   */
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyCode: number, target?: Element): KeyboardEvent;
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, key: string, target?: Element): KeyboardEvent;
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyOrKeyCode: string | number, target?: Element): KeyboardEvent {
    const _event = dispatchKeyboardEvent(this.getNativeElement(selector), type, keyOrKeyCode, target);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param selector
   * @param type
   * @param canBubble
   * @returns
   */
  dispatchFakeEvent(selector: SpectatorElement | Window, type: string, canBubble?: boolean): Event {
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

  /**
   *
   * @param selector
   * @param type
   * @param x
   * @param y
   * @returns
   */
  dispatchTouchEvent(selector: SpectatorElement, type: string, x = 0, y = 0) {
    const _event = dispatchTouchEvent(this.getNativeElement(selector), type, x, y);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param value
   * @param element
   */
  typeInElement(value: string, selector: SpectatorElement) {
    const _event = typeInElement(value, this.getNativeElement(selector));
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param element
   */
  patchElementFocus(element: HTMLElement) {
    patchElementFocus(element);
    this.detectChanges();
  }
}

/**
 *
 * @param debugElementRoot
 * @returns
 * @internal
 */
export function _getChild<R>(debugElementRoot: DebugElement) {
  return function(directiveOrSelector: Type<any> | DOMSelector | string, options: { read } = { read: undefined }): R {
    let debugElement: DebugElement;

    if (typeof directiveOrSelector === 'string') {
      debugElement = debugElementRoot.query(By.css(directiveOrSelector));
      return debugElement && debugElement.nativeElement;
    } else if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement)[0] as any;
    } else {
      debugElement = debugElementRoot.query(By.directive(directiveOrSelector));
    }

    if (!debugElement) {
      throw new SpectatorError(`Cannot find a debug element for ${directiveOrSelector}`);
    }

    if (options.read) {
      return debugElement.injector.get(options.read);
    }

    return debugElement.componentInstance;
  };
}

/**
 *
 * @param debugElementRoot
 * @returns
 * @internal
 */
export function _getChildren<R>(debugElementRoot: DebugElement) {
  return function(directiveOrSelector: Type<any> | DOMSelector | string, options: { read } = { read: undefined }): R[] {
    let debugElement: DebugElement[];

    if (typeof directiveOrSelector === 'string') {
      debugElement = debugElementRoot.queryAll(By.css(directiveOrSelector));
      return debugElement && debugElement.map(debug => debug.nativeElement);
    } else if (directiveOrSelector instanceof DOMSelector) {
      return directiveOrSelector.execute(debugElementRoot.nativeElement) as any[];
    } else {
      debugElement = debugElementRoot.queryAll(By.directive(directiveOrSelector));
    }

    if (!debugElement) {
      throw new SpectatorError(`Cannot find a debug element for ${directiveOrSelector}`);
    }

    if (options.read) {
      return debugElement.map(debug => debug.injector.get(options.read));
    }

    return debugElement.map(debug => debug.componentInstance);
  };
}

/**
 *
 * @param input
 * @param inputValue
 * @param component
 * @internal
 */
export function _setInput(input, inputValue, component) {
  if (typeof input === 'string') {
    component[input] = inputValue;
  } else {
    for (let p in input) {
      component[p] = input[p];
    }
  }
}
