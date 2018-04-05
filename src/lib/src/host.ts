/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator } from './internals';
import * as customMatchers from './matchers';
import { By } from '@angular/platform-browser';
import { HostComponent, initialModule, SpectatorOptions } from './config';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DynamicComponent } from '../../app/dynamic/dynamic.component';

export class SpectatorWithHost<C, H = HostComponent> extends Spectator<C> {
  hostComponent: H;
  /** We need a different property when there is an host because it's different type */
  hostFixture: ComponentFixture<H>;
  hostElement: HTMLElement;
  hostDebugElement: DebugElement;

  /**
   *
   * @param {Type<any>} directive
   * @returns {DebugElement}
   */
  byDirective<T>(directive: Type<any>): DebugElement {
    return this.hostDebugElement.query(By.directive(directive));
  }

  /**
   *
   * @param {string} selector
   * @param {true} debugElement
   * @returns {DebugElement}
   */
  queryHost(selector: string, debugElement: true): DebugElement;
  queryHost(selector: string, debugElement?: false): Element;
  queryHost(selector: string, debugElement = false): Element | DebugElement {
    if (debugElement) {
      return this.hostDebugElement.query(By.css(selector));
    }

    return this.hostElement.querySelector(selector);
  }

  /**
   * Query a DOM elements from the tested element
   * @param selector
   * @returns {any}
   */
  queryAllHost(selector: string, debugElement: true): DebugElement[];
  queryAllHost(selector: string, debugElement?: false): NodeListOf<Element>;
  queryAllHost(selector: string, debugElement = false): NodeListOf<Element> | DebugElement[] {
    if (debugElement) {
      return this.hostDebugElement.queryAll(By.css(selector));
    }

    return this.hostElement.querySelectorAll(selector);
  }
}

export function createHostComponentFactory<C, H = HostComponent>(component: Type<C>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H>;
export function createHostComponentFactory<C, H = HostComponent>(options: SpectatorOptions<C, H>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H>;
export function createHostComponentFactory<C, H = HostComponent>(options: SpectatorOptions<C, H> | Type<C>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H> {
  const { component, moduleMetadata, host } = initialModule<C>(options, true);

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
  });

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
  });

  return (template: string, detectChanges = true, complexInputs: Partial<C> = {}) => {
    TestBed.overrideComponent(host, { set: { template: template } });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    });
    const spectatorWithHost = new SpectatorWithHost<C, H>();
    spectatorWithHost.hostFixture = TestBed.createComponent(host);

    //  The host component instance
    spectatorWithHost.hostComponent = spectatorWithHost.hostFixture.componentInstance;
    spectatorWithHost.hostDebugElement = spectatorWithHost.hostFixture.debugElement;
    spectatorWithHost.hostElement = spectatorWithHost.hostFixture.nativeElement;
    // The tested component debug element
    spectatorWithHost.debugElement = spectatorWithHost.hostFixture.debugElement.query(By.directive(component));
    // The tested component instance, rendered inside the host
    spectatorWithHost.component = spectatorWithHost.debugElement.componentInstance;
    spectatorWithHost.element = spectatorWithHost.debugElement.nativeElement;

    if (complexInputs) {
      spectatorWithHost.setInput(complexInputs);
    }

    if (detectChanges) {
      spectatorWithHost.hostFixture.detectChanges();
    }

    return spectatorWithHost;
  };
}
