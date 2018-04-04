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

export type SpectatorElement = string | Element | DebugElement;

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
   * @param {Type<any>} directive
   * @returns {DebugElement}
   */
  byDirective<T>(directive: Type<T>): DebugElement {
    return this.debugElement.query(By.directive(directive));
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
   * @param {Partial<C>} input
   */
  setInput<K extends keyof C>(input: Partial<C>);
  setInput<K extends keyof C>(input: K, inputValue: C[K]);
  setInput<K extends keyof C>(input: Partial<C> | K, inputValue?: C[K]) {
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
   * Subscribe to component @Output()
   *
   *  spectator.output<{ type: string }>('click')
   *    .subscribe(result => (output = result));
   *
   * @param {K} output
   * @returns {Observable<T>}
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
   * @param {SpectatorElement} selector
   */
  click(selector: SpectatorElement) {
    const element = this.getNativeElement(selector);
    element.click();
    this.detectChanges();
  }

  /**
   * returns the native element from an SpectatorElement
   * @param {SpectatorElement | Window} selector
   * @returns {any}
   */
  getNativeElement(selector: SpectatorElement | Window) {
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

    return element;
  }

  /**
   *
   * @param {SpectatorElement} selector
   * @param {string} type
   * @param {number} x
   * @param {number} y
   * @param {MouseEvent} event
   */
  dispatchMouseEvent(selector: SpectatorElement, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    const _event = dispatchMouseEvent(this.getNativeElement(selector), type, x, y, event);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {SpectatorElement} selector
   * @param {string} type
   * @param {number} keyCode
   * @param {Element} target
   * @returns {KeyboardEvent}
   */
  dispatchKeyboardEvent(selector: SpectatorElement, type: string, keyCode: number, target?: Element): KeyboardEvent {
    const _event = dispatchKeyboardEvent(this.getNativeElement(selector), type, keyCode, target);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {SpectatorElement | Window} selector
   * @param {string} type
   * @param {boolean} canBubble
   * @returns {Event}
   */
  dispatchFakeEvent(selector: SpectatorElement | Window, type: string, canBubble?: boolean): Event {
    const _event = dispatchFakeEvent(this.getNativeElement(selector), type, canBubble);
    this.detectChanges();
    return _event;
  }

  /**
   *
   * @param {SpectatorElement} selector
   * @param {string} type
   * @param {number} x
   * @param {number} y
   * @returns {Event}
   */
  dispatchTouchEvent(selector: SpectatorElement, type: string, x = 0, y = 0) {
    const _event = dispatchTouchEvent(this.getNativeElement(selector), type, x, y);
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
