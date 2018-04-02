/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, InjectionToken, Type } from '@angular/core';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from './dispatch-events';
import { createMouseEvent } from './event-objects';
import { typeInElement } from './type-in-element';
import { patchElementFocus } from './element-focus';
import { Observable } from 'rxjs/Observable';

export class Spectator<C> {
  fixture: ComponentFixture<C>;
  debugElement: DebugElement;
  component: C;
  element: HTMLElement | Node | any;

  /**
   * Wrapper for TestBed.get()
   * @param {Type<T> | InjectionToken<T>} type
   * @returns {T}
   */
  get<T>(type: Type<T> | InjectionToken<T>): T {
    return TestBed.get(type);
  }

  /**
   * Run detect changes on the host component
   */
  detectChanges() {
    this['hostFixture'] ? this['hostFixture'].detectChanges() : this.fixture.detectChanges();
  }

  /**
   * Query a DOM element from the tested element
   * @param selector
   * @returns {any}
   */
  query(selector: string) {
    return this.element.querySelector(selector);
  }

  /**
   * Query a DOM elements from the tested element
   * @param selector
   * @returns {any}
   */
  queryAll(selector: string) {
    return this.element.querySelectorAll(selector);
  }

  /**
   *
   * @param input
   * @param inputValue
   */
  setInput<T>(input: object | string, inputValue?: T) {
    if (typeof input === 'string') {
      this.component[input] = inputValue;
    } else {
      for (let p in input) {
        this.component[p] = input[p];
      }
    }

    this.detectChanges();
  }

  /**
   *
   * @param output
   *
   */
  output<T>(output: string): Observable<T> {
    const observable = this.component[output];
    if (observable && typeof observable.subscribe === 'function') {
      return observable;
    } else {
      throw new Error(`${output} in not an @Output`);
    }
  }

  /**
   *
   * @param selector string | Element | DebugElement
   */
  click(selector: string | Element | DebugElement) {
    let element;

    if (typeof selector === 'string') {
      const checkExists = this.debugElement.query(By.css(selector));
      if (checkExists) {
        element = checkExists.nativeElement;
      } else {
        throw new Error(`${selector} does not exists`);
      }
    } else {
      if (selector instanceof DebugElement) {
        element = selector.nativeElement;
      } else {
        element = selector;
      }
    }

    element.click();
    this.detectChanges();
  }

  /**
   *
   * @param {Node} node
   * @param {string} type
   * @param {number} x
   * @param {number} y
   * @param {MouseEvent} event
   */
  dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    const _event = dispatchMouseEvent(node, type, x, y, event);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {Node} node
   * @param {string} type
   * @param {number} keyCode
   * @param {Element} target
   * @returns {KeyboardEvent}
   */
  dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element): KeyboardEvent {
    const _event = dispatchKeyboardEvent(node, type, keyCode, target);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {Node | Window} node
   * @param {string} type
   * @param {boolean} canBubble
   * @returns {Event}
   */
  dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    const _event = dispatchFakeEvent(node, type, canBubble);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {Node} node
   * @param {string} type
   * @param {number} x
   * @param {number} y
   * @returns {Event}
   */
  dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
    const _event = dispatchTouchEvent(node, type, x, y);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {string} value
   * @param {HTMLInputElement} element
   */
  typeInElement(value: string, element: HTMLInputElement) {
    const _event = typeInElement(value, element);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {HTMLElement} element
   */
  patchElementFocus(element: HTMLElement) {
    patchElementFocus(element);
    this.detectChanges();
  }
}
